import { describe, it, expect } from "vitest";
import { Category } from "../models/Category.js";

describe("Category - Testes Unitários", () => {
    it("deve criar uma categoria válida", () => {
        const name = "Pizzas";
        const display_order = 1;
        const description = "Categoria de Pizzas";
        const icon = "";

        const category = new Category(
            name,
            display_order,
            description,
            icon
        );

        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.getDescription()).toBe("Categoria de Pizzas");
        expect(category.getIcon()).toBe("");
        expect(category.isActive()).toBe(true);
        expect(category.getId()).toBeUndefined();
    });

    it("Não deve permitir criar uma categoria com nome vazio", () => {
        const name = "";
        const display_order = 1;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.")
    });

    it("Não deve permitir ordem de exibição negativa", () => {
        const name = "Pizzas";
        const display_order = -1;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("A ordem de exibição deve ser um número inteiro positivo.")
    });

    it("Deve remover espaços antes e depois do nome da categoria.", () => {
        const name = "       Pizzas.     ";
        const display_order = 1;

        const category = new Category(name, display_order);

        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.")
    });

    it("Não deve permitir uma categoria que on nome seja apenas espaços.", () => {
        const name = "   ";
        const display_order = 1;

        const category = new Category(name, display_order);

        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.")
    });

    it("Não deve permitir ordem de exibição decimal", () => {
        const name = "Pizzas";
        const display_order = 1.5;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("A ordem de exibição deve ser um número inteiro positivo.")
    });

    it("deve permitir ordem de exibição igual a zero.", () => {
        const name = "Pizzas";
        const display_order = 0;
        const category = new Category(name, display_order);

        expect(category.getDisplayOrder()).toBe(0)
    })

    it("deve permitir renomear uma categoria existente,", () => {
        const category = new Category("pizzas", 1);

        category.rename("Bebidas");
        
        expect(category.getName()).toBe("Bebidas");
    });

    it("deve preservar o nome original após uma tentativa inválida de renomeação", () => {
        const category = new Category("Pizzas", 1);

        expect(() => {
            category.rename("");
        }).toThrow("O nome da categoria é obrigatório.");

        expect(category.getName()).toBe("Pizzas");
    });

    it("deve permitir desativar e reativar uma categoria", () => {
        const category = new Category("Pizzas", 1);

        category.deactivate();
        expect(category.isActive()).toBe(false);

        category.activate();
        expect(category.isActive()).toBe(true);
    });

    it("deve restaurar uma categoria existente", () => {
        const id = "44a0e5ca-e014-425b-bbd5-fd01a77b46b7";
        const name = "Pizzas";
        const display_order = 1;
        const active = false;
        const description = "Categoria de Pizzas";
        const icon = "";

        const category = Category.restore(
            id,
            name,
            display_order,
            active,
            description,
            icon
        );

        expect(category.getId()).toBe(id);
        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.getDescription()).toBe("Categoria de Pizzas");
        expect(category.getIcon()).toBe("");
        expect(category.isActive()).toBe(true);
    });

    
})