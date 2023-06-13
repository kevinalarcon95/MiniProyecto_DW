import { Product } from "./product.model";

export class Productos{
    constructor(public productos: Product, public cantidad: number, public estado: boolean) {
    }
}