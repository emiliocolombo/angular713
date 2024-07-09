import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Beer } from '../components/beer-list/Beer';

const URL = 'https://62bce215bac21839b6f844bd.mockapi.io/api/beers';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {

  constructor(private http : HttpClient) { 
  }

  public getAll() : Observable<Beer[]> {
    return this.http.get<Beer[]>(URL)
    .pipe(
      tap((beers : Beer[])=>beers.forEach(
        beer => beer.quantity = 0
      ))
    );
    //devuelve un observable de la respuesta del servidor 
  }
} 