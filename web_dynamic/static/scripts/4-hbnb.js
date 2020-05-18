// Function to check if one array is a subArray
function isSubArray (subArray, array) {
      for(let i = 0 , len = subArray.length; i < len; i++) {
                if($.inArray(subArray[i], array) == -1) return false;
            }
      return true;
}

// Adds selected amenities to the amenities object
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

  // Reloads the places section when search button is pushed, based on selected
  // amenities.
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      contentType: 'application/json',
      data: '{}',
      success: (data) => {
        // Change this condition back to data.length (instead of i < 1) after hacking
        for (let i = 0; i < 1; i++) {
          const place = data[i];
          const placeId = place.id
          console.log(placeId);
          $.ajax({
            url: 'http://localhost:5001/api/v1/places/' + placeId + '/amenities',
            data: '{}',
            contentType: 'application/json',
            success: (data) => {
              const placeAmenities = [];
              for (let j = 0; j < data.length; j++) {
                placeAmenities.push(data[j].name);
              }
              console.log(placeAmenities);
              const amenitiesRequired = $('div.amenities > h4').text().split(', ');
              console.log(amenitiesRequired);
              // Test if the place has all the required amenities
              if (isSubArray(amenitiesRequired, placeAmenities)) {
                console.log('This place has all the amenities');
              } else {
                console.log('Not enough of my preferred amenities');
              }
            }
          });
          // If the place has the required amenities
          /*
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
        */
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
