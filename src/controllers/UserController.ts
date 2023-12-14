import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "../config/jwt";
import UsersModel, { UserInterface } from "../models/UsersModel";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    birthDate,
    phoneNumber,
  } = req.body as UserInterface;
  try {
    const findByEmail = await UsersModel.findOne({ email });
    if (!findByEmail) {
      const hashedPassword = await bcrypt.hash(password, 15);
      const newUser = new UsersModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        birthDate,
        phoneNumber,
      });
      const savedUser = await newUser.save();
      res.status(201).json({ data: savedUser });
    }
    res.status(400).json({ success: false, data: "Usuário já cadastrado" });
  } catch (ex: any) {
    throw ex;
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userFound = await UsersModel.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    const refreshToken = generateRefreshToken(userFound._id);
    await UsersModel.findByIdAndUpdate(
      userFound._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.json({
      success: true,
      data: {
        _id: userFound._id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        token: generateToken(userFound._id),
      },
    });

    console.log(generateToken(userFound._id));
  } else {
    throw new Error("Invalid Credentials!");
  }
});

export { loginUser, createUser };
