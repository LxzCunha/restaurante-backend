import express from "express";
import { randomUUID } from "node:crypto";

const app = express();

app.use(express.json());

const idCategoriasPizza = randomUUID();
const idCategoriasBebidas = randomUUID();
const idCategoriasEntradas = randomUUID();
const idCategoriasSobremesas = randomUUID();

const categorias = [
    { id: idCategoriasEntradas, name: "Entradas", description: "Pratos leves para começar a refeição" },
    { id: idCategoriasPizza, name: "Pratos Principais", description: "Pratos principais do cardápio" },
    { id: idCategoriasSobremesas, name: "Sobremesas", description: "Doces e sobremesas para finalizar a refeição" },
];

const produtos = [
    { id: randomUUID(), name: "Pizza Margherita", category_id: idCategoriasPizza, price: 45.90, description: "Molho de tomate, mussarela, manjericão fresco e azeite" },
    { id: randomUUID(), name: "Pizza Calabresa", category_id: idCategoriasPizza, price: 48.90, description: "Molho de tomate, mussarela, calabresa fatiada e cebola" },
    { id: randomUUID(), name: "Bruschetta", category_id: idCategoriasEntradas, price: 22.50, description: "Fatias de pão italiano tostado com tomate, alho e manjericão" },
    { id: randomUUID(), name: "Tiramisù", category_id: idCategoriasSobremesas, price: 18.00, description: "Sobremesa italiana com café, mascarpone e cacau" },
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

app.get("/categorias", (req, res) => {
    res.status(200).json(categorias);
});

app.post("/categorias", (req, res) => {
    const categoria = {
        id: randomUUID(),
        ...req.body,
    }

    categorias.push(categoria);

    res.status(201).json(categoria);
});

app.get("/categorias/:id", (req, res) => {
    const categoria = categorias.find((categoria => {
        return categoria.id == req.params.id;
    }));

    if(!categoria) {
        return res.status(404).json({
            message: "Não foi possível encontrar a categoria."
        });
    }

    res.status(200).json(categoria);
});


/*

PRODUTOS

*/

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos)
});

app.post("/produtos", (req, res) => {
    const produto = req.body;
    produtos.push(produto);

    res.status(201).json(produto);
});

app.get("/produtos/:id", (req, res) => {
    const produto = produtos.find((produto => {
        return produto.id == req.params.id;
    }));

    if(!produto) {
        res.status(404).json({
            message: "Não foi possível encontrar o produto."
        })
    };

    res.status(200).json(produto);
})

export default app;