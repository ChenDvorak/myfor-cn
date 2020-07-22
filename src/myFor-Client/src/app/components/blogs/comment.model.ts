/**
 * 博文详情页下的评论列表
 */
export interface Comment {
  id: number;
  authorName: string;
  authorAccount: string;
  avatar: string;
  dateTime: string;
  content: string;
  agreeCount: number;
}
/**
 * 用户详情页的评论列表
 */
export interface CommentInUserDetail {
  id: number;
  blogCode: string;
  blogTitle: string;
  dateTime: string;
  content: string;
  agreeCount: number;
}
/**
 * 用户刚刚添加的评论
 */
export interface IntroComment {
  avatar: string;
  content: string;
}
