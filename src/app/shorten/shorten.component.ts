import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.scss']
})

export class ShortenComponent implements OnInit {
  links = [
    "https//:google.com/12owefawefawefcmeewfawefawefawefaewf",
    "https//:google.com/111ocmeewfawefawefawefaweffaewf",
    "https//:google.com/1414owefawefawefewfawefawefawefaewf",
    // { longLink: "https:google.ocmeewfawefawefawefaewf", shortLink: "https://alnk.link/eafwea" },
    // { longLink: "https:google.ocmeewfawefawefawefaewf", shortLink: "https://alnk.link/eafwea" },
    // { longLink: "https:google.ocmeewfawefawefawefaewf", shortLink: "https://alnk.link/eafwea" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
