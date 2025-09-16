import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDoctorPage } from './registro-doctor.page';

describe('RegistroDoctorPage', () => {
  let component: RegistroDoctorPage;
  let fixture: ComponentFixture<RegistroDoctorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
