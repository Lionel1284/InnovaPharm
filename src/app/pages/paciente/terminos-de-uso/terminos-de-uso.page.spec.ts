import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminosDeUsoPage } from './terminos-de-uso.page';

describe('TerminosDeUsoPage', () => {
  let component: TerminosDeUsoPage;
  let fixture: ComponentFixture<TerminosDeUsoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosDeUsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
