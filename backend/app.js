const express = require("express")
const app = express()
const cors = require("cors")

if(!process.env.CONFIG){
    require("dotenv").config()
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = 3000
app.listen(PORT, ()=>{
    console.log("the server is runnin in "+PORT);
})

const indexRoutes = require("./routes/indexRouter")
app.use("/", indexRoutes)