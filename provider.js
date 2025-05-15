const express = require("express");
const oidc = require("oidc-provider");
const app = express();
const port = 3000;

const client_id = "foo";
const client_secret = "bar";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const provider = new oidc.Provider(`http://localhost:${port}`, {
  clients: [
    {
      client_id,
      client_secret,
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: [`http://localhost:${port}/oidc_redirect`],
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

app.listen(port, () => {
  console.log(
    `oidc-provider listening on port ${port}, check http://localhost:${port}/oidc/.well-known/openid-configuration`
  );
});
