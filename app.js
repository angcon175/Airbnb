const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My villa",
//     description: "This is my home",
//     price: 10000,
//     Location: "Barishal",
//     country: "Bangladesh",
//   });
//   await sampleListing.save();
//   console.log("Sample save");
//   res.send("Successful");
// });

app.listen(8080, () => {
  console.log("Server is working");
});

app.get("/", (req, res) => {
  res.send("Hi I am root");
});

//Index
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

//New route(Form)
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//Show
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

//Create
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body);
  await newListing.save();
  res.redirect("/listings");
});

//Edit
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

//Update
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body });
  res.redirect("/listings");
});
