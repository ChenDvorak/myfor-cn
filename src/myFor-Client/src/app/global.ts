import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enc } from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    // tslint:disable-next-line: variable-name
    private static _title: BehaviorSubject<string> = new BehaviorSubject<string>('myFor');

    get title(): BehaviorSubject<string> {
        return GlobalService._title;
    }

    setTitle(title: string) {
        GlobalService._title.next(title.trim() ? title : '');
    }
}

const IDENTITY_KEY = 'NO9A[';
export interface IdentityInfo {
    nickName: string;
    account: string;
    avatar: string;
}
/**
 * 当前登录用户
 */
export class Identity {

    /**
     * 当前登录用户信息，没有则为 null
     */
    static get IdentityInfo(): IdentityInfo {
        const VALUE = localStorage.getItem(IDENTITY_KEY);
        if (VALUE === null) {
            return null;
        }
        const SOURCE_VALUE: string = enc.Base64.parse(VALUE).toString(enc.Utf8);
        return JSON.parse(SOURCE_VALUE);
    }
    static set IdentityInfo(info: IdentityInfo) {
        if (!info) {
            localStorage.removeItem(IDENTITY_KEY);
            return;
        }
        let value = JSON.stringify(info);
        value = enc.Utf8.parse(value);
        value = enc.Base64.stringify(value);
        localStorage.setItem(IDENTITY_KEY, value);
    }
    static clean() {
        localStorage.removeItem(IDENTITY_KEY);
    }
}
