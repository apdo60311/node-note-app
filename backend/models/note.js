import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    categories: { type: Array },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("Note", noteSchema);

export default noteModel;
