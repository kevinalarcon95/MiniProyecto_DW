export class Provider{
  constructor(public nombre:string,public fechaCreacion: Date){}

  toString(): string {
    return this.nombre + " " + this.fechaCreacion;
  }
}
