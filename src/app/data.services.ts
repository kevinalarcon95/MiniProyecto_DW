import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';
import { Provider } from './model/provider.model';

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
    eliminarProvider(index: number): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/proveedores/' + index + '.json';
      return this.httpClient.delete<any>(url);
    }

}
