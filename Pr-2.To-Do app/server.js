const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const port = 3000;

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));

let tasks = [
    { text: "Buy groceries", status: "pending", createdAt: "10:00 AM, Feb 25" },
    { text: "Complete project", status: "completed", createdAt: "11:30 AM, Feb 25" },
    { text: "Go for a run", status: "pending", createdAt: "07:00 AM, Feb 25" }
];

let editIndex = null;

server.get("/", (req, res) => {
    res.render("index", { tasks, filter: "all", editIndex });
});

server.get("/pending", (req, res) => {
    res.render("index", { tasks, filter: "pending", editIndex });
});

server.get("/completed", (req, res) => {
    res.render("index", { tasks, filter: "completed", editIndex });
});

server.post('/add', (req, res) => {
    const taskText = req.body.task;
    if (taskText.trim() !== "") {
        const newTask = {
            text: taskText,
            status: "pending",
            createdAt: new Date().toLocaleString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit", 
                day: "2-digit", 
                month: "short" 
            }) 
        };
        tasks.push(newTask);
    }
    res.redirect('/');
});

server.post("/edit", (req, res) => {
    editIndex = req.body.index;
    res.redirect("/");
});

server.post("/delete", (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect("/");
});

server.post("/update-status", (req, res) => {
    const index = req.body.index;
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    res.redirect("/");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});