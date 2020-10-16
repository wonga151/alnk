import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLinkBoxComponent } from './short-link-box.component';

describe('ShortLinkBoxComponent', () => {
  let component: ShortLinkBoxComponent;
  let fixture: ComponentFixture<ShortLinkBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortLinkBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortLinkBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
