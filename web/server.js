const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();
const distPath = path.resolve(__dirname, "build");
const sixtyDaysInSeconds = 5184000;

app.use(
  helmet({
    maxAge: sixtyDaysInSeconds
  })
);
app.use(morgan("tiny"));
app.use(express.static(distPath));
app.use((req, res) => {
  return res.sendFile(`${path.resolve(__dirname, "build")}/index.html`);
});

app.listen(process.env.SERVER_PORT || 8080, function() {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
