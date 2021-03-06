// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function cleanProducts(data) {
  var products = $.map(data['products'], function(result) {
    return result
  })
  return products;
}

$(document).ready(function() {
  if ($("#look_product_product_id").length > 0) {
    $("#look_product_product_id").select2({
      placeholder: Spree.translations.product_placeholder,
      minimumInputLength: 3,
      initSelection: function(element, callback) {
        url = Spree.url(Spree.lookbook_routes.product_search)
        return $.getJSON(url, null, function(data) {
          return callback(self.cleanProducts(data));
        })
      },
      ajax: {
        url: Spree.lookbook_routes.product_search,
        datatype: 'json',
        data: function(term, page) {
          return { q: term }
        },
        results: function (data, page) {
          return { results: self.cleanProducts(data) }
        }
      },
      formatResult: function(product) {
        return product.name
      },
      formatSelection: function(product) {
        return product.name
      }
    })
  }
})