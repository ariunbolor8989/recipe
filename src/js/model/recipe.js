import axios from "axios";

export default class recipe {
  constructor(id) {
    this.id = id;
  }

  async gerRecipe() {
    try {
      let result = await axios(
        "https://forkify-api.herokuapp.com/api/v2/recipes/" + this.id
      );
      this.publisher = result.data.data.recipe.publisher;
      this.ingredients = result.data.data.recipe.ingredients;
      this.source_url = result.data.data.recipe.source_url;
      this.title = result.data.data.recipe.title;
      this.image_url = result.data.data.recipe.image_url;
      this.publisher = result.data.data.recipe.publisher;
      this.servings = result.data.data.recipe.servings;
    } catch (error) {
      console.log("Асуудал гарлаа : " + error);
    }
  }

  calcTime() {
    this.time = this.ingredients.length * 5;
  }

  calcHuniiToo() {
    this.huniitoo = 4;
  }
}
