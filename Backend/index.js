const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan"); // Import Morgan
const app = express();


app.use(express.json());


app.use(morgan("dev")); 


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for the Job Portal backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample API endpoint
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ message: "Job Listings" });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("ENABLED MORGAN")  
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
