const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const fabricantesSchema = new mongoose.Schema(
  {
    nombre: {
      type: Schema.Types.String,
      required: true,
    },
    direccion:{
        type: Schema.Types.String,
        required: true,
    },
    numeroContacto:{
        type: Schema.Types.String,
        required: true,
    },
    pathImgPerfil:{
        type: Schema.Types.String,
        required: false,
    }
  },
  {
    collection: "fabricantes",
  }
);

fabricantesSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v;
    delete ret._id;
  },
});

const Fabricante = mongoose.model("Fabricante", fabricantesSchema);
module.exports = Fabricante;
