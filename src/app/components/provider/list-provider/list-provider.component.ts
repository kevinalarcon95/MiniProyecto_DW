import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Provider } from './../../../model/provider.model';
import { Component, EventEmitter, HostListener, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit{
  @Output() editProvider: EventEmitter<Provider> = new EventEmitter<Provider>();
  @Output() indexProvider: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteProvider: EventEmitter<number> = new EventEmitter<number>();


  proveedor: Provider[] = [];
  proveedorEditar: Provider;
  indexProveedor: number;

  proveedorRef: BsModalRef;
  configBackdrop = {
    animated: true,
    keyboard: true,
    backdrop: true,
    class: 'modal-md',
    ignoreBackdropClick: true,
  }
  constructor(
    private bsModalService: BsModalService){}
  ngOnInit(): void {
  }

  @HostListener('document: eventProvider', ['$event'])
  cargarProvider(evt: any){
    this.proveedor = evt.detail;
  }

  despachaProveedoresProductos(){
    document.dispatchEvent(new CustomEvent('eventProviderProduct', {detail: this.proveedor}));
  }
  openModalProvider(provider: TemplateRef<any>, proveedorEditar: Provider, index: number): void{
    this.proveedorEditar = proveedorEditar;
    this.indexProveedor = index;
    this.proveedorRef = this.bsModalService.show(provider, this.configBackdrop);
  }

  enviarProveedorEditado(proveedor: Provider){
    this.indexProvider.emit(this.indexProveedor);
    this.editProvider.emit(proveedor);
  }
  eliminarProveedor(indexProvider: number){
    this.deleteProvider.emit(indexProvider);
  }
}
