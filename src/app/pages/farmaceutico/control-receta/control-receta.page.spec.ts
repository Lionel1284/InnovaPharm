import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlRecetaPage } from './control-receta.page';

describe('ControlRecetaPage', () => {
  let component: ControlRecetaPage;
  let fixture: ComponentFixture<ControlRecetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
