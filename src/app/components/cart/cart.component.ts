import { Component, ElementRef, EventEmitter, Input, Renderer2, SimpleChanges} from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../beer-list/Beer';
import { Observable, OperatorFunction } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputQuantityComponent } from '../input-quantity/input-quantity.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, InputQuantityComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  
  cartBeers$: Observable<Beer[]> = new Observable();

  precioTotal: String = 'Comprar';
  
  constructor(private cart : BeerService, private renderer: Renderer2, private el: ElementRef){
    //me suscribo a el observable (yo soy el observer)
    this.cartBeers$ = this.cart.cartBeers.asObservable();
    this.cartBeers$.subscribe(()=>{
      this.toogleSpider();
    });
  }
  maxReached(msg: string) {
    throw alert(msg);
  }

  removeFromCart(beer: Beer){
    this.cart.removeFromCart(beer);
    beer.quantity = beer.stock;
  }

  getBeersLenght() : number {
    return this.cart.getBeersLenght();
  }

  toogleSpider(): void {
    if(this.getBeersLenght() == 0){
      const elemento = this.el.nativeElement.querySelector('#spiderContainer');
      this.renderer.addClass(elemento, 'aparecer');
    }else{
      const elemento = this.el.nativeElement.querySelector('#spiderContainer');
      if(elemento.classList.contains('aparecer')){
        this.renderer.removeClass(elemento, 'aparecer');
      }
    }
  }
  
  ngAfterContentInit(){
    if(this.cart.getBeersLenght() == 0){
      const elemento = this.el.nativeElement.querySelector('#spiderContainer');
      this.renderer.addClass(elemento, 'aparecer');    
    }
  }

  showTotal() : void {
    this.precioTotal = "$" + this.cart.getTotalPrecio().toString();
  }

  showComprar() : void {
    this.precioTotal = 'Comprar';
  }

  comprar() : void{
    this.cart.comprar();
    this.showComprar();
  }
}
