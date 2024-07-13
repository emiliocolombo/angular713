import { Component, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { Beer } from './Beer';
import { FormsModule } from '@angular/forms';
import { InputQuantityComponent } from '../input-quantity/input-quantity.component';
import { BeerService } from '../../services/beer.service';
import { BeerDataService } from '../../services/beer-data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [InputQuantityComponent, CommonModule],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class BeerListComponent {
  
  constructor(private cart : BeerService, private renderer: Renderer2, private el: ElementRef){
    this.listBeers$ = this.cart.listBeers.asObservable();
  }

  listBeers$: Observable<Beer[]> = new Observable();
  
  addToCart(beer: Beer) {
    if(beer.quantity > 0){   
      this.cart.addToCart(beer);
      beer.stock -= beer.quantity;
      beer.quantity = 0;
    }
  }

  // AVERIGUAR COMO MANEJAR ECEPIONES Y HACER UN CARTELITO GENERICO PARA MOSTRAR ERRORES ESPERADOS
  maxReached(msg : String): void {
    alert(msg);
  }

  addToBeerList(beer: Beer){
    this.cart.addToBeerList(beer);
  }

  getBeersLenght() : number {
    return this.cart.getBeersLenght();
  }

}
