import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailBoxComponent } from './blog-detail-box.component';

describe('BlogDetailComponent', () => {
  let component: BlogDetailBox;
  let fixture: ComponentFixture<BlogDetailBox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogDetailBox ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
