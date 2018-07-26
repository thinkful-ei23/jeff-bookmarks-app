'use strict';
// eslint-disable-next-line no-unused-vars
/* global $, api, store */

const myList = (function() {
  const createInputControls = function() {
    `INSERT HTML HERE`;
  };

  const createForm = function() {
    const hiddenIfNotAdding = function() {
      if (store.adding) {
        return 'hidden';
      }else {
        return '';
      } 
    }; 
  };

  const createToast = function() {
    const errorMessage = '';
    if (store.error) {
      errorMessage = `INSERT HTML HERE`;
    } 
    return errorMessage;
  }; 

  return `INSERT HTML HERE`;

  const renderMyList = function() {
    const bookmarks = store.bookmarks;
    let filteredItems = bookmarks.filter((bookmark) => {
      bookmark.rating >= store.filter;
  }); 





});






