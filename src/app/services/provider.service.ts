import { Injectable } from '@angular/core';
import { DataServices } from '../data.services';
import { Observable } from 'rxjs';
import { Provider } from '../model/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  provider: Provider[] = [];

  constructor(private dataService: DataServices) { }

  setProvider(provider: Provider[]){
    this.provider = provider;
  }

  obtenerProvider(): Observable<Provider[]>{
    return this.dataService.cargarProvider();
  }

  agrgarProvider(provider: Provider[]): Observable<any>{
    this.provider = provider;
    return this.dataService.guardarProvider(this.provider);
  }
  editarProvider(index:number, provider: Provider): Observable<any>{
    return this.dataService.editarProvider(index,provider);
  }
  eliminarProvider(index:number): Observable<any>{
    return this.dataService.eliminarProvider(index);
  }
}
