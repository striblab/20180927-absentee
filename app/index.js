/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */

// Utility functions, such as Pym integration, number formatting,
// and device checking

//import utilsFn from './utils.js';
//utilsFn({ });


// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Utilize templates on the client.  Get the main content template.
//import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  For larger data points,
// utilize window.fetch.  Add the build = true option in the buildData
// options.
//import content from '../content.json';
// OR: let content = await (await window.fetch('./assets/data/content.json')).json();
//
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });

'use strict';

// Dependencies
import utilsFn from './utils.js';
import Chart from './chart.js';
import compareChart from './comparechart.js';
import barChart from './barchart.js';
import ageChart from './agechart.js';
import regionChart from './regionchart.js';
import Map from './map.js';
import Odometer from 'odometer';

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Setup utils function
utilsFn({ });

// import Content from '../templates/_index-content.svelte.html';
// //
// // Get the data parts that are needed.  For larger data points,
// // utilize window.fetch.  Add the build = true option in the buildData
// // options.
// import content from '../content.json';
// // OR: let content = await (await window.fetch('./assets/data/content.json')).json();
// //
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });

(function(){
    const chart0 = new Chart('#chart');
    const chart1 = new compareChart('#chartYear');
    const chart2 = new regionChart('#chartRegion');
    const chart3 = new ageChart('#chartAge');
    const chart4 = new barChart('#chartPrimary');
    const map = new Map("#mapCounties");

    chart0.render();
    chart1.render();
    chart2.render();
    chart3.render();
    chart4.render();
    map.render();

    const VOTE_COUNT = 42552;

    // Make odometer
    let el = document.querySelector('.odometer');

    let od = new Odometer({
      el: el,
      value: 0
    });

    od.update(VOTE_COUNT)
})();

// setTimeout(function(){
//     odometer.update(42552)
//     // odometer.innerHTML = 42552;
// }, 300);

// setTimeout(function(){
//     // $('#odometer').hide();
//     // $('.realNum').removeClass("hidden");
// }, 3300);
