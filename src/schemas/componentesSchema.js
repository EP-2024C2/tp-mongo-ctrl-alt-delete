const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const componentesSchema = new mongoose.Schema(
  {
    nombre: {
      type: Schema.Types.String,
      required: true,
    },
    descripcion:{
      type: Schema.Types.String,
      required: false,
    },
  },
  {
    collection: "componente",
  }
);

componentesSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v;
    delete ret._id;
  },
});

module.exports = componentesSchema;
