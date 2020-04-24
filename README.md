
# Restaurant Reviews App

## Table of Contents
- [Project overview](#project-overview)
- [Responsiveness](#responsiveness)
- [Accessibility](#accessibility)
- [Offline caching](#offline-caching)
- [Dependencies](#dependencies)
- [How to run the application](#how-to-run-the-application)

## Project overview
The basis for this project was a starter kit provided by Udacity which was supposed to be improved and extended with regard to Responsiveness, Accessibility and Offline caching.

### Responsiveness
The app was made responsive by changing the initial fixed layout into a layout that dynamically adjusts to the viewport. For this purpose flexbox was used. To use DRY code and make the styling better to work with, the CSS file was converted into an SCSS file which uses variables and mixins.

### Accessibility
To ensure that the app is accessible for a wide range of users, a few accessibility features were implemented:
- labels were added to select fields to describe the fields
- `alt`-Tags were added to all images with a description of each image
- `aria`- Labels were added where it made sense
- used colors were adjusted so that they pass the Lighthouse Accessibility test in Chrome

### Offline caching
To make the website accessible offline, a service worker was implemented. It is included in `main.js` and implemented in the file `sw.js`.

## Dependencies
The map inside the app is provided by [Mapbox](https://www.mapbox.com/).

## How to run the application

### Quickstart
View this [GitHub page](https://marlisa31.github.io/restaurant-reviews-app/) for immediate access to the app. The offline functionality can be checked by opening the developer tools > Application > Service Workers and checking the "Offline" checkbox. This simulates the offline state.

### Download
Download the repository. Create a server (for example with [atom-live-server](https://atom.io/packages/atom-live-server) for Atom). Then change the DATABASE_URL() inside `dbhelper.js` according to your port. Just like on the Github page the offline functionality can be checked by opening the developer tools > Application > Service Workers and checking the "Offline" checkbox. This simulates the offline state. As the CSS was converted to SCSS, in order to change it, a SASS-Autocompiler needs to be installed (for example [sass-autocompile](https://atom.io/packages/sass-autocompile) if you work with Atom).
