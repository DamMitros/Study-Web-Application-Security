const express = require("express"); 
const {NodeAdapter} = require("ef-keycloak-connect");
const config = require("./keycloak.json");
const keycloak = new NodeAdapter(config);
const app = express();

app.use(keycloak.middleware());

app.get("/", function (req, res) {
  res.send("Server is running");
});

app.get("/hello", keycloak.protect(), function (req, res) {
  res.json({ message: "You've successfully accessed the protected resource!" });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
