import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import UserRoutes from "../src/routes/UserRoutes";
import LoanRoutes from "../src/routes/LoanRoutes";
import BookRoutes from "../src/routes/BookRoutes";
import CustomerRoutes from "../src/routes/CustomerRoutes";
import { connect } from "./config/connection";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connect();

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/customers", CustomerRoutes);

app.use("/api/v1/loan", LoanRoutes);
