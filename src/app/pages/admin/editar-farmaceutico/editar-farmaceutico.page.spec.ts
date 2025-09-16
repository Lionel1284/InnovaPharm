import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarFarmaceuticoPage } from './editar-farmaceutico.page';

describe('EditarFarmaceuticoPage', () => {
  let component: EditarFarmaceuticoPage;
  let fixture: ComponentFixture<EditarFarmaceuticoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFarmaceuticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
