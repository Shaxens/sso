const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const nanoid = require("nanoid");
const config = require("./config.js");

app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/login/oidc", (req, res) => {
  const state = nanoid.nanoid(15);

  res.cookie("state", state, { signed: true });
  console.log(state);

  // Construit l'url en mode dégeu pour des paramètres compréhensibles par l'app
  let query = new URLSearchParams({
    client_id: config.CLIENT_ID,
    redirect_uri: config.REDIRECT_URI,
    response_mode: "form_post",
    response_type: "code",
    scope: "openid",
    state,
  });

  res.render("login.ejs", {
    link_url: `${config.AUTH_ENDPOINT}?${query.toString()}`,
  });
});

app.post(config.REDIRECT_PATH, (req, res) => {
  console.log(req?.body);
  if (!req.signedCookies || !req.signedCookies.state) {
    throw new Error("Unable to find state");
  }
  if (!req.body.state) {
    throw new Error("No state in body");
  }
  if (req.body.state !== req.signedCookies.state) {
    throw new Error("States don't match!");
  }

  res.render("oidc_redirect.ejs", { body: req.body });
});

app.listen(config.CLIENT_PORT, () => {
  console.log(
    `Listening on port ${config.CLIENT_PORT}, check http://localhost:${config.CLIENT_PORT}`
  );
});
