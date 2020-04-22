
# Restaurant Reviews App

## Table of Contents
- [Project overview](#project-overview)
- [Responsiveness](#responsiveness)
- [Accessibility](#accessibility)
- [How to run the application](#how-to-run-the-application)

## Project overview
The basis for this project was a starter kit which was supposed to be improved/extended with regard to Responsiveness, Accessibility and Offline functionalities.

### Responsiveness
The app was made responsive by changing the initial fixed layout into a layout that adjusts to the viewport. For this purpose flexbox was used. To use DRY code and make the styling better to work with, the CSS file was converted into an SCSS file which uses variables and mixins.

### Accessibility
To ensure that the app is accessible for a wide range of users, a few accessibility features were implemented:
- Tabindex was removed from the map as it is an element that can't be accessed properly by a screenreader
- Labels were added to select fields to describe the fields
- Alt-Tags were added to all images with a description of each image

### Offline functionalities
To make the website accessible offline, a service worker was implemented. It is included in `main.js` and implemented in the file `sw.js`.

## How to run the application

### Quickstart
Access this [GitHub page](https://marlisa31.github.io/restaurant-reviews-app/) for immediate access to the app. The offline functionality can be checked by opening the developer tools > Application > Service Workers and checking the "Offline" checkbox.

### Download
Download the repository. Create a server (for example with [atom-live-server](https://atom.io/packages/atom-live-server) if you work with Atom). Then change the DATABASE_URL() inside dbhelper.js according to your port. Just like on the Github page the offline functionality can be checked by opening the developer tools > Application > Service Workers and checking the "Offline" checkbox.
