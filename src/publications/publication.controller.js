import Publication from "./publication.model.js";  
import Category from "../categories/category.model.js";
import Comment from "../comments/comment.model.js";

export const savePost = async (req, res) => {
    try {
        const { title, text, categoryName, user } = req.body;

        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "La categoría especificada no existe",
            });
        }

        const publication = new Publication({
            title,
            text,
            user,
            category: category._id,
        });

        await publication.save();

        res.status(201).json({
            success: true,
            message: "Publicación creada exitosamente",
            publication,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error,
        });
    }
};

export const listPosts = async (req, res) => {
    try {
        const posts = await Publication.find({ status: true })
            .populate("category", "name")
            .populate({ path: "comments", select: "comment user createdAt" });

        res.json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error,
        });
    }
};

export const listPostsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "La categoría especificada no existe",
            });
        }

        const posts = await Publication.find({ category: category._id, status: true })
            .populate("category", "name")
            .populate({ path: "comments", select: "comment user createdAt" });

        res.json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones por categoría",
            error,
        });
    }
};



export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, categoryName } = req.body;

        if (!title && !text && !categoryName) {
            return res.status(400).json({
                success: false,
                message: "Debes proporcionar al menos un campo para actualizar",
            });
        }

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada",
            });
        }

        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "La categoría especificada no existe",
                });
            }
            publication.category = category._id;
        }

        if (title) publication.title = title;
        if (text) publication.text = text;

        await publication.save();

        res.json({
            success: true,
            message: "Publicación actualizada exitosamente",
            publication,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error,
        });
    }
};

// Eliminar publicación (sin validación de dueño)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPublication = await Publication.findByIdAndDelete(id);

        if (!deletedPublication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publicación eliminada exitosamente",
            publicationId: id,
        });
    } catch (error) {
        console.error("Error al eliminar publicación:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: error.message,
        });
    }
};


export const addCommentToPost = async (req, res) => {
    try {
        const { id } = req.params; 
        const { comment, user } = req.body;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        const newComment = new Comment({
            comment,
            user
        });

        await newComment.save();

        publication.comments.push(newComment._id);
        await publication.save();

        res.status(201).json({
            success: true,
            message: "Comentario agregado exitosamente",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error
        });
    }
};
