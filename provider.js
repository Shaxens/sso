const express = require("express");
const oidc = require("oidc-provider");
const app = express();
const config = require("./config");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const provider = new oidc.Provider(`http://localhost:${config.PROVIDER_PORT}`, {
  clients: [
    {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: [config.REDIRECT_URI],
      response_types: ["code"],
    },
  ],
  pkce: {
    required: () => false,
  },
  async findAccount(ctx, id) {
    return {
      accountId: id,
      async claims(use, scope) {
        return {
          sub: id,
          name: "myUser",
        };
      },
    };
  },
  clientBasedCORS: () => true,
});

app.use("/oidc", provider.callback());

app.listen(config.PROVIDER_PORT, () => {
  console.log(
    `oidc-provider listening on port ${config.PROVIDER_PORT}, check http://localhost:${config.PROVIDER_PORT}/oidc/.well-known/openid-configuration`
  );
});
