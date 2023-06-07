import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Injectable } from '@angular/core';
import { DataServices } from '../data.services';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product[] = [];

  constructor(private dataService: DataServices) { }

  //Lo usamos para iniciar el arreglo, ya que es asincrono desde la BD
    //Se inicializa desde el compoente PersonasComponent
    setProduct(product: Product[]){
      this.product = product;
  }

  obtenerProduct(): Observable<Product[]>{
    return this.dataService.cargarProduct();
  }

  agregarProduct(product: Product[]): Observable<any>{
    // console.log("agregamos product: " + product.toString());
    // if(this.product == null){
    //   this.product = [];
    // }
    this.product = product;
    return this.dataService.guardarProduct(this.product);
  }

  editarProducto(index:number,product: Product): Observable<any>{
    //TODO: Hacer
    //let producto = this.product[index];

    return this.dataService.editarProduct(index,product);
  }

}
