const express = require ("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");


const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD} = require("./config/config");
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const mongoose = require("mongoose");
mongoose.connect(
    // "mongodb://root:root@172.18.0.2:27017/?authSource=admin")
    // "mongodb://root:root@mongo:27017/?authSource=admin")
    MONGO_URL)
    .then(() => {
        console.log("Sucessfully connected to MongoDB");
    })
    .catch((e) => {
        console.log("Error trying to connect to MongoDB: " ,e);  
    });

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1> Hello World using Express and Docker by Sehaj!!!</h1>");
})

app.use("/api/v1/tasks", taskRoutes);

app.use("/api/v1/users", userRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on PORT : ${PORT}`);
})