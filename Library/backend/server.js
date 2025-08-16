import express from "express";
import cors from "cors";
import path from "path";
import url from "url";
import books from "./src/routes/books.js"
import logger from "./src/middlewares/logger.js";

const port = process.env.PORT || 8000;
const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// making an app variable
const app = express();

app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// logger middlerware
app.use(logger);

// static folder setup
app.use(express.static(path.join(dirname,"../frontend/html")));

// route Mounting
app.use("/api/books",books);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});