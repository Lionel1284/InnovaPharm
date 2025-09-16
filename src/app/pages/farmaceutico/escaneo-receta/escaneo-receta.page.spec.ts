import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscaneoRecetaPage } from './escaneo-receta.page';

describe('EscaneoRecetaPage', () => {
  let component: EscaneoRecetaPage;
  let fixture: ComponentFixture<EscaneoRecetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaneoRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
