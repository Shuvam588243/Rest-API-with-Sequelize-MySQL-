const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const UserRouter = require("./routes/userRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/Users", UserRouter);

require("./connection");
app.get("/", (req, res) => {
  res.json({ page: "Home Page" });
});

app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
