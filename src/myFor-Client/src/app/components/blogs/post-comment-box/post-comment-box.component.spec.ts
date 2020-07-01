import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentBoxComponent } from './post-comment-box.component';

describe('PostCommentBoxComponent', () => {
  let component: PostCommentBoxComponent;
  let fixture: ComponentFixture<PostCommentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
