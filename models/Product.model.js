const {Schema, model} = require("mongoose");

const ProductSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        specifications: String,
        evaluation: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        artType: { type: String, required: true, default: "Artes Literárias", enum: ["Artes Literárias", "Audiovisual", "Artes Visuais", "Artesanato"] },
        subCategory: {required: true, type: String, default: "HQ", enum: ["HQ", "Romance", "Poesia", "Biografia", "Fantasia", "Ficção", "Documentario", "Filmes", "Curtas", "Animação", "Pintura", "Escultura", "Desenho", "Macramê", "Crochet", "Tricot", "Cerâmica"] },
        mediaUrl: String
    }
);

module.exports = model("Product", ProductSchema);

//MEDIAS- IMAGENS OU VIDEOS