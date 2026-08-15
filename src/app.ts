import express from "express";

const app = express();

const categorias = [
    { id: 1, name: "Entradas", description: "Pratos leves para começar a refeição" },
    { id: 2, name: "Pratos Principais", description: "Pratos principais do cardápio" },
    { id: 3, name: "Sobremesas", description: "Doces e sobremesas para finalizar a refeição" },
];

const produtos = [
    { id: 1, name: "Pizza Margherita", category_id: 2, price: 45.90, description: "Molho de tomate, mussarela, manjericão fresco e azeite" },
    { id: 2, name: "Pizza Calabresa", category_id: 2, price: 48.90, description: "Molho de tomate, mussarela, calabresa fatiada e cebola" },
    { id: 3, name: "Bruschetta", category_id: 1, price: 22.50, description: "Fatias de pão italiano tostado com tomate, alho e manjericão" },
    { id: 4, name: "Tiramisù", category_id: 3, price: 18.00, description: "Sobremesa italiana com café, mascarpone e cacau" },
];

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Vamos vamos meu verdão vamos nao para de lutar",
        version: "1.0.0",
    });
})

app.get("/categorias", (req, res) => {
    res.status(200).json(categorias);
})

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos)
});

export default app;