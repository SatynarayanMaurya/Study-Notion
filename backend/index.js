const express = require("express")
const app = express();
require("dotenv").config();
const cors = require("cors")
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload")
const port = process.env.PORT || 4000


app.use(cookieParser());
app.use(cors({
    origin: 'https://study-notion-frontend-satynarayan-mauryas-projects.vercel.app/', 
  }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const database = require("./Config/database")
database.connect();
const cloudinary = require("./Config/cloudinaryConnect")
cloudinary.connect();
const route = require("./Routes/routes")
app.use("/api/v1",route);


app.get("/",(req,res)=>{
    res.send(`<h1>"Hello from the Backend"</h1>
        <h3>Satynarayan maurya this side</h3>`)
})

app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})
