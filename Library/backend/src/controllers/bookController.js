import mongoose from "mongoose";
import Book from "../models/books.js";
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb Connnected Successfully");
} catch (error) {
    console.log(error.message);
};

// getBooks
export const getBooks= async(req,res,next) =>{
    const books = await Book.find();
    res.status(200).json(books);
};

// addBook
export const addBook = async(req,res,next) => {
    const bookName = req.body.name;
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
};

// deleteBook
export const deleteBook = async(req,res,next) => {
    const deletedBook = await Book.findOneAndDelete({title : req.body.title},req.body);
    res.status(200).json({msg : `${deletedBook.title} is deleted successfully`});
}