export default class Confirmation {
  constructor({
    title,
    content,
    action,
    callback,
  } = {}) {
    this.title = title;
    this.content = content;
    this.action = action;
    this.callback = callback;
  }
}
