const express = require("express")
require("dotenv").config()

const cors = require("cors")
const path = require("path")

//routes
const productRoute = require('./controller/product.ctrl')

const app = express();
app.use(cors())


app.use("/images",express.static(path.join(__dirname,"/Images")))



app.use('/', productRoute)

app.listen(3000,()=> console.log("node Running"))