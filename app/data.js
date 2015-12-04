

//const client = require('./client');
$.ajaxSetup({
    //type: "POST",
    contentType: "application/json; charset=UTF-8",
    dataType: 'json'
});
var searchHref = '/api/articles'
var href = '/api/articles';
    module.exports = {
        article: {
            search: function(page, success) {
                $.ajax({
                    url: searchHref,
                    type: "GET",
                    async : true,
                    data: {page: page},
                    success: function(result) {
                        console.log(result);
                        success(result);
                    }
                })
            },
            post: function (data, success) {
                $.ajax({
                    url: href,
                    type: "POST",
                    async : true,
                    data: JSON.stringify(data),
                    processData: false,
                    success: function(result) {
                        console.log(result);
                        success(result);
                    }
                })
            }
        }

    }