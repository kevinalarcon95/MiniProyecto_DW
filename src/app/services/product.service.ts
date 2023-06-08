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
    this.product = product;
    return this.dataService.guardarProduct(this.product);
  }

  editarProducto(index:number,product: Product): Observable<any>{
    return this.dataService.editarProduct(index,product);
  }

  eliminarProducto(index:number): Observable<any>{
    return this.dataService.eliminarProducto(index);
  }
}
