import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import userRoutes from './route/user.route.js';
import otpRoutes from './route/otp.route.js';
import path from 'path';
import lineRoutes from './route/Line.route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "*", // Replace with your frontend URL
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]  // Add more methods if needed
}));
app.use(express.json());


app.use("/api/user",userRoutes);
app.use("/api/otp",otpRoutes);
app.use("/api/line",lineRoutes);


const __dirname1 = path.resolve()
app.use(express.static(path.join(__dirname1,"../dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname1,"../dist/index.html")) 
})







app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
