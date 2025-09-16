import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoRecetasPage } from './listado-recetas.page';

describe('ListadoRecetasPage', () => {
  let component: ListadoRecetasPage;
  let fixture: ComponentFixture<ListadoRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
