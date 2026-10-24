import supabase from "../config/supabase.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { Product } from "../models/Product.js";

async function findAll() {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        throw error;
    }

    return data;
}

async function findById(id: string): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    if(!data) {
        throw new NotFoundError("Produto não encontrado.");
    }

    return Product.restore(
        data.id,
        data.title,
        data.category_id,
        data.price,
        data.active,
        data.avaible,
        data.description,
        data.image
    );
}

async function create(product: Product) {
    const { data, error } = await supabase
        .from("products")
        .insert({
            title: product.getTitle(),
            category_id: product.getCategoryId(),
            description: product.getDescription(),
            price: product.getPrice(),
            image: product.getImage(),
            avaible: product.isAvaible(),
            active: product.isActive(),
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

async function update(product: Product) {
    const id = product.getId();

    if (!id) {
        throw new Error("Produto sem ID não pode ser atualizado.")
    }

    const { data, error } = await supabase
        .from("products")
        .update({
            title: product.getTitle(),
            category_id: product.getCategoryId(),
            description: product.getDescription(),
            price: product.getPrice(),
            image: product.getImage(),
            avaible: product.isAvaible(),
            active: product.isActive(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    if(!data) {
        throw new NotFoundError("Produto não encontrado.");
    }

    return data;
}

async function searchByKeyword(keyword: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);

    if (error) {
        throw error;
    }

    return data;
}

export default {
    findAll,
    findById,
    create,
    update,
    remove,
    searchByKeyword
}
