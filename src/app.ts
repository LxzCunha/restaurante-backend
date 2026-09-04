import express from "express";
import { randomUUID } from "node:crypto";
import supabase from "./config/supabase.js";

const app = express();

app.use(express.json());

const idPizzaCategory = randomUUID();
const idDrinkCategory = randomUUID();
const idEntriesCategory = randomUUID();
const idDessertsCategory = randomUUID();

const categories = [
    { id: idEntriesCategory, name: "Entradas", description: "Pratos leves para começar a refeição" },
    { id: idPizzaCategory, name: "Pratos Principais", description: "Pratos principais do cardápio" },
    { id: idDessertsCategory, name: "Sobremesas", description: "Doces e sobremesas para finalizar a refeição" },
];

const products = [
    { id: randomUUID(), name: "Pizza Margherita", category_id: idPizzaCategory, price: 45.90, description: "Molho de tomate, mussarela, manjericão fresco e azeite" },
    { id: randomUUID(), name: "Pizza Calabresa", category_id: idPizzaCategory, price: 48.90, description: "Molho de tomate, mussarela, calabresa fatiada e cebola" },
    { id: randomUUID(), name: "Bruschetta", category_id: idEntriesCategory, price: 22.50, description: "Fatias de pão italiano tostado com tomate, alho e manjericão" },
    { id: randomUUID(), name: "Tiramisù", category_id: idDessertsCategory, price: 18.00, description: "Sobremesa italiana com café, mascarpone e cacau" },
];

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Vamos vamos meu verdão vamos nao para de lutar",
        version: "1.0.0",
    });
})

/*
CATEGORIAS
*/

app.get("/categories", (req, res) => {
    res.status(200).json(categories);
});

app.post("/categories", (req, res) => {
    const category = {
        id: randomUUID(),
        ...req.body,
    }

    categories.push(category);

    res.status(201).json(category);
});

app.get("/categories/:id", (req, res) => {
    const category = categories.find((category => {
        return category.id == req.params.id;
    }));

    if(!category) {
        return res.status(404).json({
            message: "Não foi possível encontrar a categoria."
        });
    }

    res.status(200).json(category);
});

app.put("/categories/:id", (req, res) => {
    const category = categories.find((category => {
        return category.id == req.params.id;
    }));

    if(!category) {
        return res.status(404).json({
            message: "Não foi possível encontrar a categoria."
        });
    }

    category.name = req.body.name;
    category.description = req.body.description;

    res.status(200).json(category);
});

app.delete("/categories/:id", (req, res) => {
    const category = categories.find((category => {
        return category.id == req.params.id;
    }));

    if(!category) {
        return res.status(404).json({
            message: "Não foi possível encontrar a categoria."
        });
    }

    const index = categories.indexOf(category);
    categories.splice(index, 1);
    res.status(200).json({
        message: "Categoria removida."
    });
});

/*

PRODUTOS

*/

app.get("/products", (req, res) => {
    res.status(200).json(products)
});

app.post("/products", (req, res) => {
    const product = {
        id: randomUUID(),
        ...req.body
    };
    products.push(product);

    res.status(201).json(product);
});

app.get("/products/:id", (req, res) => {
    const product = products.find((product => {
        return product.id == req.params.id;
    }));

    if(!product) {
        res.status(404).json({
            message: "Não foi possível encontrar o produto."
        })
    };

    res.status(200).json(product);
});

app.put("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product) {
        return res.status(404).json({
            message: "Não foi possível encontrar o produto."
        })
    };

    product.category_id = req.body.category_id;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    res.status(200).json(product);
})

app.delete("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product) {
        return res.status(404).json({
            message: "Não foi possível encontrar o produto."
        })
    };

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.status(200).json({
        message:"Produto excluído com sucesso."
    });
})

//SUPABASE


app.get("/test-supabase", async (req, res) => {
    const {data, error} = await supabase.
    from("categories")
    .select("*");
    
    if(error) {
        console.log("Erro ao consultar categorias supabase: ", error);

        return res.status(500).json({
            success:"false",
            message:"Erro ao consultar base de dados.",
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        message: "Conexão realizada com sucesso",
        data,
    });
});

export default app;