import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddPageComponent } from './create-add-page.component';

describe('CreateAddPageComponent', () => {
  let component: CreateAddPageComponent;
  let fixture: ComponentFixture<CreateAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
