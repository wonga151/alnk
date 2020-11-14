import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../link'

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

var transitionSpeed = "";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  // animations: [
  //   trigger('searchTransition', [
  //     state('focused', style({
  //       opacity: 0,
  //       left: 0,
  //     })),
  //     state('unfocused', style({
  //       opacity: 1,
  //       left: 12.5,
  //     })),
  //     transition('focused <=> unfocused', [
  //       animate(transitionSpeed)
  //     ]),
  //   ]),
  // ],
})
export class SearchResultsComponent implements OnInit {

  @Input() links: Link[];
  @Input() searchText: string;
  @Input() transitionSpeed: string;


  constructor() { }

  ngOnInit(): void {
    transitionSpeed = this.transitionSpeed
  }

}
