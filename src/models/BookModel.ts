import mongoose, { Document, Schema } from "mongoose";

export interface BookInterface extends Document {
  title: string;
  pages: number;
  edition: string;
  avaliable: boolean;
}

const BookSchema = new Schema<BookInterface>(
  {
    title: { type: "string", required: true },
    edition: { type: "string", required: true },
    pages: { type: "number", required: true },
    avaliable: { type: "boolean", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<BookInterface>("Book", BookSchema);
