import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserNavComponent } from './current-user-nav.component';

describe('CurrentUserNavComponent', () => {
  let component: CurrentUserNavComponent;
  let fixture: ComponentFixture<CurrentUserNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
