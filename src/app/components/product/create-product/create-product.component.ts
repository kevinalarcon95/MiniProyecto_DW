import { BsModalService } from 'ngx-bootstrap/modal';

import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Provider } from 'src/app/model/provider.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product.model';
import { ProviderService } from 'src/app/services/provider.service';
import { ToastrService } from 'ngx-toastr';

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
  nombreModal: string = 'Crear';

  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private providerService: ProviderService,
    private toastr: ToastrService
  ){
    this.formProducto = this.fb.group({
      nombreProducto: ['', Validators.required],
      precio: ['', Validators.required],
      proveedor: ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.cargarProveedores();
    if(!!this.productoEdit){
      this.datosProducto();
      this.cargarNombreModal();
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
    this.toastr.success('Se creó correctamente el producto','Operacion exitosa');
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
    this.nuevoProducto.emit(this.producto);
    this.clear();
    this.closeModal();
    this.toastr.success('Se editó correctamente el producto','Operacion exitosa');
  }

  clear(){
    this.formProducto.reset();
    this.formProducto.get('proveedor').setValue('');
  }

  closeModal = () => this.bsModalService.hide();

  cargarProveedores(){
    this.providerService.obtenerProvider().subscribe(data =>{
      !!data ? this.proveedores = data : this.proveedores = [];
    });
  }

cargarNombreModal(){
  if(this.productoEdit != undefined){
    this.nombreModal = 'Editar';
  }
}
}
