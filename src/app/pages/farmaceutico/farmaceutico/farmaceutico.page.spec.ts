import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmaceuticoPage } from './farmaceutico.page';

describe('FarmaceuticoPage', () => {
  let component: FarmaceuticoPage;
  let fixture: ComponentFixture<FarmaceuticoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaceuticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
