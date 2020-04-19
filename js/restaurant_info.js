let restaurant;
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap();
});

/**
 * Initialize leaflet map
 */
initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
        scrollWheelZoom: false
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: 'pk.eyJ1IjoibWFybGlzYTMxIiwiYSI6ImNrOHl1N3BwcDBlNnQzbG9nNnk1cHJoeXcifQ.p-ts6uHZBr4UdeVqJjRAdw',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.querySelector('.restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.querySelector('.restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.querySelector('.restaurant-img');
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
	image.className = 'restaurant-img';
	image.alt = restaurant.photograph_description;

  const cuisine = document.querySelector('.restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();

	// set alt text of map to a string including restaurant name
	const map = document.querySelector('#map');
	map.setAttribute('alt', 'Map with a marker at the restaurant '+ restaurant.name);
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.querySelector('.restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.querySelector('.reviews-container');
  const title = document.createElement('h3');
	title.className = 'review-headline';
  title.innerHTML = 'Reviews';

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const div = document.querySelector('.reviews-list');
  reviews.forEach(review => {
    div.appendChild(createReviewHTML(review));
  });

	// insert title before review items
  container.insertBefore(title, div);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const reviewElement = document.createElement('div');
	reviewElement.className = 'review-item';

	const reviewHead = document.createElement('div');
	reviewHead.className = 'review-head';
	reviewElement.appendChild(reviewHead);

  const name = document.createElement('p');
	name.className = 'name';
  name.innerHTML = review.name;
  reviewHead.appendChild(name);

  const date = document.createElement('p');
	date.className = 'date';
  date.innerHTML = review.date;
  reviewHead.appendChild(date);

  const rating = document.createElement('p');
	rating.className = 'rating';
  rating.innerHTML = `Rating: ${review.rating}`;
  reviewHead.appendChild(rating);

	const reviewBody = document.createElement('div');
	reviewBody.className = 'review-body';
	reviewElement.appendChild(reviewBody);
  const comments = document.createElement('p');
	comments.className = 'comments';
  comments.innerHTML = review.comments;
  reviewBody.appendChild(comments);

  return reviewElement;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.querySelector('.breadcrumb');
  const div = document.createElement('div');
  div.innerHTML = restaurant.name;
  breadcrumb.appendChild(div);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
