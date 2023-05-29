import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-container-principal',
  templateUrl: './container-principal.component.html',
  styleUrls: ['./container-principal.component.css']
})
export class ContainerPrincipalComponent {
  receivedOption: string = "";

  onOptionSelected(option: string) {
    this.receivedOption = option;
    
    switch (option) {
      case 'Option 1':
        this.nameOptionSelected('Compras');
        break;
      case 'Option 2':
        this.nameOptionSelected('Productos');
        break;
      case 'Option 3':
        this.nameOptionSelected('Proveedores');
        break;
    }
  }

  nameOptionSelected(option: string) {
    document.dispatchEvent(new CustomEvent('nameSelected', { detail: option}));
  }

}
