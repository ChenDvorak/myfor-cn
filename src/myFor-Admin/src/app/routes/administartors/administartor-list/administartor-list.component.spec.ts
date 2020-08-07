import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministartorListComponent } from './administartor-list.component';

describe('AdministartorListComponent', () => {
  let component: AdministartorListComponent;
  let fixture: ComponentFixture<AdministartorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministartorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministartorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
