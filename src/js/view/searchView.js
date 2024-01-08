import { elements } from "./base";
// publisher: "Two Peas and Their Pod"
// title: "Avocado Pita Pizza with Cilantro Sauce"
// source_url: "http://www.twopeasandtheirpod.com/avocado-pita-pizza-with-cilantro-sauce/"
// recipe_id: "54388"
// image_url: "http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg"
// social_rank: 99.99999665701256
// publisher_url: "http://www.twopeasandtheirpod.com"
// private function
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // page button show
  const totalPage = Math.ceil(recipes.length / resPerPage);
  renderButtons(page, totalPage);
};
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction}"></use>
  </svg>
  <span>Хуудас ${page}</span>
  </button>`;
const renderRecipe = (recipe) => {
  try {
    const markup = ` 
                      <li>
                      <a class="results__link" href="#${recipe.id}">
                          <figure class="results__fig">
                              <img src="${recipe.image_url}" alt="Test">
                          </figure>
                          <div class="results__data">
                              <h4 class="results__name">${recipe.title}</h4>
                              <p class="results__author">${recipe.publisher}</p>
                          </div>
                      </a>
                      </li>
                  `;

    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
  } catch (e) {
    alert("алдаа гарлаа ===." + e);
  }
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
const renderButtons = (currentPage, totalPage) => {
  let button;
  if (currentPage === 1 && totalPage > 1) {
    //on page one so we need show page 2 on desktop
    button = createButton(2, "next", "right");
  } else if (currentPage < totalPage) {
    //show two button
    button = createButton(currentPage - 1, "prev", "left");
    button += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPage) {
    //last page, we need show inly previos pagr button on desktop
    button = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", button);
};
