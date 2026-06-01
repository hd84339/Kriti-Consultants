const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true }
}, { _id: false });

const metricSchema = new mongoose.Schema({
  metric: { type: String, required: true },
  before: { type: String, required: true },
  after: { type: String, required: true }
}, { _id: false });

const blogContentSchema = new mongoose.Schema({
  intro: { type: String, required: true },
  sections: [sectionSchema],
  quote: { type: String },
  takeaways: [{ type: String }],
  metrics: [metricSchema]
}, { _id: false });

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    slug: {
      type: String,
      required: [true, "Please add a slug"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    readTime: {
      type: String,
      required: [true, "Please add read time"],
      default: "5 min read",
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
    },
    image: {
      type: String, // String path or URL
      required: true,
    },
    tags: [{ type: String }],
    desc: {
      type: String,
      required: [true, "Please add a description"],
    },
    content: blogContentSchema
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
