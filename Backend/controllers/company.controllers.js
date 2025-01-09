import cloudinary from "cloudinary";
import db from "../config/db/index.js";
import { errorHandler } from "../utils/errorHandler.js";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: "di4yg64ih",
  api_key: "652334511142866",
  api_secret: "vbPpAMNT0i6diIaxyDkdQBQCyZY",
});

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

    if (!company_name || !user_id || !industry_type || !number_of_employees) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const descriptionTempPath = req.files["company_description_pdf"][0].path;
    const descriptionUpload = await cloudinary.v2.uploader.upload(
      descriptionTempPath,
      {
        folder: "company_profile",
        resource_type: "auto",
      }
    );
    const descriptionUrl = descriptionUpload.secure_url;
    fs.unlinkSync(descriptionTempPath);

    const logoTempPath = req.files["company_logo"][0].path;
    const logoUpload = await cloudinary.v2.uploader.upload(logoTempPath, {
      folder: "company_profile",
    });
    const profileImageUrl = logoUpload.secure_url;
    fs.unlinkSync(logoTempPath);

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
    if (company) {
      res.status(200).send({
        message: "Company created successfully",
        data,
      });
    }
  } catch (error) {
    console.error("Error in creating company:", error);
    res.status(500).send({ error: "Server error" });
  }
};

export { createCompany };
