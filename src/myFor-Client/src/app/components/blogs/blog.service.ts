import { Injectable } from '@angular/core';
import { ServicesBase } from '../../shared/services/common';

export interface BlogItem {
  /**
   * 编码
   */
  code: string;
  /**
   * 作者昵称
   */
  authorName: string;
  /**
   * 作者账号
   */
  authorAccount: string;
  /**
   * 作者头像
   */
  avatar: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 发布时间
   */
  postedTime: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 是否为完整内容
   */
  isFull: boolean;
  /**
   * 评论数
   */
  commentCount: string;
  /**
   * 同意数
   */
  agreeCount: string;
  /**
   * 引用数
   */
  referenceCount: string;
  /**
   * 见解数
   */
  thinkCount: string;
}

export interface BlogDetail {
  /**
   * 编码
   */
  code: string;
  /**
   * 作者昵称
   */
  authorName: string;
  /**
   * 作者账号
   */
  authorAccount: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 发布时间
   */
  postedTime: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 评论数
   */
  commentCount: string;
  /**
   * 同意数
   */
  agreeCount: string;
  /**
   * 是否已同意
   */
  agreed: boolean;
  /**
   * 引用数
   */
  referenceCount: string;
  /**
   * 见解数
   */
  thinkCount: string;
}

export interface Comment {
  id: number;
  authorName: string;
  authorAccount: string;
  avatar: string;
  dateTime: string;
  content: string;
  agreeCount: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private base: ServicesBase
  ) { }
}
