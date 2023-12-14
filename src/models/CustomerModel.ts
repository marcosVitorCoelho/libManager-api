import mongoose, { Document, Schema } from "mongoose";

export interface CustomerInterface extends Document {
  firstName: string;
  lastName: string;
  rg: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    number: string;
    zipCode: string;
  };
  birthDate: string;
}

const CustomerSchema = new Schema<CustomerInterface>(
  {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true },
    cpf: { type: "string", required: true },
    rg: { type: "string", required: true },
    phoneNumber: { type: "string", required: true },
    address: {
      street: { type: "string", required: true },
      city: { type: "string", required: true },
      state: { type: "string", required: true },
      number: { type: "string", required: true },
      zipCode: { type: "string", required: true },
    },
    birthDate: { type: "string", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<CustomerInterface>("Customer", CustomerSchema);
