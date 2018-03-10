/**
 *
 * @param code 1:正常，0:有异常
 * @param message 消息
 * @param data 消息内容
 * @constructor
 */

/**
 * 消息类
 * @param code 1:正常的成功消息，0:有异常的错误消息
 * @param message 消息标题
 * @param data 消息内容
 * @constructor
 */
class Message {


    /**
     *
     * @param code
     * @param message
     * @param data
     */
    constructor(code, message, data) {
      this.code = (code !== 0 && !code) ? 1 : code;//默认为1
      this.message = message ? message : '';
      this.data = data ? data : null;
    }
  
    /**
     * 生成功能消息
     * @param message
     * @param data
     * @param code 可选，默认为1
     * @returns {Message}
     */
    static successMessage(message, data, code) {
      message = message ? message : "";
      data = data ? data : null;
      code = (code !== 0 && !code) ? 1 : code;//默认为1
      return new Message(code, message, data);
    }
  
    /**
     * 生成失败消息
     * @param message
     * @param data
     * @param code 可选，默认为0
     * @returns {Message}
     */
    static errMessage(message, data, code) {
      message = message ? message : "";
      data = data ? data : null;
      code = (code !== 0 && !code) ? 0 : code;//默认为0
      return new Message(code, message, data);
    }
  
    /**
     * 根据error对象生成Message对象，主要为了区分原始Error还是ServiceError，返回不同的信息
     * 只做异常处理
     * @param err
     */
    static fromError(err) {
      AppUtil.errorLog("后台异常：" + err);
      if (err instanceof ServiceError) {
        return Message.errMessage(err.message, err.data, err.code);
      } else {// 后台错误
        let SERVER_ERROR_CODE = 0;
        let isDebug = false;
        if (isDebug) {
          return Message.errMessage("后台错误", err.message, SERVER_ERROR_CODE);
        } else {
          return Message.errMessage("后台错误", null, SERVER_ERROR_CODE);//生产阶段
        }
      }
    }
  
    /**
     * 判断是否异常 异常处理异常 非异常返回成功数据
     * @param err
     * @param data
     * @param message
     * @returns {Message}
       */
    static handError(err,data,message) {
      if(err) {
        AppUtil.errorLog("服务异常：" + err);
        if (err instanceof ServiceError) {
          return Message.errMessage(err.message, err.data, err.code);
        } else {// 后台错误
          let SERVER_ERROR_CODE = 0;
          return Message.errMessage(Message.SERVICE_ERROR, null, SERVER_ERROR_CODE);
        }
      } else {
        return Message.successMessage(message, data);
      }
  
    }
  }
  //error message
  Message.PARAM_NOT_NULL  = '参数不能为空';
  Message.PARAM_ERROR  = '参数格式不正确';
  Message.SERVICE_ERROR  = '服务器异常,请稍后再试';
  //错误代码清单
  Message.CODE_SUCCESS = 1; //操作成功
  Message.CODE_FAIL = 0; //操作失败
  Message.CODE_OVERSTEP = 1001;//请求超出使用次数限制
  Message.CODE_FUNCTION_OVERSTEP = 1003;//会员过期，功能超出限制。
  module.exports = Message;
  