const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const nanoid = require("nanoid");
const config = require("./config.js");

const AUTH_SERVER = `http://localhost:${config.PROVIDER_PORT}`;
const AUTH_ENDPOINT = `${AUTH_SERVER}/oidc/auth`;

app.use(cookieParser(config.COOKIE_SECRET));
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

  res.render("login.ejs", { link_url: `${AUTH_ENDPOINT}?${query.toString()}` });
});

app.listen(config.CLIENT_PORT, () => {
  console.log(
    `Listening on port ${config.CLIENT_PORT}, check http://localhost:${config.CLIENT_PORT}`
  );
});
