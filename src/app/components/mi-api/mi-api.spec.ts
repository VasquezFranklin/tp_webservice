import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiApi } from './mi-api';

describe('MiApi', () => {
  let component: MiApi;
  let fixture: ComponentFixture<MiApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiApi],
    }).compileComponents();

    fixture = TestBed.createComponent(MiApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
