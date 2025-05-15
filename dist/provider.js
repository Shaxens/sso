import express from "express";
import { Provider } from "oidc-provider";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const provider = new Provider("http://localhost:3000", {
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
// Montez le provider OIDC sur le chemin /oidc
app.use("/oidc", provider.callback());
app.listen(port, () => {
    console.log(`Serveur OIDC démarré sur http://localhost:${port}`);
    console.log(`Configuration OpenID disponible à http://localhost:${port}/oidc/.well-known/openid-configuration`);
});
//# sourceMappingURL=provider.js.map