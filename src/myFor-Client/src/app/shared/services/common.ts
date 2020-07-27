import { Injectable, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { of, Observable, fromEvent, Subscription } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export const CLIENT_SIDE = '/api/clients/';
export const ADMINISTRATOR_SIDE = '/api/administrators/';

/**
 * 响应数据会在拦截器中包装成这个 Result
 */
export interface Result<T = any> {
  /**
   * 状态码，对应原生 HTTP 状态码
   */
  status: number;
  /**
   * 响应 body 里的数据
   */
  data: T | string;
  location: string;
}

/**
 * status: 400
 */
export const DEFAULT_RESULT: Result = {
  status: 400,
  data: {},
  location: ''
};

/**
 * 分页模型
 */
export interface Paginator<T = any> {
  index: number;
  size: number;
  totalPages: number;
  totalSize: number;
  list: T[];
}

/**
 * 重定向标识
 */
export const REDIRECT = 'redirect';
export const ROUTE_PREFIX = 'api/clients/';

//  基本服务
@Injectable({
  providedIn: 'root'
})
export class ServicesBase {

  constructor() { }

  /**
   * 在这个错误处理中，只负责返回一个合法的值，
   * 如果需要打印，跳转等其他操作，在拦截器中定义
   */
  handleError(error: HttpErrorResponse): Observable<Result> {
    const R: Result = {
      status: error.status,
      data: '',
      location: error.headers.get('Location')
    };
    switch (error.status) {
      case 400: {
        R.data = error.error;
      }         break;
      case 401: {
        R.data = '请先登录';
        break;
      }
      default: break;
    }
    return of(R);
  }
}

//  通用服务
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private doc: any
  ) { }

  snackOpen(message: string, duration: number = 2000) {
    if (!duration) {
      duration = null;
    }

    this.snack.open(message, '关闭', {
      duration,
    });
  }

  /**
   * 监听一个元素的键盘点击事件，将指定的字符替换为其他的字符
   * @param element 要监听的元素
   * @param source 要替换的原字符
   * @param instead 要替换为的字符
   */
  insteadKeydownEventChar(element: any, source: string, instead: string): Subscription {
    return fromEvent(element, 'keydown')
    .pipe(
      filter(k => (k as KeyboardEvent).key === source)
    )
    .subscribe(k => {
      const KEY_BOARD = k as KeyboardEvent;
      const INSERT_CHARS = instead;
      KEY_BOARD.returnValue = false;
      const INDEX = element.selectionStart;
      element.value = element.value.substring(0, INDEX) + INSERT_CHARS + element.value.substring(INDEX);
      element.setSelectionRange(INDEX + INSERT_CHARS.length, INDEX + INSERT_CHARS.length);
    });
  }
}
