import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, HostListener, OnInit, Output, TemplateRef } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  @Output() editProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProduct: EventEmitter<boolean> = new EventEmitter<boolean>();

  productos: Product[] = [];
  productoEditar: Product;
  indexProducto:number;

  productoRef: BsModalRef;
  configBackdrop = {
    animated: true,
    keyboard: true,
    backdrop: true,
    class: 'modal-md',
    ignoreBackdropClick: true,
  };

  constructor(
    private bsModalService: BsModalService){}

  ngOnInit(): void {
  }

  @HostListener('document:eventProductos', ['$event'])
  cargarProductos(evt: any){
    this.productos = evt.detail;
  }

  openModalProducto(producto: TemplateRef<any>, productoEditar: Product): void{
    this.productoEditar = productoEditar;
    this.productoRef = this.bsModalService.show(producto, this.configBackdrop);
    console.log("producto a editar", this.productoEditar);
  }

  enviarProductoEditado(producto: Product){
    this.editProduct.emit(producto);
  }

  eliminarProducto(){
    this.deleteProduct.emit(true);
  }

}
