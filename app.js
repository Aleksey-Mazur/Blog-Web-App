const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const port = 3000;

const homeStartingContent =
  "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania); gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes.";
const aboutContent =
  "We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the UK and around the world.";
const contactContent =
  "To contact the BBC Press Office please call 020-7765 5900 (for corporate and out-of-hours queries) or email press.office@bbc.co.uk";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
