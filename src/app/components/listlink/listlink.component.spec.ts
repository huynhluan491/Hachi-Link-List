import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlinkComponent } from './listlink.component';

describe('ListlinkComponent', () => {
  let component: ListlinkComponent;
  let fixture: ComponentFixture<ListlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListlinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
