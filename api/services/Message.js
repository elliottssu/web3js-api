
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
     * 处理成功和失败消息
     * @param err
     * @param result
     */
    static handleResult(res, err, result) {
      if (err) return res.json(Message.errMessage(err))
      res.json(Message.successMessage(null, result));
    }
    
  }
  
  module.exports = Message;
  