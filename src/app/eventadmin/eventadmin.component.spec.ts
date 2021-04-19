import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventadminComponent } from './eventadmin.component';

describe('EventadminComponent', () => {
  let component: EventadminComponent;
  let fixture: ComponentFixture<EventadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
