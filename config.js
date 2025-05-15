const CLIENT_PORT = 8080;
const PROVIDER_PORT = 3000;
const BASE_URL = `http://localhost:${CLIENT_PORT}`;
const AUTH_SERVER = `http://localhost:${PROVIDER_PORT}`;

let config = {
  CLIENT_PORT: CLIENT_PORT,
  PROVIDER_PORT: PROVIDER_PORT,
  COOKIE_SECRET: "SUPER_COOKIE_SECRET",
  CLIENT_ID: "foo",
  CLIENT_SERVER: "bar",
  CLIENT_SECRET: "bar",
  REDIRECT_PATH: "/oidc_redirect",
  REDIRECT_URI: `${BASE_URL}/oidc_redirect`,
  AUTH_ENDPOINT: `${AUTH_SERVER}/oidc/auth`,
};

module.exports = config;
