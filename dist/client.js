import express from "express";
const oidc = require("oidc-provider");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const client = new oidc.Client("http://localhost:3000", {
    // refer to the documentation for other available configuration
    clients: [
        {
            client_id: "foo",
            client_secret: "bar",
            redirect_uris: ["http://localhost:8080"],
            // ... other client properties
        },
    ],
});
const server = oidc.listen(3000, () => {
    console.log("oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration");
});
//# sourceMappingURL=client.js.map