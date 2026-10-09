import express from "express";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

///////////////////PRODUTOS

app.use("/products", productRoutes);

///////////////////CATEGORIAS


app.use("/categories", categoryRoutes);


export default app;