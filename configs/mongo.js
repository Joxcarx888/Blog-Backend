'use strict';

import mongoose from "mongoose";
import Category from "../src/categories/category.model.js"; 

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('Could not connect to MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('Trying to connect...');
        });

        mongoose.connection.on('connected', async () => {
            console.log('Connected to MongoDB');

            try {
                const defaultCategory = await Category.findOne({ name: "default" });
                if (!defaultCategory) {
                    await Category.create({ name: "default" });
                    console.log("Categoría 'default' creada");
                } else {
                    console.log("Categoría 'default' ya existe");
                }

            } catch (error) {
                console.error("Error al verificar/crear categoría:", error);
            }

            try {
                const tallerCategory = await Category.findOne({ name: "Taller" });
                if (!tallerCategory) {
                    await Category.create({ name: "Taller" });
                    console.log("Categoría 'Taller' creada");
                } else {
                    console.log("Categoría 'Taller' ya existe");
                }

            } catch (error) {
                console.error("Error al verificar/crear categoría:", error);
            }

            try {
                const TecnologiaCategory = await Category.findOne({ name: "Tecnologia" });
                if (!TecnologiaCategory) {
                    await Category.create({ name: "Tecnologia" });
                    console.log("Categoría 'Tecnologia' creada");
                } else {
                    console.log("Categoría 'Tecnologia' ya existe");
                }

            } catch (error) {
                console.error("Error al verificar/crear categoría:", error);
            }

            try {
                const PracticaSupervisada = await Category.findOne({ name: "PracticaSupervisada" });
                if (!PracticaSupervisada) {
                    await Category.create({ name: "PracticaSupervisada" });
                    console.log("Categoría 'PracticaSupervisada' creada");
                } else {
                    console.log("Categoría 'PracticaSupervisada' ya existe");
                }

            } catch (error) {
                console.error("Error al verificar/crear categoría:", error);
            }
        });

        mongoose.connection.on('open', () => {
            console.log('Database connection open');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected to MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

    } catch (error) {
        console.log('Database connection failed:', error);
    }
};
