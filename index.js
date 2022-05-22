// importing express
const express = require("express");
// choosing port number
const port = 8000;

// require MongoDB
const db = require("./config/mongoose");
const Notes = require("./models/notes");

// initializing express
const app = express();

//middleware
app.use(express.urlencoded());

// local note list
var notes = [
  {
    heading: "Important Work",
    description: "sdfsdfdsfdsf",
    category: "School",
    date: "May 7, 2022 4:35 AM",
    tag: "success",
  },
];

// setting the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// setting up static file
app.use(express.static("assets"));

app.get("/", function (req, res) {
  Notes.find({}, function (err, notes) {
    if (err) {
      console.log("Error in fetching Notes from db");
      return;
    }
    return res.render("home", {
      title: "📝 ToDo App",
      note_list: notes,
    });
  });
});

// post the form data
app.post("/create-task-list", function (req, res) {
  let tag;
  if (req.body.category == "Grocery") {
    tag = "info";
  } else if (req.body.category == "Work") {
    tag = "primary";
  } else {
    tag = "success";
  }
  let now = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let createdOn = `${month} ${date} ,${year}`;

  Notes.create(
    {
      heading: req.body.heading,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      createdOn: createdOn,
      tag: tag,
    },
    function (err, newNote) {
      if (err) {
        console.log("Error in creating a Note!");
        return;
      }
      console.log("******", newNote);
      return res.redirect("/");
    }
  );
});

// delete note list element
app.get("/delete-note", function (req, res) {
  // get the id from query in the url
  let id = req.query.id;

  // find the note in the database using id and delete
  Notes.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in delteting the contact from database: " + err);
      return;
    }
    return res.redirect("back");
  });
});

// catching errors while running express server
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Server is running on port: ", port);
});
