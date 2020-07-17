import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailBoxComponent } from './blog-detail-box.component';

describe('BlogDetailComponent', () => {
  let component: BlogDetailBoxComponent;
  let fixture: ComponentFixture<BlogDetailBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogDetailBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
