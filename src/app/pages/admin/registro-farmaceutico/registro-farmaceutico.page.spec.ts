import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFarmaceuticoPage } from './registro-farmaceutico.page';

describe('RegistroFarmaceuticoPage', () => {
  let component: RegistroFarmaceuticoPage;
  let fixture: ComponentFixture<RegistroFarmaceuticoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFarmaceuticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
