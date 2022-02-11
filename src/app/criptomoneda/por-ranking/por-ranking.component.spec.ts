import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorRankingComponent } from './por-ranking.component';

describe('PorRankingComponent', () => {
  let component: PorRankingComponent;
  let fixture: ComponentFixture<PorRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
