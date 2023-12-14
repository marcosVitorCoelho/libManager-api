import mongoose, { Document, Schema } from "mongoose";

export interface LoanInterface extends Document {
  clientId: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  loanDate: string;
  returnDate: string;
}

const LocationSchema = new Schema<LoanInterface>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    loanDate: { type: "String", required: true },
    returnDate: { type: "String", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<LoanInterface>("Loan", LocationSchema);
