const CLIENT_PORT = 8080;
const PROVIDER_PORT = 3000;

const config = {
  CLIENT_PORT: CLIENT_PORT,
  PROVIDER_PORT: PROVIDER_PORT,
  COOKIE_SECRET: "SUPER_COOKIE_SECRET",
  CLIENT_ID: "foo",
  CLIENT_SERVER: "bar",
  CLIENT_SECRET: "bar",
  REDIRECT_URI: `http://localhost:${CLIENT_PORT}/oidc_redirect`,
};

module.exports = config;
