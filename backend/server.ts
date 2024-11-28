import express from 'express';
import cors from 'cors'

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

import database from "./models/index"

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req:any, res:any) => {
  res.json({ message: "Welcome to the application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 

database.sequelize.sync({force:true}).then(()=>{
  console.log('Drop and Resync Db');
});


//Routes
authRouter(app);
userRouter(app);