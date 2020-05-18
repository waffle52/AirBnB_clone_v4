// Adds selected amenities to the amenities object
$(document).ready(function () {
  const amenityList = {}      
  $('INPUT:checkbox').change(function () {
    if ($(this).prop('checked') === true) {
      amenityList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
        delete amenityList[$(this).attr('data-id')];
    }
    $('div.amenities > h4').text(Object.values(amenityList).join(', '));
  });

  // Reloads the places section when search button is pushed, based on selected
  // amenities.
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityList) }),
      success: (data) => {
        //Removes all article elements in the page
        $('article').remove();
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          let guests = 'Guest';
          if (place.max_guest !== 1) {
            guests = guests + 's';
          }
          let rooms = 'Room';
          if (place.number_rooms !== 1) {
            rooms = rooms + 's';
          }
          let bathrooms = 'Bathroom';
          if (place.number_bathrooms !== 1) {
            bathrooms = bathrooms + 's';
          }
          const htmlPlace = '<article>' + '<div class ="title_box">' + '<h2>' + place.name + '</h2>' + '<div class="price_by_night">$' + place.price_by_night + '</div>' + '</div>' + '<div class="information">' + '<div class="max_guest">' + place.max_guest + ' ' + guests + '</div>' + '<div class="number_rooms">' + place.number_rooms + ' ' + rooms + '</div>' + '<div class="number_bathrooms">' + place.number_bathrooms + ' ' + bathrooms + '</div>' + '</div>' + '<div class="description">' + place.description + '</div>' + '</article>';
          $('section.places').append(htmlPlace);
        }
      }
    });
  });
});

// Changes the color of the API Status object, depending on API status
$.get('http://localhost:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

// Adds all places in DB to the places section
$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search',
  contentType: 'application/json',
  data: '{}',
  success: (data) => {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      let guests = 'Guest';
      if (place.max_guest !== 1) {
        guests = guests + 's';
      }
      let rooms = 'Room';
      if (place.number_rooms !== 1) {
        rooms = rooms + 's';
      }
      let bathrooms = 'Bathroom';
      if (place.number_bathrooms !== 1) {
        bathrooms = bathrooms + 's';
      }
      const htmlPlace = '<article>' + '<div class ="title_box">' + '<h2>' + place.name + '</h2>' + '<div class="price_by_night">$' + place.price_by_night + '</div>' + '</div>' + '<div class="information">' + '<div class="max_guest">' + place.max_guest + ' ' + guests + '</div>' + '<div class="number_rooms">' + place.number_rooms + ' ' + rooms + '</div>' + '<div class="number_bathrooms">' + place.number_bathrooms + ' ' + bathrooms + '</div>' + '</div>' + '<div class="description">' + place.description + '</div>' + '</article>';
      $('section.places').append(htmlPlace);
    }
  }
});
