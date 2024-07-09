import { Component, Input, Output } from '@angular/core';
import { Beer } from '../beer-list/Beer';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-quantity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-quantity.component.html',
  styleUrl: './input-quantity.component.scss'
})
export class InputQuantityComponent {
  
  constructor(){
  }

  @Input()
  quantity: number = 0; 

  @Input()
  max: number = 100000; 

  @Output()
  quantityChange: EventEmitter<number> = new EventEmitter<number>();
  
  @Output()
  maxReached: EventEmitter<string> = new EventEmitter<string>();
 
  upQuantity(): void {
    if(this.max > 0 && this.quantity < this.max){
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }else{
      this.maxReached.emit("se alcanzo el maximo");     
    }
  }
 
  downQuantity(): void {
    if(this.quantity > 0){
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
  
  onChangeQuantity(event: Event): void{
    if(this.quantity > this.max || this.quantity < 0){ 
      this.quantity = 0;
      this.quantityChange.emit(this.quantity);
    }else{
      this.quantityChange.emit(this.quantity);
    }
  }
}
