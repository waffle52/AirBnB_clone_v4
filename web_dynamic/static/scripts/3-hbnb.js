$(document).ready(function () {
  const amenityList = [];
  $('INPUT:checkbox').change(function () {
    if ($(this).prop('checked') === true) {
      amenityList.push($(this).attr('data-name'));
    } else {
      const i = amenityList.indexOf($(this).attr('data-name'));
      if (i !== -1) {
        amenityList.splice(i, 1);
      }
    }
    $('div.amenities > h4').text(amenityList.join(', '));
  });
});

$.get('http://localhost:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search',
  contentType: 'application/json',
  data: '{}',
  success: (data) => {
    console.log(data);
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
