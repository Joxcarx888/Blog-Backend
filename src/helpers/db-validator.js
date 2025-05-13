import Category from '../categories/category.model.js';
import Comment from '../comments/comment.model.js';
import Publication from '../publications/publication.model.js';

export const existenteCategory = async (name = '') => {
    const existenteCategory = await Category.findOne({ name });

    if (existenteCategory) {
        throw new Error(`${name} ya existe en la base de datos`);
    }
};

export const existeCommentById = async (id = '') => {
    const existeComment = await Comment.findById(id);

    if (!existeComment) {
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
};

export const existentePublication = async (id = '') => {
    const existentePublication = await Publication.findById(id);

    if (!existentePublication) {
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
};
