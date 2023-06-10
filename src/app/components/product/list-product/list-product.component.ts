import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, HostListener, OnInit, Output, Provider, TemplateRef } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  @Output() editProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() indexProduct: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteProduct: EventEmitter<number> = new EventEmitter<number>();

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
    private bsModalService: BsModalService,
    private toastr: ToastrService){}

  ngOnInit(): void {
  }

  @HostListener('document:eventProductos', ['$event'])
  cargarProductos(evt: any){
    this.productos = evt.detail;
  }

  openModalProducto(producto: TemplateRef<any>, productoEditar: Product, index: number): void{
    this.productoEditar = productoEditar;
    this.indexProducto = index;
    this.productoRef = this.bsModalService.show(producto, this.configBackdrop);
  }

  enviarProductoEditado(producto: Product){
    this.indexProduct.emit(this.indexProducto);
    this.editProduct.emit(producto);
  }

  // eliminarProducto(indexProduct: number){
  //   this.deleteProduct.emit(indexProduct);
  // }

  eliminarProducto(indexProduct: number) {
    const confirmation = window.confirm('¿Estás seguro de eliminar el producto?');
    if (confirmation) {
      this.deleteProduct.emit(indexProduct);
      this.toastr.success('El producto ha sido eliminado', 'Operación exitosa');
    } else {
      this.toastr.warning('La eliminación del producto ha sido cancelada', 'Operación cancelada');
    }
  }
}
