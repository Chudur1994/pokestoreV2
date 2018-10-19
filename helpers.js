const renderFilters = (filters, filtersEl, pokemonsArray) => {
  types.forEach(function(type) {
    const typeEl = document.createElement("span");
    typeEl.textContent = type.type;

    typeEl.style.color = type.color;
    typeEl.style.border = `1.5px solid ${type.color}`;
    typeEl.classList.add("type-label");

    typeEl.addEventListener("click", function() {
      const typeIndex = filters.types.indexOf(this.textContent);

      if (typeIndex > -1) {
        // already one of the filtered types
        this.style.color = this.style.backgroundColor;
        this.style.border = `1.5px solid ${this.style.backgroundColor}`;
        this.style.backgroundColor = "white";
        this.style.boxShadow = "none";

        // remove from the filtered types
        filters.types.splice(typeIndex, 1);
      } else {
        //  not in the list of filtered types
        this.style.backgroundColor = this.style.color;
        this.style.color = "white";
        this.style.borderColor = "1.5px solid white";
        this.style.boxShadow = "0px 1px 2px 0px rgba(100, 100, 100, 1)";

        // add it to the list of filtered types
        filters.types.push(this.textContent);
      }

      // update catalog items
      console.log(filters.types);
      if (filters.types.length > 0) {
        // if there is something to filter
      }
    });

    filtersEl.appendChild(typeEl);
  });
};

// creates an item for the catalog
const createItem = pokemon => {
  // container
  const item = document.createElement("div");
  item.classList.add("item");

  // image
  const image = document.createElement("div");
  image.classList.add("item-image");
  item.appendChild(image);
  image.style.backgroundImage = `url(${pokemon.image})`;

  // details container
  const details = document.createElement("div");
  details.classList.add("item-details");
  item.appendChild(details);

  // name
  const name = document.createElement("h3");
  name.classList.add("name", "header");
  details.appendChild(name);
  name.textContent = pokemon.name;

  // description
  const desc = document.createElement("p");
  desc.classList.add("desc");
  details.appendChild(desc);
  desc.textContent = pokemon.description;

  return item;
};

// produces a new array of items to display based on settings in filters object
const paginate = (pokeArr, filters) =>
  pokeArr.slice(
    (filters.currentPage - 1) * filters.itemsPerPage,
    filters.currentPage * filters.itemsPerPage
  );

// display current list of items in the paginated items array
const displayCatalogItems = paginatedItemsArray => {
  const catalogEl = document.querySelector("#items-container");
  catalogEl.innerHTML = ""; // clear current items on page

  // display items
  paginatedItemsArray.forEach(item => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const pokemon = item[key];
        catalogEl.appendChild(createItem(pokemon));
      }
    }
  });
};

// activates/deactivates the pagination arrows based on current page
const paginationArrow = filters => {
  if (filters.currentPage == 1) {
    paginationPreviousEl.classList.add("pagination-disabled");
    paginationNextEl.classList.remove("pagination-disabled");
  } else if (filters.currentPage == filters.pagesToRender) {
    paginationNextEl.classList.add("pagination-disabled");
    paginationPreviousEl.classList.remove("pagination-disabled");
  } else {
    paginationPreviousEl.classList.remove("pagination-disabled");
    paginationNextEl.classList.remove("pagination-disabled");
  }
};

const updatePagination = (newActivePage, filters) => {
  const oldPageLink = document.querySelector("span.pagination-active");

  oldPageLink.classList.remove("pagination-active"); // remove active css
  newActivePage.classList.add("pagination-active"); // add active css to new active page number
  paginationArrow(filters);

  displayCatalogItems(paginate(pokemonsArray, filters)); // display new items
};

// renders the pagination system
const renderPagination = filters => {
  for (let page = 1; page <= filters.pagesToRender; page++) {
    const pageNumber = document.createElement("span");
    pageNumber.classList.add("pagination-link", "pagination-number");
    if (page == filters.currentPage) {
      pageNumber.classList.add("pagination-active");
    }
    pageNumber.textContent = page;

    pageNumber.addEventListener("click", function(e) {
      e.preventDefault();
      if (filters.currentPage != this.textContent) {
        // if not already on the same page
        filters.currentPage = parseInt(this.textContent);
        updatePagination(this, filters);
      }
    });
    // append it before next page arrow element
    paginationNextEl.parentNode.insertBefore(pageNumber, paginationNextEl);
  }

  paginationArrow(filters);
};
