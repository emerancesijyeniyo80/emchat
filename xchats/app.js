const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
global.__basedir = __dirname;
// middleware of packages
app.use(morgan("dev"));
// work with body-parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());
//checking all incaming request
app.use("/xcapi/public", express.static("./public"));

app.use("/xcapi/users", require("./routers/users"));
app.use("/xcapi/auth", require("./routers/auth"));
app.use("/xcapi/chats", require("./routers/chats"));

app.get("/xcapi/", (req, res) => res.send("App is running"));

// Handling request
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🖥️  Server started 🚀 on port ${PORT}`);
});
