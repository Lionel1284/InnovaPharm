import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarRunPage } from './ingresar-run.page';

describe('IngresarRunPage', () => {
  let component: IngresarRunPage;
  let fixture: ComponentFixture<IngresarRunPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarRunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
