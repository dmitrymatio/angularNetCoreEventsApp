import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattendeesComponent } from './viewattendees.component';

describe('ViewattendeesComponent', () => {
  let component: ViewattendeesComponent;
  let fixture: ComponentFixture<ViewattendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewattendeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewattendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
