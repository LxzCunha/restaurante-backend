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
        const product = await Product.findById(req.params.id);
        console.log(product)
        res.status(200).json(product);
    } catch(error) {
        console.error("Erro ao buscar produto: ", error);
        res.status(500).json({
           message: "Erro ao buscar produto"
        })
    }
});

app.get("/products/search/:keyword", async(req, res) => {
    try {
        const products = await Product.searchByKeyword(req.params.keyword);

        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao pesquisar por categorias", error)

        res.status(500).json({
            message: "Erro ao pesquisar categoria."
        });
    }
});

app.post("/products", async (req, res) => {
    try {
        const products = await Product.create(req.body);
        console.log(products)
        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao criar produtos: ", error);
        res.status(500).json({
           message: "Erro ao criar produtos"
        })
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.update(req.params.id, req.body)
        console.log(product)
        res.status(200).json(product);
    } catch(error) {
        console.error("Erro ao atualizar produto: ", error);
        res.status(500).json({
           message: "Erro ao atualizar produto"
        })
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        await Product.remove(req.params.id)

        res.status(200).json({
            message: "Produto removida com sucesso."
        });
    } catch(error) {
        console.error("Erro ao remover produto: ", error);
        res.status(404).json({
           message: "Produto não encontrada"
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

app.get("/categories/search/:keyword", async(req, res) => {
    try {
        const categories = await Category.searchByKeyword(req.params.keyword);

        res.status(200).json(categories);
    } catch(error) {
        console.error("Erro ao pesquisar por categorias", error)

        res.status(500).json({
            message: "Erro ao pesquisar categoria."
        });
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

app.put("/categories/:id", async (req, res) => {
    try {
        const category = await Category.update(req.params.id, req.body)
        console.log(category)
        res.status(200).json(category);
    } catch(error) {
        console.error("Erro ao atualizar categoria: ", error);
        res.status(500).json({
           message: "Erro ao atualizar categoria"
        })
    }
});

app.delete("/categories/:id", async (req, res) => {
    try {
        await Category.remove(req.params.id)

        res.status(200).json({
            message: "Categoria removida com sucesso."
        });
    } catch(error) {
        console.error("Erro ao remover categoria: ", error);
        res.status(404).json({
           message: "Categoria não encontrada"
        })
    }
});


export default app;