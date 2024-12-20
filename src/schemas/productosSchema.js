const mongoose = require("../db/mongo.db").mongoose;
const Componente = require("./componentesSchema")
const { Schema } = require("mongoose");
const productosSchema = new mongoose.Schema(
  {
    nombre: {
      type: Schema.Types.String,
      required: true,
    },
    descripcion:{
      type: Schema.Types.String,
      required: false,
    },
    precio:{
      type: Schema.Types.Number,
      required: true,
    },
    pathImg:{
      type: Schema.Types.String,
      required: false,
    },
    fabricantes: [{
      type: Schema.Types.ObjectId,
      ref: 'Fabricante',
      required: true
    }],
    componentes: [Componente]
  },
  {
    collection: "producto",
  }
);

productosSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v;
  },
});

const Producto = mongoose.model("Producto", productosSchema);
module.exports = Producto;
