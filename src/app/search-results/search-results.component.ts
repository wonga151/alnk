import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../link'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() links: Link[];
  @Input() searchText: string;


  constructor() { }

  ngOnInit(): void {
  }

}
