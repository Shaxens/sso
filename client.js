const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const nanoid = require("nanoid");

const PORT = 8080;

const COOKIE_SECRET = "SUPER_COOKIE_SECRET";

app.use(cookieParser(COOKIE_SECRET));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/login/oidc", (req, res) => {
  const state = nanoid.nanoid(15);

  res.cookie("state", state, { signed: true });
  console.log(state);

  res.render("login.ejs", { linkUrl: "" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}, check http://localhost:${PORT}`);
});
