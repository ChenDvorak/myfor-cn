import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsItemBoxComponent } from './blogs-item-box.component';

describe('BlogsItemBoxComponent', () => {
  let component: BlogsItemBoxComponent;
  let fixture: ComponentFixture<BlogsItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
