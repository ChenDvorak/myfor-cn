import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministartorBoxComponent } from './create-administartor-box.component';

describe('CreateAdministartorBoxComponent', () => {
  let component: CreateAdministartorBoxComponent;
  let fixture: ComponentFixture<CreateAdministartorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministartorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministartorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
