import { Injectable } from '@angular/core';
import { Carrito } from '../model/carrito.model';
import { DataServices } from '../data.services';
import { Observable } from 'rxjs';
import { Productos } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private listaCompras: Carrito[] = [];

  constructor(private dataService: DataServices) { }

  guardarListaCompras(productos: Productos[], email: string): Observable<any>{
    return this.dataService.guardarListaCompras(productos,email);
  }

  obtenerListaCompras(email: string): Observable<Productos[]>{
    return this.dataService.cargarListaCompras(email);
  }
}
