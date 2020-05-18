$(document).ready(function () {
  const amenityList = [];
  $('INPUT:checkbox').change(function () {
    if ($(this).prop('checked') === true) {
      amenityList.push($(this).attr('data-name'));
    } else {
      const i = amenityList.indexOf($(this).attr('data-name'));
      if (i != -1) {
        amenityList.splice(i, 1);
      }
    }
    $('div.amenities > h4').text(amenityList.join(', '));
  });
});

const apiStatus = $.get('http://localhost:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  }
});
