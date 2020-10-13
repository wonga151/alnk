import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}
