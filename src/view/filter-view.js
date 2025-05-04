import {getCapitalizedString} from '../utils/common-utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;
  const isDisabled = count === 0 ? 'disabled' : '';
  const isChecked = type === currentFilterType ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isDisabled}
        ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${getCapitalizedString(type)}
      </label>
    </div>`
  );
}

function createFilterTemplate(filters, currentFilterType) {
  const filterItemTemplates = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemTemplates}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterClick = null;

  constructor({filters, currentFilterType, handleFilterClick}){
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterClick = handleFilterClick;

    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #filterClickHandler = (evt) => {
    const targetInput = evt.target.closest('input');

    if(targetInput) {
      evt.preventDefault();
      this.#handleFilterClick(evt.target.value);
    }
  };
}
