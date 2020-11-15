import { Component, Input, OnInit, HostBinding, OnChanges } from '@angular/core';

import { Link } from '../link'


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],

})
export class SearchResultsComponent implements OnInit, OnChanges {

  @Input() searchText: string;
  @Input() links: Link[];

  @HostBinding('style.height') height = 'auto';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    var newHeight = 56 + (this.links.length * 56)

    this.height = newHeight + "px"

  }

}
