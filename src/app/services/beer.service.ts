import { Injectable } from '@angular/core';
import { Beer } from '../components/beer-list/Beer';
import { BehaviorSubject } from 'rxjs';
import { BeerListComponent } from '../components/beer-list/beer-list.component';
import { BeerDataService } from './beer-data.service';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private data : BeerDataService) {
    this.data.getAll().subscribe({next: (datos) => {this._listBeers = datos}});
    this.listBeers.next(this._listBeers);
    
  }
  // startBeerList():void{
  //   this.data.getAll().subscribe({next: (datos) => {this._listBeers = datos}});
  //   this.listBeers.subscribe();
  // }
  
  //creo que debo abstraer la lista de cervezas al service 
  //tambien
  private _cartBeers: Beer[] = [];
  private _listBeers: Beer[] = [];
  //creo el observable
  cartBeers : BehaviorSubject<Beer[]> = new BehaviorSubject(this._cartBeers);
  listBeers : BehaviorSubject<Beer[]> = new BehaviorSubject(this._listBeers);


  addToBeerList(beer: Beer) {
    let item = this._listBeers.find((elem) => elem.name == beer.name)
    if(!item){
      this._listBeers.push(beer);
    }else{
      item.stock += beer.quantity;
    }
    this.listBeers.next(this._listBeers);
  }
  
  addToCart(beer: Beer){
    let item = this._cartBeers.find((elem) => elem.name == beer.name)
    if(!item){
      let beer2: Beer =  {...beer}
      beer2.stock = beer.quantity;
      this._cartBeers.push(beer2);
      //pusheo una copia
    }else{
      item.stock += beer.quantity;
      item.quantity = item.stock;
    }
    //notifica el cambio a los observers
    this.cartBeers.next(this._cartBeers);
  }
  removeFromCart(beer: Beer){
    let item = this._cartBeers.find((elem) => elem.name == beer.name)
    if(!item){
      alert("error, no existe la cerveza en el carrito")
    }else if (item.stock > item.quantity){
      item.stock -= item.quantity;
      this.addToBeerList(beer);
    }else{
      this._cartBeers = this._cartBeers.filter(elem => elem !== item);
      this.addToBeerList(beer);
    }
    this.listBeers.next(this._listBeers);
    this.cartBeers.next(this._cartBeers);
  }

  getBeersLenght() : number {
    return this._cartBeers.length;
  }
}
