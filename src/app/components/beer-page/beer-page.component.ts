import { Component } from '@angular/core';
import { BeerListComponent } from '../beer-list/beer-list.component';
import { CartComponent } from '../cart/cart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-beer-page',
  standalone: true,
  imports: [BeerListComponent,  CartComponent],
  templateUrl: './beer-page.component.html',
  styleUrl: './beer-page.component.scss'
})
export class BeerPageComponent {

}
