import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../link'

@Component({
  selector: 'app-short-link-box',
  templateUrl: './short-link-box.component.html',
  styleUrls: ['./short-link-box.component.scss']
})
export class ShortLinkBoxComponent implements OnInit {

  @Input() link: Link;
  constructor() { }

  ngOnInit(): void {
  }

  copyText = (copyText: string) => {
    var input = document.createElement('textarea');
    input.innerHTML = "alnk.link/" + copyText;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }

}
