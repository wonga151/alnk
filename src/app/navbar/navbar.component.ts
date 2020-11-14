import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Subject } from 'rxjs/';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { Link } from '../link'

import { LinkService } from '../link.service';


const transitionSpeed = '.2s'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('searchTransition', [
      state('focused', style({
        opacity: 0,
        left: 0,
      })),
      state('unfocused', style({
        opacity: 1,
        left: 12.5,
      })),
      transition('focused <=> unfocused', [
        animate(transitionSpeed)
      ]),
    ]),

    trigger('logoTransition', [
      state('focused', style({
        opacity: 0,
        width: 0,
        transform: 'translateX(-100%)'
      })),
      state('unfocused', style({
        opacity: 1,
      })),
      transition('focused => unfocused', [
        animate(transitionSpeed)
      ]),
      transition('unfocused => focused', [
        animate(transitionSpeed)
      ]),
    ]),

    trigger('btnTransition', [
      state('focused', style({
        opacity: 1,
        width: '50px',
      })),
      state('unfocused', style({
        opacity: 0,
        width: '0px',
        transform: 'translateX(10%)'
      })),
      transition('focused => unfocused', [
        animate(transitionSpeed)
      ]),
      transition('unfocused => focused', [
        animate(transitionSpeed)
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {

  searchFocused: boolean = false;

  searchText: string = "";
  searchTextChanged: Subject<string> = new Subject<string>();
  transitionSpeed: string = transitionSpeed;

  links: Link[] = [];

  constructor(private linkService: LinkService) {
    this.searchTextChanged.pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(text => {
        if (text !== "") {
          this.linkService.searchBySlug(text).subscribe((data: Link[]) => {
            this.links = [...data]
          })
        }
        else {
          this.links = []
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.searchTextChanged.unsubscribe();
  }

  onSearchFocus = () => {
    this.searchFocused = true;

    if (this.searchText !== "") {
      this.linkService.searchBySlug(this.searchText).subscribe((data: Link[]) => {
        this.links = [...data]
      })
    }
  }

  onSearchBlur = () => {
    this.searchFocused = false;
  }

  onChange(text: string) {
    this.searchText = text
    this.searchTextChanged.next(text);

  }

}
