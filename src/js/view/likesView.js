import { elements } from "./base";

export const toggleLikeBtn = (isLiked) => {
  const iconstring = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconstring}`);
};

export const toggleLikeMenu = (numlikes) => {
  elements.likesmenu.style.visibility = numlikes > 0 ? "visible" : "hidden";
};

export const renderLike = (newlike) => {
  const html = `
    <li>
        <a class="likes__link" href="#${newlike.id}">
            <figure class="likes__fig">
                <img src="${newlike.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${newlike.title}</h4>
                <p class="likes__author">${newlike.auther}</p>
            </div>
        </a>
    </li>
`;
  elements.likesList.insertAdjacentHTML("beforeend", html);
};

export const deleteLike = (id) => {
  const el = document.querySelector(
    `.likes__link[href*="${id}"]`
  ).parentElement;
  if (el) el.parentElement.removeChild(el);
};
