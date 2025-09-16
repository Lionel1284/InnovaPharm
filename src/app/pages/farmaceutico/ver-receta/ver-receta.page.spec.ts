import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerRecetaPage } from './ver-receta.page';

describe('VerRecetaPage', () => {
  let component: VerRecetaPage;
  let fixture: ComponentFixture<VerRecetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
