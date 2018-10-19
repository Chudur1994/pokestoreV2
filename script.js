const catalogEl = document.querySelector("#items-container");

// filters
const filterTypesEl = document.querySelector("#filter-types");
const selectedTypesEl = document.querySelector("#selected-types");
const minPriceSliderEl = document.querySelector("#min-price > input");
const maxPriceSliderEl = document.querySelector("#max-price > input");
const minPriceValueEl = document.querySelector("#min-price > span");
const maxPriceValueEl = document.querySelector("#max-price > span");
const filterBtn = document.querySelector(".filter-button");

// pagination
const paginationEl = document.querySelector("#pagination");
const paginationNextEl = document.querySelector(".pagination-next");
const paginationPreviousEl = document.querySelector(".pagination-previous");

const filters = {
  types: [],
  price: "",
  pagesToRender: 0,
  itemsPerPage: 12,
  currentPage: 1
};

let pokemonsArray = [];
let paginatedItemsArray = [];

// initialize views
init(filters);

minPriceSliderEl.addEventListener("input", function(e) {
  minPriceValueEl.textContent = `$${this.value}`;
});

maxPriceSliderEl.addEventListener("input", function(e) {
  maxPriceValueEl.textContent = `$${this.value}`;
});

paginationPreviousEl.addEventListener("click", function(e) {
  if (filters.currentPage > 1) {
    // not currently on the first page
    filters.currentPage -= 1; // update current page
    const newActivePage = document.querySelector(
      // nth-child() starts counting at 0, so increment current page by 1 to get the correct element
      `#pagination span:nth-child(${filters.currentPage + 1})`
    );
    updatePagination(newActivePage, filters);
  }
});

paginationNextEl.addEventListener("click", function(e) {
  if (filters.currentPage < filters.pagesToRender) {
    // not currently on the last page
    filters.currentPage += 1;
    const newActivePage = document.querySelector(
      `#pagination span:nth-child(${filters.currentPage + 1})`
    );
    updatePagination(newActivePage, filters);
  }
});

filterBtn.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("filter");
});

function init(filters) {
  // convert pokemon objects to array for easier processing
  pokemonsArray = Object.keys(pokemons).map(key => ({
    [key]: pokemons[key]
  }));

  filters.pagesToRender = Math.ceil(
    pokemonsArray.length / filters.itemsPerPage
  );

  // render types for filtering
  renderFilters(filters, filterTypesEl, pokemonsArray);
  // renderFilterTypesEl(filterTypesEl, filters, selectedTypesEl);

  // list of items that will be displayed on the current page
  paginatedItemsArray = paginate(pokemonsArray, filters);

  // render catalog items
  displayCatalogItems(paginatedItemsArray);

  // render pagination
  renderPagination(filters);
}
