const router = require("express").Router();
const passport = require("passport");
const uploader = require("../configs/cloudinary.config");

//const { ObjectId } = require("mongoose").Types;

const Product = require("../models/Product.model");
const User = require("../models/User.model");

//Rotas dos produtos:

//Read: 

router.get("/product", async (req, res) => {
  try {
    const result = await Product.find().populate("user");

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Details

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Product.findOne({ _id: id });

    console.log(result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
);

//Read somente para o perfil do usuário:

router.get("/product/:userId",
passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    req.body.user = req.params.userId;

    const result = await Product.find({user: req.user._id}).populate("user");

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Create:

router.post(
  "/product/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.body.user = req.params.userId;

      const resultProduct = await Product.create(req.body);
      
console.log(req.body)
      return res.status(201).json({ created: { resultProduct} });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  }
);

//Update:

router.patch(
  "/product/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      console.log(result);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);

//Rota upload de arquivo:

router.post("/media-upload", uploader.single("media"), (req, res) => {
  if (!req.file) {
    console.log("ARQUIVO")
    return res.status(500).json({ message: "Nenhum arquivo carregado!" });
  }
  console.log(req.file);
  return res.status(200).json({ media: req.file.secure_url });
});

//Delete:

router.delete(
  "/product/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Product.deleteOne({ _id: id });

      console.log(result);

      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
