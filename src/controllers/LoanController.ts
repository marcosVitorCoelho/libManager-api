import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Loan, { LoanInterface } from "../models/LoanModel";
import Book from "../models/BookModel";
import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const createLoan = asyncHandler(async (req: Request, res: Response) => {
  const { clientId, bookId: id, loanDate, returnDate } = req.body as LoanInterface;
  console.log("BOOK ID", id)

  try {
    const newLoan = new Loan({
      clientId,
      bookId: id,
      loanDate,
      returnDate,
    });

    await Book.findByIdAndUpdate(id, {
      avaliable: false
    }, { new: true })


    const savedLoan = await newLoan.save();
    res.status(201).json({ success: true, data: savedLoan });
  } catch (ex: any) {
    throw ex;
  }
});

const getAllLoans = asyncHandler(async (req: Request, res: Response) => {
  const findAll = await Loan.find().populate(["bookId", "clientId"]).exec();

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
    res.status(400).json({ success: false, data: "Empréstimo não encotrado" });
  }
});

const deleteOneLoan = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findById({ _id: id });

    if (loan) {
      await Book.findByIdAndUpdate(loan.bookId, {
        avaliable: true
      }, { new: true })

      await Loan.findByIdAndDelete(id)
    }

    res.status(200).json({ success: true, data: "Empréstimo deletado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Empréstimo não deletado" });
  }
});

export { createLoan, getAllLoans, getOneLoan, updateOneLoan, deleteOneLoan };
