'use strict';
// eslint-disable-next-line no-unused-vars
/* global $, api */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Jeff'; 
  
  const getBookmark = function(callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'GET',
      contentType: 'application/json',
      success: callback
    });
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };

  const makeNewBookmark = function(item, callback, ifError) {
    const newTitle = JSON.stringify({
      item,
    });
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newTitle,
      success: callback,
      error: ifError
    });
  };

  return {
    getBookmark,
    deleteBookmark,
    makeNewBookmark,
  };
}());
  


