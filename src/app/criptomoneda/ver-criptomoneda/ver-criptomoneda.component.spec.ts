import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCriptomonedaComponent } from './ver-criptomoneda.component';

describe('VerCriptomonedaComponent', () => {
  let component: VerCriptomonedaComponent;
  let fixture: ComponentFixture<VerCriptomonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCriptomonedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCriptomonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
