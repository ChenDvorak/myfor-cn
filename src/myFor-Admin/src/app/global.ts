export class Global {
  //  名字
  static userName = '';
  //  邮箱
  static email = '';
  /*
  设置用户的全局信息
  */
  public static setGlobalUserInfo(name: string, email: string, jwt: string) {
    Global.userName = name;
    Global.email = email;

    localStorage.setItem(JWT, jwt);
  }

  public static isLogged(): boolean {
    if (localStorage.getItem(JWT) !== null && this.userName && this.email) {
      return true;
    }
    return false;
  }

  //  登出，清除登录状态
  public static loginggOut() {
    localStorage.removeItem(JWT);
  }
}

export const JWT = '8d0de8f8-61ef-4c56-a23e-de69a5f41681';
