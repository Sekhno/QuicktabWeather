import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public links;

  constructor() { }

  ngOnInit() {
    this.links = [
      'Trending Now',
      'Black Friday',
      'Black Friday 2017',
      'Black Friday Mediamarkt',
      'Zara',
      'Bershka',
      'Black Friday Nederland',
      'Mango',
      'Black Friday Deals',

    ]
  }

}
