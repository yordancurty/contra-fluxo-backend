const {Schema, model} = require("mongoose");

const ProductSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        specifications: String,
        evaluation: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        artType: { type: String, enum: ["Artes Literárias", "Audiovisual", "Artes Visuais", "Artesanato"] },
        media: String
    }
);

module.exports = model("Product", ProductSchema);

//MEDIAS- IMAGENS OU VIDEOS