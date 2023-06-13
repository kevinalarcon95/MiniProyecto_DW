import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Product } from './model/product.model';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Provider } from './model/provider.model';
import { Carrito } from './model/carrito.model';
import { Productos } from './model/products.model';

@Injectable()
export class DataServices{
    constructor(private httpClient:HttpClient){}

    cargarProduct(): Observable<Product[]>{
      return this.httpClient.get<Product[]>('https://lista-compras-1256b-default-rtdb.firebaseio.com/productos.json');
    }

    //Guardar producto
    guardarProduct(product: Product[]): Observable<any>{
      return this.httpClient.put<any>('https://lista-compras-1256b-default-rtdb.firebaseio.com/productos.json', product);
    }

    //Editar producto
    editarProduct(index:number, product: Product): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/productos/' + index + '.json';
      return this.httpClient.put<any>(url, product);
    }
    //Eliminar producto
    eliminarProducto(index: number): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/productos/' + index + '.json';
      return this.httpClient.delete<any>(url);
    }

    /*      Proveedor     */
    cargarProvider(): Observable<Provider[]>{
      return this.httpClient.get<Provider[]>('https://lista-compras-1256b-default-rtdb.firebaseio.com/proveedores.json');
    }
    //Guardar proveedores
    guardarProvider(provider: Provider[]): Observable<any>{
      return this.httpClient.put<any>('https://lista-compras-1256b-default-rtdb.firebaseio.com/proveedores.json', provider);
    }
    //Editar proveedor
    editarProvider(index:number, provider: Provider): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/proveedores/' + index + '.json';
      return this.httpClient.put<any>(url, provider);
    }
    //Elimina proveedor
    eliminarProvider(index: number): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/proveedores/' + index + '.json';
      return this.httpClient.delete<any>(url);
    }
    //Guardar listaCompras
    guardarListaCompras(productos: Productos[], email: string):Observable<any>{
      return this.httpClient.put<any>('https://lista-compras-1256b-default-rtdb.firebaseio.com/listaProductos/'+email+'.json', productos);
    }
    //Obtiene la Lista de compras
    cargarListaCompras(email: string): Observable<Productos[]>{
      return this.httpClient.get<Productos[]>('https://lista-compras-1256b-default-rtdb.firebaseio.com/listaProductos/'+email+'.json');
    }

    editarCantidadProducto(index:number, producto: Carrito): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/listaCompras/' + index + '.json';
      return this.httpClient.put<any>(url, producto);
    }

}
