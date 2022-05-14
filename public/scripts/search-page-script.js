import { errorTemplate } from "./templates.js";
import { getInfo, clearCards, getCards, getCurrPage } from "./utils.js";

const $cards = document.querySelector(".cards");
const $form = document.querySelector(".search__form");
const $formSearch = $form.querySelector(".search__input");
const $filters = document.querySelector(".filter");
const $pagination = document.querySelectorAll(".pagination__button");
const currUrl = getCurrPage(window.location.pathname);
const searchProps = {};
let searchValue = "";
let maxPage = 0;

/**
 * Получает данные, обновляет кнопки пагинации, данные о результате, отрисовывает карточки или сообщение об ошибке
 */
const updateCards = () => {
  clearCards();
  getInfo(searchProps, currUrl)
    .then((data) => {
      maxPage = data.info.pages;
      $pagination.forEach((button) => (button.style.display = "flex"));
      if (maxPage === 1) {
        $pagination.forEach((button) => (button.style.display = "none"));
      }
      if (searchProps.page === maxPage) {
        document.querySelector(".pagination__button-next").style.display =
          "none";
      }
      if (searchProps.page === 1) {
        document.querySelector(".pagination__button-prev").style.display =
          "none";
      }
      getCards(data.results, currUrl, $cards);
    })
    .catch((err) => {
      $pagination.forEach((button) => (button.style.display = "none"));
      $cards.insertAdjacentHTML("beforeend", errorTemplate(err.message));
    });
};

/**
 * Формирует объект с фильтрами для поиска
 * @param filterName - имя фильтра
 * @param filterValue - значение фильтра
 */
const updateSearchProps = (filterName, filterValue = null) => {
  const cleanFilterName = filterName.replaceAll(":", "").toLowerCase();
  if (filterValue !== null) {
    searchProps[cleanFilterName] = filterValue;
  } else {
    delete searchProps[cleanFilterName];
  }
};

updateSearchProps("page", 1);
updateCards();

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchValue = $formSearch.value;
  updateSearchProps("name", searchValue !== "" ? searchValue : null);
  updateCards();
});

$filters.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter__value")) {
    if (event.target.classList.contains("filter-selected")) {
      event.target.classList.remove("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent
      );
    } else {
      event.target.parentNode.childrens.forEach((item) =>
        item.classList.remove("filter-selected")
      );
      event.target.classList.add("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent,
        event.target.textContent.toLowerCase()
      );
    }
    updateCards();
  }
});

$pagination.forEach((button) =>
  button.addEventListener("click", (event) => {
    if (event.target.classList.contains("pagination__button-next")) {
      searchProps.page += 1;
    }
    if (event.target.classList.contains("pagination__button-prev")) {
      searchProps.page -= 1;
    }
    updateCards();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
);
