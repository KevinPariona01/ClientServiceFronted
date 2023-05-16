import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsuarioComponent } from './data-usuario.component';

describe('DataUsuarioComponent', () => {
  let component: DataUsuarioComponent;
  let fixture: ComponentFixture<DataUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
