import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Book, { BookInterface } from "../models/BookModel";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, pages, edition } = req.body as BookInterface;
  try {
    const findByTitle = await Book.findOne({ title });
    if (!findByTitle) {
      const newBook = new Book({
        title,
        edition,
        pages,
        avaliable: true,
      });
      const savedBook = await newBook.save();
      res.status(201).json({ success: true, data: savedBook });
    }
    res.status(400).json({ success: false, data: "Livro já cadastrado" });
  } catch (ex: any) {
    throw ex;
  }
});

const getOneBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const findById = await Book.findById({ _id: id });
  if (!findById) {
    res.status(400).json({ success: false, data: "Livro não cadastrado" });
  }
  res.status(200).json({ success: true, data: findById });
});

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const findAll = await Book.find();

  if (!findAll || findAll.length === 0) {
    res.status(400).json({ success: false, data: "Livros não cadastrados" });
  }
  res.status(200).json({ success: true, data: findAll });
});

const updateOneBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, pages, avaliable, edition } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        pages,
        edition,
        avaliable,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Livro não encotrado" });
  }
});

const deleteOneBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Livro deletado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Livro não deletado" });
  }
});

export { createBook, updateOneBook, getOneBook, deleteOneBook, getAllBooks };
