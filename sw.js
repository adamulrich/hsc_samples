// Change this to your repository name
var GHPATH = '/hsc_samples';
 
// Choose a different app prefix name
var APP_PREFIX = 'hscpwa_';
 
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_01';
 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/admin.html`,
  `${GHPATH}/index.html`,
  `${GHPATH}/project_list.html`,
  `${GHPATH}/project.html`,
  `${GHPATH}/report.html`,
  `${GHPATH}/styles/bootstrap.min.css`,
  `${GHPATH}/styles/project.css`,
  `${GHPATH}/styles/report.css`,
  `${GHPATH}/styles/style.css`,
  `${GHPATH}/scripts/admin.js`,
  `${GHPATH}/scripts/bootstrap.min.js`,
  `${GHPATH}/scripts/html5-qrcode.min.js`,
  `${GHPATH}/scripts/index.js`,
  `${GHPATH}/scripts/project_list.js`,
  `${GHPATH}/scripts/project.js`,
  `${GHPATH}/scripts/report.js`,
  `${GHPATH}/images/at_labs.js`,
  `${GHPATH}/images/icon.png`,
  `${GHPATH}/images/searchicon.png`,
  `${GHPATH}/images/service_authorized.png`,
]