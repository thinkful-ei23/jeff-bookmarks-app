'use strict';
// eslint-disable-next-line no-unused-vars
/* global $, api, store */

const myList = (function() {
  const renderInputControls = function() {
  
    const createInputControls = function() {
      return `<div class="row">
    <div class="col-5">
      <button class="js-create-bookmark create-bookmark">Add Bookmark</button>
    </div>
    <div class="col-5">
      <select id="filter-bookmarks" class="filter-bookmarks" title="Filter bookmarks">
        <option value="" selected disabled hidden>Minimum Rating</option>
        <option value="0">Show All</option>
        <option value="5">5 stars</span></option>
        <option value="4">4 stars +</option>
        <option value="3">3 stars +</option>
        <option value="2">2 stars +</option>
        <option value="1">1 star +</option>
      </select>
    </div>
  </div>
  `;
    };

    const createForm = function() {
      const hiddenIfNotAdding = function() {
        if (store.adding) {
          return '';
        } else {
          return 'hidden';
        } 
      }; 
  

      const createToast = function() {
        let errorMessage = '';
        if (store.error) {
          errorMessage = 
      `<div class="col-8">
      <section class="error-message" role="region">
        <button id="cancel-error">X</button>
        <p>${store.error}</p>
      </section>
    </div>
  `;
        } 
        return errorMessage;
      };
      return `
    <div class="row ${hiddenIfNotAdding()}">
    <div class="col-12" class="new-bookmark">
      <form id="new-bookmark" class="new-bookmark">
        <div class="row">
          <div class="col-6">
            <h2>Create New Bookmark</h2>
          </div>
          ${createToast()}
        </div>
        <div class="row">
          <div class="col-6 offset-3">
            <label for="new-title">Title:</label>
            <input type="text" name="title" id="new-title" class="new-item-input" placeholder="Add a name">
          </div>
        </div>
        <div class="row">
          <div class="col-6 offset-3">
            <label for="new-url">Url:</label>
            <input type="text" name="url" id="new-url" class="new-item-input" placeholder="">
          </div>
        </div>
        <div class="row">
          <div class="col-6 offset-3">
            <label for="new-rating">Rating:</label>
            <fieldset class="star-ratings" id="new-rating">
              <legend>Rating</legend>
              <input type="radio" value="1" id="new-bookmark-1" name="rating" form="new-bookmark">
              <label for="new-bookmark-1" class="star-rating">1</label>
              <input type="radio" value="2" id="new-bookmark-2" name="rating" form="new-bookmark">
              <label for="new-bookmark-2" class="star-rating">2</label>
              <input type="radio" value="3" id="new-bookmark-3" name="rating" form="new-bookmark">
              <label for="new-bookmark-3" class="star-rating">3</label>
              <input type="radio" value="4" id="new-bookmark-4" name="rating" form="new-bookmark">
              <label for="new-bookmark-4" class="star-rating">4</label>
              <input type="radio" value="5" id="new-bookmark-5" name="rating" form="new-bookmark">
              <label for="new-bookmark-5" class="star-rating">5</label>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-6 offset-3">
            <label for="new-description">Description:</label>
            <textarea name="desc" id="new-description" class="new-item-input new-description" placeholder="Description, notes, etc."></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-3 offset-3">
            <button type="submit" class="js-create-bm-submit">Create</button>
            <button class="js-new-bm-cancel">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `;};  

    let html = '';
    html += createInputControls();
    html += createForm();
    $('.main-buttons').html(html);
  };

  const renderMyList = function() {
    const bookmarks = store.bookmarks;
    let filteredItems = bookmarks.filter((bookmark) => {
      bookmark.rating >= store.filter;
    }); 
    const generateStarRating = function(bookmark) {
      switch(bookmark.rating) {
      case 1:
        return '&starf;&star;&star;&star;&star;';
      case 2:
        return '&starf;&starf;&star;&star;&star;';
      case 3:
        return '&starf;&starf;&starf;&star;&star;';
      case 4:
        return '&starf;&starf;&starf;&starf;&star;';
      case 5:
        return '&starf;&starf;&starf;&starf;&starf;';
      }
      return '&star;&star;&star;&star;&star;';
    };

    const createBookmarkStr = function(bookmark) {
      const description = (bookmark.desc) ? bookmark.desc : '';
      const hiddenIfNotExpanded = (!bookmark.expanded) ? 'hidden' : '';
      const expandedToggleIcon = (!bookmark.expanded) ? '<span class="fas fa-plus-circle"></span>': '<span class="fas fa-minus-circle"></span>';

      return `
      <li class="js-bookmark-element bookmark-element"  data-item-id="${bookmark.id}">
        <a href="" class="js-bookmark-title-clickable bookmark-title-clickable">
          <div class="bookmark-title">
            <h3>${expandedToggleIcon} ${bookmark.title}</h3>
          </div>
        </a>
        <div class="bookmark-details ${hiddenIfNotExpanded}"> <!-- toggle 'hidden' here to hide div -->
          <p>${description}</p>
          <a class="js-site-link btn" href="${bookmark.url}" target="_blank">Visit Site</a>
        </div>
        <form class="js-bookmark-props bookmark-props" id="${bookmark.id}-form">
          <div class="row">
            <div class="col-6">
              <p class="rating-display">${generateStarRating(bookmark)}</p>
            </div>
            <div class="col-3 offset-3">
              <button class="far fa-trash-alt btn-delete"><span class="btn-label btn-label-delete">Delete</span></button>
            </div>
          </div>
        </form>
      </li>
    `;
    };

    const createListString = function(bookmarks) {
      let listString = '';

      bookmarks.forEach(bookmark => {
        listString += createListString(bookmark);
      });

      return listString;
    };

    let listHtml = '';
    listHtml += createListString(filteredItems);
    $('.bookmark-list').html(listHtml);
  };

  const render = function() {
    renderInputControls();
    renderMyList();
  };


  const handleNewSubmit = function() {
    $('.main-buttons').on('submit', '#new-bookmark', function(event) {
      event.preventDefault();

      const newBookmark = $(event.target).serializeJSON();
      $('#new-bookmark')[0].reset();

      const onSuccess = function(returnedBookmark) {
        store.addBookmark(returnedBookmark);
        store.setError(null);
        render();
      };

      const onError = function(err) {
        store.setError(err.responseJSON.message);
        render();
      };


      api.makeNewBookmark(newBookmark, onSuccess, onError);
    });
  };

  const handleError = function() {
    $('.top-section').on('click', '#cancel-error', function(event) {
      event.preventDefault();
      store.setError(null);
      render();
    });
  };

  const handleDeleteItemClicked = function() {
    $('.bookmark-list').on('click', '.btn-delete', function(event) {
      event.preventDefault();

      const currentId = $(event.target).closest('li').attr('data-item-id');

      const onSuccess = function() {
        store.removeBookMark(currentId);
        render();
      };

      api.deleteBookmark(currentId, onSuccess);
    });
  };

  const handleClickedItem = function() {
    $('.bookmark-list').on('click', '.js-bookmark-title-clickable', function(event) {
      event.preventDefault();
      const currentId = $(event.target).closest('li').attr('data-item-id');
      store.toggleExpanded(currentId);
      render();
    });
  };

  const handleFilter = function() {
    $('.top-section').on('change', '#filter-bookmarks', function(event) {
      const filterVal = $(event.target).val();

      store.setFilter(filterVal);
      render();
    });
  };

  const bindEventListeners = function() {
    handleNewSubmit();
    handleDeleteItemClicked();
    handleClickedItem();
    handleFilter();
    handleError();
  };

  return {
    render, bindEventListeners
  };
}());






