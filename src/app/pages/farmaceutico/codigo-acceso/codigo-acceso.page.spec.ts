import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoAccesoPage } from './codigo-acceso.page';

describe('CodigoAccesoPage', () => {
  let component: CodigoAccesoPage;
  let fixture: ComponentFixture<CodigoAccesoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoAccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
