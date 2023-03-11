import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkactionComponent } from './linkaction.component';

describe('LinkactionComponent', () => {
  let component: LinkactionComponent;
  let fixture: ComponentFixture<LinkactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
