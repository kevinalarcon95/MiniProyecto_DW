import { Component, OnInit, TemplateRef } from '@angular/core';
import { Provider } from 'src/app/model/provider.model';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  proveedores: Provider[] = [];
  proveedoresRef: BsModalRef;
  configBackdrop = {
    animated: true,
    keyboard: true,
    backdrop: true,
    class: 'modal-md',
    ignoreBackdropClick: true,
  };
  indexProveedorEditar: number;

  constructor(private ProviderService: ProviderService,
              private router: Router,
              private bdModalService: BsModalService){}

  ngOnInit(): void {
    this.enviarProveedores();
  }
  irAgregar(){
    console.log("agrgar");
    this.router.navigate(['/containerPrincipal'],{queryParams:{modoEdicion:0}});
  }

  openModalProveedor(proveedor: TemplateRef<any>): void{
    this.proveedoresRef = this.bdModalService.show(proveedor, this.configBackdrop);
  }
  recibeProveedor(proveedor: Provider){
    this.proveedores.push(proveedor);
    this.ProviderService.agrgarProvider(this.proveedores).subscribe(data =>{
      this.enviarProveedores();
    })
  }

  editarProveedor(proveedor: Provider){
    this.ProviderService.editarProvider(this.indexProveedorEditar,proveedor).subscribe(data =>{
      this.enviarProveedores();
    })
  }

  setIndex(index: number){
    this.indexProveedorEditar = index;
  }

  eliminarProveedor(index: any){
    this.ProviderService.eliminarProvider(index).subscribe(data =>{
      this.proveedores.splice(index, 1);
      this.ProviderService.agrgarProvider(this.proveedores).subscribe(proveedores => {
        this.enviarProveedores();
      })
    })
  }
  enviarProveedores(){
    this.ProviderService.obtenerProvider()
    .subscribe(
      (providers: Provider[]) => {
        !!providers ? this.proveedores = providers : this.proveedores = [];
        this.despachaProveedores();
      }
    );
  }

  despachaProveedores(){
    const eventProvider = this.proveedores;
    document.dispatchEvent(new CustomEvent('eventProvider', {detail: eventProvider}));
  }
}
