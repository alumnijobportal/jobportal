import cloudinary from "../config/cloudinary/index.js";
import db from "../config/db/index.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateOTPAndSend } from "../utils/otpManager.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone, batch } = req.body;
    console.log(req.body);

    if (!fullname || !email || !password || !phone || !batch) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Invalid Request", "Please Enter All The Fields")
        );
    }

    const hashedPassword = await bcrypt.hash(password, 1);
    const currentYear = new Date().getFullYear();
    const status = currentYear - batch >= 4 ? "ALUMNI" : "STUDENT";
    let data = {
      fullname,
      email,
      password: hashedPassword,
      phone,
      batch,
      status: status,
      work_status: null,
    };

    await db("users").insert(data).returning("*");

    return res.status(200).send({
      response: {
        data: data,
        title: "User Created",
        message: "User Created Successfully",
        status: 200,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(errorHandler(500, "Server Error", "Internal Server Error"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please provide email and password"
          )
        );
    }
    const user = await db("users").where({ email }).first();
    const userDetails = await db("users").select("*").where({
      email: email,
    });
    if (!user) {
      return res
        .status(404)
        .send(
          errorHandler(404, "User Not Found", "No user found with this email")
        );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send(errorHandler(401, "Unauthorized", "Invalid password"));
    }
    const payload = {
      id: user.id,
      status: user.status,
      email: user.email,
    };

    const token = jwt.sign(payload, "jwt_secret", { expiresIn: "1h" });
    const userData = {
      ...userDetails,
      token,
    };
    return res.status(200).send({
      response: {
        title: "Login Successful",
        message: "Login successful, token generated",
        data: userData,
        status: 200,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(errorHandler(500, "Server Error", "Internal Server Error"));
  }
};

const sendEmailVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

   
    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please Enter The Email"));
    }

  
    const userExists = await db("users").where("email", email).first();
    if (!userExists) {
      return res
        .status(404)
        .send(errorHandler(404, "Not Found", "User Not Found"));
    }

    const success = await generateOTPAndSend(email);
    if (success) {
      return res
        .status(200)
        .json({ message: "OTP generated and sent successfully" }); 
    } else {
      return res
        .status(500)
        .send(
          errorHandler(
            500,
            "Error Occurred",
            "Failed to generate or send OTP"
          )
        );
    }
  } catch (error) {
    console.error("Error in OTP generation:", error);
    return res.status(500).send(errorHandler(500, "Server Error", error.message));
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Invalid Request", "Please provide email and OTP")
        );
    }
    const userDetails = await db("users").select("*").where({
      email,
    });

    const otpRecord = await db("access_otp_log")
      .select("otp", "is_verified", "expires_at", "access_otp_log_id")
      .where("email", email)
      .andWhere("otp", otp)
      .first();

    if (!otpRecord) {
      return res
        .status(404)
        .send(errorHandler(404, "OTP Not Found", "Invalid OTP or email."));
    }

    if (otpRecord.is_verified == true) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "OTP Already Verified",
            "This OTP has already been verified."
          )
        );
    }

    const currentTime = Date.now();
    const expiryTime = otpRecord.expires_at;
    if (currentTime > expiryTime) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "OTP Expired",
            "The OTP has expired. Please request a new one."
          )
        );
    }

    await db("access_otp_log")
      .where("access_otp_log_id", otpRecord.access_otp_log_id)
      .update({
        is_verified: true,
      });

    const payload = {
      id: userDetails.id,
      status: userDetails.status,
      email: userDetails.email,
    };
    const token = jwt.sign(payload, "jwt_secret", { expiresIn: "1h" });
    const userData = {
      ...userDetails,
      token,
    };
    return res.status(200).send({
      response: {
        title: "Login Successful",
        message: "Login successful, token generated",
        data: userData,
        status: 200,
      },
    });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res
      .status(500)
      .send(
        errorHandler(
          500,
          "Server Error",
          "Internal server error while verifying OTP."
        )
      );
  }
};

export { registerUser, loginUser, sendEmailVerificationOtp, verifyOTP };
