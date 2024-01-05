import axios from "axios";
export default class search {
  constructor(query) {
    this.query = query;
  }
  async doSearch() {
    try {
      let res = await axios(
        "https://forkify-api.herokuapp.com/api/v2/recipes?search=" + this.query
      );
      this.result = res.data.data.recipes;
      return this.result;
    } catch (er) {
      alert(er);
    }
  }
}
