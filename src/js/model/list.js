import uniqid from "uniqid";
export default class list {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    let newItem = { id: uniqid(), item };
    this.items.push(newItem);
    return newItem;
  }
  deleteItem(id) {
    const a = this.items.findIndex((el) => el.id === id);
    this.items.splice(a, 1);
  }
}
