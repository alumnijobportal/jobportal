import nodemailer from "nodemailer";
import db from "../config/db/index.js";
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "alumnijobportal@gmail.com", pass: "kvagyxeslqguklde" },
});

export const generateOTPAndSend = async (email) => {
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry


    await db("access_otp_log").insert({
      otp,
      email,
      user_id: null,
      expires_at: expiresAt,
      is_verified: false,
    });

   
    await transporter.sendMail({
      from: "alumnijobportal@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    return true; // Return success
  } catch (error) {
    console.error("Error in OTP process:", error);
    throw error; // Propagate error to the caller
  }
};
