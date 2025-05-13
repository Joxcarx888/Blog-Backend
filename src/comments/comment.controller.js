import Comment from "./comment.model.js";

export const saveComment = async (req, res) => {
    try {
        const { comment, user } = req.body;

        const newComment = new Comment({
            comment,
            user
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            message: "Comentario guardado exitosamente",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al guardar el comentario",
            error
        });
    }
};

export const listarCommentsUsuario = async (req, res) => {
    try {
        const comments = await Comment.find();

        res.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al obtener los comentarios",
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comentario no encontrado",
            });
        }

        await Comment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Comentario eliminado exitosamente",
        });

    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar comentario",
            error: error.message
        });
    }
};

export const editarComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comentario no encontrado",
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            success: true,
            msg: "Comentario actualizado exitosamente",
            comment: updatedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el comentario",
        });
    }
};
