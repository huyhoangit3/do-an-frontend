import { Category } from "./category.model";

export interface Product {
    id?: number,
    name: string,
    producer: string,
    weight: number,
    fragrant?: string,
    price: number,
    quantity: number,
    quality: string,
    sold?: number,
    description: string,
    imgUrl: string,
    createAt?: Date,
    modifiedAt?: Date,
    category: Category
}