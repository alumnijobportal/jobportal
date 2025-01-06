import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import companyRouter from './routes/company.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for the Job Portal backend",
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http"],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("ENABLED MORGAN");
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
