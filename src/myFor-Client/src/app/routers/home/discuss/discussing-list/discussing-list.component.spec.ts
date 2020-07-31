import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussingListComponent } from './discussing-list.component';

describe('DiscussingListComponent', () => {
  let component: DiscussingListComponent;
  let fixture: ComponentFixture<DiscussingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
