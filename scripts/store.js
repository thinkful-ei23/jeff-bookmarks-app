'use strict';
// eslint-disable-next-line no-unused-vars

const store = (function() {

  const removeBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(function(bookmark) {
      bookmark.id !== id;
    });
  };

  const toggleExpanded = function(id) {
    const item = this.bookmarks.find(function(bookmark) {
      bookmark.id === id;
    });
    item.expanded = !item.expanded;
  };

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const setError = function(errorMessage) {
    this.error = errorMessage;
  };

  const setFilter = function(number) {
    this.filter = number;
  };
  
  return {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0,
    addBookmark,
    setFilter,
    toggleExpanded,
    removeBookmark,
    setError,
  };
}());




