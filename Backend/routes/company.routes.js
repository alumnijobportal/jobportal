import express from "express";
import {
  createCompany
} from "../controllers/company.controllers.js";
import { authenticateJWT } from "../utils/verifyToken.js";
import upload from "../config/multer/index.js";

const router = express.Router();

/**
 * @swagger
 * /api/company/create-company:
 *   post:
 *     summary: Add your company along with its details
 *     description: API endpoint for adding company details
 *     tags:
 *       - Company
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: headers
 *         name: authorization
 *         required: true
 *         description: Paste the JWT Token received after login.
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
router.post(
    "/create-company",
    authenticateJWT,
    upload.fields([
      { name: "company_description_pdf", maxCount: 1 },
      { name: "company_logo", maxCount: 1 },
    ]),
    createCompany
  );

  export default router;
  