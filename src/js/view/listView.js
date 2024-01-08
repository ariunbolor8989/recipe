import { elements } from "./base";

export const renderItem = (item, n) => {
  const html = `
<li class="shopping__item" data-itemid=${n.id}>
<div class="shopping__count">
    <input type="number" value="${item.quantity}" step="100">
    <p>${item.unit}</p>
</div>
<p class="shopping__description">${item.description}</p>
<button class="shopping__delete btn-tiny">
    <svg>
        <use href="img/icons.svg#icon-circle-with-cross"></use>
    </svg>
</button>
</li>`;
  elements.shoppingList.insertAdjacentHTML("beforeend", html);
};

export const clearItem = () => {
  elements.shoppingList.innerHTML = "";
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
