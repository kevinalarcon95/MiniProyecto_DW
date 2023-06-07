export class Product{
  constructor(public nombre:string, public precio:number, public proveedor:string,public fechaCreacion: Date){}

  toString(): string {
    return this.nombre + " " + this.precio + " " + this.fechaCreacion;
}
}
