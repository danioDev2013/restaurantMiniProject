//Imports

const express = require("express");
const path = require("path");

//Express setup

const app = express();
const PORT = process.env.PORT || 3000;

//Tables and waitlist array.

let reservations = [];
let waitlist = [];

//Setsup the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

//Three endpoints for the html files

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "home.html")));

app.get("/reservation", (req, res) => res.sendFile(path.join(__dirname, "reservation.html")));

app.get("/tables", (req, res) => res.sendFile(path.join(__dirname, "tables.html")));

app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "home.html")));

//Two for getting the two lists.
app.get("/api/reservations", (req, res) => res.json(reservations));

app.get("/api/waitlist", (req, res) => res.json(waitlist));

//Post for adding a reservation.
app.post("/api/reservations", (req, res) =>
{
    if (reservations.length >= 5)
    {
        waitlist.push(req.body);
    }
    else
    {
        reservations.push(req.body);
    }
    res.json(req.body);
});

//Endpoint to clear both lists incase of nuke.
app.post("/api/reservations/clear", (req, res) =>
{
    reservations = [];
    waitlist = [];

    res.status(204).end();
});

//Being the server and listen on given port.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));