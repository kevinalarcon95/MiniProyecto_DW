import { ProductService } from './../../services/product.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productos: Product[] = [];
  productoRef: BsModalRef;
  configBackdrop = {
    animated: true,
    keyboard: true,
    backdrop: true,
    class: 'modal-md',
    ignoreBackdropClick: true,
  };
  indexProductoEditar: number;

  constructor(private ProductService: ProductService,
              private router: Router,
              private bsModalService: BsModalService){}

  ngOnInit(): void {
    this.enviarProductos();
  }

  irAgregar(){
    console.log("agrgar");
    this.router.navigate(['/containerPrincipal'],{queryParams:{modoEdicion:0}});
  }

  openModalProducto(producto: TemplateRef<any>): void{
    this.productoRef = this.bsModalService.show(producto, this.configBackdrop);
  }

  recibeProducto(producto: Product){
    this.productos.push(producto);
    this.ProductService.agregarProduct(this.productos).subscribe(data =>{
      this.enviarProductos();
    })
  }

  editarProducto(producto: Product){
    this.ProductService.editarProducto(this.indexProductoEditar,producto).subscribe(data => {
      this.enviarProductos();
    });
  }

  setIndex(index: number){
    this.indexProductoEditar = index;
  }

  eliminarProducto(index: any){
    this.ProductService.eliminarProducto(index).subscribe(data =>{
      this.productos.splice(index, 1);
      this.ProductService.agregarProduct(this.productos).subscribe(productos => {
        this.enviarProductos();
      })
    })
  }

  enviarProductos(){
    this.ProductService.obtenerProduct()
    .subscribe(
      (products: Product[]) => {
        !!products ? this.productos = products : this.productos = [];
        this.despachaProductos();
      }
    );
  }

  despachaProductos(){
    const eventProductos = this.productos;
    document.dispatchEvent(new CustomEvent('eventProductos', {detail: eventProductos}));
  }
}
