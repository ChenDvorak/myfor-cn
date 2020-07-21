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
 * 用户刚刚添加的评论
 */
export interface IntroComment {
  avatar: string;
  content: string;
}
