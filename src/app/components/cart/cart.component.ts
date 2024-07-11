import { Component ,ElementRef, Renderer2} from '@angular/core';
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
  
  constructor(private cart : BeerService, private renderer: Renderer2, private el: ElementRef){
    //me suscribo a el observable (yo soy el observer)
    this.cartBeers$ = this.cart.cartBeers.asObservable();
  }
  maxReached(msg: string) {
    throw alert(msg);
  }

  removeFromCart(beer: Beer){
    this.cart.removeFromCart(beer);
    beer.quantity = beer.stock;
    if(this.getBeersLenght() <= 0){
      this.toogleSpiderMan(true);
    }
  }

  getBeersLenght() : number {
    return this.cart.getBeersLenght();
  }

  toogleSpiderMan(aparecer: boolean):void{
    if(aparecer){
      const elemento = this.el.nativeElement.querySelector('container');
      this.renderer.addClass(elemento, 'aparecer');
    }else{
      const elemento = this.el.nativeElement.querySelector('.mi-elemento');
      this.renderer.removeClass(elemento, 'nueva-clase');
    }
  }
}
