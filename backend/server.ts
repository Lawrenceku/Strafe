const express = require('express');
const cors = require('cors');

const app = express();

const database = require("./models/index")

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
require("./routes/auth")(app);
require("./routes/user")(app);