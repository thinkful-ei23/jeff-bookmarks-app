'use strict';
/* global $, bookmarkList */

$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});
