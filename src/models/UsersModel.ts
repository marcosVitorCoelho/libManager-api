import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    address: {
        street: string;
        city: string;
        state: string;
        number: string;
        zipCode: string;
    };
}

const UserSchema = new Schema<UserInterface>(
    {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
        email: { type: "string", required: true },
        phoneNumber: { type: "string", required: true },
        password: { type: "string", required: true },
        address: {
            street: { type: "string", required: true },
            city: { type: "string", required: true },
            state: { type: "string", required: true },
            number: { type: "string", required: true },
            zipCode: { type: "string", required: true }
        },
        birthDate: { type: "Date", required: true },
    },
    { timestamps: true }
)

export default mongoose.model<UserInterface>("User", UserSchema);

