import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class DataServices{
    constructor(private httpClient:HttpClient){}

    cargarProduct(): Observable<Product[]>{
      return this.httpClient.get<Product[]>('https://lista-compras-1256b-default-rtdb.firebaseio.com/datos.json');
    }

    //Guardar producto
    guardarProduct(product: Product[]): Observable<any>{
      return this.httpClient.put<any>('https://lista-compras-1256b-default-rtdb.firebaseio.com/datos.json', product);
    }

    //Editar producto
    editarProduct(index:number, product: Product): Observable<any>{
      let url: string;
      url = 'https://lista-compras-1256b-default-rtdb.firebaseio.com/datos/' + index + '.json';
      return this.httpClient.put<any>(url, product);
    }

}
