import express, { NextFunction, Request, Response, Express } from "express";
import cors from "cors";

import errorResponse from "./V1/utils/error-response";
import V1Router from "./version/V1";
import createError from "./V1/utils/create-error";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("./src/image"));

app.use("/api/v1/", V1Router);

app.use("/", (req: Request, res: Response, next: NextFunction) => next(createError("PAGE NOT FOUND", 404)));
app.use(errorResponse);

app.listen(port, async () => {
  console.log("berhasil connect ke database");
  console.log(`listening on port ${port}`);
});
