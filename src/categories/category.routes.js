import { Router } from "express";
import { check } from "express-validator";
import { createCategory, updateCategory, listCategories, deleteCategory,} from "./category.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteCategory } from "../helpers/db-validator.js";

const router = Router();

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existenteCategory),
    validarCampos,
  ],
  updateCategory
);

router.get(
    "/", listCategories);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existenteCategory),
    validarCampos,
  ],
  deleteCategory
);



export default router;

