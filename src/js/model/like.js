export default class likes {
  constructor() {
    this.readDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }
  addLike(id, title, auther, img) {
    const like = { id, title, auther, img };
    this.likes.push(like);
    this.saveDataTolocalStorage();
    return like;
  }
  deleteItem(id) {
    const a = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(a, 1);
    this.saveDataTolocalStorage();
  }
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
  saveDataTolocalStorage() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
