import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorCriptomonedaComponent } from './por-criptomoneda.component';

describe('PorCriptomonedaComponent', () => {
  let component: PorCriptomonedaComponent;
  let fixture: ComponentFixture<PorCriptomonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorCriptomonedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorCriptomonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
