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
