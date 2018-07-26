'use strict';
// eslint-disable-next-line no-unused-vars
/* global $, myList, store, api */

$(function() {
  myList.bindEventListeners();
  myList.render();

  api.getBookmark((bookmarks) => {
    bookmarks.forEach((bookmark) => { 
      store.addBookmark(bookmark);
    });
    myList.render();
  });
});


