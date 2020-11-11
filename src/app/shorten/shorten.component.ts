import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { Link } from '../link';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.scss'],
  providers: [LinkService]
})

export class ShortenComponent implements OnInit {
  url: string = '';
  slug: string = '';

  links: Link[] = []

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
  }

  shorten = () => {
    var newLink = {
      url: this.url,
      slug: undefined
    }

    if (this.slug.trim() !== "") {
      newLink.slug = this.slug;
    }

    this.linkService.createLink(newLink).subscribe(newLink => {
      this.links.unshift(newLink)
    })

    this.url = ""
    this.slug = ""


  }

  getLink = () => {
    console.log("test")
    this.linkService.getLink("you").subscribe(data => {
      console.log("link service response")
      console.log(data)
    })
  }

}
