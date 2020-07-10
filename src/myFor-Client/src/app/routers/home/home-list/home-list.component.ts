import { Component, OnInit } from '@angular/core';
import { BlogService, BlogItem } from '../../../components/blogs/blog.service';
import { Result, Paginator, CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.sass']
})
export class HomeListComponent implements OnInit {

  unfoldable = true;
  index = 1;
  totalPages = 1;
  blogList: BlogItem[] = [
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: '哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content content content content content content content content...',
      isFull: false,
      commentCount: 10_000,
      agreeCount: 11_000,
      referenceCount: 30_000,
      thinkCount: 10
    },
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: `<a href="/b/1231e" name="a-1231e">对《论哈哈哈》的见解</a>
      哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 <a href="/b/1231e" name="a-1231e">引《论哈哈哈》</a>
      哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content `,
      isFull: true,
      commentCount: 10_000,
      agreeCount: 11_000,
      referenceCount: 30_000,
      thinkCount: 10
    },
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: '哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content content content content content content content content...',
      isFull: false,
      commentCount: 10_000,
      agreeCount: 11000,
      referenceCount: 30000,
      thinkCount: 10
    },
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: '哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content content content content content content content content...',
      isFull: false,
      commentCount: 10_000,
      agreeCount: 11000,
      referenceCount: 30000,
      thinkCount: 10
    },
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: '哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content content content content content content content content...',
      isFull: false,
      commentCount: 10_000,
      agreeCount: 11000,
      referenceCount: 30000,
      thinkCount: 10
    }
  ];
  constructor(
    private blog: BlogService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.index = 1;
    this.getBlogList();
  }

  private getBlogList() {
    this.blog.getBlogsByHomePage(this.index, 15).subscribe(r => {
      if (r.status === 200) {
        const pager = r.data as Paginator<BlogItem>;
        this.index = pager.index;
        this.totalPages = pager.totalPages;
        this.unfoldable = this.index < this.totalPages;
        this.blogList = pager.list;
      } else {
        this.common.snackOpen(r.data as unknown as string);
      }
    });
  }

  unfold() {
    if (this.index >= this.totalPages) {
      return;
    }
    this.getBlogList();
  }
}
