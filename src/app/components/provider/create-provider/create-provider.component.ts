import { Component, OnInit, TemplateRef, EventEmitter, Input, Output, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Provider } from 'src/app/model/provider.model';


@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit{

  @Input() preveedorEdit: Provider;
  @Input() index: number;
  @Output() nuevoProveedor: EventEmitter<Provider> = new EventEmitter<Provider>();

  formProveedor: FormGroup;
  proveedor: Provider;

  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService
  ){
    this.formProveedor = this.fb.group({
      nombreProveedor: ['', Validators.required],
      fecha: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if(!!this.preveedorEdit){
      this.datosProveedor();
    }
  }

datosProveedor(){
  this.formProveedor.patchValue({
    nombreProveedor: this.preveedorEdit.nombre,
    fechaIngreso: this.preveedorEdit.fechaCreacion
  })
}
  crearProveedor(){
    this.obtenerDatos();
    this.nuevoProveedor.emit(this.proveedor);
    this.clear();
    this.closeModal();
  }

  obtenerDatos(){
    const nombreProveedor = this.formProveedor.value.nombreProveedor;
    const fecha = this.formProveedor.value.fecha;
    this.proveedor = new Provider(nombreProveedor,fecha);
  }
  editarProducto(){
    this.obtenerDatos();
    this.nuevoProveedor.emit(this.preveedorEdit);
    this.clear();
    this.closeModal();
  }

  clear(){
    this.formProveedor.reset();
  }

  closeModal = () => this.bsModalService.hide();

}
