import nodemailer from 'nodemailer';
import db from '../config/db/index.js';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "opratetech@gmail.com", pass: "auseoriajzpvzupp" },
});

export const generateOTPAndSend = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db("access_otp_log").insert({
      otp,
      email,
      user_id: userId,
      expires_at: expiresAt,
      is_verified: false,
    });

    await transporter.sendMail({
      from: "opratetech@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });
  } catch (error) {
    console.error("Error in OTP process:", error);
  }
};
