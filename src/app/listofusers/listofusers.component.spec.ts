import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofusersComponent } from './listofusers.component';

describe('ListofusersComponent', () => {
  let component: ListofusersComponent;
  let fixture: ComponentFixture<ListofusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
