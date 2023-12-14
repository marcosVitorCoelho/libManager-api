import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Customer, { CustomerInterface } from "../models/CustomerModel";

const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    address,
    birthDate,
    rg,
    cpf,
    phoneNumber,
  } = req.body as CustomerInterface;
  try {
    const findByEmail = await Customer.findOne({ email });
    if (!findByEmail) {
      const newCustomer = new Customer({
        firstName,
        lastName,
        email,
        address,
        birthDate,
        phoneNumber,
        rg,
        cpf,
      });
      const savedCustomer = await newCustomer.save();
      res.status(201).json({ success: true, data: savedCustomer });
    }
    res.status(400).json({ success: false, data: "Usuário já cadastrado" });
  } catch (ex: any) {
    throw ex;
  }
});

const getOneCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const findById = await Customer.findOne({ _id: id });
  if (!findById) {
    res.status(400).json({ success: false, data: "Usuário não cadastrado" });
  }
  res.status(200).json({ success: true, data: findById });
});

const getAllCustomer = asyncHandler(async (req: Request, res: Response) => {
  const findAll = await Customer.find();

  if (!findAll || findAll.length === 0) {
    res.status(400).json({ success: false, data: "Usuários não cadastrados" });
  }
  res.status(200).json({ success: true, data: findAll });
});

const updateOneCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, address, birthDate } = req.body;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
        address,
        birthDate,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Usuário não encotrado" });
  }
});

const DeleteOneCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Usuário deletado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, data: "Usuário deletado" });
  }
});

export {
  createCustomer,
  getOneCustomer,
  getAllCustomer,
  updateOneCustomer,
  DeleteOneCustomer,
};
