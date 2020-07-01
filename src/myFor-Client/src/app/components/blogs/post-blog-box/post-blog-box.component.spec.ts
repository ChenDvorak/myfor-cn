import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBlogBoxComponent } from './post-blog-box.component';

describe('PostBlogBoxComponent', () => {
  let component: PostBlogBoxComponent;
  let fixture: ComponentFixture<PostBlogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBlogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBlogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
