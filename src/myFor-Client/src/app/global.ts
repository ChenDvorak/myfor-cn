import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enc } from 'crypto-js';

/**
 * 全局
 */
@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    // tslint:disable-next-line: variable-name
    private static _title: BehaviorSubject<string> = new BehaviorSubject<string>('myFor');
    /**
     * 获取 document title
     */
    get title(): BehaviorSubject<string> {
        return GlobalService._title;
    }
    /**
     * 设置新 title
     * @param title 新 title
     */
    setTitle(title: string) {
        GlobalService._title.next(title.trim() ? title : '');
    }
}

const IDENTITY_KEY = 'NO9A[';
export interface IdentityInfo {
    nickName: string;
    account: string;
    avatar: string;
    jwt: string;
}
/**
 * 当前登录用户
 */
@Injectable({
    providedIn: 'root'
})
export class Identity {

    /**
     * 当前登录用户信息，没有则为 null
     */
    getIdentityInfo(): IdentityInfo {
        const VALUE = localStorage.getItem(IDENTITY_KEY);
        if (VALUE === null) {
            return null;
        }
        const SOURCE_VALUE: string = enc.Base64.parse(VALUE).toString(enc.Utf8);
        return JSON.parse(SOURCE_VALUE);
    }
    setIdentityInfo(info: IdentityInfo) {
        if (!info) {
            localStorage.removeItem(IDENTITY_KEY);
            return;
        }
        let value = JSON.stringify(info);
        value = enc.Utf8.parse(value);
        value = enc.Base64.stringify(value);
        localStorage.setItem(IDENTITY_KEY, value);
    }
    /**
     * 当前本地是否有用户登录状态
     */
    get isLoggedIn(): boolean {
        return localStorage.getItem(IDENTITY_KEY) !== null;
    }
    /**
     * 清楚登录信息，执行完后需要手动重置页面，以同步登录信息
     */
    clean() {
        localStorage.removeItem(IDENTITY_KEY);
    }
}
