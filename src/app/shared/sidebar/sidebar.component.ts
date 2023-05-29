import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  status: boolean = false;
  selectedOption: string = '';

  ngOnInit(): void {}

  @HostListener('document:statusChange', ['$event.detail'])
  onStatusChange(status: boolean) {
    this.status = !status;
    console.log('Estado cambiado:', this.status);
  }
  
  @Output() optionSelected = new EventEmitter<string>();
  onSelectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    console.log(this.selectedOption);
  }
}
