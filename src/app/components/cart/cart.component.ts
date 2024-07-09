import { Component } from '@angular/core';
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
  
  constructor(private cart : BeerService){
    //me suscribo a el observable (yo soy el observer)
    this.cartBeers$ = this.cart.cartBeers.asObservable();
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
}
