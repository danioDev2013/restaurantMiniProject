//Imports

const express = require("express");
const path = require("path");

//Express setup

const APP = express();
const PORT = process.env.PORT || 3000;

//Tables and waitlist array.

let reservations = [];
let waitlist = [];

//Setsup the Express app to handle data parsing

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

//Routes

//Three endpoints for the html files.
APP.get("/", (req, res) => res.sendFile(path.join(__dirname, "home.html")));

APP.get("/reservation", (req, res) => res.sendFile(path.join(__dirname, "reservation.html")));

APP.get("/tables", (req, res) => res.sendFile(path.join(__dirname, "tables.html")));

//Two for getting the two lists.
APP.get("/api/reservations", (req, res) => res.json(reservations));

APP.get("/api/waitlist", (req, res) => res.json(waitlist));

//Post for adding a reservation.
APP.post("/api/reservations", (req, res) =>
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
APP.post("/api/reservations/clear", (req, res) =>
{
    reservations = [];
    waitlist = [];

    res.status(204).end();
});

//Being the server and listen on given port.
APP.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));