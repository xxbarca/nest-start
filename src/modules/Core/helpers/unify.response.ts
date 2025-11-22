export class UnifyResponse {
  static updateSuccess(message = '更新成功') {
    return {
      message,
    };
  }
  static createSuccess(message = '创建成功') {
    return {
      message,
    };
  }
  static deleteSuccess(message = '删除成功') {
    return {
      message,
    };
  }
}
