import express from "express";
import {
  registerUser,
  loginUser,
  sendEmailVerificationOtp,
  verifyOTP,
} from "../controllers/auth.controllers.js";
import { authenticateJWT } from "../utils/verifyToken.js";
import upload from "../config/multer/index.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a New User
 *     description: API endpoint to register a new user using form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: fullname
 *         type: string
 *         required: true
 *         description: Full name of the user.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Email address of the user.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: Password for the user account.
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: Phone number of the user.
 *       - in: formData
 *         name: work_status
 *         type: string
 *         required: true
 *         enum: [EXPERIENCED,FRESHER]
 *         description: Select the work status.
 *       - in: formData
 *         name: batch
 *         type: integer
 *         required: true
 *         description: Batch year of the user.
 *       - in: formData
 *         name: resume
 *         type: file
 *         required: true
 *         description: Batch year of the user.
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Server error.
 */

router.post("/register", upload.single("resume"), registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logging In a  User
 *     description: API endpoint to logging in a new user using form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Email address of the user.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: Password for the user account.
 *     responses:
 *       '200':
 *         description: User Logged In Successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Server error.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/get-login-otp:
 *   post:
 *     summary: Get OTP for logging in a user
 *     description: API endpoint for logging in using OTP through form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Email address of the user.
 *     responses:
 *       '200':
 *         description: OTP generated and sent successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Server error.
 */

router.post("/get-login-otp", sendEmailVerificationOtp);

/**
 * @swagger
 * /api/auth/verify-login-otp:
 *   post:
 *     summary: verify OTP for logging in a user
 *     description: API endpoint to verify OTP for logging in a new user using form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Email address of the user.
 *       - in: formData
 *         name: otp
 *         type: string
 *         required: true
 *         description: Enter the OTP received.
 *     responses:
 *       '200':
 *         description: User Logged In Successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Server error.
 */
router.post("/verify-login-otp", verifyOTP);

export default router;
