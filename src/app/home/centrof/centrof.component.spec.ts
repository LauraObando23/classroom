import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrofComponent } from './centrof.component';

describe('CentrofComponent', () => {
  let component: CentrofComponent;
  let fixture: ComponentFixture<CentrofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentrofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
