import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreUnloggedInComponent } from './explore-unlogged-in.component';

describe('ExploreUnloggedInComponent', () => {
  let component: ExploreUnloggedInComponent;
  let fixture: ComponentFixture<ExploreUnloggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreUnloggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreUnloggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
