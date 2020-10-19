const router = require("express").Router();
const passport = require("passport");
const uploader = require("../configs/cloudinary.config");


const Cart = require("../models/Cart.model");

router.get("/cart", async (req, res) => {
    try {
        const Carts = await Cart.find().populate({
            //onde irá popular???
        })
    } catch (err) {
     return res.status(500).json({error: err});
        
        
    }
});


// aqui é um post ou updante?
router.post("/product/:userId",

async (req, res) => {
    try {
        req.body.user = req.params.userId;
        const //"criar" um produto no carrinho

        const // dar um update nos items do carrinh?
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}
)