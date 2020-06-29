import { Injectable } from '@angular/core';
import { ServicesBase } from '../../shared/services/common';

export interface BlogItem {
  code: string;
  authorName: string;
  authorAccount: string;
  avatar: string;
  title: string;
  postedTime: string;
  content: string;
  isFull: boolean;
  commentCount: string;
  agreeCount: string;
  referenceCount: string;
  thinkCount: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private base: ServicesBase
  ) { }
}
