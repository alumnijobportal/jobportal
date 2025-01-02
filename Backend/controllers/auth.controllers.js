const cloudinary = require("../config/cloudinary/index.js");
const db = require("../config/db/index.js");
const { erroHandler } = require("../utils/errorHandler.js");

const registerUser = async (req, res) => {
  const { fullname, email, password, phone, batch } = req.body;

  if (!fullname || !email || !password || !phone || !batch || !req.file) {
    return res
      .status(400)
      .send(erroHandler(400, "Invalid Request", "Please Enter All THe Fields"));
  }

  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "job-portal/resumes" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .send(
              erroHandler(
                500,
                "Error Uploading",
                "Error Uploading Resume To The Cloudinary"
              )
            );
        }

        const resumeUrl = result.secure_url;
        const currentYear = new Date().getFullYear();
        const workStatus = currentYear - batch >= 4 ? "ALUMNI" : "STUDENT";

        await db("users").insert({
          fullname,
          email,
          password,
          phone,
          batch,
          status: workStatus,
          resume: resumeUrl,
          work_status: workStatus,
        });

        return res.status(200).send({
          response: {
            title: "User Created",
            message: "User Created Successfully",
            status: 200,
          },
        });
      }
    );
    req.pipe(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(erroHandler(500, "Server Error", "Internal Server Error"));
  }
};
