const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        require: [true, "Task title is required"]
    },
    taskDesc: {
        type: String,
        require: [true, "Task description is required"]
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;