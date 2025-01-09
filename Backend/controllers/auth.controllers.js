import cloudinary from "cloudinary";
import db from "../config/db/index.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateOTPAndSend } from "../utils/otpManager.js";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: "di4yg64ih",
  api_key: "652334511142866",
  api_secret: "vbPpAMNT0i6diIaxyDkdQBQCyZY",
});

const registerUser = async (req, res) => {
  try {
  
    const { fullname, email, password, phone, batch, work_status } = req.body;

    

    if (!fullname || !email || !password || !phone || !batch || !work_status) {
      return res.status(400).json({ error: "Please fill all fields." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Resume or image is required." });
    }
    console.log("hi");
    const userExists = await db("users").where("email", email).first();
    if (userExists) {
      return res
        .status(400)
        .send(errorHandler(400, "Already Exists", "User Already Exists"));
    }
   
    const tempPath = req.file.path;
    const cloudinaryUpload = await cloudinary.v2.uploader.upload(tempPath, {
      folder: "company_files",
      resource_type: "auto",
    });
    
    const resumeUrl = cloudinaryUpload.secure_url;
    fs.unlinkSync(tempPath);

    const hashedPassword = await bcrypt.hash(password, 10);

    const currentYear = new Date().getFullYear();
    const status = currentYear - batch >= 4 ? "ALUMNI" : "STUDENT";

    const data = {
      fullname,
      email,
      password: hashedPassword,
      phone,
      batch,
      status,
      work_status,
      resume: resumeUrl,
    };

    const result = await db("users").insert(data).returning("*");

    return res.status(201).json({
      response: {
        data: result,
        title: "User Created",
        message: "User Created Successfully",
        status: 201,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong",
    });
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

    const userDetails = await db("users").select("*").where({ email: email });

    if (!userDetails || userDetails.length === 0) {
      return res
        .status(404)
        .send(
          errorHandler(404, "User Not Found", "No user found with this email")
        );
    }

    const user = userDetails[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send(errorHandler(401, "Unauthorized", "Invalid password"));
    }
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
          errorHandler(500, "Error Occurred", "Failed to generate or send OTP")
        );
    }
  } catch (error) {
    console.error("Error in OTP generation:", error);
    return res
      .status(500)
      .send(errorHandler(500, "Server Error", error.message));
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

const createCompany = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      company_name,
      company_url,
      company_address,
      industry_type,
      user_designation,
      number_of_employees,
    } = req.body;

    // if (!company_name || !user_id || !industry_type || !number_of_employees) {
    //   return res.status(400).send({ error: "Missing required fields" });
    // }

    const descriptionTempPath = req.files["company_description_pdf"][0].path;
    const descriptionUpload = await cloudinary.v2.uploader.upload(
      descriptionTempPath,
      {
        folder: "company_profile",
        resource_type: "auto",
      }
    );
    const descriptionUrl = descriptionUpload.secure_url;
    fs.unlinkSync(descriptionTempPath); // Delete temp file

    const logoTempPath = req.files["company_logo"][0].path;
    const logoUpload = await cloudinary.v2.uploader.upload(logoTempPath, {
      folder: "company_profile",
    });
    const profileImageUrl = logoUpload.secure_url;
    fs.unlinkSync(logoTempPath); // Delete temp file

    let data = {
      company_name,
      company_url,
      company_address,
      user_id: id,
      industry_type,
      user_designation,
      number_of_employees,
      company_description_pdf: descriptionUrl,
      company_logo: profileImageUrl,
    };

    const company = await db("companies").insert(data).returning("*");

    res.status(201).send({
      message: "Company created successfully",
      data,
    });
  } catch (error) {
    console.error("Error in creating company:", error);
    res.status(500).send({ error: "Server error" });
  }
};

export {
  registerUser,
  loginUser,
  sendEmailVerificationOtp,
  verifyOTP,
  createCompany,
};
