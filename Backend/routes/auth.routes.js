import express from "express"
import {
  registerUser,
  loginUser,
  sendEmailVerificationOtp,
  verifyOTP,
} from "../controllers/auth.controllers.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register A New User
 *     description: API endpoint to register a new user by providing personal details and uploading a resume.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: fullname
 *         in: formData
 *         description: Full name of the user
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Email address of the user
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Password for the user account
 *         required: true
 *         type: string
 *       - name: phone
 *         in: formData
 *         description: Phone number of the user
 *         required: true
 *         type: string
 *       - name: batch
 *         in: formData
 *         description: Batch year of the user
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: added successfully
 *       '500':
 *         description: server error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logging In A User
 *     description: API endpoint to login a user by providing email and password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Email address of the user
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Password for the user account
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Login successful and JWT returned
 *       '400':
 *         description: Invalid credentials or missing fields
 *       '500':
 *         description: server error
 */
router.post("/login", loginUser);
router.post("get-login-otp", sendEmailVerificationOtp);
router.post("verify-login-otp", verifyOTP);

export default router
