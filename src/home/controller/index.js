'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html
    let todo_model = this.model('todo');
    let done_model = this.model('done');
    let title = this.post('title');
    if (this.isPost()) {
      let result = await todo_model.add({
        task: title
      });
      this.redirect(this.http.url);
    }
    let todo_data = await todo_model.where().select();
    let done_data = await done_model.where().select();
    this.assign('todoList', todo_data);
    this.assign('doneList', done_data);
    this.assign('tcount', todo_data.length);
    this.assign('dcount', done_data.length);
    return this.display();
  }
  async updateAction() {
    let info = this.post();
    let delList = this.model(info.from);
    let addList = this.model(info.to);
    let updateData = await delList.where({
      id: info.id
    }).find();
    let result1 = await delList.where({
      id: info.id
    }).delete();
    let result2 = await addList.add(updateData);
    if (!result1) {
      this.fail(1000, 'update failed!');
    }
    if (!result2) {
      this.fail(1000, 'update failed!');
    }
    return this.success();
  }
  async editAction() {
    let info = this.post();
    let list = this.model(info.list);
    let result = await list.where({
      id: info.id
    }).update({
      task: info.title
    });
    if (!result) {
      this.failt(1000, 'edit failed!');
    }
    return this.success();
  }
  async removeAction() {
    let info = this.post();
    let list = this.model(info.list);
    let result = await list.where({
      id: info.id
    }).delete();
    if (!result) {
      this.fail(1000, 'remove failed');
    }
    return this.success();
  }
  async clearAction() {
    let todoList = this.model('todo');
    let doneList = this.model('done');
    let result1 = await todoList.where().delete();
    let result2 = await doneList.where().delete();
    if (!result1) {
      this.fail(1000, 'clear todolist failed!');
    }
    if (!result2) {
      this.fail(1000, 'clear donelist failed!');
    }
    return this.success();
  }
}