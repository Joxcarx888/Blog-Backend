import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "El comentario es requerido"],
      maxLength: [500, "No más de 500 caracteres"],
      minLength: [3, "Mínimo 3 caracteres"],
      trim: true,
    },
    user: {
      type: String,
      required: [true, "El nombre del usuario es requerido"],
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

export default model("Comment", CommentSchema);
