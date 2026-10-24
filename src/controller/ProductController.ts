import type { Request, Response } from "express";
import ProductRepository from "../repository/ProductRepository.js";
import { Product } from "../models/Product.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function getAll(req: Request, res: Response) {
    try {
        const products = await ProductRepository.findAll();

        res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos: ", error);

        res.status(500).json({
            message: "Erro ao buscar produtos.",
        });
    }
}

async function getByKeyword(req: Request<{ keyword: string }>, res: Response) {
    const { keyword } = req.params;

    if (!keyword || typeof keyword != "string") {
        res.status(400).json({
            message: "Palavra-chave não informada."
        })
    }

    try {
        const products = await ProductRepository.searchByKeyword(keyword);

        res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao pesquisar por produto: ", error);

        res.status(500).json({
            message: "Erro ao pesquisar produto.",
        });
    }
}

async function getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({
            message: "ID do produto não informado."
        })
    }

    try {
        const product = await ProductRepository.findById(id);

        res.status(200).json({
            id: product.getId(),
            title: product.getTitle(),
            category_id: product.getCategoryId(),
            description: product.getDescription(),
            price: product.getPrice(),
            image: product.getImage(),
            avaible: product.isAvaible(),
            active: product.isActive(),
        });
    } catch (error) {
        console.error("Erro ao buscar produto: ", error);

        if(error instanceof NotFoundError) {
            res.status(404).json({
                message: error.message
            });
        }
    }
}

async function create(req: Request, res: Response) {
    const { title, category_id, price, description, image } = req.body;

    try {
        const product = new Product(title, category_id, price, description, image);
        const createdProduct = await ProductRepository.create(product);

        res.status(200).json(createdProduct);
    } catch (error) {
        console.error("Erro ao criar produto: ", error);

        if(error instanceof ValidationError) {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Erro ao criar produto.",
        });
    }
}

async function update(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const { title, category_id, description, price, avaible, image, active } = req.body;

    if (!id) {
        res.status(404).json({
            message: "ID do produto não informado."
        })
    }

    try {
        const product = await ProductRepository.findById(id);

        if(title != undefined) {
            product.rename(title);
        }

        if(category_id != undefined) {
            product.changeCategory(category_id);
        }

        if(description != undefined) {
            product.changeDescription(description);
        }

        if(price != undefined) {
            product.changePrice(price);
        }

        if(image != undefined) {
            product.changeImage(image);
        }

        if(active == true) {
            product.activate;
        }

        if(active == false) {
            product.deactivate;
        }

        if(avaible == true) {
            product.turnAvaible;
        }

        if(avaible == false) {
            product.notAvaible;
        }

        const updatedProduct = await ProductRepository.update(product);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Erro ao atualizar produto: ", error);

        if(error instanceof ValidationError) {
            return res.status(400).json({
                message: error.message
            });
        }

        if(error instanceof NotFoundError) {
            res.status(404).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Erro interno ao atualizar produto.",
        });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({
            message: "ID do produto não informado."
        })
    }

    try {
        await ProductRepository.remove(id);

        res.status(200).json({
            message: "Produto removido com sucesso.",
        });
    } catch (error) {
        console.error("Erro ao remover produto: ", error);

        if(error instanceof NotFoundError) {
            res.status(404).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Erro interno ao remover produto.",
        });
    }
}

export default {
    getAll,
    getById,
    getByKeyword,
    create,
    update,
    remove
}
