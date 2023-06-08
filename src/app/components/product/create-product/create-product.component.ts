import { BsModalService } from 'ngx-bootstrap/modal';

import { Component, OnInit, Output, EventEmitter, Input, Provider, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @Input() productoEdit: Product;
  @Input() index: number;
  @Output() nuevoProducto: EventEmitter<Product> = new EventEmitter<Product>();

  formProducto: FormGroup;
  producto: Product;
  proveedores: Provider[] = [];
  fecha: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService
  ){
    this.formProducto = this.fb.group({
      nombreProducto: ['', Validators.required],
      precio: ['', Validators.required],
      proveedor: ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if(!!this.productoEdit){
      this.datosProducto();
    }
  }

  datosProducto(){
    this.formProducto.patchValue({
      nombreProducto: this.productoEdit.nombre,
      precio: this.productoEdit.precio,
      proveedor: this.productoEdit.proveedor,
      fechaIngreso: this.productoEdit.fechaCreacion
    })
  }

  crearProducto(){
    this.obtenerDatos();
    this.nuevoProducto.emit(this.producto);
    this.clear();
    this.closeModal();
  }

  obtenerDatos(){
    const nombreProducto = this.formProducto.value.nombreProducto;
    const precio = this.formProducto.value.precio;
    const proveedor = this.formProducto.value.proveedor;
    const fechaIngreso = this.formProducto.value.fechaIngreso;
    this.producto = new Product(nombreProducto,precio,proveedor,fechaIngreso);
  }

  editarProducto(){
    this.obtenerDatos();
    this.nuevoProducto.emit(this.productoEdit);
    this.clear();
    this.closeModal();
  }

  clear(){
    this.formProducto.reset();
    this.formProducto.get('proveedor').setValue('');
  }

  closeModal = () => this.bsModalService.hide();

  @HostListener('document: eventProviderProduct', ['$event.detail'])
  cargarProvider(proveedores: Provider[]){
    this.proveedores = proveedores;
    console.log(this.proveedores);
  }
}
