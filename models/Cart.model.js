const {Schema, model} = require("mongoose");

const ItemSchema = new Schema(
    {
        productId:{
            type: Schema.Types.IbjectId, ref: "Product" //Nosso produto tem um ID?
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantidade não pode ser menor que 1.']
        },
        price: {
            type: Number,
            required: true
        },
        total:{
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    })

    const CartSchema = new Schema({
        items: [ItemSchema],
        subTotal: {
            default: 0,
            type: Number
        }
    }, {
        timestamps: true
    })

    modulo.exports = modedel("Cart", CartSchema)