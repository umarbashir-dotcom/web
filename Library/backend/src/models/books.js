import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : String,
});

const Book = mongoose.model("Book",bookSchema);

export default Book;