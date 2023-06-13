import { Product } from "./product.model";

export class Carrito{
    constructor(public producto: Product,public cantidad: number) {
    }
}