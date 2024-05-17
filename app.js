const express = require('express');
const app = express();

students = [
    { id: 1, name: "abc", course: "cse" },
    { id: 2, name: "def", course: "eee" },
    { id: 3, name: "ghi", course: "cse" }
]
app.get("/", (req, res) => {
    res.status(200).send("Done");
})
app.get("/api/students", (req, res) => {
    res.status(200).send(students);
})
app.get("/api/students/:id", (req, res) => {
    const student = students.find(student =>
        (student.id) === parseInt(req.params.id)
    )
    if (!student) {
        res.status(404).send(`There is no student with id : ${req.params.id}`)
    }
    else {
        res.status(200).send(student)
    }
})
app.use(express.json())
app.post("/api/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    }
    students.push(student);
    res.send(student)
})
app.put("/api/students/:id", (req, res) => {
    let student = students.find(student => student.id === parseInt(req.params.id))
    if (!student) {
        res.status(404).send(`There is no student with id : ${req.params.id}`)
    }
    student.id=req.params.id;
    student.name=req.body.name;
    student.course=req.body.course;
    res.status(200).json(student);
})
app.delete("/api/students/:id",(req,res)=>{
    let student = students.find(student => student.id === parseInt(req.params.id))
    if (!student) {
        res.status(404).send(`There is no student with id : ${req.params.id}`)
    }
    let index=students.indexOf(student)
    students.splice(index,1);
    res.json(student);
})

app.listen(3000);