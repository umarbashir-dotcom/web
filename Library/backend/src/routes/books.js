import express from "express";
import {addBook,deleteBook ,getBooks} from "../controllers/bookController.js";
const router = express.Router();

// get books
router.get("/",getBooks);

// add post
router.post("/",addBook);

// delete book
router.delete("/",deleteBook);

export default router;