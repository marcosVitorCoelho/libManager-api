import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Loan, { LoanInterface } from "../models/LoanModel";
import Book from "../models/LoanModel";
import mongoose from "mongoose";

const createLoan = asyncHandler(async (req: Request, res: Response) => {
  const { clientId, bookId, loanDate, returnDate } = req.body as LoanInterface;

  console.log(req.body);
  try {
    const newLoan = new Loan({
      clientId,
      bookId,
      loanDate,
      returnDate,
    });

    const savedLoan = await newLoan.save();
    res.status(201).json({ success: true, data: savedLoan });
  } catch (ex: any) {
    throw ex;
  }
});

const getAllLoans = asyncHandler(async (req: Request, res: Response) => {
  const findAll = await Loan.find();

  if (!findAll || findAll.length === 0) {
    res
      .status(400)
      .json({ success: false, data: "Empréstimos não cadastrados" });
  }
  res.status(200).json({ success: true, data: findAll });
});

const getOneLoan = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const findById = await Loan.findById({ _id: id });
  if (!findById) {
    res.status(400).json({ success: false, data: "Empréstimo não cadastrado" });
  }
  res.status(200).json({ success: true, data: findById });
});

const updateOneLoan = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clientId, bookId, returnDate, loanDate } = req.body;
  try {
    const updatedBook = await Loan.findByIdAndUpdate(
      id,
      {
        clientId,
        bookId,
        returnDate,
        loanDate,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Livro não encotrado" });
  }
});

export { createLoan, getAllLoans, getOneLoan, updateOneLoan };
