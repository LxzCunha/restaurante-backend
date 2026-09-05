import express from "express";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
const app = express();

app.use(express.json());


app.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log(products)
        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao buscar produtos: ", error);
        res.status(500).json({
           message: "Erro ao buscar produtos"
        })
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findAll();
        console.log(product)
        res.status(200).json(product);
    } catch(error) {
        console.error("Erro ao buscar produto: ", error);
        res.status(500).json({
           message: "Erro ao buscar produto"
        })
    }
});

///////////////////CATEGORIAS


app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll()
        console.log(categories)
        res.status(200).json(categories);
    } catch(error) {
        console.error("Erro ao buscar categorias: ", error);
        res.status(500).json({
           message: "Erro ao buscar categorias"
        })
    }
});

app.get("/categories/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        console.log(category)
        res.status(200).json(category);
    } catch(error) {
        console.error("Erro ao buscar categoria: ", error);
        res.status(500).json({
           message: "Erro ao buscar categoria"
        })
    }
});

app.post("/categories", async(req, res) => {
    try {
        const category = await Category.create(req.body) 

        res.status(200).json(category);
    } catch(error) {
        console.error("Erro ao criar categoria: ", error)

        res.status(500).json({
            message: "Não foi possível criar a categoria"
        })
    }
})

export default app;