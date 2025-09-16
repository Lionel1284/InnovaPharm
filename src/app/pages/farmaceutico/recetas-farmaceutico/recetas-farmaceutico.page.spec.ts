import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetasFarmaceuticoPage } from './recetas-farmaceutico.page';

describe('RecetasFarmaceuticoPage', () => {
  let component: RecetasFarmaceuticoPage;
  let fixture: ComponentFixture<RecetasFarmaceuticoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasFarmaceuticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
