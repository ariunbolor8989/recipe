//require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import list from "./model/list";
import like from "./model/like";
import {
  renderRecipe,
  clearResipe,
  highlightSeleectedRecipe,
} from "./view/recipeView";
import * as listView from "./view/listView";
import likes from "./model/like";
import recipe from "./model/recipe";
import * as likesView from "./view/likesView";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */

const state = {};

/** хайлтын контроллэр */
const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();

  if (query) {
    // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
    state.search = new Search(query);

    // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goto = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goto);
  }
});

/*жорын контроллэр*/
const controlRecipe = async () => {
  //url aas id shalgah
  const id = window.location.hash.replace("#", "");
  // joriin model uusgeh
  if (id) {
    state.recipe = new Recipe(id);
    //ui delgets beldeh
    clearResipe();
    renderLoader(elements.recipeDiv);
    highlightSeleectedRecipe(id);
    //joroo tatna
    await state.recipe.gerRecipe();
    //joriig guitsetgh hugtsaa ortsig tootsooln
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    clearLoader();
    //joroo delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

/** nairlagnii controller */

const controlList = () => {
  //nairlagiin model uusgene
  state.list = new list();
  window.tt = state.list;
  listView.clearItem();
  //modelruu jorniii nairlaga hiine
  state.recipe.ingredients.forEach((n) => {
    const item = state.list.addItem(n);
    listView.renderItem(n, item);
  });
};

//like controller
const controllike = () => {
  //like iin model uusgeh
  if (!state.likes) state.likes = new likes();
  //odoo haragdaj bga joriin idg olj awah
  const currentRecipeId = state.recipe.id;
  //ene joriig ikelasan essehiig shalgah
  if (state.likes.isLiked(currentRecipeId)) {
    //likelsan bol likiin awnas
    state.likes.deleteItem(currentRecipeId);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentRecipeId);
  } else {
    //like laagui nwal likelalna
    const newlike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    likesView.renderLike(newlike);
    likesView.toggleLikeBtn(true);
  }

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controllike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  state.list.deleteItem(id);
  listView.deleteItem(id);
});

window.addEventListener("load", (e) => {
  if (!state.likes) state.likes = new likes();
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
  state.likes.likes.forEach((e) => likesView.renderLike(e));
});
