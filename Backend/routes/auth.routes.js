import express from "express";
import {
  registerUser,
  loginUser,
  sendEmailVerificationOtp,
  verifyOTP,
  createCompany,
} from "../controllers/auth.controllers.js";
import upload from "../config/multer/index.js"



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
 *       - multipart/form-data
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

router.post('/register', upload.single('resume'), registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logging In a  User
 *     description: API endpoint to logging in a new user using form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - multipart/form-data
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
 *     summary: get OTP for logging in a user
 *     description: API endpoint to logging in by OTP a new user using form-data parameters.
 *     tags:
 *       - Authentication
 *     consumes:
 *       - multipart/form-data
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
 *       - multipart/form-data
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
/**
 * @swagger
 * /api/auth/create-company:
 *   post:
 *     summary: Add your company along with its details
 *     description: API endpoint for adding company details
 *     tags:
 *       - Authentication
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: company_name
 *         type: string
 *         required: true
 *         description: Enter the company name.
 *       - in: formData
 *         name: company_url
 *         type: string
 *         required: true
 *         description: Enter the company URL.
 *       - in: formData
 *         name: company_address
 *         type: string
 *         required: true
 *         description: Enter the company address.
 *       - in: formData
 *         name: user_id
 *         type: string
 *         required: true
 *         description: Enter the user ID.
 *       - in: formData
 *         name: industry_type
 *         type: string
 *         required: true
 *         enum: [Technology, Finance, Healthcare, Education, Retail, Manufacturing, Other]
 *         description: Enter the industry type.
 *       - in: formData
 *         name: user_designation
 *         type: string
 *         required: true
 *         description: Enter your designation.
 *       - in: formData
 *         name: number_of_employees
 *         type: integer
 *         required: true
 *         description: Enter the number of employees.
 *       - in: formData
 *         name: company_description_pdf
 *         type: file
 *         required: true
 *         description: Upload the company description pdf.
 *       - in: formData
 *         name: company_logo
 *         type: file
 *         required: true
 *         description: Upload the company_logo.
 *     responses:
 *       '201':
 *         description: Company created successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Server error.
 */
router.post("/create-company",  upload.fields([{ name: 'company_description_pdf', maxCount: 1 }, { name: 'company_logo', maxCount: 1 }]),  createCompany);
router.get("/get-companies",getCompanies);

export default router;

