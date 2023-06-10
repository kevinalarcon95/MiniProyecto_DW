import {
  Component,
  OnInit,
  TemplateRef,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Provider } from 'src/app/model/provider.model';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css'],
})
export class CreateProviderComponent implements OnInit {
  
  @Input() preveedorEdit: Provider;
  @Input() index: number;
  @Output() nuevoProveedor: EventEmitter<Provider> = new EventEmitter<Provider>();

  formProveedor: FormGroup;
  proveedor: Provider;
  nombreModal: string = 'Crear';

  constructor(private fb: FormBuilder, private bsModalService: BsModalService, private toastr: ToastrService) {
    this.formProveedor = this.fb.group({
      nombreProveedor: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('nombre modal', this.nombreModal);
    if (!!this.preveedorEdit) {
      this.datosProveedor();
      this.cargarNombreModal();
    }
  }

  datosProveedor() {
    this.formProveedor.patchValue({
      nombreProveedor: this.preveedorEdit.nombre,
      fechaCreacion: this.preveedorEdit.fechaCreacion,
    });
  }

  crearProveedor() {
    this.obtenerDatos();
    this.nuevoProveedor.emit(this.proveedor);
    this.clear();
    this.closeModal();
    this.toastr.success('Se creó correctamente el proveedor','Operacion exitosa');
  }

  obtenerDatos() {
    const nombreProveedor = this.formProveedor.value.nombreProveedor;
    const fechaCreacion = this.formProveedor.value.fechaCreacion;
    this.proveedor = new Provider(nombreProveedor, fechaCreacion);
  }

  editarProveedor() {
    this.obtenerDatos();
    this.nuevoProveedor.emit(this.proveedor);
    this.clear();
    this.closeModal();
    this.toastr.success('Se editó correctamente el proveedor','Operacion exitosa');
  }

  clear() {
    this.formProveedor.reset();
  }

  closeModal = () => this.bsModalService.hide();

  cargarNombreModal(){
    if(this.preveedorEdit != undefined){
      this.nombreModal = 'Editar';
    }
  }
}
