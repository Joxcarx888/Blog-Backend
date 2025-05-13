import { Router } from "express";
import { check } from "express-validator";
import { savePost, updatePost, listPosts, listPostsByCategory, deletePost, addCommentToPost, getPostByIdWithComments } from "./publication.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existentePublication } from "../helpers/db-validator.js";

const router = Router();

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("text", "El texto es obligatorio").not().isEmpty(),
    check("categoryName", "El nombre de la categoría es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  savePost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existentePublication),
    validarCampos,
  ],
  updatePost
);

router.get("/", 
    listPosts
);

router.get(
  "/:categoryName",
  listPostsByCategory
);

router.get(
  '/details/:id',
  getPostByIdWithComments
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existentePublication),
    validarCampos,
  ],
  deletePost
);

router.post(
  "/addcomment/:id", 
  addCommentToPost
);


export default router;
