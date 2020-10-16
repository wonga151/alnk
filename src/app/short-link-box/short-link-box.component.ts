import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-link-box',
  templateUrl: './short-link-box.component.html',
  styleUrls: ['./short-link-box.component.scss']
})
export class ShortLinkBoxComponent implements OnInit {

  @Input() link: string;
  constructor() { }

  ngOnInit(): void {
  }

}
