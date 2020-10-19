require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors({ origin: process.env.CORS}));

const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");

const path = require('path');

require("./configs/db.config");

require("./configs/passport.config")(app);




app.use(express.static(path.join(__dirname, 'public')));


app.get("*", (req, res, next) => {
    const hostUrl = req.originalUrl;
    if (!hostUrl.includes("/api")) {
      console.log(hostUrl);
      return res.sendFile(path.join(publicPath, "index.html"));
    }
    return next();
  });

app.use("/api", productRouter);
app.use("/api", authRouter);

app.listen(process.env.PORT, () => console.log(`running at ${process.env.PORT}`));
