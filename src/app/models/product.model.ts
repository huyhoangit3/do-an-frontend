export interface Product {
    id?: number,
    categoryId?: number,
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
    modifiedAt?: Date
}