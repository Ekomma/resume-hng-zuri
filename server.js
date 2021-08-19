const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const path = require("path");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

app.post("/send", (req, res) => {
    console.log("enter")
    console.log(req.body)
    res.send(req.body)
})

app.get("/", (req, res)=> {
    res.sendFile("index.html")
})


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on ${PORT}`.yellow.bold));

