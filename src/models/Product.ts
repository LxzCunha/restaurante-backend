import { ValidationError } from "../errors/ValidationError.js";

export class Product {
    private id?: string | undefined;
    private category_id: string;
    private title: string;
    private description: string | undefined;
    private price: number;
    private image: string | undefined;
    private avaible: boolean;
    private active: boolean;

    constructor(title: string, category_id: string, price: number, description?: string, image?: string) {
        this.id = undefined;
        this.category_id = "";
        this.title = "";
        this.description = description;
        this.price = 0;
        this.image = image;
        this.avaible = true;
        this.active = true;

        this.rename(title);
        this.changeCategory(category_id);
        this.changePrice(price);
    }

    static restore(id: string, title: string, category_id: string, price: number, active: boolean, avaible: boolean, description: string, image: string): Product {
        const product = new Product(title, category_id, price, description, image);

        product.id = id;
        product.active = active;
        product.avaible = avaible;

        return product;
    }

    public getId(): string | undefined {
        return this.id;
    }
    public getTitle(): string {
        return this.title;
    }
    public getDescription(): string | undefined {
        return this.description;
    }
    public getCategoryId(): string {
        return this.category_id;
    }
    public getPrice(): number {
        return this.price;
    }
    public getImage(): string | undefined {
        return this.image;
    }
    public isAvaible(): boolean {
        return this.avaible;
    }
    public isActive(): boolean {
        return this.active;
    }

    rename(title: string): void {
        if(typeof(title) != 'string' || title.trim().length == 0) {
            throw new ValidationError("O nome do produto é obrigatório.");
        }
        this.title = title.trim();
    }
    changeCategory(category_id: string): void {
        if(typeof(category_id) != 'string' || category_id.trim().length == 0) {
            throw new ValidationError("A categoria do produto é obrigatória.");
        }
        this.category_id = category_id;
    }
    changeDescription(description: string): void {
        this.description = description;
    }
    changeImage(image: string): void {
        this.image = image;
    }
    changePrice(price: number): void {
        if(!Number.isFinite(price) || price < 0) {
            throw new ValidationError("O preço do produto deve ser um número positivo.");
        }
        this.price = price;
    }

    activate(): void {
        this.active = true;
    }
    deactivate(): void {
        this.active = false;
    }

    turnAvaible(): void {
        this.avaible = true;
    }
    notAvaible(): void {
        this.avaible = false;
    }
}
