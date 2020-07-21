export interface NewBlog {
  title: string;
  content: string;
  referenceFrom: string;
  thoughtFrom: string;
}
/**
 * 引用或见解
 */
export interface ReferenceFrom {
  code: string;
  title: string;
}

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
  commentCount: number;
  /**
   * 同意数
   */
  agreeCount: number;
  /**
   * 引用数
   */
  referenceCount: number;
  /**
   * 见解数
   */
  thinkCount: number;
  thoughtFrom: string;
  referenceFrom: string;
  agreed: boolean;
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
  commentCount: number;
  /**
   * 同意数
   */
  agreeCount: number;
  /**
   * 是否已同意
   */
  agreed: boolean;
  /**
   * 引用数
   */
  referenceCount: number;
  /**
   * 见解数
   */
  thinkCount: number;
  thoughtFrom: string;
  referenceFrom: string;
}
