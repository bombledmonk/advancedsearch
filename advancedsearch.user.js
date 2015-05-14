// ==UserScript==
// @name        advancedsearch
// @namespace   advancedsearch
// @description an advanced search
// @include     http://www.digikey.*/product-search*
// @include     http://digikeytest.digikey.*/product-search*
// @include     http://www.digikey.*/scripts/dksearch*
// @include     http://search.digikey.*/*
// @include     http://www.digikey.*/product-detail/en/*
// @include     http://www.digikey.*/product-detail/*/*
// @include     http*digikey.*/classic/Ordering/FastAdd*
// @include     http*digikey.*/short/*
// @exclude     http://www.digikey.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/Highcharts-4.0.4/js/highcharts.js
// @require     https://dl.dropbox.com/u/26263360/script/lib/jquery.localScroll.js
// @require     https://dl.dropbox.com/u/26263360/script/lib/jquery.hoverIntent.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.spellchecker.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/quantities.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.jqpagination.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/dklib/dklib.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/fixedsticky/fixedsticky.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/js/jquery.tooltipster.min.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery_lazyload/jquery.lazyload.min.js
// @resource    buttonCSS https://dl.dropboxusercontent.com/u/26263360/script/css/buttons.css
// @resource    advCSS https://dl.dropboxusercontent.com/u/26263360/script/css/advancedsearch.css
// @resource    normalizeCSS http://yui.yahooapis.com/pure/0.5.0/base.css
// @resource    pureCSS http://yui.yahooapis.com/pure/0.5.0/pure.css
// @resource    fontAwesomeCSS https://dl.dropboxusercontent.com/u/26263360/script/css/font-awesome.css
// @resource    stickyCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/fixedsticky/fixedsticky.css
// @resource    tooltipsterCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/css/tooltipster.css
// @resource    tooltipster-shadowCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/css/themes/tooltipster-shadow.css
// @updateURL   https://goo.gl/vbjoi
// @downloadURL https://bit.ly/advsearch-user-js
// @run-at      document-end
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @version     3.4
// ==/UserScript==

// Copyright (c) 2013, Ben Hest
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met: 

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer. 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution. 

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies, 
// either expressed or implied, of the FreeBSD Project.

//author can be emailed at gmail.com   bombledmonk@


//1.7.3     gave the detail page a softer look, changed the text voltage input helper to be more user friendly
//1.7.6     Download link changed to bit.ly to keep track of downloads. https://dl.dropbox.com/u/26263360/advancedsearch.user.js
//1.7.7     Userscripts.org release http://userscripts.org/scripts/show/157205
//1.7.8     Added more alternate highlighting terms.  ie search for "10k" and all the resistors and pots will be highlighted, 
//          started checkboxes feature, changed the "initially sort by price" feature to re-filter on desired quantity when changed
//1.7.9     Added indexInstantFilter function.  Instantly filter down product families as user types in search box. Disabled by default.
//1.8.0     Added Cart Hover and item count in header.  
//1.8.1     Fixed sort by price @ Qty bug. Improved cart hover. Added price break popup when hovering over prices.
//1.8.2     Added simple column hiding. Refactored code, bug fixes.
//1.8.2.1   Added some error catching code
//1.8.3     Added Hover function to Associated Products Links, For Use With Links, and added a browse and filter function to both spots on the Product detail page.
//1.8.3.1   Fixed Chrome problems by using runat document-end instead of document-start. 
//          Fixed breadcrumbs to include sort order/in stock/lead free/rohs and quantity modifiers
//1.8.4     Added Breadcrumb Category Hover. Made Jump to Category scrollable. Fixed some bugs introduced by styling changes made by DK.
//1.8.5     Added Associated Product Carousel on product detail pages.  Fixed the chrome auto scrolling bug.  Added jquery plugins as "at require".
//          Added Compare Feature
//1.8.6     Added Reverse Filtering from product Detail pages
//1.8.6.1   Added feedback to the reverse filtering and compare features and exposed a more intuitive interface
//1.8.6.2   Fixed issue where multiple product families messed with the Carousel.
//1.8.7     Started bringing in CSS externally, Added wrapping feature for Parameter Multiselect Boxes, Added accordion select box tech demo
//          Added show hidden columns button
//1.8.7.1   New version of compare, pops up from bottom, no more hoverover.
//1.8.7.2   Fixed annoying headers not lining up, 
//1.8.8     Added icons in jump to area
//1.8.8.1   Turned Icons into sprites.  Fixed bugs with carousel. Rearranged some of the Controls menu
//1.8.9     Revamped the cart quantity changing.  Added the main cart page to the script added functionality.
//1.8.9.1   Added pictures to the cart areas.
//1.9.0     Added Explore Mode - gives little popups with pictures of each parameter when hovered
//1.9.0.1   Tweaked Explore Mode - gave a medium preview box in the Explore Mode hover
//2.0.0     Fixed bugs introduced by updates to digikey's site
//2.0.0.1   Fixed more bugs introduced by updates to digikey's site
//2.0.1     Added horizontal scrolling feature to Apply Filters, Added feature allow checkbox inputs to comma separated values in a multiselect input.
//2.0.2     Added Search Within: feature on Drill Down Results Page. Bug Fixes
//2.0.2.1   Hid some lengthy text to improve density
//2.0.3     First Attempt at Internationalizing the script.  In theory it should work on all English digikey websites from now on.
//2.0.3.1   Fixed Sorting bugs
//2.0.4     Fixed the bloated sequential timing to get script loadtime down to 10%, Introduced applied filters removal
//2.0.4.1   Fixed cart bug, added some more speed optimizations. 
//2.0.4.2   Tuned some of the hover over timings.
//2.0.4.3   Fixed No records matching bug.
//2.0.5     Added index column feature, fixed category highlighting with Jump To Category feature
//2.0.5.1   Refined some of the index page features, including column
//2.0.5.2   Added a control for location of quick pick box
//2.0.5.3   Some quick fixes
//2.0.5.4   Refinement of quick pick controls, fixed bug with forward slash in breadcrumb
//2.0.6     Finished wrapping the filters to avoid side scrolling.
//2.0.6.1   Added some more parameter titles to work with the voltage helper, added button to switch on explore mode
//2.0.6.2   Fixed the voltage helper used with wrapping, fixed clear buttons, added control for wrapping divs
//2.0.6.3   Style changes, gray headers
//2.0.7     Polished. Changed style of the filters, input text boxes, fixed buttons, changed the floating apply buttons
//          fixed applyfilters bug, put buttons in tabs
//2.0.7.1   fixed a few display bugs in Chrome
//2.0.7.2   fixed formatFilterResults page error
//2.0.8     added datasheet autoloader
//2.0.8.1   fixed some errors introduced by changes on digikey's website
//2.0.8.2   minor cleanup, error alerts, and fixes
//2.0.8.5   weekend refactoring
//2.0.9     fixed compare parts feature
//2.0.10    fixed error occurring on the detail page where user could not delete parts, added always expand checkbox to wrapping filters
//2.1.0     added customizable delay time for Explore mode in the control panel
//2.1.1     added jump down to datasheet button
//2.1.2     fixed errors where filters cannot be removed
//2.1.3     added back caching for the removable filters
//2.1.4     hopefully fixed errors associated with foreign languages
//2.2       Added query term highlighting on the filter results page, fixed formatting errors introduced by new defualt font. 
//          Changed color of help icon, changes also in CSS
//2.2.1     added null string check to fix bug with query term highlighting
//2.2.2     made the header respond better to different size windows
//2.2.3     added partial .jp support for range search
//2.3       reworked the voltage range search algorithm to include comma separated values
//2.4       Added search button highlighting, fixed so all floating filters appear in-line, added next price break calculator.
//          Fixed errors due to Digi-Key website changes
//2.4.1     Fixed doubling up bug in the quick picks box, fixed stacked explore mode box in chrome
//2.5       Added ORing checkboxes to the package type inputs
//2.5.1     Fixed bug on fastadd page, added quickpaste function on fastadd page
//2.5.2     Code cleanup, added BSD license
//2.6       Quick Fix for Quick Picks update on dk site
//2.6.1     Fix for digikey site bug.
//2.6.2     Added My Digi-Key link
//2.6.3     My Digi-Key link international bug fix
//2.6.4     Fix for Explore mode and example pictures on some sites
//2.7       Fixed issues introduced by cart changes, code cleanup
//2.7.1     Code cleanup, added id
//2.7.2     quick fix
//2.7.3     fixed the uniqueness of the checkbox helper
//2.7.4     fix for new header on dk website.
//2.7.5     fixed bug in the Search Within feature
//2.8       added a more functional associated parts filtering mechanism, 
//          added Hide Identical Columns feature, tweaked instant filter with wildcard search
//2.9       added Column Math and picture carousel 
//2.9.1     added graphing/charting, fixed picture carousel, refining value parser
//2.9.2     refactored associated product, fixed header link bugs, removed beablock blue, various other bug fixes
//2.9.3     hid customers who evaluated box
//2.9.4     added fonts, restyled checkboxes, filter page bug fixes
//2.9.5     fixed bugs in similar to feature, fixed button highlighting problems, style changes
//2.9.6     added clear button rules, worked on speed, sending ot to fix dropbox serving error
//2.9.6.1   chrome fix for selectbox width
//2.9.6.3   fixed bugs in wrap filters area
//2.9.7     handled change in breadcrumbs, styled index page
//2.9.8     Started wizards, added LEDwiz, changed qty form, fixed double fill bug in associated product, moved detail image.
//3.0       Large refactor, fixed price break hover
//3.0.1     Fixed Temperature Range helper
//3.0.2     Fixed European price formatting error, added some icons
//3.1       Started reformatting the Index page
//3.1.1     Fixed indexpicpreview
//3.2       Added Visual Picker, finished header redesign, fixed search focus, added link to category.
//3.3       Added images to families, removed explore mode, improved pick with pictures feature.
//3.4       No longer runs in cart, fixed CSS issues, removed some unused javascript libs

//TODO add hover detail page image to get full sized.
//TODO add a messages/update
//TODO offer no reload, infinite scroll? at end of product index page.
//TODO replace special case * and - with descriptive names [none found], n/a, [info not filled in yet], something better?
//TODO add links to eewiki.net capacitor page
//TODO display percentage of parameter on page, possibly graph  
//TODO think about logging lib, global vars
//TODO move alternate packaging <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//TODO Make graphs into filter inputs. look in drawChart function
//TODO Add graphs to the show pricing curve
//TODO split family names on "\s-\s" and stick into subcats
//TODO Toggle Hide filter block
//TODO Hide individual Filters
//TODO fix associated products hover 'add to cart' button
//TODO add feature to re-search on "no results found" when in stock checkboxes are checked.
//TODO check out IndexedDB for caching
//TODO add images to families
//TODO move Wrap filters function.

// [at]include      http*digikey.*/classic/Orderi2ng/FastAdd* add the fastadd features

var version = GM_info.script.version;
var lastUpdate = '5/14/15';
var downloadLink = 'https://dl.dropbox.com/u/26263360/advancedsearch.user.js';
var DLOG = false; //control detailed logging.
// var MAX_PAGE_LOAD = 20;
// var selectReset = null;
var theTLD = window.location.hostname.replace('digikey.','').replace('www.', '');
var sitemaplink = $('#header').find('a:contains("Site Map"):first').attr('href');
var mydklink = getMyDigiKeyLink();
var gIndexLink = getIndexLink();
var starttimestamp = Date.now();
var sincelast = Date.now();
var cacheflag = false;

var exampleFamilyImages = 
{"/connectors-interconnects/backplane-connectors-accessories/1442688":["http://media.digikey.com/photos/Tyco%20Photos/5-100525-4_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Amp%20Photos/1650106-1_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/202434-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1643279-2_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/100526-9_tmb.JPG","http://media.digikey.com/Photos/EDAC%20Photos/516-230-338_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/818071000101003_tmb.JPG"],"/connectors-interconnects/backplane-connectors-arinc/1442801":["http://media.digikey.com/Photos/TE%20Connectivity/2157540-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2157540-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2157540-1_tmb.JPG"],"/connectors-interconnects/backplane-connectors-contacts/1442674":["http://media.digikey.com/Photos/JAE%20Elect%20Photos/DW1S04KF1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1650146-3_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/030-7380-002_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/148375-1_tmb.jpg","http://media.digikey.com/Photos/Harting/09030006182_tmb.jpg"],"/connectors-interconnects/backplane-connectors-din-41612/1442044":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/650936-5_tmb.jpg","http://media.digikey.com/Photos/Harting/09231486921_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/2-164045-1_tmb.jpg"],"/connectors-interconnects/backplane-connectors-hard-metric-standard/1442880":["http://media.digikey.com/Photos/TE%20Connectivity/5120779-1_tmb.jpg","http://media.digikey.com/Photos/Molex/1713351807_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/5646372-1_tmb.jpg"],"/connectors-interconnects/backplane-connectors-housings/1442770":["http://media.digikey.com/Photos/TE%20Connectivity/201310-3_tmb.jpg","http://media.digikey.com/Photos/Harting/09030009967_tmb.jpg","http://media.digikey.com/Photos/EDAC%20Photos/516-020-000-402_tmb.jpg"],"/connectors-interconnects/backplane-connectors-specialized/1442882":["http://media.digikey.com/Photos/TE%20Connectivity/6469048-1_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/1410968-3_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/FCI-%2089047-102LF_tmb.jpg"],"/connectors-interconnects/banana-and-tip-connectors-accessories/1442700":["http://media.digikey.com/photos/Pomona%20Photos/MFG_4115_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_3862-0_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/3863-0_tmb.jpg"],"/connectors-interconnects/banana-and-tip-connectors-adapters/1442782":["http://media.digikey.com/Photos/EZ%20Hook%20Photos/9406_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/72914-2_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/72917-0_tmb.jpg"],"/connectors-interconnects/banana-and-tip-connectors-binding-posts/1442302":["http://media.digikey.com/Photos/Mueller%20Photos/BU-00283_tmb.JPG","http://media.digikey.com/photos/Emerson%20Network%20Photos/111-0702-001_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/3760-5_tmb.jpg"],"/connectors-interconnects/banana-and-tip-connectors-jacks-plugs/1441927":["http://media.digikey.com/photos/Pomona%20Photos/1825-2_tmb.jpg","http://media.digikey.com/Photos/Emerson%20Network%20Photos/108-0902-001_tmb.jpg","http://media.digikey.com/photos/Mueller%20Photos/BU-PMDP-S-2_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/350180_tmb.jpg","http://media.digikey.com/photos/Emerson%20Network%20Photos/108-0304-001_tmb.jpg","http://media.digikey.com/photos/Emerson%20Network%20Photos/108-2303-801_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_MDP-4_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/6546_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/350180-6_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/1325-9_tmb.jpg"],"/connectors-interconnects/barrel-accessories/1442697":["http://media.digikey.com/Photos/Switchcraft%20Photos/JCAP_tmb.JPG","http://media.digikey.com/photos/Switchcraft%20Photos/K176_tmb.JPG","http://media.digikey.com/Photos/CUI%20Photos/MJ-3502-NUT_tmb.jpg"],"/connectors-interconnects/barrel-audio-adapters/1442777":["http://media.digikey.com/photos/Emerson%20Network%20Photos/19-1702_tmb.jpg","http://media.digikey.com/photos/Switchcraft%20Photos/Switchcraft%20-%20370A_tmb.jpg","http://media.digikey.com/Photos/Switchcraft%20Photos/BPJJ03AUX_tmb.jpg"],"/connectors-interconnects/barrel-audio-connectors/1443095":["http://media.digikey.com/photos/CUI%20Photos/RCJ-012_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/SJ1-3515-SMT-GR_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/SP-3501_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/RCP-013_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/SR-2501_tmb.jpg","http://media.digikey.com/Photos/Tensility%20Intl/MFG_50-00423_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/SJD1-3201-54_tmb.jpg"],"/connectors-interconnects/barrel-power-connectors/1443096":["http://media.digikey.com/photos/CUI%20Photos/MFG_PJ-044BH_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/MFG_PJ-040-SMT_tmb.jpg","http://media.digikey.com/Photos/Memory%20Protection%20Photos/MFG_EJ508A_tmb.jpg","http://media.digikey.com/Photos/Tensility%20Intl/MFG_50-00186_tmb.jpg","http://media.digikey.com/Photos/Memory%20Protection%20Photos/EP501B_tmb.jpg"],"/connectors-interconnects/between-series-adapters/1442774":["http://media.digikey.com/Photos/Pomona%20Photos/72938_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/3777A-2_tmb.jpg","http://media.digikey.com/Photos/Bomar%20Inter%20Photos/R0842_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_21033812400_tmb.jpg","http://media.digikey.com/photos/Molex/88741-8700_tmb.jpg","http://media.digikey.com/Photos/Bomar%20Inter%20Photos/R0849_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_09352410401_tmb.jpg"],"/connectors-interconnects/blade-type-power-connectors/1442716":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/5787446-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1604044-5_tmb.jpg","http://media.digikey.com/Photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/S-306H-CCT_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/1445716-9_tmb.jpg","http://media.digikey.com/Photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/S-302H-CCT_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2199011-1_tmb.jpg"],"/connectors-interconnects/blade-type-power-connectors-accessories/1442722":["http://media.digikey.com/Photos/TE%20Connectivity/647747-2_tmb.jpg","http://media.digikey.com/Photos/Molex/0351500292_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1445960-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1604072-1_tmb.jpg"],"/connectors-interconnects/blade-type-power-connectors-contacts/1443000":["http://media.digikey.com/photos/Molex/43375-0001-C_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/556883-2_tmb.JPG","http://media.digikey.com/Photos/Molex/0357470110_tmb.jpg","http://media.digikey.com/Photos/Molex/0431781001_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Photos/1445995-1_tmb.jpg"],"/connectors-interconnects/blade-type-power-connectors-housings/1442999":["http://media.digikey.com/Photos/TE%20Connectivity/1445957-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1604050-5_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Amp%20Photos/1604037-4_tmb.jpg"],"/connectors-interconnects/card-edge-connectors-accessories/1442698":["http://media.digikey.com/photos/Tyco%20Photos/583764-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/530030-1_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Photos/583691-2_tmb.jpg"],"/connectors-interconnects/card-edge-connectors-contacts/1442691":["http://media.digikey.com/Photos/TE%20Connectivity/61668-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/60151-6_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/5-530517-2_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/583361-3_tmb.JPG"],"/connectors-interconnects/card-edge-connectors-edgeboard-connectors/1441939":["http://media.digikey.com/Photos/Sullins%20Photos/EBC05DRXN_tmb.JPG","http://media.digikey.com/Photos/Samtec%20Photos/MEC1-40%20SERIES_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1651929-1_tmb.jpg"],"/connectors-interconnects/card-edge-connectors-housings/1442706":["http://media.digikey.com/Photos/TE%20Connectivity/583717-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/583680-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2-583859-1_tmb.JPG"],"/connectors-interconnects/circular-connectors/1443097":["http://media.digikey.com/photos/CUI%20Photos/MD2-40ST_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/MFG_1-206934-1_tmb.jpg","http://media.digikey.com/photos/Switchcraft%20Photos/A3F_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/SD-80LS_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/SDR-70_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/HR10-7R-(4,6,)(P,PA)(73)_tmb.jpg"],"/connectors-interconnects/circular-connectors-accessories/1442668":["http://media.digikey.com/photos/Bulgin%20Photos/12237_tmb.JPG","http://media.digikey.com/Photos/ITT%20Cannon/121667-0023_tmb.jpg","http://media.digikey.com/photos/Souriau%20Connection%20Photos/CONN%20UTFD%20SERIES_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/C016%2000V000%20000%2012_tmb.jpg","http://media.digikey.com/photos/LEMO%20Photos/GMA.1B.035.DG_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/48-7190-1_tmb.jpg"],"/connectors-interconnects/circular-connectors-adapters/1442779":["http://media.digikey.com/Photos/Phoenix%20Photos/1507793_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/1559783_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/MFG_1683471_tmb.jpg"],"/connectors-interconnects/circular-connectors-backshells-and-cable-clamps/1442534":["http://media.digikey.com/Photos/Amphenol%20Photos/A8504939S21N_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/058-8578-102_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/206966-7_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/A8504938S11N_tmb.jpg"],"/connectors-interconnects/circular-connectors-contacts/1442669":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/HR10-PC-111_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/HR41-SC-121(01)_tmb.JPG","http://media.digikey.com/photos/Amphenol%20Photos/44-100-1414P-100(101)_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/121668-0125_tmb.jpg"],"/connectors-interconnects/circular-connectors-housings/1442557":["http://media.digikey.com/Photos/TE%20Connectivity/206151-1_tmb.jpg","http://media.digikey.com/photos/Souriau%20Connection%20Photos/UT06104SH_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/192993-0704_tmb.jpg"],"/connectors-interconnects/coaxial-connectors-rf/1443098":["http://media.digikey.com/Photos/TE%20Connectivity/1909763-1_tmb.jpg","http://media.digikey.com/photos/Linx%20Tech%20Photos/CONREVSMA001_tmb.jpg","http://media.digikey.com/photos/Linx%20Tech%20Photos/CONREVSMA002_tmb.jpg"],"/connectors-interconnects/coaxial-connectors-rf-accessories/1442686":["http://media.digikey.com/Photos/Molex/0734151960_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/83-765_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/082-106_tmb.jpg","http://media.digikey.com/Photos/LEMO%20Photos/GBA.00.250.FN_tmb.jpg","http://media.digikey.com/Photos/Emerson%20Network%20Photos/MFG_VSR105_tmb.jpg"],"/connectors-interconnects/coaxial-connectors-rf-adapters/1442775":["http://media.digikey.com/photos/Emerson%20Network%20Photos/134-1019-181_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/172123_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/5-1634532-1_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/1058653-1_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/142248_tmb.JPG"],"/connectors-interconnects/coaxial-connectors-rf-contacts/1442815":["http://media.digikey.com/Photos/TE%20Connectivity/51563-8_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/910661-000_tmb.jpg","http://media.digikey.com/Photos/JAE%20Elect%20Photos/M25P01K9FC_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/601036N002_tmb.jpg"],"/connectors-interconnects/coaxial-connectors-rf-terminators/1442783":["http://media.digikey.com/photos/Amphenol%20Photos/132360_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/46650-51_tmb.jpg","http://media.digikey.com/Photos/Emerson%20Network%20Photos/TNG1-4-78_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/202109_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/142200_tmb.jpg"],"/connectors-interconnects/contacts-leadframe/1442995":["http://media.digikey.com/Photos/TE%20Connectivity/1544394-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1544210-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1544400-1_tmb.JPG"],"/connectors-interconnects/contacts-multi-purpose/1442675":["http://media.digikey.com/photos/TE%20Connectivity/926896-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/66101-4_tmb.JPG","http://media.digikey.com/photos/Souriau%20Connection%20Photos/SM20M-1TK6_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/MULTI-POWERBAND1214-PG_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/AMPLIMITE-109SG_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/745230-4_tmb.JPG"],"/connectors-interconnects/contacts-spring-loaded-and-pressure/1442508":["http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/MFG_331151702562_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1734303-1_tmb.JPG","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/0997-2-50-20-75-14-11-0_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/0900-8-15-20-76-14-11-0_tmb.jpg","http://media.digikey.com/Renders/TE%20Connectivity/Shield%20Finger%200820_tmb.jpg","http://media.digikey.com/Renders/TE%20Connectivity/1551401-4_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/MFG_331171302035_tmb.jpg"],"/connectors-interconnects/d-shaped-connectors-centronics/1443099":["http://media.digikey.com/photos/Norcomp%20Photos/111-014-103L001_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/10114-3000PE_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/5917738-4_tmb.JPG","http://media.digikey.com/photos/FCI%20Photos/71292-001LF_tmb.JPG","http://media.digikey.com/Photos/Molex/0743370016_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/12226-5150-00FR_tmb.JPG"],"/connectors-interconnects/d-sub-connectors/1443100":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/1757819-6_tmb.JPG","http://media.digikey.com/photos/Norcomp%20Photos/172-E09-113R001_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/DAP15S065TLF_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/096510-0042_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-5745967-4_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-1757824-2_tmb.JPG"],"/connectors-interconnects/d-sub-d-shaped-connectors-accessories/1442683":["http://media.digikey.com/photos/FCI%20Photos/86551007TLF_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/552763-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/552100-1_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/DA53750-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/748274-2_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/5-1393561-1_tmb.jpg"],"/connectors-interconnects/d-sub-d-shaped-connectors-adapters/1442776":["http://media.digikey.com/photos/Conec%20Photos/320X12509X_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AB914-F-R_tmb.jpg","http://media.digikey.com/Photos/Harting/096420072_tmb.jpg","http://media.digikey.com/Photos/Emerson%20Network%20Photos/30-9535_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/232016003_tmb.JPG"],"/connectors-interconnects/d-sub-d-shaped-connectors-backshells-hoods/1442709":["http://media.digikey.com/photos/3M%20Photos/10326-52F0-008_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/MDM-BT-37TE-SJS-CAD_tmb.jpg","http://media.digikey.com/photos/Conec%20Photos/165X10149XE_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/569336-1_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/5745175-1_tmb.JPG","http://media.digikey.com/Photos/ITT%20Cannon/044994-0000_tmb.jpg"],"/connectors-interconnects/d-sub-d-shaped-connectors-contacts/1442671":["http://media.digikey.com/Photos/ITT%20Cannon/030-1952-000_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/DM53745-27_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/DM130340-1_tmb.jpg","http://media.digikey.com/Photos/Conec%20Photos/131J14019X_tmb.JPG","http://media.digikey.com/Photos/Molex/0579649702_tmb.jpg"],"/connectors-interconnects/d-sub-d-shaped-connectors-housings/1442558":["http://media.digikey.com/Photos/TE%20Connectivity/205416-1_tmb.jpg","http://media.digikey.com/photos/Norcomp%20Photos/170-025-172-000_tmb.jpg","http://media.digikey.com/Photos/Molex/0511151601_tmb.jpg","http://media.digikey.com/Photos/Molex/0685031602_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/1658649-1_tmb.JPG"],"/connectors-interconnects/ffc-fpc-flat-flexible-connectors/1442849":["http://media.digikey.com/photos/FCI%20Photos/HFW6R-1STE1LF_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/XF2M-1215-1A_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/AYF530635_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/4-1734592-5_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Photos/2-1734592-0_tmb.JPG","http://media.digikey.com/photos/Omron%20Elect%20Photos/XF2L-0825-1A_tmb.jpg"],"/connectors-interconnects/ffc-fpc-flat-flexible-connectors-accessories/1442699":["http://media.digikey.com/Photos/JAE%20Elect%20Photos/FI-X30-LGB-NPB-10000_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/88617-2_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF19G-14S-1F-GND,%20DF19G-14S-1F-GND(05)_tmb.jpg"],"/connectors-interconnects/ffc-fpc-flat-flexible-connectors-contacts/1442690":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-88997-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/86571-6_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/88976-5_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/487923-1_tmb.JPG"],"/connectors-interconnects/ffc-fpc-flat-flexible-connectors-housings/1442840":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/487378-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/3-88179-2_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1-88637-1_tmb.jpg"],"/connectors-interconnects/fiber-optic-connectors/1443101":["http://media.digikey.com/photos/TE%20Connectivity/2148524-2_tmb.jpg","http://media.digikey.com/Photos/Harting/09574420502001_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/AFBR-4526Z_tmb.JPG","http://media.digikey.com/Photos/Industrial%20Fiberoptics%20Photos/510054_tmb.jpg","http://media.digikey.com/Photos/Molex/1060243000_tmb.jpg"],"/connectors-interconnects/fiber-optic-connectors-accessories/1442838":["http://media.digikey.com/Photos/TE%20Connectivity/502128-9_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Amp%20Photos/1918177-1_tmb.jpg","http://media.digikey.com/photos/Souriau%20Connection%20Photos/UTS18DCG2_tmb.jpg"],"/connectors-interconnects/fiber-optic-connectors-adapters/1442805":["http://media.digikey.com/Photos/JAE%20Elect%20Photos/FO-FC-FS(SC)-PBS-R_tmb.JPG","http://media.digikey.com/Photos/Molex/1061230400_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/502136-1_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Amp%20Photos/1828619-1_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/HRFC-A2-SF(41)_tmb.jpg"],"/connectors-interconnects/fiber-optic-connectors-housings/1443124":["http://media.digikey.com/Photos/Assmann%20Photos/A-FB-00BLMA-LL1-R_tmb.jpg","http://media.digikey.com/photos/Souriau%20Connection%20Photos/UTS718LCN_tmb.jpg","http://media.digikey.com/photos/Souriau%20Connection%20Photos/UTS6JC18LCN_tmb.jpg"],"/connectors-interconnects/heavy-duty-connectors-accessories/1442719":["http://media.digikey.com/Photos/TE%20Connectivity/1103436-1_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/1637265_tmb.jpg","http://media.digikey.com/Photos/Harting/09140009929_tmb.jpg","http://media.digikey.com/Photos/Harting/09120129901_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_11051052804_tmb.jpg","http://media.digikey.com/Photos/Harting/09300009901_tmb.jpg"],"/connectors-interconnects/heavy-duty-connectors-assemblies/1442665":["http://media.digikey.com/Photos/Phoenix%20Photos/1607143_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/C14610E0249551M_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1602216_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/1108846-1_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1641604_tmb.jpg"],"/connectors-interconnects/heavy-duty-connectors-contacts/1442677":["http://media.digikey.com/photos/Harting/09332006116_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2-1105151-1_tmb.jpg","http://media.digikey.com/Photos/Harting/09140006121_tmb.jpg","http://media.digikey.com/photos/Harting/09332006217_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1884092_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/1663530_TMB.jpg"],"/connectors-interconnects/heavy-duty-connectors-frames/1442724":["http://media.digikey.com/Photos/Harting/11006000101_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/1852985_tmb.JPG","http://media.digikey.com/Photos/Harting/09140160311_tmb.jpg"],"/connectors-interconnects/heavy-duty-connectors-housings-hoods-bases/1442725":["http://media.digikey.com/Photos/Harting/MFG_19300100527_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/MFG_1772133_tmb.jpg","http://media.digikey.com/Photos/Harting/09620031440_tmb.jpg","http://media.digikey.com/Photos/Harting/11200031400_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_19411160523_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_09300100901_tmb.jpg"],"/connectors-interconnects/heavy-duty-connectors-inserts-modules/1442723":["http://media.digikey.com/Photos/Harting/09140173101_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1103015-2_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/C146%2010A005%20500%2012_tmb.JPG","http://media.digikey.com/Photos/Harting/MFG_09120062663_tmb.jpg","http://media.digikey.com/Photos/Harting/09330064729_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_09140203001_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1103432-1_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/2-1103006-3_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_09140014701_tmb.jpg"],"/connectors-interconnects/keystone-accessories/1443038":["http://media.digikey.com/Photos/TE%20Connectivity/558198-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/406091-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1479506-1_tmb.jpg"],"/connectors-interconnects/keystone-faceplates-frames/1443039":["http://media.digikey.com/Photos/TE%20Connectivity/1-2111025-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1116697-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1-2111042-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/558191-1_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/CBWH_tmb.jpg"],"/connectors-interconnects/keystone-inserts/1443040":["http://media.digikey.com/Photos/TE%20Connectivity/1-1499855-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/406372-6_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/2111615-2_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/1-1479232-3_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/1339189-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1375123-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/558861-2_tmb.jpg"],"/connectors-interconnects/lgh-connectors/1443102":["http://media.digikey.com/Photos/TE%20Connectivity/5-861610-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/867157-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/865594-1_tmb.jpg"],"/connectors-interconnects/memory-connectors-accessories/1442701":["http://media.digikey.com/Photos/JAE%20Elect%20Photos/MM60-EZH039-B5-R850_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/5535664-1_tmb.JPG","http://media.digikey.com/Photos/JAE%20Elect%20Photos/PX10FS02PH_tmb.jpg","http://media.digikey.com/Photos/JAE%20Elect%20Photos/MFG_NT4_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3505-34_tmb.jpg"],"/connectors-interconnects/memory-connectors-inline-module-sockets/1442984":["http://media.digikey.com/Photos/TE%20Connectivity/1735251-3_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/5822138-4_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/1473005-1_tmb.JPG"],"/connectors-interconnects/memory-connectors-pc-cards/1442985":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/MFG_DM3BT-DSF-PEJS_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/009162006501150_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/693061010911_tmb.jpg"],"/connectors-interconnects/modular-connectors-accessories/1443103":["http://media.digikey.com/Photos/TE%20Connectivity/569875-4_tmb.JPG","http://media.digikey.com/photos/Amphenol%20Photos/RJFC2B_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1407410_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/558211-3_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-1546407-1_tmb.jpg"],"/connectors-interconnects/modular-connectors-adapters/1442780":["http://media.digikey.com/photos/Amphenol%20Photos/RJF62A1N_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/AMK-0026_tmb.jpg","http://media.digikey.com/Photos/Conec%20Photos/33TS3101S-88N_tmb.jpg"],"/connectors-interconnects/modular-connectors-jacks/1442740":["http://media.digikey.com/photos/FCI%20Photos/54602-908LF_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/5569381-1_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/TM21R-5B-3232D-LP_tmb.jpg"],"/connectors-interconnects/modular-connectors-jacks-with-magnetics/1442739":["http://media.digikey.com/photos/Pulse%20Photos/JY0-0016NL_tmb.jpg","http://media.digikey.com/photos/Pulse%20Photos/J20-0014_tmb.jpg","http://media.digikey.com/Photos/Bel%20Photos/S811-1X1T-36-F_tmb.jpg"],"/connectors-interconnects/modular-connectors-plug-housings/1442873":["http://media.digikey.com/photos/Amphenol%20Photos/RJFTV6MN_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/MFG_1688696_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/ID550000_tmb.jpg"],"/connectors-interconnects/modular-connectors-plugs/1442741":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-1761184-1,%205-1761184-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/CONN%208-8%20FIG2_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_09352250421_tmb.jpg"],"/connectors-interconnects/photovoltaic-solar-panel-connectors/1442662":["http://media.digikey.com/Photos/Amphenol%20Photos/H4CMC4DI_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/2-1971861-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1740210-7_tmb.jpg"],"/connectors-interconnects/photovoltaic-solar-panel-connectors-accessories/1443033":["http://media.digikey.com/Photos/Amphenol%20Photos/HGLUI_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/MFG_1954381-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1954381-1_tmb.jpg"],"/connectors-interconnects/photovoltaic-solar-panel-connectors-contacts/1443032":["http://media.digikey.com/Photos/TE%20Connectivity/1987280-2_tmb.jpg","http://media.digikey.com/Photos/Molex/01301970347_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1987280-1_tmb.jpg"],"/connectors-interconnects/pluggable-connectors/1443104":["http://media.digikey.com/photos/3M%20Photos/5607-5102-SH_tmb.JPG","http://media.digikey.com/photos/Molex/0678008025_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1-2007637-8_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2007464-3_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/ue75-a20-6000t_tmb.JPG"],"/connectors-interconnects/pluggable-connectors-accessories/1442694":["http://media.digikey.com/Photos/TE%20Connectivity/1761394-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1367627-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2180467-1_tmb.JPG"],"/connectors-interconnects/power-entry-connectors-accessories/1442685":["http://media.digikey.com/Photos/Schurter%20Photos/0859.0109_tmb.JPG","http://media.digikey.com/photos/Qualtek%20Photos/730B-00%5E00,730-00%5E05,732-00%5E00_tmb.JPG","http://media.digikey.com/Photos/Schurter%20Photos/4305.0006_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/206638-2_tmb.JPG","http://media.digikey.com/Photos/Molex/1300190001_tmb.jpg"],"/connectors-interconnects/power-entry-connectors-inlets-outlets-modules-filtered/1441850":["http://media.digikey.com/photos/Tyco%20Corcom%20Photos/EC1,ED1,ED1C%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/PE0S0DH60_tmb.jpg","http://media.digikey.com/photos/Schurter%20Photos/MFG_DD12%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Schaffner%20EMC%20Photos/FN9244x-xx-xx%20SERIES_tmb.jpg"],"/connectors-interconnects/power-entry-connectors-inlets-outlets-modules-unfiltered/1442743":["http://media.digikey.com/photos/Schurter%20Photos/4300.0098_tmb.jpg","http://media.digikey.com/Photos/Schurter%20Photos/4300.0702_tmb.jpg","http://media.digikey.com/photos/Schurter%20Photos/DC11.0001.203_tmb.jpg","http://media.digikey.com/Photos/Schurter%20Photos/0909.0001_tmb.jpg","http://media.digikey.com/Photos/Schurter%20Photos/0909.0031_tmb.jpg","http://media.digikey.com/photos/Bulgin%20Photos/PX0686%5ESE_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/6VM4S_tmb.jpg"],"/connectors-interconnects/rectangular-board-to-board-connectors-accessories/1442721":["http://media.digikey.com/Photos/TE%20Connectivity/534164-2_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/530341-3_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/EX-SG_tmb.jpg"],"/connectors-interconnects/rectangular-board-to-board-connectors-arrays-edge-type-mezzanine/1442154":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF17(4.0)20DP0.5V(51_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/DF40C-10DP-0.4V(51)_tmb.JPG","http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF17(4.0)40DS0.5V(51)_tmb.jpg"],"/connectors-interconnects/rectangular-board-to-board-connectors-board-spacers-stackers/1442852":["http://media.digikey.com/Photos/Harwin/M22-2660505_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/924327-28-10-I_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/5-146494-3_tmb.JPG"],"/connectors-interconnects/rectangular-board-to-board-connectors-headers-receptacles-female-sockets/1442673":["http://media.digikey.com/photos/FCI%20Photos/71991-305LF_tmb.JPG","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/801-43-0xx-40-002000_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/969973-3_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/2102080-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/215297-2_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/801-43-005-40-002000_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-accessories/1442684":["http://media.digikey.com/photos/Tyco%20Photos/794270-1_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/794279-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/917699-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/350523-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1924487-2_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/MFG_AW3S_tmb.jpg"],"/connectors-interconnects/rectangular-connectors-adapters/1442781":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF11-6DEP-2A_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/292254-7_tmb.JPG","http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF11-26DEP-2A_tmb.jpg","http://media.digikey.com/Photos/JST%20Photos/B6B-PH-TW-S(LF)(SN)_tmb.jpg"],"/connectors-interconnects/rectangular-connectors-board-in-direct-wire-to-board/1442553":["http://media.digikey.com/Photos/TE%20Connectivity/3-2106003-2_tmb.jpg","http://media.digikey.com/Photos/AVX%20Photos/009296002553906_tmb.jpg","http://media.digikey.com/Photos/CnC%20Tech/3240-10-00_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-contacts/1442670":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF11-2428SC_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/353716-2_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/77138-101LF_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/350218-1_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/350536-1_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-free-hanging-panel-mount/1442549":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/102393-5,%20102398-5,%20102694-5,%20102448-5_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/640621-2,%203-640621-2_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/89110-0101_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/8-215083-0_tmb.JPG","http://media.digikey.com/Photos/Harwin/MFG_M80-8881005_tmb.jpg"],"/connectors-interconnects/rectangular-connectors-headers-male-pins/1442547":["http://media.digikey.com/Photos/On%20Shore%20Technology%20Photos/302-S101_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/640445-4,%20644752-4_tmb.jpg","http://media.digikey.com/photos/Sullins%20Photos/GRPB051VWVN-RC_tmb.JPG","http://media.digikey.com/photos/FCI%20Photos/68021-210HLF_tmb.JPG","http://media.digikey.com/photos/FCI%20Photos/98424-G52-14ALF_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/95278-101A06LF_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/794636-4,%20794638-4_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/98424-G52-10ALF_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-headers-receptacles-female-sockets/1442548":["http://media.digikey.com/photos/Sullins%20Photos/SFH11-PBPC-D05-ST-BK_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/(7)188275-8_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/643234-1_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/ST60-10P_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/929974-01-XX,%20929850-01-XX_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/8516-4500PL_tmb.jpg"],"/connectors-interconnects/rectangular-connectors-headers-specialty-pin/1442554":["http://media.digikey.com/photos/Aries/08-600-10_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/MFG_342-10-104-00-591000_tmb.jpg","http://media.digikey.com/photos/Aries/10-680-191T_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/614-CG1_tmb.JPG","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/162-40-620-00-180000_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-housings/1442556":["http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF13-4S-1.25C_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/282087-1_tmb.jpg","http://media.digikey.com/Photos/JAE%20Elect%20Photos/IL-G-5S-S3C2-SA_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/776273-1_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/65240-002LF_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF11-10DS-2C_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-480699-2_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/DF13-10DS-1.25C_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/350778-1_tmb.JPG"],"/connectors-interconnects/rectangular-connectors-spring-loaded/1442900":["http://media.digikey.com/Photos/Bourns%20Photos/70ABJ-2-M0E_tmb.jpg","http://media.digikey.com/Photos/Preci-Dip%20Photos/813-SS-006-30-003191_tmb.JPG","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/319-10-104-00-006000_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/70AAJ-4-M0_tmb.jpg","http://media.digikey.com/Photos/AVX%20Photos/70-9155%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/70ABJ-4-F0E_tmb.jpg"],"/connectors-interconnects/shunts-jumpers/1441960":["http://media.digikey.com/photos/Sullins%20Photos/SPN02SYBN-RC_tmb.jpg","http://media.digikey.com/Photos/Harwin/MFG_S1621-06R_tmb.jpg","http://media.digikey.com/Photos/Harwin/D3080-05_tmb.jpg","http://media.digikey.com/Photos/Harwin/M7685-05_tmb.jpg","http://media.digikey.com/Photos/Harwin/D3088-97_tmb.jpg"],"/connectors-interconnects/sockets-for-ics-transistors/1442972":["http://media.digikey.com/photos/Assmann%20Photos/AR08-HZL-TT-R_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/940-44-028-24-000000_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/216-7383-55-1902_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/240-1280-00-0602J_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/0804MC_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/A08-LC-TT-R_tmb.jpg"],"/connectors-interconnects/sockets-for-ics-transistors-accessories/1442973":["http://media.digikey.com/photos/3M%20Photos/300-6300-CNA-0002B_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/268-5401-52-0000_tmb.jpg","http://media.digikey.com/Photos/Molex/MFG_1051428100_tmb.jpg"],"/connectors-interconnects/sockets-for-ics-transistors-adapters/1442974":["http://media.digikey.com/photos/Aries/08-350000-11-RC_tmb.jpg","http://media.digikey.com/Photos/Aries/1109814_tmb.jpg","http://media.digikey.com/Photos/Aries/LCQT-QFP0.5-40-1_tmb.jpg","http://media.digikey.com/Photos/Aries/LCQT-TSSOP14_tmb.jpg"],"/connectors-interconnects/solid-state-lighting-connectors/1443105":["http://media.digikey.com/Photos/FCI%20Photos/10120045-400LF_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2106123-1_tmb.jpg","http://media.digikey.com/Photos/Molex/MFG_1041880210_tmb.jpg","http://media.digikey.com/Photos/JST%20Photos/01P-LEBSS-TF%28LF%29%28SN%29_tmb.jpg","http://media.digikey.com/Photos/AVX%20Photos/709296001003006_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/009177002022006_tmb.JPG"],"/connectors-interconnects/solid-state-lighting-connectors-accessories/1443049":["http://media.digikey.com/Photos/TE%20Connectivity/293596-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/293130-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/293300-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/293481-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1-293607-2_tmb.JPG"],"/connectors-interconnects/terminal-blocks-accessories/1442286":["http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/691399900002_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/1963620000_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/5602112_tmb.JPG","http://media.digikey.com/photos/Weidmuller/1061200000_tmb.jpg","http://media.digikey.com/Photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/QC-1_tmb.jpg","http://media.digikey.com/photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/Y-142_tmb.jpg"],"/connectors-interconnects/terminal-blocks-accessories-jumpers/1442787":["http://media.digikey.com/photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/141J-1_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/3005947_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/475142_tmb.jpg","http://media.digikey.com/photos/Cinch%20Connectors%20Waldom%20Elect%20Photos/95B_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/5029031_tmb.JPG","http://media.digikey.com/photos/Weidmuller/1054960000_tmb.jpg"],"/connectors-interconnects/terminal-blocks-accessories-marker-strips/1442786":["http://media.digikey.com/photos/Panduit%20Corp%20Photos/TCT-13PO,%20TCT-14PO,%20TCT-15PO_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/10510290041_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/3047332_tmb.JPG"],"/connectors-interconnects/terminal-blocks-accessories-wire-ferrules/1442733":["http://media.digikey.com/photos/American%20Elect%20Photos/13101025_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/12910400_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/966144-2_tmb.JPG","http://media.digikey.com/photos/American%20Elect%20Photos/1182010_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/11122025_tmb.JPG"],"/connectors-interconnects/terminal-blocks-adapters/1442572":["http://media.digikey.com/Photos/Phoenix%20Photos/2287135_tmb.JPG","http://media.digikey.com/photos/Weidmuller/9915480000_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2298069_tmb.jpg"],"/connectors-interconnects/terminal-blocks-barrier-blocks/1442748":["http://media.digikey.com/Photos/TE%20Connectivity/4DB-P107-02_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1776295-3_tmb.JPG","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/NDN111-WH_tmb.jpg"],"/connectors-interconnects/terminal-blocks-contacts/1442682":["http://media.digikey.com/photos/Phoenix%20Photos/MSTBC%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/3190580_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/3190438_tmb.JPG"],"/connectors-interconnects/terminal-blocks-din-rail-channel/1442749":["http://media.digikey.com/Photos/Weidmuller/0661260000_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/3048030_tmb.jpg","http://media.digikey.com/photos/Weidmuller/1010300000_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/MFG_0311087_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/3045127_tmb.JPG"],"/connectors-interconnects/terminal-blocks-headers-plugs-and-sockets/1442750":["http://media.digikey.com/photos/On%20Shore%20Technology%20Photos/PLUG%205,%205.08%20MM%202%20POS_tmb.jpg","http://media.digikey.com/Photos/On%20Shore%20Technology%20Photos/OSTOQ027151_tmb.jpg","http://media.digikey.com/photos/Weidmuller/1277900000_tmb.jpg"],"/connectors-interconnects/terminal-blocks-interface-modules/1443046":["http://media.digikey.com/photos/Phoenix%20Photos/2322414_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2901646_tmb.JPG","http://media.digikey.com/photos/Phoenix%20Photos/2968470_tmb.jpg"],"/connectors-interconnects/terminal-blocks-panel-mount/1443037":["http://media.digikey.com/photos/Phoenix%20Photos/1840557_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/1936830000_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/1785184_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1703454_tmb.JPG","http://media.digikey.com/photos/Phoenix%20Photos/0707251_tmb.jpg"],"/connectors-interconnects/terminal-blocks-power-distribution/1442977":["http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/16021-2_tmb.jpg","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/11725-4_tmb.jpg","http://media.digikey.com/Photos/Eaton%20Bussmann/11675-4_tmb.JPG","http://media.digikey.com/Photos/Weidmuller/1939480000_tmb.JPG"],"/connectors-interconnects/terminal-blocks-specialized/1443052":["http://media.digikey.com/Photos/Phoenix%20Photos/1788758_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/3121025_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/3050086_tmb.jpg"],"/connectors-interconnects/terminal-blocks-wire-to-board/1442751":["http://media.digikey.com/photos/On%20Shore%20Technology%20Photos/EDZ250%5E2_tmb.jpg","http://media.digikey.com/photos/On%20Shore%20Technology%20Photos/ED3000%5E3_tmb.JPG","http://media.digikey.com/photos/On%20Shore%20Technology%20Photos/ED550%5E3DS_tmb.JPG","http://media.digikey.com/photos/On%20Shore%20Technology%20Photos/ED790%5E8_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/1594540000_tmb.JPG","http://media.digikey.com/Photos/On%20Shore%20Technology%20Photos/OSTHD050080_tmb.jpg"],"/connectors-interconnects/terminal-junction-systems/1443021":["http://media.digikey.com/Photos/Amphenol%20Photos/LMD-3005-S_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/M39029%5E1-100_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/LMD-4005-P_tmb.JPG","http://media.digikey.com/Photos/Amphenol%20Photos/LMD-4008-36L_tmb.JPG","http://media.digikey.com/Photos/Amphenol%20Photos/LMD-3003-P_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/LMD-3004-P_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/LMD-4120-96LD_tmb.JPG"],"/connectors-interconnects/terminal-strips-and-turret-boards/1442011":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/857_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/836_tmb.JPG","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/840_tmb.jpg"],"/connectors-interconnects/terminals-accessories/1442994":["http://media.digikey.com/Photos/Hirose%20Elect%20Photos/EF1-38-8_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/EF1-38-14_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/EF1-38-22_tmb.jpg"],"/connectors-interconnects/terminals-adapters/1442878":["http://media.digikey.com/photos/3M%20Photos/MA250DMMFK%20(BULK)_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/61810-2_tmb.JPG","http://media.digikey.com/Photos/Pomona%20Photos/73086-0_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/73086-2_tmb.jpg","http://media.digikey.com/Photos/Molex/0190430010_tmb.jpg"],"/connectors-interconnects/terminals-barrel-bullet-connectors/1442843":["http://media.digikey.com/photos/Tyco%20Amp%20Photos/640024-1,%20640259-1_tmb.jpg","http://media.digikey.com/Photos/Molex/0002081101_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/42745-2_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/MNG18-156DFIK_tmb.jpg","http://media.digikey.com/photos/Molex/19034-0009_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/60017-3_tmb.JPG"],"/connectors-interconnects/terminals-foil-connectors/1442871":["http://media.digikey.com/Photos/Tyco%20Photos/329860-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/330005_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/553454-1_tmb.JPG"],"/connectors-interconnects/terminals-housings-boots/1442645":["http://media.digikey.com/Photos/TE%20Connectivity/180908-5_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/1-521498-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/521119-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/170823-4_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/521295-1_tmb.jpg"],"/connectors-interconnects/terminals-knife-connectors/1442877":["http://media.digikey.com/photos/Tyco%20Photos/32446_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/320555_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/3240015_tmb.JPG"],"/connectors-interconnects/terminals-magnetic-wire-connectors/1442703":["http://media.digikey.com/Photos/Tyco%20Photos/62304-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/62526-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/6-1601046-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/4-1601009-4_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/053-001-000_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Photos/41770_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/4-1601028-2_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/62928-1_tmb.JPG"],"/connectors-interconnects/terminals-pc-pin-receptacles-socket-connectors/1442577":["http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/0340-0-15-15-34-27-10-0_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/5050865-3_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/0337-0-67-80-15-27-10-0_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/0342-0-15-15-42-27-10-0_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/8947-0-15-15-10-27-10-0_tmb.jpg"],"/connectors-interconnects/terminals-pc-pin-single-post-connectors/1442576":["http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/3301-2-14-21-00-00-08-0_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/60803-1_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/3912-0-01-15-00-00-08-0_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/61137-1_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/9022-0-00-15-00-00-33-0_tmb.JPG","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/2352-2-01-44-00-00-07-0_tmb.jpg","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/7937-0-00-15-00-00-03-0_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/11155_tmb.JPG"],"/connectors-interconnects/terminals-quick-connects-quick-disconnect-connectors/1442842":["http://media.digikey.com/Photos/TE%20Connectivity/MFG_61818-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/63824-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2-52012_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/9-160583-5_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/61070-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2-520102-2_tmb.jpg"],"/connectors-interconnects/terminals-rectangular-connectors/1442845":["http://media.digikey.com/Photos/Tyco%20Photos/325605_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/2-327950-1_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/LAMA2%5E0-14-QY_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/327289_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/CX125-14SL-QY_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/325614_tmb.jpg"],"/connectors-interconnects/terminals-ring-connectors/1442844":["http://media.digikey.com/Photos/TE%20Connectivity/160344-2_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/61793-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/MFG_2-320306-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/36152_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/33458_tmb.JPG"],"/connectors-interconnects/terminals-screw-connectors/1442846":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/7702,%208189_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/7461057_tmb.jpg","http://media.digikey.com/photos/Wurth%20Electronics%20Photos/7466214_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/1293_tmb.JPG","http://media.digikey.com/photos/Wurth%20Electronics%20Photos/7466103_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/1206_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/8189_tmb.jpg"],"/connectors-interconnects/terminals-solder-lug-connectors/1442863":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/7311_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/7328,%207329_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/4000,%204001_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/903,%20904,%20905_tmb.jpg"],"/connectors-interconnects/terminals-spade-connectors/1442841":["http://media.digikey.com/photos/Tyco%20Photos/60445-2_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/42339-2_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/34155_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/2-34118-2_tmb.jpg","http://media.digikey.com/Photos/Tyco%20Photos/60390-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/320862_tmb.jpg"],"/connectors-interconnects/terminals-specialized-connectors/1442714":["http://media.digikey.com/Photos/TE%20Connectivity/1643903-1_tmb.JPG","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/C1938-1_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/61165-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1926671-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/63895-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/520936-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/350189-2_tmb.JPG"],"/connectors-interconnects/terminals-turret-connectors/1442667":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/1502-2_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/2101-3-00-80-00-00-07-0_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/2352_tmb.JPG","http://media.digikey.com/photos/Harwin/H2039-01_tmb.jpg","http://media.digikey.com/photos/Mill-Max%20Mfg%20Photos/0700-0-00-15-00-00-03-0_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/11100_tmb.JPG"],"/connectors-interconnects/terminals-wire-pin-connectors/1442847":["http://media.digikey.com/Photos/TE%20Connectivity/165140_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/165046_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/925667-2_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/736014_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/131332_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/165143_tmb.JPG"],"/connectors-interconnects/terminals-wire-splice-connectors/1441974":["http://media.digikey.com/Photos/TE%20Connectivity/926933-2_tmb.JPG","http://media.digikey.com/photos/Molex/19154-0004_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/558%20(BOXED)_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/UR%20(BOXED)_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/36959_tmb.JPG","http://media.digikey.com/Photos/Tyco%20Photos/60932-2_tmb.jpg","http://media.digikey.com/photos/Molex/19160-0012_tmb.jpg","http://media.digikey.com/Photos/Molex/0194300004_tmb.JPG"],"/connectors-interconnects/terminals-wire-to-board-connectors/1442848":["http://media.digikey.com/Photos/Tyco%20Amp%20Photos/3-770060-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/172781-2_tmb.JPG","http://media.digikey.com/Photos/Harting/09080007124_tmb.jpg","http://media.digikey.com/photos/JST%20Photos/SIN-61T-2.6S_tmb.JPG"],"/connectors-interconnects/usb-dvi-hdmi-connectors/1442532":["http://media.digikey.com/Photos/FCI%20Photos/10117835-001LF_tmb.jpg","http://media.digikey.com/photos/FCI%20Photos/10029449-001RLF_tmb.jpg","http://media.digikey.com/Photos/Molex/0743232033_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2007435-3_tmb.jpg","http://media.digikey.com/Photos/Bulgin%20Photos/PX0458_tmb.jpg","http://media.digikey.com/Photos/Molex/0539840671_tmb.jpg","http://media.digikey.com/Photos/Conec%20Photos/33UBAR-TSN1R_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/ZX62WRD-B-5PC_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1734372-1_tmb.jpg"],"/connectors-interconnects/usb-dvi-hdmi-connectors-accessories/1442695":["http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/726141001_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/USBFTVC2G_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/A-USBPA-HOOD-BLK-R_tmb.jpg"],"/connectors-interconnects/usb-dvi-hdmi-connectors-adapters/1442778":["http://media.digikey.com/photos/Assmann%20Photos/A-USB-4_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AB567-R_tmb.jpg","http://media.digikey.com/photos/Bulgin%20Photos/PX0848%5EA_tmb.JPG"],"/switches/accessories/1114196":["http://media.digikey.com/photos/Grayhill%20Photos/947705-012_tmb.jpg","http://media.digikey.com/Photos/CW%20Ind%20Photos/GT-4R_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/A01YL1_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/700302202_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/363C1AAAA_tmb.JPG","http://media.digikey.com/Photos/Electroswitch/6600-63-03_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/79218454_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_AT611-12V_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/AT202_tmb.jpg"],"/switches/accessories-caps/1115298":["http://media.digikey.com/photos/Omron%20Elect%20Photos/B32-1020_tmb.jpg","http://media.digikey.com/Photos/Mec%20Switches/1ZW09136118_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/KRR26NXXXX13_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_AT4151H_tmb.jpg","http://media.digikey.com/photos/Mec%20Switches/1V08_tmb.JPG","http://media.digikey.com/Photos/Mec%20Switches/1RS096_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_AT4158JC_tmb.jpg"],"/switches/configurable-switch-components-body/1115073":["http://media.digikey.com/photos/CK%20Comp%20Photos/1.30074.8210000_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/1.30070.0011607_tmb.JPG","http://media.digikey.com/Photos/Omron%20Elect%20Photos/A22RL-TR-A_tmb.jpg","http://media.digikey.com/photos/Omron%20Auto/A22K-2M_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/A22RS-2A_tmb.jpg"],"/switches/configurable-switch-components-contact-block/1115074":["http://media.digikey.com/photos/CK%20Comp%20Photos/5.00100.1430000_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/A0154B_tmb.jpg","http://media.digikey.com/photos/Omron%20Auto/A22-01A_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/A22R-02M_tmb.jpg"],"/switches/configurable-switch-components-illumination-source/1115075":["http://media.digikey.com/photos/CK%20Comp%20Photos/1.90060.1370000_tmb.JPG","http://media.digikey.com/Photos/Omron%20Auto/A22R-6AY_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/A0142M2_tmb.JPG"],"/switches/configurable-switch-components-lens/1115076":["http://media.digikey.com/photos/CK%20Comp%20Photos/5.49263.0140300_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/5.49263.0140600_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/5.49263.0140400_tmb.jpg"],"/switches/dip-switches/1114203":["http://media.digikey.com/photos/Tyco%20Alcoswitch%20Photos/ADE04_tmb.jpg","http://media.digikey.com/Photos/CK%20Comp%20Photos/RTE0400G04_tmb.jpg","http://media.digikey.com/photos/Copal%20Photos/SD-2011_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/BPA02SB_tmb.jpg","http://media.digikey.com/photos/Grayhill%20Photos/94HBB08T_tmb.jpg","http://media.digikey.com/Photos/CK%20Comp%20Photos/RW-1106%20NS%20RT_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/PT65521_tmb.JPG"],"/switches/keylock-switches/1114205":["http://media.digikey.com/photos/Grayhill%20Photos/44L45-01-1-07N_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/A22K-3AC-11_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/CK-L1-TW01%20SERIES_tmb.jpg"],"/switches/keypad-switches/1114213":["http://media.digikey.com/Photos/Storm%20Interface%20Photos/MFG_7202-12T0203_tmb.jpg","http://media.digikey.com/Photos/Storm%20Interface%20Photos/FT2K0503_tmb.jpg","http://media.digikey.com/photos/Storm%20Interface%20Photos/1K12T103_tmb.jpg"],"/switches/magnetic-reed-switches/1114199":["http://media.digikey.com/Photos/Standex-Meder%20Electronics/MK23-80-B-4_tmb.JPG","http://media.digikey.com/Photos/Coto%20Tech%20Photos/CT10-Series-Gull-Wing-Molded-Body_tmb.jpg","http://media.digikey.com/Photos/Meder%20Electronics%20Photos/MK24-B-2-OE_tmb.jpg","http://media.digikey.com/photos/Magnasphere%20Photos/MG-B2-20-S_tmb.jpg","http://media.digikey.com/Photos/Meder%20Electronics%20Photos/MK06-5-C_tmb.jpg"],"/switches/navigation-switches-joystick/1114837":["http://media.digikey.com/Photos/APEM%20Comp%20Photos/HF-11_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/HTW-00-RED_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/HG-432IS000-T-U_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/CK_QS_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/Bullet%20Handle_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/MS-54W00S000_tmb.jpg","http://media.digikey.com/Photos/CH%20Products/BD140D01GR0000_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/CK_AR3S-01_tmb.jpg"],"/switches/programmable-display-switches/1115370":["http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_ISC15ANP4_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/MFG_IS15ABCP4CF_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/MFG_IS15DBFP4RGB_tmb.jpg"],"/switches/pushbutton-switches/1114209":["http://media.digikey.com/photos/CK%20Comp%20Photos/PVA2%20OA%20H4_tmb.jpg","http://media.digikey.com/photos/Grayhill%20Photos/30-101_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/EP11SD1SA1BE_tmb.JPG","http://media.digikey.com/photos/E-Switch%20Photos/5501M2X_tmb.jpg","http://media.digikey.com/photos/Tyco%20Alcoswitch%20Photos/TP11CGRA0_tmb.jpg","http://media.digikey.com/photos/E-Switch%20Photos/5501M11_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/MFG_ES%20Series(2%20N.C.)_tmb.jpg","http://media.digikey.com/photos/Judco%20Mfg%20Photos/50-0014-00_tmb.jpg","http://media.digikey.com/Photos/Bulgin%20Photos/MPI002%5ETERM%5EWH_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/1.14001.5030000_tmb.jpg"],"/switches/rocker-switches/1114204":["http://media.digikey.com/photos/Cherry%20Switch%20Photos/RRA22H3FBRNN_tmb.jpg","http://media.digikey.com/photos/E-Switch%20Photos/R1966ABLKBLKFR_tmb.jpg","http://media.digikey.com/photos/Carling%20Technologies%20Photos/V8D2UHNB-AAC00-000_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/E105J1V3BE2_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_GW12LCP-RO_tmb.jpg"],"/switches/rotary-switches/1114210":["http://media.digikey.com/Photos/TE%20Connectivity/2-435097-1_tmb.JPG","http://media.digikey.com/photos/Electroswitch/C7D0224N-C_tmb.jpg","http://media.digikey.com/Photos/Grayhill%20Photos/75AP36-01-2-04N_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2-435167-1_tmb.JPG","http://media.digikey.com/Photos/NKK%20Switches%20Photos/HS16-5SN-RO_tmb.jpg","http://media.digikey.com/photos/Grayhill%20Photos/71BD30-01-1-AJN,%2071BD30-01-2-AJN_tmb.jpg"],"/switches/selector-switches/1114766":["http://media.digikey.com/Photos/Omron%20Auto/A22RS-3A-20_tmb.JPG","http://media.digikey.com/Photos/Carling%20Technologies%20Photos/MFG_V-Series_tmb.jpg","http://media.digikey.com/Photos/Schurter%20Photos/0033.4504_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/a165w-a2mr-24d-2_tmb.JPG"],"/switches/slide-switches/1115393":["http://media.digikey.com/photos/Tyco%20Alcoswitch%20Photos/MHS22204_tmb.jpg","http://media.digikey.com/photos/E-Switch%20Photos/500SSP1S1M6QEA_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/LP02C31T203DQ_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/TSD21EEGRA04_tmb.JPG","http://media.digikey.com/photos/CK%20Comp%20Photos/V80214MS02Q_tmb.jpg"],"/switches/snap-action-limit-switches/1114207":["http://media.digikey.com/Photos/Panasonic%20Photos/ESE-18R11A_tmb.JPG","http://media.digikey.com/photos/Omron%20Elect%20Photos/SS5GL2D,%20SS-01GL2-FD,%20SS-01GL2D_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/2DM409_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ESE-24MV_tmb.jpg"],"/switches/tactile-switches/1114206":["http://media.digikey.com/photos/CK%20Comp%20Photos/PTS645SM43SMTR_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/B3F-3152_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/EVP-AA002K_tmb.jpg"],"/switches/thumbwheel-switches/1115394":["http://media.digikey.com/photos/Cherry%20Switch%20Photos/pbc1-e015_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/SMCD301AK_tmb.JPG","http://media.digikey.com/photos/CK%20Comp%20Photos/302109n00_tmb.JPG"],"/switches/toggle-switches/1114212":["http://media.digikey.com/Photos/Carling%20Technologies%20Photos/CA201-73_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/7211P3YZQE,%207207P3YZQE,%207201P3YZQE,%207205P3YZQE,%207208P3YZQE_tmb.jpg","http://media.digikey.com/Photos/E-Switch%20Photos/200USP1T1A1M6RE_tmb.jpg"],"/capacitors/accessories/131156":["http://media.digikey.com/Photos/Cornell%20Dubilier%20Photos/vr8_tmb.JPG","http://media.digikey.com/Photos/Maxwell%20Technologies%20Photos/INTEGRATION%20KIT_tmb.jpg","http://media.digikey.com/Photos/Kemet%20Photos/PYB7033_tmb.JPG"],"/capacitors/aluminum-polymer-capacitors/132402":["http://media.digikey.com/Photos/Nichicon%20Photos/RHA0J331MCN1GS_tmb.jpg","http://media.digikey.com/Photos/Rubycon/6SXB47M_tmb.JPG","http://media.digikey.com/Photos/Nichicon%20Photos/PLV1J220MCL1TD_tmb.jpg"],"/capacitors/aluminum-capacitors/131081":["http://media.digikey.com/Photos/Nichicon%20Photos/CD%20Series%206.50mm_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ECA-1AM102B_tmb.jpg","http://media.digikey.com/photos/United%20Chemi-Con%20Photos/KMH%20SERIES%2030H,22D_tmb.jpg"],"/capacitors/capacitor-arrays/131080":["http://media.digikey.com/Renders/TDK%20Renders/CKCL-Series;-0805_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/EZA-NP%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Vitramon/20108D1C221K5E_tmb.jpg"],"/capacitors/ceramic-capacitors/131083":["http://media.digikey.com/Renders/Taiyo%20Yuden%20Renders/0402%20(1005%20Metric)_tmb.jpg","http://media.digikey.com/Photos/Kemet%20Photos/MFG_C4x0Cxxxxxx5TAAUTO_tmb.jpg","http://media.digikey.com/Renders/TDK%20Renders/C%20Series%20Reverse%20Geometry_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Dielect%20Renders/0603%28X14%29_tmb.jpg","http://media.digikey.com/photos/Murata%20Photos/1206%20Murata%20MLCC%20Caps_tmb.jpg"],"/capacitors/electric-double-layer-capacitors-supercaps/131084":["http://media.digikey.com/photos/Panasonic%20Photos/SD%20SERIES%206.0,6.5H,10.0D_tmb.jpg","http://media.digikey.com/Photos/Maxwell%20Technologies%20Photos/BCAP2000%20P270%20K05_tmb.JPG","http://media.digikey.com/Photos/Maxwell%20Technologies%20Photos/BMOD0058%20E016%20B02_tmb.JPG","http://media.digikey.com/photos/Maxwell%20Technologies%20Photos/BMOD0165%20P048%20B09_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/BZ01CA223ZSB_tmb.jpg","http://media.digikey.com/Photos/Cooper%20Bussmann%20Photos/PHB-5R0H505-R_tmb.jpg","http://media.digikey.com/Renders/Seiko%20Instr%20Renders/CPH3225A%201210%20%283225%20Metric%29_tmb.jpg","http://media.digikey.com/photos/NessCap%20Photos/ESHSP-5000C0-002R7_tmb.jpg"],"/capacitors/film-capacitors/131088":["http://media.digikey.com/Photos/Panasonic%20Photos/ECQ-E6105KF_tmb.jpg","http://media.digikey.com/Renders/Cornell%20Dubilier%20Renders/SCR%20Series;%20338;%20138,68x146,05x95,25_tmb.jpg","http://media.digikey.com/photos/Epcos%20Photos/X2%20SERIES%2039.5H,41.5L_tmb.jpg"],"/capacitors/mica-and-ptfe-capacitors/131309":["http://media.digikey.com/photos/Cornell%20Dubilier%20Photos/338-1812(4532)_tmb.jpg","http://media.digikey.com/Photos/Cornell%20Dubilier%20Photos/CD19FD182FO3F_tmb.jpg","http://media.digikey.com/Photos/Cornell%20Dubilier%20Photos/29280B272JO0_tmb.jpg"],"/capacitors/niobium-oxide-capacitors/131747":["http://media.digikey.com/Photos/AVX%20Photos/OxiCapNOS60%20SERIES_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/TAJ,TLJ,TCJ,TPS%20SERIES%203.5L,2.8W_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/MH%20Series_7361-38%20(EIA)_tmb.JPG"],"/capacitors/silicon-capacitors/132347":["http://media.digikey.com/Photos/IPDiA%20Photos/MFG_LPSC_HSSC_HTSC_XTSC_tmb.jpg","http://media.digikey.com/Photos/IPDiA%20Photos/MFG_EMSC_tmb.jpg","http://media.digikey.com/Renders/Vishay%20Electro-Films/RFCS%20Series%200402_tmb.jpg"],"/capacitors/tantalum-polymer-capacitors/132403":["http://media.digikey.com/photos/AVX%20Photos/TAJ,TLJ,TCJ,TPS%20SERIES%203.5L,2.8W_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/1411%20(3528%20Metric)_tmb.jpg","http://media.digikey.com/Renders/Kemet%20Renders/T550%20Series_tmb.jpg"],"/capacitors/tantalum-capacitors/131082":["http://media.digikey.com/photos/Kemet%20Photos/T491%20SERIES%206.0L,3.2W_tmb.jpg","http://media.digikey.com/photos/Kemet%20Photos/T351H226M025AT_tmb.jpg","http://media.digikey.com/photos/Kemet%20Photos/T498,T499%20C%20SERIES_tmb.jpg","http://media.digikey.com/photos/Kemet%20Photos/T110B335K035AT_tmb.jpg"],"/capacitors/thin-film-capacitors/131736":["http://media.digikey.com/Renders/AVX%20Renders/Accu-P%200402_tmb.jpg","http://media.digikey.com/photos/AVX%20Photos/ACCU-P%200603_tmb.jpg","http://media.digikey.com/Photos/TDK%20Photos/TFSQ0402C0H1C1R1WT_tmb.jpg"],"/capacitors/trimmers-variable-capacitors/131670":["http://media.digikey.com/photos/Sprague-Goodman%20Photos/GYB22000_tmb.jpg","http://media.digikey.com/photos/Sprague-Goodman%20Photos/SGC3S300_tmb.JPG","http://media.digikey.com/Photos/Murata%20Photos/TZB4Z060AB10R00_tmb.jpg"],"/resistors/accessories/65620":["http://media.digikey.com/photos/Huntington%20Electric%20Photos/B1002_tmb.JPG","http://media.digikey.com/photos/Ohmite%20Photos/6120K-2_tmb.JPG","http://media.digikey.com/Photos/Stackpole%20Photos/EWT100DHWKIT_tmb.jpg"],"/resistors/chassis-mount-resistors/66696":["http://media.digikey.com/Photos/Stackpole%20Photos/KAL%20SERIES%2027x27.4mm_tmb.JPG","http://media.digikey.com/photos/Vishay%20Dale%20Photos/HL%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Ohmite%20Photos/TGHG-SERIES_tmb.jpg","http://media.digikey.com/Photos/AVX%20Photos/RP60975R0100JNBK_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/SQ-CGS60%20SERIES_tmb.jpg","http://media.digikey.com/Renders/Yageo%20Renders/AHA500JB-10R_tmb.jpg"],"/resistors/chip-resistor-surface-mount/65769":["http://media.digikey.com/Renders/TE%20Connectivity/0603_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Beyschlag%20Photos/CMB02070X3600GB200_tmb.jpg","http://media.digikey.com/Photos/Ohmite%20Photos/HVC2512T1005JET_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/4122%20(10555%20Metric),%20J-Lead_tmb.jpg","http://media.digikey.com/Photos/Stackpole%20Photos/CSS-SERIES_tmb.jpg","http://media.digikey.com/Photos/Ohmite%20Photos/TDH35P250RJE_tmb.jpg"],"/resistors/precision-trimmed-resistors/66806":["http://media.digikey.com/Renders/Vishay%20Renders/1206%20Series%20VSMP_tmb.jpg","http://media.digikey.com/Renders/Vishay%20Renders/0805%20Series%20VSMP_tmb.jpg","http://media.digikey.com/Renders/Vishay%20Renders/2512%20Series%202512_tmb.jpg"],"/resistors/resistor-networks-arrays/65543":["http://media.digikey.com/Renders/Panasonic%20Renders/EXBN8V%20Pkg_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/4600X%20SERIES%208-SIP_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-SOIC_tmb.jpg","http://media.digikey.com/photos/CTS%20Photos/76716%20SERIES_tmb.jpg"],"/resistors/specialized-resistors/66768":["http://media.digikey.com/Photos/Vishay%20Dale%20Photos/WSBS8518L1250JK_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/50TSOP_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Dale%20Photos/WSBM8518L1000JK_tmb.JPG","http://media.digikey.com/Photos/Kemet%20Photos/PYR7511-47_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/10-0603%20Resistor_tmb.jpg"],"/resistors/through-hole-resistors/66690":["http://media.digikey.com/Renders/Vishay%20BC%20Renders/PR01%20620K%20OHM_tmb.jpg","http://media.digikey.com/photos/Ohmite%20Photos/AY%20SERIES_tmb.JPG","http://media.digikey.com/Photos/Vishay%20Sfernice/VPR221%20SERIES_tmb.jpg","http://media.digikey.com/renders/Ohmite%20Renders/WHC-WNCR25FE-T_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/SQ-CGS,%2013x9x25_tmb.jpg","http://media.digikey.com/photos/Ohmite%20Photos/B8J,B12J%20SERIES_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics.%20IRC/OAR3R005FLF_tmb.jpg","http://media.digikey.com/Renders/Yageo%20Renders/SQP500_tmb.jpg"],"/audio-products/accessories/720980":["http://media.digikey.com/Photos/Switchcraft%20Photos/MFG_SC702CT_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/MFG_AWA-DBW-120_tmb.jpg","http://media.digikey.com/photos/Mallory%20Sonalert%20Products%20Photos/SCVC_tmb.jpg","http://media.digikey.com/Photos/FTDI%20(Future%20Tech%20Devices)/MFG_VMUSIC3_tmb.jpg","http://media.digikey.com/photos/Mallory%20Sonalert%20Products%20Photos/RSB1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/207332-1_tmb.jpg"],"/audio-products/buzzer-elements-piezo-benders/721679":["http://media.digikey.com/photos/Projects%20Unlimited%20Photos/AB2036AF_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/7BB-20-6L0_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/MFG_AB2020B-2_tmb.jpg"],"/audio-products/buzzers/720967":["http://media.digikey.com/photos/Murata%20Photos/PKM13EPYH4002-B0_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/CMT-1303_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/AI-2604-TF-12V-R_tmb.jpg"],"/audio-products/microphones/720968":["http://media.digikey.com/Renders/Knowles%20Acoustics%20Renders/SPM0423HM4H-WB_tmb.jpg","http://media.digikey.com/photos/Knowles%20Acoustics%20Photos/EK-23024_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/CMC-2242PBL-A_tmb.JPG","http://media.digikey.com/Photos/Knowles%20Acoustics%20Photos/SPK0833LM4H-B_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/POW-1644L-B-R_tmb.JPG"],"/audio-products/sirens/721819":["http://media.digikey.com/Photos/PUI%20Audio/MFG_AVW-15SBR-RL-24_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/MFG_AW-30SBW_tmb.jpg","http://media.digikey.com/Photos/PUI%20Audio/XL-5530-LW300-S-R_tmb..jpg"],"/audio-products/speakers/720966":["http://media.digikey.com/Photos/Mallory%20Sonalert%20Products%20Photos/MFG_PH-230Q_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/CMS0321KLX_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/MFG_CLS0201MP_tmb.jpg","http://media.digikey.com/Photos/Knowles%20Acoustics%20Photos/EH-27232-000_tmb.JPG","http://media.digikey.com/photos/Projects%20Unlimited%20Photos/AST-01532MR-R_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/CDM-12008_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/GA0506,GA0576,GA0666,GA0776,GA0876,GA1006_tmb.jpg","http://media.digikey.com/Photos/Knowles%20Acoustics%20Photos/RVA-90080-N17_tmb.JPG"],"/battery-products/accessories/393300":["http://media.digikey.com/photos/Patco%20Electronics%20Photos/4020P_tmb.jpg","http://media.digikey.com/photos/BB%20Battery%20Photos/T2-T1_tmb.JPG","http://media.digikey.com/photos/Patco%20Electronics%20Photos/4010P_tmb.jpg","http://media.digikey.com/photos/BB%20Battery%20Photos/B1-T2_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/9-209-008_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/MFG_62,%2063_tmb.jpg"],"/battery-products/batteries-non-rechargeable-primary/394467":["http://media.digikey.com/Photos/Panasonic%20Photos/LR6XWA%5EB_tmb.JPG","http://media.digikey.com/photos/Energizer%20Photos/CR2025_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/CR2477-1HF_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/BR425_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/CR-P2PA%5EB_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/BR-2330A%5EGAN_tmb.jpg","http://media.digikey.com/photos/Energizer%20Photos/LA522_tmb.jpg","http://media.digikey.com/photos/Tadiran%20Batteries%20Photos/TL-5903%5ET_tmb.jpg"],"/battery-products/batteries-rechargeable-secondary/394468":["http://media.digikey.com/photos/Panasonic%20Photos/LC-R064R5P_tmb.jpg","http://media.digikey.com/photos/Sanyo%20Photos/N-3000CR_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/VL-1220%5EHFN_tmb.JPG","http://media.digikey.com/Photos/FDK%20America/ML2430-CJ1_tmb.jpg","http://media.digikey.com/photos/Enersys%20Energy%20Products%20Photos/0800-0004_tmb.JPG"],"/battery-products/battery-chargers/393249":["http://media.digikey.com/Photos/Assmann%20Photos/31800_tmb.jpg","http://media.digikey.com/photos/Patco%20Electronics%20Photos/3201P,3202P,3202-750_tmb.JPG","http://media.digikey.com/Photos/IXYS%20Photos/SLBC-01-GRN_tmb.jpg","http://media.digikey.com/photos/IXYS%20Photos/SLUC-MINIB-BLK_tmb.jpg","http://media.digikey.com/Photos/SL%20Pwr%20Elect%20Mfg%20of%20Condor/BVL-SERIES_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/IN3006CG_tmb.jpg"],"/battery-products/battery-holders-clips-contacts/393250":["http://media.digikey.com/Photos/Memory%20Protection%20Photos/BC2032-F1_tmb.jpg","http://media.digikey.com/Photos/Memory%20Protection%20Photos/BCAA-HD_tmb.JPG","http://media.digikey.com/photos/Memory%20Protection%20Photos/BC3AAW_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/5231TR_tmb.JPG","http://media.digikey.com/photos/Memory%20Protection%20Photos/BK-82_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/235,6,7_tmb.jpg"],"/battery-products/battery-packs/394404":["http://media.digikey.com/photos/Tadiran%20Batteries%20Photos/TL-5276%5EW_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/F023_tmb.jpg","http://media.digikey.com/photos/Tadiran%20Batteries%20Photos/TL-5242%5EW_tmb.jpg"],"/battery-products/cigarette-lighter-assemblies/393792":["http://media.digikey.com/photos/Memory%20Protection%20Photos/APP-001_tmb.jpg","http://media.digikey.com/Photos/CnC%20Tech/CNC-SAE-16-046-004_tmb.jpg","http://media.digikey.com/Photos/Memory%20Protection%20Photos/MFG_ZA2040_tmb.jpg","http://media.digikey.com/photos/Memory%20Protection%20Photos/ZA5018_tmb.jpg","http://media.digikey.com/Photos/Memory%20Protection%20Photos/MFG_ZA6003_tmb.jpg"],"/boxes-enclosures-racks/backplanes/2163270":["http://media.digikey.com/Photos/Schroff/23001069_tmb.jpg","http://media.digikey.com/Photos/Schroff/23006815_tmb.JPG","http://media.digikey.com/photos/Vector%20Photos/CPCIBP8-6-64TOP_tmb.jpg"],"/boxes-enclosures-racks/box-accessories/2163623":["http://media.digikey.com/photos/Schroff/21101359_tmb.jpg","http://media.digikey.com/Photos/Schroff/24560140_tmb.JPG","http://media.digikey.com/photos/Serpac%20Photos/PS-13_tmb.jpg"],"/boxes-enclosures-racks/box-components/2163624":["http://media.digikey.com/photos/Hammond%20Mfg%20Photos/1434-8_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/2764140_tmb.jpg","http://media.digikey.com/photos/Serpac%20Photos/2005%20DB9%20BK_tmb.jpg","http://media.digikey.com/photos/Weidmuller/1104450000_tmb.jpg"],"/boxes-enclosures-racks/boxes/2163622":["http://media.digikey.com/photos/BUD%20Industries%20Photos/CU-388_tmb.jpg","http://media.digikey.com/photos/Serpac%20Photos/R-520%20BLACK_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/EX-4500_tmb.jpg","http://media.digikey.com/Photos/BUD%20Industries%20Photos/PS11591_tmb.jpg","http://media.digikey.com/photos/Hammond%20Mfg%20Photos/1553BTBUBK_tmb.JPG","http://media.digikey.com/photos/Pomona%20Photos/3231_tmb.jpg"],"/boxes-enclosures-racks/card-guide-accessories/2163853":["http://media.digikey.com/Photos/Schroff/69004127_tmb.JPG","http://media.digikey.com/Photos/Schroff/60827026_tmb.JPG","http://media.digikey.com/Photos/Calmark%20-%20Birtcher/71-2-R_tmb.jpg","http://media.digikey.com/Photos/Bivar%20Inc%20Photos/CP-66%20WE_tmb.JPG","http://media.digikey.com/Photos/Calmark%20-%20Birtcher/MFG_Calmark%20Card%20Lok,%20260_tmb.jpg"],"/boxes-enclosures-racks/card-guides/2163353":["http://media.digikey.com/Photos/Bivar%20Inc%20Photos/VG2-2_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_21752_tmb.jpg","http://media.digikey.com/Photos/Bivar%20Inc%20Photos/N-250-2_tmb.jpg"],"/boxes-enclosures-racks/card-rack-accessories/2163854":["http://media.digikey.com/photos/Vector%20Photos/HA12_tmb.jpg","http://media.digikey.com/Photos/Schroff/69004131_tmb.JPG","http://media.digikey.com/Photos/Schroff/21101847_tmb.jpg","http://media.digikey.com/photos/Vector%20Photos/T107%5EC_tmb.jpg","http://media.digikey.com/Photos/Vector%20Photos/SC4-27%5E25_tmb.jpg"],"/boxes-enclosures-racks/card-racks/2162906":["http://media.digikey.com/photos/Vector%20Photos/CCA17S%5E90_tmb.jpg","http://media.digikey.com/Photos/Schroff/24563463_tmb.jpg","http://media.digikey.com/photos/Vector%20Photos/CCA28-84-00_tmb.jpg","http://media.digikey.com/photos/Vector%20Photos/CCA220-3U_tmb.jpg"],"/boxes-enclosures-racks/handles-locks-latches/2163326":["http://media.digikey.com/Photos/Schroff/60817055_tmb.JPG","http://media.digikey.com/Photos/Hammond%20Mfg%20Photos/M286-6_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/H-9166-B_tmb.jpg","http://media.digikey.com/photos/Schroff/20809282_tmb.jpg","http://media.digikey.com/Photos/Hammond%20Mfg%20Photos/1427NBB_tmb.JPG"],"/boxes-enclosures-racks/patchbay-jack-panel-accessories/2163616":["http://media.digikey.com/photos/Switchcraft%20Photos/Switchcraft%20-%20JP9942_tmb.jpg","http://media.digikey.com/photos/Switchcraft%20Photos/Switchcraft%20-%20JP9902_tmb.jpg","http://media.digikey.com/photos/Switchcraft%20Photos/Switchcraft%20-%20TT210_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_8423-EXP_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_8423-BKT_tmb.jpg"],"/boxes-enclosures-racks/patchbay-jack-panels/2163532":["http://media.digikey.com/Photos/Switchcraft%20Photos/MFG_2300X_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/MFG_A-PAN-16-MOD_tmb.jpg","http://media.digikey.com/Photos/Switchcraft%20Photos/MFG_PT8FX8MX2DB25_tmb.jpg","http://media.digikey.com/Photos/Switchcraft%20Photos/MFG_MTP24K11_tmb.jpg"],"/boxes-enclosures-racks/rack-accessories/2163626":["http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1203149_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/RC-7758-PR_tmb.jpg","http://media.digikey.com/Photos/Orion%20Fans/OCN-1032RHPK_tmb.JPG","http://media.digikey.com/Photos/BUD%20Industries%20Photos/IPV-1116_tmb.jpg","http://media.digikey.com/photos/Hammond%20Mfg%20Photos/1421A_tmb.jpg"],"/boxes-enclosures-racks/rack-components/2163627":["http://media.digikey.com/Renders/Hammond%20Renders/RM2U1908SBK_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/SA-1751-BT_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/mfgC-14430,C-14431,C-14432_tmb.jpg","http://media.digikey.com/Photos/BUD%20Industries%20Photos/CB-1373_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/RM-14222_tmb.jpg"],"/boxes-enclosures-racks/rack-thermal-management/2163947":["http://media.digikey.com/Photos/Orion%20Fans/OA600S_tmb.jpg","http://media.digikey.com/photos/BUD%20Industries%20Photos/FN-1282_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SRCOOL12K_tmb.jpg","http://media.digikey.com/Photos/Orion%20Fans/OA302_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SRFAN3U_tmb.jpg"],"/boxes-enclosures-racks/racks/2163625":["http://media.digikey.com/Photos/BUD%20Industries%20Photos/MFG_WM-56xx_tmb.jpg","http://media.digikey.com/photos/Hammond%20Mfg%20Photos/RCBS1900313BK1_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SR4POST13_tmb.jpg","http://media.digikey.com/Photos/BUD%20Industries%20Photos/C-1557_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SRW18US_tmb.jpg"],"/cable-assemblies/barrel-audio-cables/1573697":["http://media.digikey.com/photos/Assmann%20Photos/AK-AV202_tmb.jpg","http://media.digikey.com/Photos/Switchcraft%20Photos/40DK40X_tmb.jpg","http://media.digikey.com/Photos/Tensility%20Intl/CA-2206_tmb.jpg","http://media.digikey.com/photos/Switchcraft%20Photos/330F1X_tmb.jpg","http://media.digikey.com/Photos/CnC%20Tech/770-10043-00050_tmb.jpg"],"/cable-assemblies/barrel-power-cables/1573698":["http://media.digikey.com/Photos/Tensility%20Intl/10-01553_tmb.jpg","http://media.digikey.com/Photos/Tensility%20Intl/CA-2209_tmb.JPG","http://media.digikey.com/photos/Tensility%20Intl/10-00110_tmb.jpg"],"/cable-assemblies/between-series-adapter-cables/1573583":["http://media.digikey.com/Photos/Tensility%20Intl/10-00240_tmb.jpg","http://media.digikey.com/photos/Molex/88741-8300_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK525-L2_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK243-025,050,10_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_P137-06N-DVI_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/XS5W-T421-DMC-K_tmb.jpg"],"/cable-assemblies/circular-cable-assemblies/1573006":["http://media.digikey.com/Photos/Tensility%20Intl/10-00425_tmb.jpg","http://media.digikey.com/Photos/Tensility%20Intl/10-00548_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK%20678-2_tmb.jpg"],"/cable-assemblies/coaxial-cables-rf/1573243":["http://media.digikey.com/photos/Emerson%20Network%20Photos/415-0056%20SERIES_tmb.jpg","http://media.digikey.com/photos/Emerson%20Network%20Photos/415-0034%20SERIES_tmb.jpg","http://media.digikey.com/photos/Hirose%20Elect%20Photos/u.fl-2lp-066j2-a-(500)_tmb.JPG","http://media.digikey.com/photos/Emerson%20Network%20Photos/415-0090-250_tmb.JPG","http://media.digikey.com/Photos/Mueller%20Photos/BU-P4970_tmb.jpg"],"/cable-assemblies/d-shaped-centronics-cables/1573784":["http://media.digikey.com/photos/Assmann%20Photos/AK140-2,%20AK140-2-R,%20AK430-3,%20AK430-3-R_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/1MG26-LFW0-00C-200_tmb.jpg","http://media.digikey.com/photos/Molex/79918-0080_tmb.JPG"],"/cable-assemblies/d-sub-cables/1573638":["http://media.digikey.com/Photos/Emerson%20Network%20Photos/30-9506-77_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK135-2-R,%20AK166-3-R_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1656262_tmb.jpg","http://media.digikey.com/Photos/ITT%20Cannon/M83513%5E03-B03C_tmb.jpg"],"/cable-assemblies/fiber-optic-cables/1573012":["http://media.digikey.com/Photos/TE%20Connectivity/5349573-x_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1938323-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2064873-1_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/HFBR-RTD001Z_tmb.jpg","http://media.digikey.com/Photos/Molex/1062672011_tmb.jpg","http://media.digikey.com/photos/Industrial%20Fiberoptics%20Photos/IF%20636-0-2_tmb.jpg"],"/cable-assemblies/firewire-cables-ieee-1394/1573161":["http://media.digikey.com/photos/Assmann%20Photos/AK%201394-184_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_F017-0xx%20Series_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_F015-0xx%20Series_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK%201394-18_tmb.jpg"],"/cable-assemblies/flat-flex-cables-ffc-fpc/1573426":["http://media.digikey.com/Photos/TE%20Connectivity/A9CAA-060xE_tmb.jpg","http://media.digikey.com/Photos/JAE%20Elect%20Photos/JF08R0R051020MA_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/A9AAT-1102F_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/A9CCG-0208F_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/A9BBG-0506F_tmb.jpg"],"/cable-assemblies/flat-flex-ribbon-jumper-cables/1573391":["http://media.digikey.com/Photos/Molex/25001-0802_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/687608200002_tmb.jpg","http://media.digikey.com/Photos/Molex/0150150433_tmb.jpg","http://media.digikey.com/photos/Molex/25001-1002,1004,1006_tmb.jpg"],"/cable-assemblies/jumper-wires-pre-crimped/1573153":["http://media.digikey.com/photos/Wurth%20Electronics%20Photos/648148128030_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/662162120030_tmb.JPG","http://media.digikey.com/Photos/Harwin/G125-MW30300M94_tmb.jpg"],"/cable-assemblies/lgh-cables/1573738":["http://media.digikey.com/Photos/TE%20Connectivity/862545-6_tmb.jpg"],"/cable-assemblies/modular-cables/1573024":["http://media.digikey.com/Photos/Assmann%20Photos/AT-C-26-66B%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/DK-1611-0xx%5EBL_tmb.jpg","http://media.digikey.com/photos/Conec%20Photos/17-101144_tmb.jpg","http://media.digikey.com/photos/I.O.%20Interconnect%20Photos/6-4%20SGL%20FLAT_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/a-mcu60100%5Er-r_tmb.JPG"],"/cable-assemblies/pluggable-cables/1573607":["http://media.digikey.com/photos/3M%20Photos/5602-2201,%205602-2202_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/8KJ1-0727-0500_tmb.jpg","http://media.digikey.com/photos/Molex/68561-0019_tmb.jpg","http://media.digikey.com/Photos/Molex/0745760000_tmb.jpg","http://media.digikey.com/photos/Molex/74546-0801_tmb.JPG","http://media.digikey.com/Photos/FCI%20Photos/10117949-2005HLF_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/8US4-CB119-00-1.00_tmb.jpg"],"/cable-assemblies/power-line-cables/1573035":["http://media.digikey.com/Photos/Phihong%20USA/AC15WNA_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/11-00030_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/AK500%5E16-OE_tmb.jpg","http://media.digikey.com/photos/Qualtek%20Photos/373008-01_tmb.JPG","http://media.digikey.com/photos/Qualtek%20Photos/221001-08_tmb.JPG","http://media.digikey.com/Photos/Qualtek%20Photos/233002-06_tmb.JPG","http://media.digikey.com/Photos/Schurter%20Photos/6051.2007_tmb.jpg"],"/cable-assemblies/rectangular-cable-assemblies/1573018":["http://media.digikey.com/Renders/Assmann%20Renders/H1CXx-10%20G_tmb.jpg","http://media.digikey.com/Photos/CnC%20Tech/810-10057-00020_tmb.jpg","http://media.digikey.com/Renders/Harting/Har-Flex-6_tmb.jpg","http://media.digikey.com/Renders/Harting/Har-Flex-6_tmb.jpg","http://media.digikey.com/Renders/Assmann%20Renders/H2MXS-16%20M_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2299110_tmb.jpg","http://media.digikey.com/Photos/Cicoil/310J101-26-CA00x_tmb.jpg"],"/cable-assemblies/smart-cables/1574108":["http://media.digikey.com/photos/FTDI%20(Future%20Tech%20Devices)/UC232R-10%20CHIPI_tmb.jpg","http://media.digikey.com/Photos/FTDI%20(Future%20Tech%20Devices)/US232B-100-BULK_tmb.jpg","http://media.digikey.com/Photos/FTDI%20(Future%20Tech%20Devices)/MFG_TTL-232R-RPI_tmb.jpg","http://media.digikey.com/Photos/FTDI%20%28Future%20Tech%20Devices%29/TTL-232R-5V-AJ_tmb.jpg"],"/cable-assemblies/solid-state-lighting-cables/1574120":["http://media.digikey.com/photos/TE%20Connectivity/1-2083078-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2106378-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1-2083136-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2148036-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2106391-3_tmb.jpg","http://media.digikey.com/Photos/Molex/0688014228_tmb.jpg"],"/cable-assemblies/specialized-cable-assemblies/1574098":["http://media.digikey.com/Photos/Tyco%20Photos/2106725-2_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/555856-3_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/2106725-x_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1-556127-5_tmb.jpg"],"/cable-assemblies/usb-cables/1573165":["http://media.digikey.com/photos/Qualtek%20Photos/3021013-10_tmb.JPG","http://media.digikey.com/photos/Hirose%20Elect%20Photos/ZX40-A-5S-75-STDAJ_tmb.JPG","http://media.digikey.com/Photos/CnC%20Tech/102-1092-BL%20SERIES_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/AK%20672MS_tmb.jpg","http://media.digikey.com/photos/Molex/111014-5000_tmb.JPG","http://media.digikey.com/Photos/Molex/0847290001_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/A-KAB-USBB-FS-1M-R_tmb.jpg","http://media.digikey.com/Photos/Qualtek%20Photos/3023003-01M_tmb.jpg"],"/cable-assemblies/video-cables-dvi-hdmi/1573640":["http://media.digikey.com/Photos/Molex/0887418010_tmb.jpg","http://media.digikey.com/photos/Qualtek%20Photos/1721013-16_tmb.JPG","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_P583-0xx%20Series_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_P568-006-RA2_tmb.jpg"],"/cables-wires/coaxial-cables-rf/1638779":["http://media.digikey.com/photos/Alpha%20Wire%20Photos/9059C%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Molex/MFG_047SC-2901_tmb.jpg","http://media.digikey.com/Photos/Molex/MFG_MTF1023_tmb.jpg","http://media.digikey.com/Photos/General%20Cable%20Photos/C5785.41.01_tmb.jpg"],"/cables-wires/fiber-optic-cables/1638548":["http://media.digikey.com/Photos/Tyco%20Photos/501336-1_tmb.jpg","http://media.digikey.com/Renders/Industrial%20Fiberoptics%20Renders/FB140-10-ND_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2744322_tmb.jpg"],"/cables-wires/flat-flex-cables-ffc-fpc/1638962":["http://media.digikey.com/Photos/Parlex%20Photos/PSR1635-14-300_tmb.jpg","http://media.digikey.com/photos/Parlex%20Photos/PS-1636-12_tmb.jpg","http://media.digikey.com/photos/Parlex%20Photos/PS-1635-20_tmb.jpg"],"/cables-wires/flat-ribbon-cables/1638574":["http://media.digikey.com/photos/3M%20Photos/3659%5E40(SF)_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3391%5E10%20100_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3365%5E16%20300SF_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/79100-075-4F1_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3759%5E15%20100SF_tmb.JPG"],"/cables-wires/modular-flat-cable/1639367":["http://media.digikey.com/Photos/Assmann%20Photos/AT-K-C-26-6-B_tmb.jpg","http://media.digikey.com/Photos/Emerson%20Network%20Photos/65-TF266M_tmb.jpg","http://media.digikey.com/Photos/I.O.%20Interconnect%20Photos/121-810-010_tmb.jpg"],"/cables-wires/multiple-conductor-cables/1638739":["http://media.digikey.com/Photos/General%20Cable%20Photos/89083.35.05_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/ATU6-P305T-R_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/5076C-SL005_tmb.jpg"],"/cables-wires/wire-wrap/1638511":["http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/KSW-RED%20SERIES_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/R30B-0100,%20KSW26B-0100,%20KSW30B-0100,%20R26B-0100,%20R28B-0100_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/WD-30-W_tmb.jpg"],"/cables-wires/single-conductor-cables-hook-up-wire/1638740":["http://media.digikey.com/Photos/Daburn%20Elect.%20Photos/HOOK-UP-STRANDED-RED_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/HOOK-UP-STRANDED-GREEN_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/HOOK-UP-SOLID-BLACK_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/HOOK-UP-STRANDED-BLUE_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/HOOK-UP-SOLID-RED_tmb.jpg"],"/cables-wires-management/accessories/1704020":["http://media.digikey.com/Photos/TE%20Connectivity/819100-000_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/1478884-2_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/1-745508-0_tmb.JPG","http://media.digikey.com/photos/American%20Elect%20Photos/A0750.LN_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/207508-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/D-150-C-12_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/HBN1-T_tmb.JPG"],"/cables-wires-management/bushings-grommets/1704447":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/736_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/1827850000_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_40984_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MCG-1N_tmb.jpg"],"/cables-wires-management/cable-and-cord-grips/1704536":["http://media.digikey.com/Photos/Amphenol%20Photos/AIO-CSPG16_tmb.JPG","http://media.digikey.com/photos/Amphenol%20Photos/DB-1045_tmb.JPG","http://media.digikey.com/photos/American%20Elect%20Photos/1555.11.10_tmb.jpg","http://media.digikey.com/Photos/Harting/09000005098_tmb.jpg","http://media.digikey.com/Photos/Harting/09000005094_tmb.jpg"],"/cables-wires-management/cable-ties-holders-and-mountings/1704395":["http://media.digikey.com/Photos/HellermannTyton%20Photos/TM1SF0M4_tmb.JPG","http://media.digikey.com/Photos/HellermannTyton%20Photos/CTM30xx_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/ABM100-A-C_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/PUM-100-C30_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/FCM1-S6-C14_tmb.jpg"],"/cables-wires-management/cable-ties-and-cable-lacing/1704111":["http://media.digikey.com/Photos/HellermannTyton%20Photos/118-05850_tmb.jpg","http://media.digikey.com/photos/Richco%20Photos/HT-3,9,HT-5,9_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/PLWP%20SERIES%20NATURAL_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/157-00105_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/PLC%20SERIES%20BLACK_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/SJ-3463_tmb.JPG","http://media.digikey.com/photos/Panduit%20Corp%20Photos/PLM1M%20SERIES%20BLACK_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/T50R2M4UL_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/157-00083_tmb.jpg"],"/cables-wires-management/clamps-and-clips/1704440":["http://media.digikey.com/photos/Richco%20Photos/KLB-350A-RT_tmb.jpg","http://media.digikey.com/photos/Richco%20Photos/AKKL-5775A-RT_tmb.jpg","http://media.digikey.com/photos/Richco%20Photos/N-2-BK_tmb.jpg","http://media.digikey.com/Photos/Harwin/MFG_S8101-46R_tmb.jpg","http://media.digikey.com/photos/Essentra%20Components%20Photos/FCWSS-1-01BK_tmb.jpg","http://media.digikey.com/photos/Richco%20Photos/OFNSB-16-01A-RT_tmb.JPG","http://media.digikey.com/photos/Richco%20Photos/CFCC-4-05A-RT_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/WHC-1500-01_tmb.jpg"],"/cables-wires-management/cold-shrink-tape-tubing/1704240":["http://media.digikey.com/photos/3M%20Photos/8426-9_tmb.JPG","http://media.digikey.com/photos/Daburn%20Elect.%20Photos/ST250-2%20BLK_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/8430-9_tmb.JPG"],"/cables-wires-management/fiber-optic-cables/1704084":["http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_15985_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/EFA04-21-001_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_MOFNSA-2-19_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_1153166_tmb.jpg","http://media.digikey.com/photos/Industrial%20Fiberoptics%20Photos/IF-C-S4_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_39346_tmb.jpg"],"/cables-wires-management/grounding-braid-straps/1704699":["http://media.digikey.com/Photos/3M%20Photos/FS-37_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/95106-NC00_tmb.JPG","http://media.digikey.com/Photos/Techflex/MFG_MBN1_00SV_tmb.jpg"],"/cables-wires-management/heat-shrink-boots-caps/1705167":["http://media.digikey.com/photos/TE%20Connectivity/823277-000_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/814458-000_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/811183-000_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/ES-CAP-NO.1-C1-0-30MM_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/823811-000_tmb.jpg"],"/cables-wires-management/heat-shrink-fabric/1704421":["http://media.digikey.com/Photos/Techflex/MFG_H2F0.98BK_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/HFT5000-25%5E12-0-SP_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/HFT5000-100%5E50-0-SP_tmb.JPG"],"/cables-wires-management/heat-shrink-tubing/1704112":["http://media.digikey.com/photos/3M%20Photos/FP014R%20SERIES_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/FP-301~3%5E8%27~YL_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/RMW-LRG_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/DCPT-6%5E3-45-SP_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/RT-555-3%5E8-2.75-A260-0_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/BBI-5A-20%27_tmb.jpg"],"/cables-wires-management/heat-shrink-wrap/1704994":["http://media.digikey.com/photos/Tyco%20Photos/QSW-60-100_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/QSW-60-200_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/QSW-100-100_tmb.JPG"],"/cables-wires-management/labels-labeling/1704194":["http://media.digikey.com/photos/Panduit%20Corp%20Photos/LJSL5-Y3-2.5_tmb.JPG","http://media.digikey.com/photos/Panduit%20Corp%20Photos/H000X044H1C_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/0819505_tmb.jpg","http://media.digikey.com/photos/HellermannTyton%20Photos/RO175_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/0800377_tmb.jpg"],"/cables-wires-management/markers/1704571":["http://media.digikey.com/Photos/TE%20Connectivity/EC0787-000_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/EC0845-000_tmb.JPG","http://media.digikey.com/photos/TE%20Connectivity/EC2098-000_tmb.jpg"],"/cables-wires-management/pulling-support-grips/1705097":["http://media.digikey.com/Photos/Molex/1300940489_tmb.jpg"],"/cables-wires-management/solder-sleeve/1703978":["http://media.digikey.com/Photos/TE%20Connectivity/201595-000_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/S01-05-R_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/356566-000_tmb.jpg"],"/cables-wires-management/solid-tubing-sleeving/1704025":["http://media.digikey.com/Photos/HellermannTyton%20Photos/170-03064_tmb.jpg","http://media.digikey.com/Photos/Techflex/MFG_TTN0_75SV_tmb.jpg","http://media.digikey.com/photos/Alpha%20Wire%20Photos/TFT2000,2001,2002%20NA005_tmb.jpg"],"/cables-wires-management/spiral-wrap-expandable-sleeving/1704708":["http://media.digikey.com/Photos/Techflex/MFG_PTN0_xxBK_tmb.jpg","http://media.digikey.com/Photos/Alpha%20Wire%20Photos/SW44~BK005_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/CLT50F-C20_tmb.JPG"],"/cables-wires-management/splice-enclosures-protection/1704948":["http://media.digikey.com/Photos/3M%20Photos/MFG_4008-D%5ETR_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/BB2X24-8882%5EHIGHGEL_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/MFG_2178-XSB_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_82-B1_tmb.jpg"],"/cables-wires-management/wire-ducts-raceways/1704341":["http://media.digikey.com/Photos/Phoenix%20Photos/3240325_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/DRD44LG6_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/G1X2LG6_tmb.jpg"],"/cables-wires-management/wire-ducts-raceways-accessories/1704342":["http://media.digikey.com/Photos/Panduit%20Corp%20Photos/FT2X2YL_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/C1.5LG6_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_TSR2W-12_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/SD2EMI_tmb.jpg","http://media.digikey.com/Photos/Panduit%20Corp%20Photos/CDCLP3_tmb.JPG"],"/crystals-and-oscillators/crystals/852333":["http://media.digikey.com/photos/ECS%20Photos/ECS-110.5-20-5PX-TR_tmb.jpg","http://media.digikey.com/Photos/ECS%20Photos/ECS-2X62%20SERIES_tmb.jpg","http://media.digikey.com/Renders/TXC%20Corp%20Renders/7V-Series_tmb.jpg"],"/crystals-and-oscillators/oscillators/852334":["http://media.digikey.com/photos/CTS%20Photos/MXO45HS_tmb.jpg","http://media.digikey.com/Renders/Fox%20Elect%20Renders/4-SMD_tmb.jpg","http://media.digikey.com/Photos/Epson%20Toyocom%20Photos/SG61514%20SERIES_tmb.jpg"],"/crystals-and-oscillators/pin-configurable-oscillators/853231":["http://media.digikey.com/photos/Silicon%20Labs%20Photos/534AB000359DG_tmb.jpg","http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/ASEMCLP%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Connor-Winfield%20Photos/D75J7%20SERIES_tmb.jpg"],"/crystals-and-oscillators/programmable-oscillators/852047":["http://media.digikey.com/photos/Cardinal%20Components%20Photos/CPPX1-A5BC,A7BR,%20CPPLX1-A7BRNP_tmb.jpg","http://media.digikey.com/Renders/Silicon%20Labs%20Renders/6-SMD,%20No%20Lead%20(DFN,%20LCC)_tmb.jpg","http://media.digikey.com/Renders/SiTIME/4-SMD_2.0x1.6_tmb.jpg"],"/crystals-and-oscillators/resonators/852887":["http://media.digikey.com/photos/Murata%20Photos/CSTLS-G%20SERIES_tmb.jpg","http://media.digikey.com/photos/Murata%20Photos/CSTCR-G%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/CERALOCK,CSTCW%20SERIES_tmb.jpg"],"/crystals-and-oscillators/sockets-and-insulators/853135":["http://media.digikey.com/photos/Aries/1108800_tmb.jpg","http://media.digikey.com/photos/Abracon%20Corporation%20Photos/MFG_AXS-7050-06-13_tmb.JPG","http://media.digikey.com/Renders/Bivar%20Renders/CI-192-028_tmb.jpg"],"/crystals-and-oscillators/stand-alone-programmers/852195":["http://media.digikey.com/photos/Cardinal%20Components%20Photos/PG-3000_tmb.jpg","http://media.digikey.com/Photos/Micrel%20Photos/DSC-PROG-TIMEFLASH-3225_tmb.jpg","http://media.digikey.com/Photos/SiTime/SIT6100DK_tmb.jpg"],"/crystals-and-oscillators/vcos-voltage-controlled-oscillators/852828":["http://media.digikey.com/Photos/Crystek%20Photos/CRBSCS%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Crystek%20Photos/MFG_CVCO55CC%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Crystek%20Photos/CVCO33%20SERIES_tmb.jpg"],"/embedded-computers/accessories/5046356":["http://media.digikey.com/Photos/VersaLogic%20Photos/VL-CBR-5014_tmb.jpg","http://media.digikey.com/Photos/VersaLogic%20Photos/VL-CBR-2004_tmb.jpg","http://media.digikey.com/Photos/Wandboard%20Org%20Photos/MFG_WBENCLOSURE_tmb.jpg","http://media.digikey.com/Photos/VersaLogic%20Photos/VL-F15-8EBN_tmb.jpg","http://media.digikey.com/Photos/VersaLogic%20Photos/VL-HWD-203_tmb.jpg"],"/embedded-computers/interface-boards/5047548":["http://media.digikey.com/Photos/VersaLogic%20Photos/VL-MPEU-G2E_tmb.JPG","http://media.digikey.com/Photos/VersaLogic%20Photos/VL-MPEE-W2E_tmb.JPG","http://media.digikey.com/Photos/American%20Portwell%20Technology,%20Inc/MFG_18-820262_tmb.jpg"],"/embedded-computers/single-board-computers-sbcs/5047549":["http://media.digikey.com/Photos/VersaLogic%20Photos/VL-EPM-35ER_tmb.jpg","http://media.digikey.com/Photos/VersaLogic%20Photos/VL-EPU-2610-EDPx_tmb.jpg","http://media.digikey.com/Photos/Arbor%20Solution%20Photos/ITX-I77M0_tmb.jpg"],"/fans-thermal-management/ac-fans/1179729":["http://media.digikey.com/photos/Sunon%20Photos/SP100A-1123XST.GN,SP100A-1123XBT.GN_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/55460.76120_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/W2E200-HK38-01_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/R2E175-AC77-18_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/RL90-18%5E06_tmb.jpg"],"/fans-thermal-management/dc-fans/1179730":["http://media.digikey.com/Photos/Sunon%20Photos/ME50101V1-000U-A99_tmb.jpg","http://media.digikey.com/photos/Copal%20Photos/F16FB-05LLC%20%5EE_tmb.jpg","http://media.digikey.com/photos/Sunon%20Photos/PMB1297PYB1-AY(2).GN_tmb.jpg","http://media.digikey.com/Photos/NMB%20Tech%20Photos/5910PL-05W-B50-L00_tmb.jpg","http://media.digikey.com/photos/EBM-Papst%20Ind%20Photos/R1G175-AB41-02_tmb.jpg","http://media.digikey.com/Photos/Sunon%20Photos/UF3H3-700_tmb.jpg","http://media.digikey.com/Photos/Sunon%20Photos/HA60151V3-E01U-A99_tmb.JPG"],"/fans-thermal-management/fans-accessories/1180794":["http://media.digikey.com/photos/Qualtek%20Photos/07145-SP0%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_22405_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/450-20-0022_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/FMG-1_tmb.jpg"],"/fans-thermal-management/fans-finger-guards-filters-sleeves/1180003":["http://media.digikey.com/photos/Qualtek%20Photos/09080-G_tmb.jpg","http://media.digikey.com/photos/Qualtek%20Photos/08149_tmb.jpg","http://media.digikey.com/photos/Qualtek%20Photos/06362-M_tmb.jpg","http://media.digikey.com/photos/Qualtek%20Photos/QF%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Orion%20Fans/GRM40-45_tmb.jpg"],"/fans-thermal-management/thermal-accessories/1180797":["http://media.digikey.com/Photos/Aavid%20Thermalloy%20Photos/MAX09NG_tmb.jpg","http://media.digikey.com/Photos/Advanced%20Thermal%20Solutions%20Photos/ATS-PP-02_tmb.JPG","http://media.digikey.com/Photos/Advanced%20Thermal%20Solutions%20Photos/ATS-MG400-R0_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/520082-02_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/TC-XX-PR-59_tmb.jpg","http://media.digikey.com/photos/Aavid%20Thermalloy%20Photos/115300F00000G_tmb.JPG"],"/fans-thermal-management/thermal-adhesives-epoxies-greases-pastes/1179754":["http://media.digikey.com/Photos/Loctite/234476_tmb.jpg","http://media.digikey.com/Photos/T-Global%20Technology%20Photos/TG4040-2K-50CC_tmb.jpg","http://media.digikey.com/photos/Wakefield%20Photos/126-2_tmb.jpg"],"/fans-thermal-management/thermal-heat-sinks/1179752":["http://media.digikey.com/photos/CTS%20Photos/LAE66A3CB_tmb.jpg","http://media.digikey.com/photos/Advanced%20Thermal%20Solutions%20Photos/ATS-56001-C3-R0_tmb.jpg","http://media.digikey.com/Photos/Advanced%20Thermal%20Solutions%20Photos/ATS-CPX040040025-116-C2-R0_tmb.jpg"],"/fans-thermal-management/thermal-liquid-cooling/1180974":["http://media.digikey.com/photos/Laird%20Tech%20Photos/1510.00_tmb.jpg","http://media.digikey.com/Photos/Ohmite%20Photos/CP%20SERIES_tmb.JPG","http://media.digikey.com/Photos/Wakefield%20Photos/180-10-6C_tmb.jpg"],"/fans-thermal-management/thermal-pads-sheets/1179751":["http://media.digikey.com/Photos/T-Global%20Technology%20Photos/H48-6G-20-20-4-1A_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/A15036-112_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/5519S-210-MM-X-155-MM-X-0.5-MM_tmb.jpg"],"/fans-thermal-management/thermal-thermoelectric-peltier-assemblies/1180849":["http://media.digikey.com/photos/Delta%20Photos/HET200PC-B_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/AA-024-24-22-00-00_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/LL-060-12-00-00-00_tmb.jpg"],"/fans-thermal-management/thermal-thermoelectric-peltier-modules/1180573":["http://media.digikey.com/Photos/Laird%20Tech%20Photos/430855-500_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/9340006-301_tmb.jpg","http://media.digikey.com/photos/Laird%20Tech%20Photos/430533-502_tmb.jpg","http://media.digikey.com/photos/Laird%20Tech%20Photos/9320004-304_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/CPM-2F_tmb.JPG"],"/filters/accessories/3407956":["http://media.digikey.com/photos/Tyco%20Photos/60DBRL1_tmb.jpg","http://media.digikey.com/photos/Schaffner%20EMC%20Photos/ACCESSORIES-PLASTIC%20COVER%202.2_tmb.jpg","http://media.digikey.com/photos/Wurth%20Electronics%20Photos/74271_tmb.JPG"],"/filters/ceramic-filters/3409155":["http://media.digikey.com/photos/Murata%20Photos/SFELF,SFVLF%20SERIES_tmb.jpg","http://media.digikey.com/photos/Murata%20Photos/SFSCE10M7WF05-R0_tmb.JPG","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/1.575GHz%20Antenna4_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/CFULB455KB2A-B0_tmb.JPG","http://media.digikey.com/photos/TDK%20Photos/FFE1070MS10RBL_tmb.JPG"],"/filters/common-mode-chokes/3408553":["http://media.digikey.com/photos/Epcos%20Photos/B82787C0513H002_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/8103-RC_tmb.jpg","http://media.digikey.com/photos/Sumida%20Photos/CPFC85NP-WH07_tmb.JPG","http://media.digikey.com/photos/Schaffner%20EMC%20Photos/RN114-0.5-02_tmb.JPG","http://media.digikey.com/photos/Steward%20Photos/CM5441Z161B-10,CM5441Z161B-00_tmb.jpg"],"/filters/crystals/3408237":["http://media.digikey.com/photos/ECS%20Photos/ECS-96SMF21A30_tmb.JPG","http://media.digikey.com/photos/ECS%20Photos/ECS-10.7%20A%20SERIES_tmb.jpg","http://media.digikey.com/photos/ECS%20Photos/ecs-38smf45a15_tmb.JPG"],"/filters/dsl-filters/3408558":["http://media.digikey.com/photos/Pulse%20Photos/Z-A431PJ31X-A_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/750510359_tmb.JPG","http://media.digikey.com/Photos/Pulse%20Photos/CP-V413PS_tmb.jpg"],"/filters/emi-rfi-filters-lc-rc-networks/3408034":["http://media.digikey.com/photos/Bourns%20Photos/EMI%20SERIES_tmb.jpg","http://media.digikey.com/Renders/TDK%20Renders/0603%20(1608%20Metric),%20Array,%2010%20PC%20Pad_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/K%20SERIES_tmb.JPG"],"/filters/feed-through-capacitors/3409014":["http://media.digikey.com/Renders/TDK%20Renders/1206%20CKD%20Series_tmb.jpg","http://media.digikey.com/photos/API%20Delevan%20Photos/SCI-9900-153_tmb.jpg","http://media.digikey.com/Photos/Tusonix%20a%20Subsidiary%20of%20CTS%20Electronic%20Components/4601-052LF_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B85321A2205A250_tmb.jpg"],"/filters/ferrite-beads-and-chips/3408555":["http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/7427521_tmb.jpg","http://media.digikey.com/Renders/Taiyo%20Yuden%20Renders/BK1608HS600-T_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/FB20011-3B-RC,FB20021-4B-RC_tmb.jpg","http://media.digikey.com/Renders/Taiyo%20Yuden%20Renders/BK%20Series%201206%20(3216%20Metric)_tmb.jpg"],"/filters/ferrite-cores-cables-and-wiring/3408554":["http://media.digikey.com/photos/Steward%20Photos/28A3851-0A2_tmb.jpg","http://media.digikey.com/photos/Steward%20Photos/28B0735-300_tmb.jpg","http://media.digikey.com/photos/Steward%20Photos/28A2029-0A0_tmb.jpg"],"/filters/ferrite-disks-and-plates/3408559":["http://media.digikey.com/photos/Steward%20Photos/MP1496-000_tmb.jpg","http://media.digikey.com/photos/Steward%20Photos/MP0350-000_tmb.jpg","http://media.digikey.com/photos/Steward%20Photos/HM0787-200,%20MM0787-200_tmb.jpg"],"/filters/helical-filters/3408137":["http://media.digikey.com/Photos/Toko%20Photos/492S-1059A=P3_tmb.jpg","http://media.digikey.com/Photos/Toko%20Photos/252HXPK-2736F_tmb.jpg","http://media.digikey.com/Photos/Toko%20Photos/271MT-1143A_tmb.jpg"],"/filters/power-line-filter-modules/3408328":["http://media.digikey.com/photos/Curtis%20Industries%20Photos/F1199AA06_tmb.JPG","http://media.digikey.com/photos/Epcos%20Photos/B84110A0000A020_tmb.JPG","http://media.digikey.com/photos/Tyco%20Photos/Tyco%20Electronics%20Corcom-10VB3_tmb.jpg"],"/filters/rf-filters/3408584":["http://media.digikey.com/Renders/Taiyo%20Yuden%20Renders/FI212B190223-T_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/2.45MHz%20Filter4_tmb.jpg","http://media.digikey.com/Photos/Crystek%20Photos/CHPFL-1000_tmb.jpg"],"/filters/saw-filters/3408112":["http://media.digikey.com/Renders/Taiyo%20Yuden%20Renders/FAR-G6KZ-1G8425-Y4WY-Z_tmb.jpg","http://media.digikey.com/photos/ECS%20Photos/ECS-D479.5B,%20ECS-D480A_tmb.jpg","http://media.digikey.com/Photos/Crystek%20Photos/CBPFS-2441_tmb.jpg"],"/hardware-fasteners-accessories/accessories/2097236":["http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_DLS-1_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_1207318_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/1252_tmb.JPG","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_12303_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/0809670_tmb.jpg","http://media.digikey.com/Photos/C-TON%20Ind%20Photos/CC1-G_tmb.jpg"],"/hardware-fasteners-accessories/board-spacers-standoffs/2098158":["http://media.digikey.com/Photos/Assmann%20Photos/V6622A_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/9774030360R_tmb.JPG","http://media.digikey.com/photos/Bivar%20Inc%20Photos/9905-437_tmb.jpg","http://media.digikey.com/photos/Harwin/R30-1000802_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/398_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/4808_tmb.jpg"],"/hardware-fasteners-accessories/board-supports/2097660":["http://media.digikey.com/photos/Richco%20Photos/LCBS-6-01_tmb.JPG","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_23362_tmb.jpg","http://media.digikey.com/Photos/Richco%20Photos/CBSB-10-01A-RT_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_22656_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/9051_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/LCBS-16-HT_tmb.JPG"],"/hardware-fasteners-accessories/bumpers-feet-pads-grips/2097337":["http://media.digikey.com/Photos/3M%20Photos/MFG_SJ6561_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_SJ-5003%20(GRAY)_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/724_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_SJ-5008-GRAY_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_SJ5008_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_18852_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_SJ-5201-LIGHT-BROWN_tmb.jpg"],"/hardware-fasteners-accessories/component-insulators-mounts-spacers/2098454":["http://media.digikey.com/Photos/Bivar%20Inc%20Photos/515-020_tmb.jpg","http://media.digikey.com/Photos/Bivar%20Inc%20Photos/TO-10-050_tmb.JPG","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_23191_tmb.jpg","http://media.digikey.com/Photos/Bivar%20Inc%20Photos/TO-200-100E_tmb.jpg","http://media.digikey.com/Renders/Bivar%20Renders/117-080_tmb.jpg"],"/hardware-fasteners-accessories/din-rail-channel/2097970":["http://media.digikey.com/Photos/TE%20Connectivity/8-1437685-9_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/1207653_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1207682_tmb.jpg"],"/hardware-fasteners-accessories/hole-plugs/2098102":["http://media.digikey.com/photos/Molex/HP-2-C_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_PFP-7-01_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_BPE-RJ45-01_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_20155_tmb.jpg","http://media.digikey.com/photos/Richco%20Photos/LTP-7_tmb.jpg"],"/hardware-fasteners-accessories/knobs/2097177":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/8559_tmb.jpg","http://media.digikey.com/photos/Kilo%20International%20Photos/HD-75%20CLR_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/8566_tmb.jpg","http://media.digikey.com/photos/Kilo%20International%20Photos/ML-90%20CLR_tmb.jpg","http://media.digikey.com/photos/Kilo%20International%20Photos/OESA-63%20CLR_tmb.jpg","http://media.digikey.com/photos/Kilo%20International%20Photos/JD-63%20BLK_tmb.jpg"],"/hardware-fasteners-accessories/labels-labeling/2097410":["http://media.digikey.com/Photos/3M%20Photos/MFG_ESDSIGN8.5X11_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/INVLBL-017_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_596-00413_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/SOL-DCD-104100-4-0%5E1_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_CLABEL4X4_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_596-00239_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_596-00325_tmb.jpg"],"/hardware-fasteners-accessories/miscellaneous/2097904":["http://media.digikey.com/Photos/Panavise%20Photos/MFG_727-04_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/17069_tmb.jpg","http://media.digikey.com/Photos/Panavise%20Photos/MFG_846L_tmb.jpg","http://media.digikey.com/Photos/Panavise%20Photos/MFG_120140B_tmb.jpg","http://media.digikey.com/Photos/Panavise%20Photos/MFG_336MDT_tmb.jpg","http://media.digikey.com/Photos/Panavise%20Photos/MFG_767-TT2_tmb.jpg"],"/hardware-fasteners-accessories/mounting-brackets/2097394":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/621_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/630_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/720-00012_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/4332_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/720-00011_tmb.JPG"],"/hardware-fasteners-accessories/nuts/2097340":["http://media.digikey.com/Photos/Keystone%20Elect%20Photos/4342_tmb.JPG","http://media.digikey.com/Photos/APM%20Hexseal%20Photos/8-32%20AJ%206_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_20157_tmb.jpg"],"/hardware-fasteners-accessories/rivets/2097437":["http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_BPF-A414_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_USR-64125_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/46_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_20181_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_20187_tmb.jpg"],"/hardware-fasteners-accessories/screw-grommet/2098197":["http://media.digikey.com/Photos/Keystone%20Elect%20Photos/768_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_1153434_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_23490_tmb.jpg"],"/hardware-fasteners-accessories/screws-bolts/2097339":["http://media.digikey.com/photos/Building%20Fasteners%20Photos/6X3%208%20PHSMSPH_tmb.JPG","http://media.digikey.com/photos/Building%20Fasteners%20Photos/PMS%20440%200038%20PH_tmb.jpg","http://media.digikey.com/photos/Building%20Fasteners%20Photos/NY%20PMS%20102%200050%20PH_tmb.JPG","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_20308_tmb.jpg","http://media.digikey.com/photos/Building%20Fasteners%20Photos/8x1%202%20hhsms_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/2062_tmb.jpg"],"/hardware-fasteners-accessories/washers/2097338":["http://media.digikey.com/photos/Building%20Fasteners%20Photos/%234FWZ_tmb.JPG","http://media.digikey.com/photos/Building%20Fasteners%20Photos/INT%20LWSS%20006_tmb.JPG","http://media.digikey.com/Photos/APM%20Hexseal%20Photos/74602_tmb.JPG","http://media.digikey.com/Photos/B%20&%20F%20Fastener%20Supply/LWZ%20044_tmb.JPG","http://media.digikey.com/photos/APM%20Hexseal%20Photos/75082_tmb.JPG","http://media.digikey.com/Photos/APM%20Hexseal%20Photos/74302_tmb.jpg"],"/hardware-fasteners-accessories/washers-bushing-shoulder/2098173":["http://media.digikey.com/photos/Richco%20Photos/MNI%234-12_tmb.JPG","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/343_tmb.jpg","http://media.digikey.com/Photos/Aavid%20Thermalloy%20Photos/7721-9PPS_tmb.jpg"],"/inductors-coils-chokes/adjustable-inductors/196629":["http://media.digikey.com/Photos/Toko%20Photos/614AN-9820Z=P3_tmb.jpg","http://media.digikey.com/Photos/Toko%20Photos/BTKENS-T1045Z_tmb.jpg","http://media.digikey.com/Photos/Toko%20Photos/E540SN-08001_tmb.jpg"],"/inductors-coils-chokes/arrays-signal-transformers/197323":["http://media.digikey.com/Photos/Cooper%20Industries%20Photos/CTX300-4A-R_tmb.jpg","http://media.digikey.com/Photos/Cooper%20Bussmann%20Photos/V(P,PH)1-Series_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics%20BI/HM78D-755331MLFTR_tmb.jpg"],"/inductors-coils-chokes/delay-lines/197808":["http://media.digikey.com/photos/Susumu%20Photos/408-3-SIP_tmb.jpg","http://media.digikey.com/photos/Susumu%20Photos/408-16-SOIC_tmb.jpg","http://media.digikey.com/photos/Susumu%20Photos/CL1L5A%201210%20SERIES_tmb.jpg"],"/inductors-coils-chokes/fixed-inductors/196627":["http://media.digikey.com/photos/Wurth%20Electronics%20Photos/744773122_tmb.JPG","http://media.digikey.com/photos/Bourns%20Photos/2000-xxx-V-RC_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/0201(0603)_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/PM3340%20SERIES_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/FIT106_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/7443320470_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/5200%20SERIES_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/PM2120%2010%20SERIES_tmb.jpg","http://media.digikey.com/photos/Wurth%20Electronics%20Photos/744364xxxx_tmb.jpg"],"/inductors-coils-chokes/wireless-charging-coils/197928":["http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/MFG_760308103203_tmb.jpg","http://media.digikey.com/Photos/TDK%20Photos/WT505090-10K2-A11-G_tmb.jpg","http://media.digikey.com/photos/TDK%20Photos/MFG_WT-1005660-12K2-A6-G_tmb.jpg"],"/industrial-controls-meters/accessories/2949204":["http://media.digikey.com/Photos/Phoenix%20Photos/2861250_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/24678174_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/24678128_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/E54-CT1_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/84150201_tmb.jpg","http://media.digikey.com/photos/Crouzet%20Photos/79452103_tmb.jpg"],"/industrial-controls-meters/controllers-liquid-level/2950095":["http://media.digikey.com/Photos/Crouzet%20Photos/PNRU220A_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/84870210_tmb.JPG","http://media.digikey.com/Photos/Crouzet%20Photos/NNR110A_tmb.jpg"],"/industrial-controls-meters/controllers-plc-modules/2950463":["http://media.digikey.com/photos/Crouzet%20Photos/88970223_tmb.JPG","http://media.digikey.com/photos/Phoenix%20Photos/2986229_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/FP2-MCU_tmb.jpg"],"/industrial-controls-meters/controllers-process-temperature/2949451":["http://media.digikey.com/Photos/Panasonic%20Photos/AKT4B111100_tmb.jpg","http://media.digikey.com/Photos/Omron%20Auto/E5EC-PR4D5M-014_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/AKT2111200_tmb.jpg","http://media.digikey.com/Photos/Omron%20Auto/E5EC-PR2ASM-804_tmb.jpg"],"/industrial-controls-meters/controllers-programmable-accessories/2950421":["http://media.digikey.com/Photos/Panasonic%20Photos/AIG02MQ03D_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/AFPX-A21_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/AFP85131_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2981813_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/NV3Q-KBA04_tmb.jpg","http://media.digikey.com/photos/Crouzet%20Photos/88970108_tmb.JPG"],"/industrial-controls-meters/controllers-programmable-logic-plc/2950404":["http://media.digikey.com/Photos/Crouzet%20Photos/88974046_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/AFPX-C14T_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/AFP0RC14CRT14_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/2916532_tmb.jpg"],"/industrial-controls-meters/industrial-equipment/2950405":["http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_LF-1_tmb.jpg","http://media.digikey.com/Photos/Molex/1301750001_tmb.jpg","http://media.digikey.com/Photos/Molex/1301260231_tmb.jpg"],"/industrial-controls-meters/miscellaneous/2949872":["http://media.digikey.com/Photos/Panasonic%20Photos/DPC-101_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/SFC-WY1_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/SW-101_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/SF-AC_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/SF-C14EX_tmb.jpg"],"/industrial-controls-meters/monitor-current-voltage-relay-output/2950356":["http://media.digikey.com/photos/Crouzet%20Photos/84872033_tmb.JPG","http://media.digikey.com/photos/Crouzet%20Photos/84872034_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/DIRT24A_tmb.jpg","http://media.digikey.com/photos/CR%20Magnetics%20Photos/CR7310-EL-120-.01.1-X-CD-ELR-I_tmb.JPG"],"/industrial-controls-meters/monitor-current-voltage-transducer/2950096":["http://media.digikey.com/Photos/Phoenix%20Photos/2813509_tmb.jpg","http://media.digikey.com/photos/CR%20Magnetics%20Photos/MFG_CR4510-250,CR4510-500_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/2810612_tmb.jpg"],"/industrial-controls-meters/panel-meters/2949956":["http://media.digikey.com/Photos/Murata%20Photos/DMR20-1-ACV-R-C_tmb.jpg","http://media.digikey.com/photos/Red%20Lion%20Photos/MDMV0110_tmb.jpg","http://media.digikey.com/photos/C-TON%20Ind%20Photos/DK503_tmb.jpg","http://media.digikey.com/photos/C-TON%20Ind%20Photos/DK759_tmb.jpg"],"/industrial-controls-meters/panel-meters-accessories/2950453":["http://media.digikey.com/Photos/Murata%20Photos/3020-01097-0_tmb.JPG","http://media.digikey.com/photos/Curtis%20Instruments%20Photos/17631800-01_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ATL58011_tmb.JPG"],"/industrial-controls-meters/panel-meters-counters-hour-meters/2949536":["http://media.digikey.com/photos/Omron%20Elect%20Photos/H7CN-BLN-AC100240,%20H7CN-XHN-AC100-240,%20H7CN-XLN-AC100240_tmb.jpg","http://media.digikey.com/photos/Red%20Lion%20Photos/MFG_LD%20Series_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/20017-14_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/H7ER-NV1-B_tmb.JPG","http://media.digikey.com/Photos/Red%20Lion%20Photos/SCUB1LV0_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/LC2H-FE-DL-2KK-B_tmb.JPG"],"/industrial-controls-meters/pneumatics/2950319":["http://media.digikey.com/Photos/Crouzet%20Photos/81516200_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/81541001_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/81548010_tmb.JPG","http://media.digikey.com/Photos/Crouzet%20Photos/81505320_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/81508110_tmb.JPG"],"/industrial-controls-meters/protection-relays-systems/2950355":["http://media.digikey.com/photos/Omron%20Auto/S8M-CP04-RS_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1618067-8_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/1618065-8_tmb.jpg"],"/industrial-controls-meters/sensor-cable-accessories/2950399":["http://media.digikey.com/Photos/Phoenix%20Photos/1543728_tmb.jpg","http://media.digikey.com/Photos/Molex/1210230341_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1527922_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1534135_tmb.JPG"],"/industrial-controls-meters/sensor-cable-assemblies/2950389":["http://media.digikey.com/Photos/Honeywell%20Photos/3685302_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1400769_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1669961_tmb.jpg"],"/industrial-controls-meters/sensor-interface-junction-blocks/2950434":["http://media.digikey.com/Photos/Phoenix%20Photos/2736220_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2736369_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/SL-TBP8-TY_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/SL-T8J_tmb.jpg"],"/industrial-controls-meters/specialized/2949918":["http://media.digikey.com/Photos/Panasonic%20Photos/ANUJ6175_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ANUJ3000_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2810913-USA_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ANUJ6424_tmb.jpg"],"/integrated-circuits-ics/accessories/2555988":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/EKB-UCOS3-BOOK_tmb.jpg","http://media.digikey.com/Photos/TLG%20Publications/400037_tmb.jpg","http://media.digikey.com/Photos/TLG%20Publications/400075_tmb.jpg","http://media.digikey.com/Photos/TLG%20Publications/400075_tmb.jpg","http://media.digikey.com/Photos/Advanced%20Linear%20Devices/EHJ4C_tmb.jpg"],"/isolators/digital-isolators/3736104":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADM3252EABCZ_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/NM485xxx_tmb.JPG","http://media.digikey.com/Renders/Texas%20Instr%20Renders/8-SOIC_tmb.jpg"],"/isolators/isolators-gate-drivers/3736886":["http://media.digikey.com/photos/Avago%20Tech%20Photos/HCPL-315J-000E_tmb.JPG","http://media.digikey.com/Photos/CE%20Labs%20Photos/PS9905-Y-V-AX_tmb.jpg","http://media.digikey.com/Renders/Avago%20Tech%20Renders/SO-8_tmb.jpg"],"/isolators/optoisolators-logic-output/3736381":["http://media.digikey.com/Photos/TT%20Electronics-Optek%20Photos/OPI1268,%20OPI1268S_tmb.JPG","http://media.digikey.com/photos/Avago%20Tech%20Photos/516-8-DIP%20(W)_tmb.jpg","http://media.digikey.com/Photos/Fairchild%20Optoelectronics/FODM8061_tmb.jpg"],"/isolators/optoisolators-transistor-photovoltaic-output/3736383":["http://media.digikey.com/photos/Toshiba%20Photos/264-4-MFSOP_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/255-4-SSOP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/isolators/optoisolators-triac-scr-output/3736394":["http://media.digikey.com/photos/Toshiba%20Photos/TLP3052(S,C,F,T)_tmb.JPG","http://media.digikey.com/Renders/Vishay%20Semi%20Renders/VO3526_tmb.jpg","http://media.digikey.com/Photos/Sharp%20Photos/4-SIP_tmb.jpg"],"/isolators/special-purpose/3736395":["http://media.digikey.com/Photos/Advanced%20Photonix%20Photos/NSL-32-Series_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/16-SOIC_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg"],"/kits/accessories/2490452":["http://media.digikey.com/Photos/Qualtek%20Photos/Q2-F-RK4-1-11-6IN-10_tmb.JPG","http://media.digikey.com/photos/Qualtek%20Photos/Q2-F-RK4-1%5E16-11-6IN-39_tmb.JPG","http://media.digikey.com/photos/Tyco%20Raychem%20Photos/VER001K_tmb.jpg"],"/kits/audio-kits/2491654":["http://media.digikey.com/photos/Mallory%20Sonalert%20Products%20Photos/458-kit-nd_tmb.jpg"],"/kits/cable-assemblies/2491515":["http://media.digikey.com/photos/Pomona%20Photos/MFG_6534_tmb.jpg"],"/kits/cables-wires-single-conductors/2491577":["http://media.digikey.com/photos/Alpha%20Wire%20Photos/HUKIT20%20NC032,HUKIT40%20NC032_tmb.JPG"],"/kits/capacitor-kits/2490603":["http://media.digikey.com/Photos/Vishay%20BC%20Photos/VY21-KIT-HF_tmb.jpg","http://media.digikey.com/photos/Kemet%20Photos/TAN%20ENG%20KIT%2024_tmb.jpg","http://media.digikey.com/Photos/Cornell%20Dubilier%20Photos/TAC151A-F_tmb.jpg"],"/kits/circuit-protection-assortment-kits/2491578":["http://media.digikey.com/photos/Wurth%20Electronics%20Photos/823999_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/PN-DESIGNKIT-5_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/MFG_TBU-LAB1_tmb.jpg"],"/kits/circuit-protection-kits-fuse/2491579":["http://media.digikey.com/Photos/Littelfuse%20Photos/Q7201541_tmb.jpg","http://media.digikey.com/photos/Littelfuse%20Photos/3AG%20FUSE%20313%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/MF-RLAB-L_tmb.jpg"],"/kits/circuit-protection-kits-tvs-diodes/2491580":["http://media.digikey.com/Renders/Micro%20Commercial%20Renders/Q3713303_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/DO-214AA,SMB_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/SMAJ-A-KIT-ND_tmb.jpg"],"/kits/connector-adapter-kits/2491209":["http://media.digikey.com/Photos/Pomona%20Photos/72934_tmb.jpg","http://media.digikey.com/Photos/Bomar%20Inter%20Photos/ADPT4RP_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_6201_tmb.jpg"],"/kits/connector-kits/2490977":["http://media.digikey.com/photos/American%20Elect%20Photos/162025_tmb.JPG","http://media.digikey.com/photos/Molex/76650-0033_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/3202999_tmb.JPG"],"/kits/discrete-assortment-kits/2491188":["http://media.digikey.com/Photos/Fairchild%20Semi%20Photos/Q3571436_tmb.jpg","http://media.digikey.com/Photos/STMicro%20Photos/497-8012-KIT_tmb.jpg","http://media.digikey.com/Photos/Comchip%20Tech%20Photos/ZENER-KIT_tmb.jpg"],"/kits/educational-kits/2490983":["http://media.digikey.com/photos/Parallax%20Photos/MFG_27313_tmb.jpg","http://media.digikey.com/Photos/Adafruit%20Industries%20LLC/68_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/572-28132_tmb.jpg"],"/kits/fiber-optic-kits/2491664":["http://media.digikey.com/photos/Tyco%20Photos/1278862-1_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/MFG_8700-PS%5EAPC_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_8765-APC_tmb.jpg"],"/kits/filter-kits/2490390":["http://media.digikey.com/Renders/AVX%20Renders/W2F-0805_tmb.jpg","http://media.digikey.com/photos/Steward%20Photos/K-404%20EMI%20A%20LG_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/CMT908-KIT_tmb.jpg"],"/kits/hardware-kits/2490374":["http://media.digikey.com/Photos/Keystone%20Elect%20Photos/SCR-4_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/STR-632_tmb.jpg","http://media.digikey.com/photos/Building%20Fasteners%20Photos/Q6589786_tmb.JPG"],"/kits/heat-shrink-tubing-kits/2491665":["http://media.digikey.com/photos/Tyco%20Raychem%20Photos/VERSAFIT-KIT%202_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/Q4988649_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_FP301-1%5E2-BLACK_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_FP-301-2-CLEAR_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/DWP-125-KIT3_tmb.JPG"],"/kits/ic-assortment-kits/2491183":["http://media.digikey.com/photos/Infineon%20Photos/KIT%20MMIC%20GP_tmb.JPG","http://media.digikey.com/photos/STMicro%20Photos/SAMPLEKITM0-7_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg"],"/kits/inductors-coils-chokes-kits/2490938":["http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/ASPI-0315FS%20Series_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/FIT-KIT_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/FIRCH-KIT_tmb.jpg"],"/kits/led-kits/2490403":["http://media.digikey.com/Photos/Rohm%20Photos/511-8002-KIT_tmb.JPG","http://media.digikey.com/Photos/Rohm%20Photos/511-8001-KIT_tmb.jpg","http://media.digikey.com/Photos/Rohm%20Photos/Q3629055_tmb.jpg"],"/kits/miscellaneous/2491120":["http://media.digikey.com/Photos/Digi-Key%20Photos/DKTGRS232C-KIT_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/8507A9622_tmb.jpg","http://media.digikey.com/Photos/Johanson%20Tech%20Photos/L%5EC-402DS_tmb.JPG","http://media.digikey.com/photos/Pomona%20Photos/MFG_5513_tmb.jpg"],"/kits/obsolete-discontinued-part-numbers/2490418":["http://media.digikey.com/photos/Paladin%20Tools%20Photos/MFG_4359_tmb.jpg"],"/kits/potentiometer-kits/2490609":["http://media.digikey.com/photos/CTS%20Photos/963260-KIT_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/H-870_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/Q227262_tmb.jpg"],"/kits/prototype-boards-kits-unperforated/2491658":["http://media.digikey.com/Photos/Capital%20Advanced%20Tech%20Photos/MK-9000_tmb.jpg","http://media.digikey.com/photos/Capital%20Advanced%20Tech%20Photos/MK-US-260_tmb.jpg","http://media.digikey.com/photos/Capital%20Advanced%20Tech%20Photos/MK-6000_tmb.jpg"],"/kits/resistor-kits/2490615":["http://media.digikey.com/Photos/Ohmite%20Photos/CAB-SMDMETFL_tmb.jpg","http://media.digikey.com/Renders/Yageo%20Renders/RSF100JB-6K8_tmb.jpg","http://media.digikey.com/Renders/Panasonic%20Renders/ERJ-0805%20Pkg_tmb.jpg","http://media.digikey.com/Photos/Stackpole%20Photos/KIT-RMCF0402JT-12_tmb.jpg","http://media.digikey.com/Renders/Yageo%20Renders/SQP10_tmb.jpg"],"/kits/rf-shield-kits/2491667":["http://media.digikey.com/Photos/Laird%20Tech%20Photos/EMI-SAMPLE-KIT_tmb.JPG","http://media.digikey.com/photos/Laird%20Tech%20Photos/6999_tmb.jpg","http://media.digikey.com/photos/Fotofab%20Photos/RF%20PROTOTYPE%20KIT-%20LARGE%20SHEET_tmb.jpg"],"/kits/sensor-kits/2491513":["http://media.digikey.com/Photos/Parallax%20Photos/27901_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/HMC1055_tmb.jpg","http://media.digikey.com/Photos/Interlink%20Electronics%20Photos/50-76247_tmb.jpg"],"/kits/static-control-kit/2490566":["http://media.digikey.com/photos/3M%20Photos/8505_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/733_tmb.jpg","http://media.digikey.com/photos/ACL%20Staticide%20Photos/2200_tmb.JPG"],"/kits/switch-kits/2491668":["http://media.digikey.com/photos/NKK%20Switches%20Photos/KIT-DIGI-KEY%20S%20SERIES-NKK_tmb.jpg","http://media.digikey.com/photos/CW%20Ind%20Photos/SW-KIT-ND_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/Q4179708_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/MSeriesSampleKit-NKK_tmb.jpg","http://media.digikey.com/photos/Hamlin%20Photos/HE1-KIT_tmb.jpg","http://media.digikey.com/photos/E-Switch%20Photos/MFG_SAMPLE_KIT_SMT_TACT_tmb.jpg"],"/kits/tape-kits/2491659":["http://media.digikey.com/Photos/3M%20Photos/MFG_TK7104_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_TK2323_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_TK1402_tmb.jpg"],"/kits/thermistor-kits/2491521":["http://media.digikey.com/Photos/GE%20Sensing%20Photos/KCPTC1-KIT_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B59005Z999A99_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B59004Z999A99_tmb.jpg"],"/kits/transformer-kits/2490873":["http://media.digikey.com/photos/Triad%20Magnetics%20Photos/CST306-KIT_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/GDE25-KIT_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/CST206-KIT_tmb.jpg"],"/kits/wire-and-cable-tie-kits/2491215":["http://media.digikey.com/Photos/3M%20Photos/MFG_RF8020_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/CT06220_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/kb-550_tmb.JPG"],"/line-protection-distribution-backups/accessories/3211348":["http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SURBC2030_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_APSX3024SW_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SUPDM56HW_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2838733_tmb.jpg"],"/line-protection-distribution-backups/dc-to-ac-power-inverters/3211935":["http://media.digikey.com/photos/Tripplite%20Photos/mfgPV375_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/PV2000FC_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/PV1800HF_tmb.jpg"],"/line-protection-distribution-backups/line-conditioners/3211324":["http://media.digikey.com/photos/Tripplite%20Photos/mfgLS606M_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/mfgLC2400_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_IS-1000_tmb.jpg"],"/line-protection-distribution-backups/power-distribution-surge-protectors/3211875":["http://media.digikey.com/Photos/Tripplite%20Photos/TLM812SA_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/PS6_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/1250-3S-230_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/mfg3SP_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SK5TEL-0_tmb.jpg"],"/line-protection-distribution-backups/ups-systems/3211320":["http://media.digikey.com/Photos/Tripplite%20Photos/MFG_INTERNET550SER_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/BC%20PERS300_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_SMART1300LCDT_tmb.jpg"],"/magnetics-transformer-inductor-components/bobbins-coil-formers-mounts-hardware/5113148":["http://media.digikey.com/Photos/Epcos%20Photos/B65814P1012D1_tmb.JPG","http://media.digikey.com/Photos/Epcos%20Photos/B66362B1014T1_tmb.JPG","http://media.digikey.com/Photos/Epcos%20Photos/B65679E3X22_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B64291A1004X_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B64292A1304X_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B66388A2000T1_tmb.jpg"],"/magnetics-transformer-inductor-components/ferrite-cores/5113149":["http://media.digikey.com/Photos/Epcos%20Photos/B64290L44X27_tmb.JPG","http://media.digikey.com/Photos/Epcos%20Photos/B66358GX187_tmb.JPG","http://media.digikey.com/Photos/Epcos%20Photos/B65813JY38_tmb.jpg","http://media.digikey.com/photos/Epcos%20Photos/B62152A001X001_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B67345B1X27_tmb.jpg"],"/magnetics-transformer-inductor-components/magnet-wire/5113147":["http://media.digikey.com/Photos/CnC%20Tech/600220_tmb.JPG","http://media.digikey.com/Photos/CnC%20Tech/600224_tmb.JPG","http://media.digikey.com/Photos/Sparkfun%20Elec%20%20Photos/MFG_PRT-11363_tmb.jpg"],"/memory-cards-modules/accessories/1900628":["http://media.digikey.com/photos/Maxim%20Photos/DS1402D-DB8+_tmb.jpg","http://media.digikey.com/photos/Maxim%20Photos/DS9107+_tmb.jpg","http://media.digikey.com/Photos/Maxim%20Photos/DS9092L+_tmb.jpg"],"/memory-cards-modules/memory-modules/1901818":["http://media.digikey.com/Photos/Swissbit%20NA%20Inc/SGN01G64D2BG1SA-CCWRT_tmb.jpg","http://media.digikey.com/Photos/Wintec/W7EU001G1XD-S20PD-002.B4_tmb.jpg","http://media.digikey.com/Photos/Wintec/WD2RE04GX836-667G-PFI_tmb.JPG"],"/memory-cards-modules/memory-cards/1901091":["http://media.digikey.com/Photos/Swissbit%20NA%20Inc/SFSD2048N1BW1MT-I-ME-111-STD_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/MFG_RP-SDP16G_tmb.jpg","http://media.digikey.com/Photos/Swissbit%20NA%20Inc/SFCF32GBH2BU4TO-I-QT-527-STD_tmb.JPG"],"/memory-cards-modules/solid-state-drives-ssds/1901403":["http://media.digikey.com/Photos/Virtium/VSFB18PI_tmb.jpg","http://media.digikey.com/Photos/Swissbit%20NA%20Inc/SFSA120GQ1BJ8TO-I-LB-216-STD_tmb.jpg","http://media.digikey.com/Photos/Swissbit%20NA%20Inc/SFSA64GBU1BR4MT-I-QT-236-STD_tmb.jpg"],"/memory-cards-modules/specialized/1901342":["http://media.digikey.com/photos/Dallas%20Semicon%20Photos/DS1971-F5+_tmb.JPG","http://media.digikey.com/Photos/Maxim%20Photos/DS1921K%23_tmb.jpg","http://media.digikey.com/Photos/Maxim%20Photos/DS1920-F5+_tmb.jpg"],"/memory-cards-modules/usb-flash-drives/1901430":["http://media.digikey.com/photos/SanDisk%20Photos/MFG_SDUFD2AA-8192_tmb.jpg","http://media.digikey.com/photos/SanDisk%20Photos/MFG_SDUFD2AD-8192_tmb.jpg","http://media.digikey.com/photos/SanDisk%20Photos/MFG_SDUFD2AK-8192_tmb.jpg"],"/motors-solenoids-driver-boards-modules/accessories/983124":["http://media.digikey.com/photos/Panasonic%20Photos/DV0P4420_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/DV0P4281_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/MFCA0003EPK-GW_tmb.jpg"],"/motors-solenoids-driver-boards-modules/motor-driver-boards-modules/983982":["http://media.digikey.com/Photos/Trinamic%20Motion%20Control%20Photos/TMCM-1043_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/MCDDT3520003_tmb.jpg","http://media.digikey.com/Photos/Trinamic%20Motion%20Control%20Photos/TMCM-142-IF-TMCL_tmb.jpg","http://media.digikey.com/Photos/Trinamic%20Motion%20Control%20Photos/TMCM-1161_tmb.jpg"],"/motors-solenoids-driver-boards-modules/motors-ac-dc/983125":["http://media.digikey.com/Photos/Panasonic%20Photos/MDMA502S1D_tmb.jpg","http://media.digikey.com/photos/Cramer%20Photos/30827_tmb.JPG","http://media.digikey.com/photos/Parallax%20Photos/MFG_900-00008_tmb.jpg","http://media.digikey.com/Photos/NMB%20Tech%20Photos/M1N10FB11G_tmb.jpg","http://media.digikey.com/Photos/Trinamic%20Motion%20Control%20Photos/QBL5704-116-04-042_tmb.jpg"],"/motors-solenoids-driver-boards-modules/solenoids/983712":["http://media.digikey.com/Photos/Pontiac%20Coil%20Inc%20Photos/f0482a_tmb.JPG","http://media.digikey.com/photos/Pontiac%20Coil%20Inc%20Photos/G0412A_tmb.JPG","http://media.digikey.com/Photos/Pontiac%20Coil%20Inc%20Photos/F0453A_tmb.JPG"],"/motors-solenoids-driver-boards-modules/stepper-motors/983126":["http://media.digikey.com/photos/Portescap%20Danaher%20Motion%20US%20LLC%20Photos/42M048C2U_tmb.jpg","http://media.digikey.com/Photos/Trinamic%20Motion%20Control%20Photos/QSH5718-51-28-101_tmb.jpg","http://media.digikey.com/photos/Portescap%20Danaher%20Motion%20US%20LLC%20Photos/42M048C1B-Z36_tmb.JPG"],"/networking-solutions/accessories/4653140":["http://media.digikey.com/Photos/B&B%20Electronics/MFG_UH401-2KV_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/850-39950_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/MFG_EIS-PS-US_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/MFG_USBSSP_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/MFG_C5UMB7FBG_tmb.jpg"],"/networking-solutions/miscellaneous/4653808":["http://media.digikey.com/Photos/Option%20NV/MFG_CG0192-11897_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/485SD9R_tmb.JPG","http://media.digikey.com/Photos/B&B%20Electronics/MFG_ESW20-SERIES_tmb.jpg","http://media.digikey.com/Photos/Illumra/E9X-R12GP_tmb.jpg","http://media.digikey.com/photos/B&B%20Electronics/856-18830_tmb.jpg"],"/networking-solutions/routers/4654372":["http://media.digikey.com/Photos/Digi%20Int%27l%20Photos/X2E-Z4C-D2-A_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/RT3G-300_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/MFG_ABDN-ER-IN5010_tmb.jpg","http://media.digikey.com/photos/Laird%20Tech%20Photos/Z100S1AFR_tmb.JPG","http://media.digikey.com/Photos/LM%20Technologies/MFG_009_1036_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2700639_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2314008_tmb.JPG","http://media.digikey.com/Photos/Multi-Tech%20Photos/MTCBA-EV2-EN2-GP-N3_tmb.jpg"],"/optical-inspection-equipment/accessories/4063316":["http://media.digikey.com/photos/Luxo%20Photos/36205_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/26100-255-PWR_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ANM85202CE_tmb.jpg"],"/optical-inspection-equipment/arms-mounts-stands/4064400":["http://media.digikey.com/photos/Luxo%20Photos/60001BK_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/MFG_26700-215_tmb.jpg","http://media.digikey.com/photos/Luxo%20Photos/50005LG_tmb.jpg"],"/optical-inspection-equipment/cameras/4063412":["http://media.digikey.com/Photos/Aven%20Photos/26100-240_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/ANPD065-25_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/26100-254_tmb.jpg"],"/optical-inspection-equipment/eyepieces-lenses/4064401":["http://media.digikey.com/photos/Luxo%20Photos/50206_tmb.jpg","http://media.digikey.com/photos/Luxo%20Photos/50202_tmb.jpg","http://media.digikey.com/photos/Aven%20Photos/26107_tmb.JPG"],"/optical-inspection-equipment/illumination-sources/4064405":["http://media.digikey.com/Photos/Aven%20Photos/26200B-213_tmb.jpg"],"/optical-inspection-equipment/lamps-magnifying-task/4064402":["http://media.digikey.com/photos/Aven%20Photos/26501-LED_tmb.jpg","http://media.digikey.com/photos/Luxo%20Photos/17900BK_tmb.jpg","http://media.digikey.com/Photos/Chip%20Quik%20Photos/MLU-8093-B_tmb.jpg"],"/optical-inspection-equipment/loupes-magnifiers/4064403":["http://media.digikey.com/Photos/Aven%20Photos/26010_tmb.JPG","http://media.digikey.com/Photos/Aven%20Photos/26000_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/26225_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/26034_tmb.jpg","http://media.digikey.com/photos/Aven%20Photos/26030_tmb.JPG"],"/optical-inspection-equipment/microscopes/4063899":["http://media.digikey.com/Photos/Aven%20Photos/MFG_26800B-371_tmb.jpg","http://media.digikey.com/photos/Aven%20Photos/26700-200_tmb.JPG","http://media.digikey.com/Photos/Aven%20Photos/26700-300_tmb.jpg"],"/optical-inspection-equipment/video-inspection-systems/4064404":["http://media.digikey.com/photos/Aven%20Photos/MFG_20000-200_tmb.jpg","http://media.digikey.com/photos/Easy%20Braid%20Photos/MFG_VPI-1000_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/26700-610_tmb.jpg"],"/computers-office-components-accessories/accessories/3670100":["http://media.digikey.com/Photos/MG%20Chemicals%20Photos/MFG_PREM%203D%20FLMNT%20Red_tmb.jpg","http://media.digikey.com/photos/Nakagawa%20Mfg%20Photos/EPL-60_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_556-00240_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_556-00238_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_B140-1A0-WP_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_NC2003SR_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_5145371_tmb.jpg"],"/computers-office-components-accessories/adapter-cards/3670499":["http://media.digikey.com/Photos/B&B%20Electronics/MFG_3PCIOU2_tmb.jpg","http://media.digikey.com/photos/Intel%20Photos/CNLA6000PK5_tmb.JPG","http://media.digikey.com/Photos/B&B%20Electronics/MFG_3PCIOU4_tmb.jpg"],"/computers-office-components-accessories/adapters/3670173":["http://media.digikey.com/photos/DLP%20Design%20Inc/DLP-USB232M-G_tmb.JPG","http://media.digikey.com/Photos/B&B%20Electronics/MFG_485USB9F-4W_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/USOPTL4-LS_tmb.jpg","http://media.digikey.com/photos/FTDI%20(Future%20Tech%20Devices)/USB-COM485-PLUS-1_tmb.jpg"],"/computers-office-components-accessories/books-videos-cd-roms/3671023":["http://media.digikey.com/photos/Digi-Key%20Photos/CW1051_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/MFG_744013_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/744006_tmb.jpg"],"/computers-office-components-accessories/brackets/3670554":["http://media.digikey.com/photos/Keystone%20Elect%20Photos/9200-2_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/9201_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/9203-1_tmb.JPG"],"/computers-office-components-accessories/cameras-projectors/3671253":["http://media.digikey.com/photos/Panasonic%20Photos/GP-KX121%5E45P_tmb.jpg","http://media.digikey.com/photos/Assmann%20Photos/Mfg_DA-70814_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_XR-0062-3684-2_tmb.jpg"],"/computers-office-components-accessories/computer-mouse-trackballs/3670874":["http://media.digikey.com/photos/Cherry%20Switch%20Photos/M-300R_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_PR-PRO4_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/LP1007EXXH00-R_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/DT2253X20VOO_tmb.jpg"],"/computers-office-components-accessories/desktop-joysticks-simulation-products/3671277":["http://media.digikey.com/Photos/CH%20Products/MFG_200-503_tmb.jpg","http://media.digikey.com/Photos/CH%20Products/300-111_tmb.jpg","http://media.digikey.com/Photos/CH%20Products/VM%20Desktop_tmb.jpg","http://media.digikey.com/Photos/CH%20Products/MFG_300-122_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/100-550-BLK-RF_tmb.jpg"],"/computers-office-components-accessories/films-and-filters/3670267":["http://media.digikey.com/Photos/3M%20Photos/ULTRA%20S150_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/PF400LB,PF400XLB,PF400XXLB_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_PF20.1%20WIDESCREEN_tmb.jpg"],"/computers-office-components-accessories/hubs-servers/3670873":["http://media.digikey.com/Photos/Tripplite%20Photos/MFG_U222-007-R_tmb.jpg","http://media.digikey.com/Photos/B&B%20Electronics/USBHUB4OEM_tmb.JPG","http://media.digikey.com/Photos/Multi-Tech%20Photos/MTR-H5-B09_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_B126-1A0-WP-1_tmb.jpg"],"/computers-office-components-accessories/keyboards/3670321":["http://media.digikey.com/Photos/Storm%20Interface%20Photos/2212-352323_tmb.jpg","http://media.digikey.com/Photos/Cherry%20Switch%20Photos/M8224810EU_tmb.jpg","http://media.digikey.com/Photos/Cherry%20Switch%20Photos/G844700LUCUS0_tmb.jpg"],"/computers-office-components-accessories/kvm-switches-keyboard-video-mouse/3670769":["http://media.digikey.com/photos/Tripplite%20Photos/mfgB022-004-R_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_B020-008-17_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_B004-VPA2-K-R_tmb.jpg"],"/computers-office-components-accessories/kvm-switches-keyboard-video-mouse-cables/3671081":["http://media.digikey.com/Photos/Assmann%20Photos/AK82002-R_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_P778-0xx%20Series_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_0SU51079%5E8_tmb.jpg"],"/computers-office-components-accessories/labels-labeling/3670274":["http://media.digikey.com/Photos/Phoenix%20Photos/0825433_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/0819482_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/TT822OUTSM5_tmb.jpg"],"/computers-office-components-accessories/magnetic-strip-smart-card-readers/3670872":["http://media.digikey.com/photos/Omron%20Elect%20Photos/3S4YR-HNF1_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/ZU-1870MA5T5_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/ZU-9A36B11_tmb.jpg"],"/computers-office-components-accessories/memory-card-readers/3671050":["http://media.digikey.com/Photos/Tripplite%20Photos/MFG_U352-000-MD_tmb.jpg","http://media.digikey.com/Photos/Tripplite%20Photos/MFG_U352-000-SD-R_tmb.jpg","http://media.digikey.com/Photos/Assmann%20Photos/DA-70310-2_tmb.jpg"],"/computers-office-components-accessories/modems/3671199":["http://media.digikey.com/Photos/Multi-Tech%20Photos/MT9234ZBA-IEC_tmb.jpg","http://media.digikey.com/Photos/Multi-Tech%20Photos/MT9234MU-CDC-XR_tmb.jpg","http://media.digikey.com/photos/Multi-Tech%20Photos/MT9234ZPX-PCIE_tmb.JPG"],"/computers-office-components-accessories/monitors/3671284":["http://media.digikey.com/Photos/Touch%20Revolution/M17A-1101_tmb.jpg","http://media.digikey.com/Photos/Touch%20Revolution/K15A-0101_tmb.jpg","http://media.digikey.com/Photos/Touch%20Revolution/K32A-0111_tmb.jpg"],"/computers-office-components-accessories/printers/3670423":["http://media.digikey.com/Photos/Weidmuller/MFG_1962340000_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_556-00430_tmb.jpg","http://media.digikey.com/photos/CBM%20America%20Photos/CMB-270%20RF%20120V-L_tmb.jpg","http://media.digikey.com/photos/CBM%20America%20Photos/LT1221C_tmb.jpg"],"/computers-office-components-accessories/switches/3671288":["http://media.digikey.com/photos/Harting/20761163000_tmb.jpg","http://media.digikey.com/Photos/Harting/MFG_20772083001_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2989831_tmb.jpg"],"/optoelectronics/accessories/524372":["http://media.digikey.com/Photos/Newhaven%20Display%20Photos/NHD-FFC16-1_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/ESP-125%20(PC159)_tmb.jpg","http://media.digikey.com/Photos/Molex/180150-0001_tmb.jpg","http://media.digikey.com/Photos/Visual%20Communications%20Company%20VCC/CMC_321_BTP_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_AT4169DB_tmb.jpg"],"/optoelectronics/bezels/524327":["http://media.digikey.com/photos/PRD%20Plastics%20Photos/6302020_tmb.jpg","http://media.digikey.com/photos/PRD%20Plastics%20Photos/6301050_tmb.jpg","http://media.digikey.com/photos/Storm%20Interface%20Photos/5001-200103_tmb.jpg"],"/optoelectronics/display-modules-lcd-oled-character-and-numeric/524437":["http://media.digikey.com/photos/Matrix%20Orbital%20Photos/LK204-25-WB_tmb.jpg","http://media.digikey.com/Photos/E%20Ink%20Corporation/MFG_SC009221_tmb.jpg","http://media.digikey.com/photos/Varitronix/VI-502-DP-FC-S_tmb.JPG","http://media.digikey.com/photos/Newhaven%20Display%20Photos/MFG_NHD-0116GZ-FSR-FBW_tmb.jpg","http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_NHD-0216K1Z-FS(RGB)-FBW-REV1_tmb.jpg","http://media.digikey.com/Photos/Storm%20Interface%20Photos/MFG_5100%20Series_tmb.jpg","http://media.digikey.com/Photos/Matrix%20Orbital%20Photos/LK162A-4T_tmb.jpg","http://media.digikey.com/Photos/E%20Ink%20Corporation/MFG_SC005221_tmb.jpg","http://media.digikey.com/Photos/Matrix%20Orbital%20Photos/ELK204-7T-USB-YG-PL_tmb.jpg"],"/optoelectronics/display-modules-lcd-oled-graphic/524918":["http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_NHD-4.3-480272EF-ATXL%23-T_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_C2234SW_tmb.jpg","http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_NHD-2-7-12864UCY3_tmb.jpg","http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_NHD-C12832A1Z-NSW-BBW-3V3_tmb.jpg","http://media.digikey.com/Photos/NKK%20Switches%20Photos/MFG_ISC01P_tmb.jpg"],"/optoelectronics/display-modules-led-character-and-numeric/524324":["http://media.digikey.com/Photos/SunLED/MFG_XZFAMDK10C2_tmb.jpg","http://media.digikey.com/photos/Lumex%20Photos/LDD-A512,A513,A514,A516,C512,C513,C514,C516%20RI%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Lite%20On%20Photos/LTS-6760P_tmb.JPG"],"/optoelectronics/display-modules-led-dot-matrix-and-cluster/524337":["http://media.digikey.com/Photos/SunLED/MFG_XMUG18C_tmb.jpg","http://media.digikey.com/Photos/Osram%20Opto%20Photos/SCD55102A_tmb.JPG","http://media.digikey.com/Photos/SunLED/MFG_XK50MDKW46_tmb.jpg","http://media.digikey.com/Photos/Lite%20On%20Photos/LTP-305G_tmb.JPG","http://media.digikey.com/photos/Sunbrite%20Photos/SSP-LXS06762S9A_tmb.jpg"],"/optoelectronics/display-modules-vacuum-fluorescent-vfd/524550":["http://media.digikey.com/Photos/Matrix%20Orbital%20Photos/MFG_VK204-25-E_tmb.jpg","http://media.digikey.com/photos/Noritake%20Photos/CU20045SCPB-W5J%20NOT%20EXACT_tmb.jpg","http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_M0216MD-162MDBR2-J_tmb.jpg"],"/optoelectronics/display-monitor-interface-controller/525352":["http://media.digikey.com/photos/3M%20Photos/SC801U_tmb.jpg","http://media.digikey.com/photos/Digital%20View%20Photos/4171000XX-3_tmb.jpg","http://media.digikey.com/Photos/Newhaven%20Display%20Photos/MFG_8051%20CONTROL%20BOARD_tmb.jpg"],"/optoelectronics/fiber-optics-attenuators/525360":["http://media.digikey.com/Photos/TE%20Connectivity/1693560-5_tmb.JPG","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/HSC-AT11K-A03_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/FC%20DUAL%20WINDWO%20ATTENUATORS%20GREEN%20189%20T053_tmb.jpg"],"/optoelectronics/fiber-optics-receivers/525357":["http://media.digikey.com/Photos/Finisar/FRXD02SL1C_tmb.JPG","http://media.digikey.com/photos/Industrial%20Fiberoptics%20Photos/IF-D93_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/GP1FA313TZ,GP1FA512TZ,GP1FA514TZ,GP1FA313RZ0F,GP1FA513RZ0F_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/GP1FP513TK,GP1FP513RK_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics-Optek%20Photos/OPF500_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/P1RX6B-SX51V-02B-DC_tmb.jpg"],"/optoelectronics/fiber-optics-switches-multiplexers-demultiplexers/525362":["http://media.digikey.com/photos/Omron%20Elect%20Photos/P1X4A-MX1511S20-SC,P1X4A-DX1511S20-SC_tmb.jpg","http://media.digikey.com/Photos/Finisar/FWSF-MD-8_tmb.JPG","http://media.digikey.com/photos/Tyco%20Amp%20Photos/99427-2_tmb.jpg"],"/optoelectronics/fiber-optics-transceivers/525358":["http://media.digikey.com/Photos/Finisar/FTLF1217P2BTL_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/HFBR-5911ALZ_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/AFBR-5805TZ_tmb.jpg"],"/optoelectronics/fiber-optics-transmitters-discrete/525355":["http://media.digikey.com/Photos/Industrial%20Fiberoptics%20Photos/IF-E99B_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/1907911_tmb.JPG","http://media.digikey.com/photos/Avago%20Tech%20Photos/HFBR-1524Z_tmb.JPG","http://media.digikey.com/Photos/Lite%20On%20Photos/LTDL-TA25A%5EL4_tmb.jpg","http://media.digikey.com/Photos/Lite%20On%20Photos/LTDL-TA25B-T_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics-Optek%20Photos/OPF345A_tmb.jpg"],"/optoelectronics/fiber-optics-transmitters-drive-circuitry-integrated/525354":["http://media.digikey.com/Photos/Avago%20Tech%20Photos/AFBR-732BWZ_tmb.JPG","http://media.digikey.com/photos/Lite%20On%20Photos/MFG_LTDL-TX12P05_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/GP1FP513TK,GP1FP513RK_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/P1TX6B-SX51V-02B-DC_tmb.JPG"],"/optoelectronics/infrared-uv-visible-emitters/524328":["http://media.digikey.com/Photos/Osram%20Opto%20Photos/SFH%204715S_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/Round,%203mm,%20T-1_T-1_tmb.jpg","http://media.digikey.com/Photos/Opto%20Diode%20Corp/OD-669_tmb.jpg","http://media.digikey.com/Photos/LEDEngin/LZ4-40U600-0000_tmb.JPG","http://media.digikey.com/Photos/Everlight%20Electronics/HIR36-01C%5ES32_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/LN55_tmb.jpg"],"/optoelectronics/inverters/524345":["http://media.digikey.com/photos/TDK%20Photos/CXA-L10A_tmb.jpg","http://media.digikey.com/photos/JKL/NDL-217_tmb.jpg","http://media.digikey.com/photos/TDK%20Photos/CXA-L0612A-VJL_tmb.JPG"],"/optoelectronics/lamps-cold-cathode-fluorescent-ccfl-uv/524570":["http://media.digikey.com/photos/JKL/MFG_33C_tmb.jpg","http://media.digikey.com/photos/JKL/MFG_33E_tmb.jpg","http://media.digikey.com/photos/JKL/FLUORESCENT%20LAMP%20ASSEMBLY_tmb.jpg"],"/optoelectronics/lamps-incandescents-neons/524517":["http://media.digikey.com/photos/JKL/MFG_20D_tmb.jpg","http://media.digikey.com/photos/CML%20Innovative%20Photos/B2A_tmb.jpg","http://media.digikey.com/photos/CML%20Innovative%20Photos/656_tmb.jpg","http://media.digikey.com/photos/CML%20Innovative%20Photos/1156_tmb.jpg","http://media.digikey.com/photos/CK%20Comp%20Photos/1.90180.4750000_tmb.JPG"],"/optoelectronics/laser-diodes/524333":["http://media.digikey.com/photos/US%20Lasers/D6505I_tmb.jpg","http://media.digikey.com/Photos/US%20Lasers/MM650-5%20W%5ESPRING_tmb.JPG","http://media.digikey.com/photos/Quarton%20Photos/VLM-650-04-SPA_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics-Optek%20Photos/OPV314YBT_tmb.jpg"],"/optoelectronics/led-indication-discrete/524729":["http://media.digikey.com/photos/Cree%20Photos/LC503FPG1-30Q-A3_tmb.jpg","http://media.digikey.com/Photos/Everlight%20Electronics/61-238%5ELK2C-B45568F6GB2%5EET_tmb.jpg","http://media.digikey.com/Renders/Rohm%20Renders/SML-P12UTT86_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/CP42B-RKS-CL0P0AA4_tmb.jpg","http://media.digikey.com/Renders/Bivar%20Renders/SM1204BC_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/LN277RPX_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/732-4999-1-ND_tmb.jpg","http://media.digikey.com/Photos/Dialight/597-7701-507F_tmb.JPG"],"/optoelectronics/led-lighting-cobs-engines-modules/525140":["http://media.digikey.com/photos/Cree%20Photos/XLamp%20CXA3590%20SERIES_tmb.jpg","http://media.digikey.com/photos/Seoul%20Semi/SMJE3V08W1P3-GA_tmb.jpg","http://media.digikey.com/Photos/LEDEngin/LZ4-24MDCA-0000_tmb.JPG","http://media.digikey.com/Photos/Cree%20Photos/LMH020-2000-35G9-00000TW_tmb.jpg","http://media.digikey.com/photos/TT%20Electronics-Optek%20Photos/OVM12F3B7_tmb.JPG","http://media.digikey.com/photos/Thomas%20Research%20Products/98004_tmb.jpg","http://media.digikey.com/Photos/Luminus%20Devices%20Photo/CBT-90-W65S-C11-NA100_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/GW5BNC15L02_tmb.JPG"],"/optoelectronics/led-lighting-color/525607":["http://media.digikey.com/Photos/Cree%20Photos/MFG_XBDAWT%20Cool%20White_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/MFG_XPEPHR-L1%20Series_tmb.jpg","http://media.digikey.com/Photos/LEDEngin/LZ4-04MDC9-0000_tmb.JPG","http://media.digikey.com/Photos/LEDEngin/LZ4-xxxxxx-0000_tmb.jpg"],"/optoelectronics/led-lighting-white/525606":["http://media.digikey.com/Photos/Cree%20Photos/MFG_XLamp%20ML-C_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/XLamp%20XQ-E%20white_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/MKRAWT-02-0000-0D0UD40E8_tmb.JPG","http://media.digikey.com/Photos/Seoul%20Semi/MFG_saw8wa2a_tmb.jpg"],"/optoelectronics/led-thermal-products/525429":["http://media.digikey.com/Photos/Wakefield%20Photos/882-200AB_tmb.jpg","http://media.digikey.com/Photos/Nuventix/MFG_SSLCS-CM005-001_tmb.jpg","http://media.digikey.com/Photos/T-Global%20Technology%20Photos/LP0001%5E01-LI98-0.25_tmb.jpg","http://media.digikey.com/photos/Bergquist/803125_tmb.JPG","http://media.digikey.com/Photos/Wakefield%20Photos/19756-L-AB_tmb.jpg","http://media.digikey.com/Photos/EBM-Papst%20Ind%20Photos/PG1W-12-60-L3BN_tmb.jpg","http://media.digikey.com/photos/Bergquist/803790_tmb.jpg","http://media.digikey.com/photos/Bergquist/803790_tmb.jpg"],"/optoelectronics/leds-circuit-board-indicators-arrays-light-bars-bar-graphs/524736":["http://media.digikey.com/photos/Lite%20On%20Photos/LTA-1000HR_tmb.jpg","http://media.digikey.com/photos/Dialight/571-0132f_tmb.jpg","http://media.digikey.com/Photos/Dialight/553-0222-204F_tmb.JPG"],"/optoelectronics/leds-lamp-replacements/524939":["http://media.digikey.com/photos/Dialight/586-2401-205F_tmb.JPG","http://media.digikey.com/photos/Lamina%20Photos/RL-16D1-0539_tmb.JPG","http://media.digikey.com/Photos/Rohm%20Photos/R-B151L1_tmb.jpg","http://media.digikey.com/Photos/Visual%20Communications%20Company%20VCC/VC1860xxxx_tmb.jpg","http://media.digikey.com/Photos/QT%20Brightek%20Photos/MFG_QMR16-05-XX-B_tmb.JPG"],"/optoelectronics/leds-spacers-standoffs/524477":["http://media.digikey.com/Photos/Bivar%20Inc%20Photos/ELM%201-250_tmb.JPG","http://media.digikey.com/photos/Keystone%20Elect%20Photos/8900_tmb.JPG","http://media.digikey.com/Photos/Bivar%20Inc%20Photos/450-200_tmb.JPG","http://media.digikey.com/Photos/Industrial%20Fiberoptics%20Photos/51%200420_tmb.jpg"],"/optoelectronics/optics-leds-light-pipes/524541":["http://media.digikey.com/photos/Lumex%20Photos/LPA-C041301S-20_tmb.jpg","http://media.digikey.com/Renders/Bivar%20Renders/VLP-500-F_tmb.jpg","http://media.digikey.com/photos/Lumex%20Photos/LPF-C013301S_tmb.jpg"],"/optoelectronics/optics-leds-reflectors/525543":["http://media.digikey.com/photos/Ledil%20Photos/CA10929_BOOM-MC-W_tmb.JPG","http://media.digikey.com/photos/Ledil%20Photos/CA12881_MINNIE-M_tmb.jpg","http://media.digikey.com/Photos/Ledil%20Photos/C11552_BARBARA-S_tmb.jpg"],"/optoelectronics/optics-leds-lamps-lenses/525154":["http://media.digikey.com/photos/CML%20Innovative%20Photos/4341_tmb.jpg","http://media.digikey.com/Photos/Ledil%20Photos/CP12200_EVA-WW_tmb.jpg","http://media.digikey.com/Photos/Dialight/135-3272-003_tmb.jpg","http://media.digikey.com/Photos/Carclo%20Technical%20Plastics/10755_tmb.JPG","http://media.digikey.com/photos/Dialight/081-0111-203_tmb.jpg","http://media.digikey.com/photos/Dialight/OPK2-3-006_tmb.JPG"],"/optoelectronics/optics-remote-phosphor/525582":["http://media.digikey.com/Photos/Intematix%20Corporation/MFG_ChromaLit-Candle_tmb.jpg","http://media.digikey.com/Photos/Intematix%20Corporation/CL-827-R62-XT_tmb.jpg","http://media.digikey.com/Photos/Intematix%20Corporation/MFG_ChromaLit-Square_tmb.jpg"],"/optoelectronics/panel-indicators-pilot-lights/524928":["http://media.digikey.com/Photos/Omron%20Elect%20Photos/M22R-ER-xxx_tmb.jpg","http://media.digikey.com/Photos/Dialight/559-2201-001F_tmb.JPG","http://media.digikey.com/Photos/Dialight/608-1332-230F_tmb.JPG"],"/optoelectronics/touch-screen-overlays/525002":["http://media.digikey.com/photos/3M%20Photos/17-8441-203_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/FTAS00-104A5_tmb.jpg","http://media.digikey.com/photos/IRTOUCH%20Photos/K-12-19C%205MM%20SERIES_tmb.jpg"],"/potentiometers-variable-resistors/accessories/262228":["http://media.digikey.com/photos/Honeywell%20Photos/5310_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/H-83P_tmb.JPG","http://media.digikey.com/Photos/Bourns%20Photos/H-116P_tmb.jpg"],"/potentiometers-variable-resistors/adjustable-power-resistor/262971":["http://media.digikey.com/Photos/Vishay%20Sfernice/RSSD20117A1000JB15_tmb.JPG","http://media.digikey.com/photos/Ohmite%20Photos/D25K10RE_tmb.JPG","http://media.digikey.com/Photos/Vishay%20Sfernice/RSSD%20SERIES%20168MM_tmb.JPG"],"/potentiometers-variable-resistors/joystick-potentiometers/262970":["http://media.digikey.com/photos/APEM%20Comp%20Photos/4R252S1E5500_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/27800_tmb.jpg","http://media.digikey.com/photos/CTS%20Photos/254%20Series_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/MFG_S10C011P_tmb.jpg","http://media.digikey.com/photos/APEM%20Comp%20Photos/M41L0N1P_tmb.jpg"],"/potentiometers-variable-resistors/rotary-potentiometers-rheostats/263488":["http://media.digikey.com/photos/CTS%20Photos/296%20SERIES%20HORIZONTAL_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/380C35000_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/EWV-YJXL27B14_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/6538S-1-103_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/PCW1J-B24-KEB103L_tmb.JPG","http://media.digikey.com/Photos/TT%20Electronics%20BI/CR10KL%5E5_tmb.jpg"],"/potentiometers-variable-resistors/scale-dials/262578":["http://media.digikey.com/photos/Bourns%20Photos/H-46-6A_tmb.jpg","http://media.digikey.com/Photos/TT%20Electronics%20BI/2647_tmb.JPG","http://media.digikey.com/photos/Precision%20Elec%20Comp%20Photos/E15-1-11_tmb.jpg"],"/potentiometers-variable-resistors/slide-potentiometers/262243":["http://media.digikey.com/Photos/Bourns%20Photos/PTA%20SERIES%2035MM_tmb.JPG","http://media.digikey.com/Photos/Bourns%20Photos/PTF60-201A-102B1_tmb.JPG","http://media.digikey.com/Photos/Bourns%20Photos/PTS01-11L-103B1_tmb.jpg"],"/potentiometers-variable-resistors/thumbwheel-potentiometers/262240":["http://media.digikey.com/photos/Panasonic%20Photos/EVU-TW1B24A13_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/3352H%20SERIES_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/EVU-TUAB16B54_tmb.jpg"],"/potentiometers-variable-resistors/trimmer-potentiometers/262968":["http://media.digikey.com/Photos/Bourns%20Photos/3386F-1-103TLF_tmb.JPG","http://media.digikey.com/photos/Bourns%20Photos/3312J-1-201E_tmb.JPG","http://media.digikey.com/Photos/Bourns%20Photos/Trimpot-3006-Series_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/PVM4Series_tmb.jpg","http://media.digikey.com/photos/Copal%20Photos/SM-31TW102_tmb.JPG","http://media.digikey.com/photos/CTS%20Photos/U262R%20SERIES%20YELLOW_tmb.jpg"],"/potentiometers-variable-resistors/value-display-potentiometers/262969":["http://media.digikey.com/photos/Bourns%20Photos/3683S%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/3684S_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/3681S-1_tmb.jpg"],"/power-supplies-board-mount/ac-dc-converters/4325929":["http://media.digikey.com/renders/Rohm%20Renders/BP5039_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/MFG_VOF-6_Series_tmb.jpg","http://media.digikey.com/Photos/TDK%20Photos/PFE300S-28_tmb.jpg","http://media.digikey.com/Photos/XP%20Power/MFG_ECE40_tmb.jpg","http://media.digikey.com/Photos/Recom%20Power%20Inc/RAC02-SE_277_W_lores_tmb.jpg"],"/power-supplies-board-mount/accessories/4325460":["http://media.digikey.com/Photos/Vicor%20Corporation/31742_tmb.jpg","http://media.digikey.com/Photos/Vicor%20Corporation/32784_tmb.JPG","http://media.digikey.com/Photos/Vicor%20Corporation/33625_tmb.jpg","http://media.digikey.com/Photos/Power-One%20Photos/F4810-G_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/MFG_UF224SXX_tmb.jpg"],"/power-supplies-board-mount/dc-dc-converters/4325599":["http://media.digikey.com/Renders/Murata%20Renders/LXDC2HL%20Series_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/MFG_V7805-1000_tmb.jpg","http://media.digikey.com/photos/Lineage%20Photos/AXA005A0XZ_tmb.JPG","http://media.digikey.com/Photos/Emerson%20Network%20Photos/LGA03C-00SADJJ_tmb.jpg","http://media.digikey.com/Photos/Linear%20Tech%20Photos/LTM4624_tmb.JPG","http://media.digikey.com/Photos/Vicor%20Corporation/MFG_HalfVIChipPRM_tmb.jpg","http://media.digikey.com/photos/TDK%20Photos/PXD2024S05_tmb.JPG"],"/power-supplies-board-mount/led-supplies/4326590":["http://media.digikey.com/photos/LEDdynamics/7021-d-e-350_tmb.JPG","http://media.digikey.com/Photos/Recom%20Power%20Inc/RCD-24B_tmb.jpg","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/MFG_7-SMD%20Module_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/VLD24-500_tmb.JPG","http://media.digikey.com/Photos/Recom%20Power%20Inc/MFG_RCD-24PL_tmb.jpg"],"/power-supplies-external-internal-off-board/ac-ac-wall-adapters/590573":["http://media.digikey.com/Photos/Hammond%20Mfg%20Photos/BPD2F_tmb.jpg","http://media.digikey.com/photos/Tamura%20Photos/318AS20022_tmb.JPG","http://media.digikey.com/photos/CUI%20Photos/EPA120100-P5R-SZ_tmb.JPG","http://media.digikey.com/photos/CUI%20Photos/DPA120200-P1P_tmb.jpg"],"/power-supplies-external-internal-off-board/ac-dc-configurable-power-supply-chassis/590562":["http://media.digikey.com/Photos/Excelsys%20Tech%20Photos/UX6_tmb.jpg","http://media.digikey.com/Photos/Sanken%20Photos/C300H_tmb.jpg","http://media.digikey.com/Photos/Excelsys%20Tech%20Photos/powerPac-6-postion%2010.62%20long_tmb.jpg"],"/power-supplies-external-internal-off-board/ac-dc-configurable-power-supply-modules/590904":["http://media.digikey.com/Photos/Sanken%20Photos/C050S03_tmb.jpg","http://media.digikey.com/Photos/Excelsys%20Tech%20Photos/XG5_tmb.jpg","http://media.digikey.com/Photos/Excelsys%20Tech%20Photos/POWERMOD%20SERIES_tmb.jpg"],"/power-supplies-external-internal-off-board/ac-dc-converters/590377":["http://media.digikey.com/photos/TDK%20Photos/LS35-12_tmb.JPG","http://media.digikey.com/Photos/Murata%20Photos/MFG_MVAB120-24_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/MFG_VDRS-60_Series_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/S8VM-15024CD,%20S8VM-15012CD,%20S8VM-15005CD_tmb.jpg","http://media.digikey.com/Photos/XP%20Power/MFG_EMH350_tmb.jpg"],"/power-supplies-external-internal-off-board/ac-dc-desktop-wall-adapters/589898":["http://media.digikey.com/Photos/Phihong%20USA/MFG_PSM03A-050Q-3W-R_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/EPSA120200U-P5P-SZ_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/ETSA-40%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Astec%20America/DP40-3PRONG%20SERIES_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/EMSA090067K-P5P-SZ_tmb.jpg"],"/power-supplies-external-internal-off-board/accessories/589908":["http://media.digikey.com/Photos/XP%20Power/VEP-PLUG-US_tmb.jpg","http://media.digikey.com/Photos/XP%20Power/MFG_GCS150-180%20CVR%20KIT_tmb.jpg","http://media.digikey.com/photos/SL%20Pwr%20Elect%20Mfg%20of%20Condor/08-30466-1041G_tmb.JPG","http://media.digikey.com/photos/SL%20Pwr%20Elect%20Mfg%20of%20Condor/09-250CFG_tmb.JPG","http://media.digikey.com/Photos/Emerson%20Network%20Photos/73-766-001_tmb.jpg"],"/power-supplies-external-internal-off-board/dc-dc-converters/590047":["http://media.digikey.com/Photos/CUI%20Photos/MFG_PYB10-U_tmb.jpg","http://media.digikey.com/Photos/Recom%20Power%20Inc/R-78W-0.5_lores_tmb.jpg","http://media.digikey.com/Photos/CUI%20Photos/MFG_VFK400W-Q24-S12_tmb.jpg","http://media.digikey.com/Photos/GE%20Energy/CP2000DC54PEZ_tmb.jpg"],"/power-supplies-external-internal-off-board/led-supplies/591038":["http://media.digikey.com/Photos/Phihong%20USA/PDA012A-350S-R_tmb.jpg","http://media.digikey.com/Photos/Mag-LED%20Solutions%20Photos/ML-A25-UVQ-700T_tmb.jpg","http://media.digikey.com/Photos/Recom%20Power%20Inc/RACD12-350_tmb.jpg","http://media.digikey.com/Photos/Recom%20Power%20Inc/RACD60-4200A_tmb.jpg","http://media.digikey.com/Photos/Recom%20Power%20Inc/RACD100-12-ENEC_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/LMD400-0048-C940-7030000_tmb.jpg"],"/power-supplies-external-internal-off-board/power-over-ethernet-poe/591043":["http://media.digikey.com/Photos/Phihong%20USA/MFG_PSA16U_tmb.jpg","http://media.digikey.com/Photos/Phihong%20USA/MFG_POE125U-4AT_tmb.jpg","http://media.digikey.com/Photos/Digi%20Int%27l%20Photos/AWPOE_tmb.jpg"],"/programmers-development-systems/accessories/2621524":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/HVBLDCMTR_tmb.jpg","http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-1142_tmb.jpg","http://media.digikey.com/Photos/Atmel%20Photos/ATXPRO-10PIN_tmb.jpg","http://media.digikey.com/Photos/Microchip%20Tech%20Photos/MA240021_tmb.jpg","http://media.digikey.com/photos/Arduino/K000004_tmb.jpg"],"/programmers-development-systems/adapters/2621597":["http://media.digikey.com/Photos/Phyton%20Photos/AE-SC28U1_tmb.jpg","http://media.digikey.com/photos/Logical%20Systems%20Photos/PA32-32Z_tmb.jpg","http://media.digikey.com/photos/Logical%20Systems%20Photos/PA8SO1-03-3_tmb.jpg"],"/programmers-development-systems/evaluation-and-demonstration-boards-and-kits/2622039":["http://media.digikey.com/Photos/Arduino/MFG_A000072_tmb.jpg","http://media.digikey.com/Photos/STMicro%20Photos/STEVAL-MKI109V1_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/DK-TM4C123G_tmb.jpg"],"/programmers-development-systems/evaluation-boards-analog-to-digital-converters-adcs/2622527":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/AD9467-FMC-250EBZ_tmb.jpg","http://media.digikey.com/Photos/Linear%20Tech%20Photos/DC919A-A_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/ADS5282EVM_tmb.jpg"],"/programmers-development-systems/evaluation-boards-audio-amplifiers/2622523":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/TPA2017D2RTJEVM_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/TAS5630PHD2EVM_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/TPA3118D2EVM_sml_tmb.jpg"],"/programmers-development-systems/evaluation-boards-dc-dc-ac-dc-off-line-smps/2622539":["http://media.digikey.com/Photos/International%20Rectifier%20Photos/IRAUDPS1_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/LM2738XSDEVAL_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/LM2623EV%5ENOPB_tmb.JPG"],"/programmers-development-systems/evaluation-boards-digital-to-analog-converters-dacs/2622540":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/DAC2932EVM_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/AD9144-EBZ_tmb.jpg","http://media.digikey.com/Photos/Linear%20Tech%20Photos/DC752A-B_tmb.jpg"],"/programmers-development-systems/evaluation-boards-embedded-complex-logic-fpga-cpld/2622767":["http://media.digikey.com/Photos/Lattice%20Semi%20Photos/LCMXO3L-SMA-EVN_tmb.jpg","http://media.digikey.com/photos/Digilent,%20Inc/410-282P-KIT_tmb.jpg","http://media.digikey.com/photos/Terasic%20Tech%20Photos/MFG_P0150_tmb.jpg","http://media.digikey.com/photos/Xilinx%20Photos/HW-CRII-SK-G_tmb.JPG"],"/programmers-development-systems/evaluation-boards-embedded-mcu-dsp/2621773":["http://media.digikey.com/Photos/Circuitco%20Electronics%20LLC%20Photos/BB-BBLK-000_tmb.jpg","http://media.digikey.com/Photos/Arduino/A000060_tmb.jpg","http://media.digikey.com/photos/Atmel%20Photos/MFG_ATEVK1100_tmb.jpg","http://media.digikey.com/Photos/Freescale%20Photos/FRDM-KL46Z_tmb.JPG","http://media.digikey.com/photos/Atmel%20Photos/ATAVRBFLY%20FRONT_tmb.jpg","http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-1205_tmb.JPG","http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-1102_tmb.JPG"],"/programmers-development-systems/evaluation-boards-led-drivers/2622547":["http://media.digikey.com/Photos/Cirrus%20Logic%20Photos/CRD1611-8W-Z_tmb.jpg","http://media.digikey.com/Photos/AMS-Taos%20USA%20Photos/AS3693A-DB_tmb.jpg","http://media.digikey.com/Photos/ISSI%20(Integrated%20Silicon/IS31LT3360-SDLS3-EB3CH_tmb.jpg","http://media.digikey.com/photos/National%20Semi%20Photos/551600003-001a_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/TPS61196EVM-600_tmb.jpg"],"/programmers-development-systems/evaluation-boards-linear-voltage-regulators-ldos/2622524":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/LP38798EVM_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADM7150CP-EVALZ_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/LP5900TL-1.8EV_tmb.jpg"],"/programmers-development-systems/evaluation-boards-op-amps/2622522":["http://media.digikey.com/photos/Hittite%20Microwave%20Photos/121600-HMC750LP4E_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/PGA281EVM_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/AMC1100EVM_tmb.JPG","http://media.digikey.com/Photos/Analog%20Devices%20Photos/AD8251-EVALZ_tmb.jpg","http://media.digikey.com/Photos/Maxim%20Photos/MAX34406EVKIT%23_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/LMV861MGEVAL_tmb.jpg"],"/programmers-development-systems/evaluation-boards-sensors/2622557":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/430BOOST-SENSE1_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/28317_tmb.jpg","http://media.digikey.com/Photos/Digi-Key%20Photos/Grid-EYE_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/430BOOST-ADS1118_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/EVAL-ADXL312Z_tmb.JPG","http://media.digikey.com/Photos/Analog%20Devices%20Photos/EVAL-ADXRS649Z_tmb.JPG","http://media.digikey.com/Photos/Olimex%20LTD/MSP430-PIR_tmb.JPG","http://media.digikey.com/Photos/Microchip%20Tech%20Photos/DM160223_tmb.jpg"],"/programmers-development-systems/in-circuit-programmers-emulators-and-debuggers/2621880":["http://media.digikey.com/photos/Microchip%20Tech%20Photos/DV164035_tmb.jpg","http://media.digikey.com/Photos/Atmel%20Photos/MFG_ATATMEL-ICE_tmb.jpg","http://media.digikey.com/Photos/Sparkfun%20Elec%20%20Photos/MFG_DEV-12924_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/MSP-FET430U64USB_tmb.jpg"],"/programmers-development-systems/modules/2621710":["http://media.digikey.com/photos/Cirrus%20Logic%20Photos/CPB496122-CM2-FB_tmb.JPG","http://media.digikey.com/photos/Analog%20Devices%20Photos/7B35-01-2_tmb.JPG","http://media.digikey.com/Photos/DLP%20Design%20Inc/DLP-IO20_tmb.jpg"],"/programmers-development-systems/software-services/2621591":["http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-736_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/TMDSCCS-ALLN01_tmb.jpg","http://media.digikey.com/Photos/Keil%20Photos/MFG_SoftwareLogo_tmb.jpg","http://media.digikey.com/photos/Altera%20Photos/Quartus%20II_tmb.jpg"],"/programmers-development-systems/stand-alone-programmers/2621667":["http://media.digikey.com/photos/Microchip%20Tech%20Photos/DV007004_tmb.JPG","http://media.digikey.com/Photos/Xeltek/MFG_SUPERPRO7000_tmb.jpg","http://media.digikey.com/Photos/IDT,%20Integrated%20Device%20Technology/EVKVC5-5901PROG_tmb.jpg","http://media.digikey.com/Photos/Xeltek/MFG_SUPERPRO601S_tmb.jpg"],"/programmers-development-systems/uv-erasers/2621665":["http://media.digikey.com/photos/BK%20Precision%20Photos/BK851_tmb.jpg","http://media.digikey.com/photos/Xeltek/LER121A-110V_tmb.JPG","http://media.digikey.com/photos/Xeltek/LER123A-110V_tmb.JPG"],"/prototyping-products/accessories/2359380":["http://media.digikey.com/photos/Vector%20Photos/T120-1%5E50_tmb.jpg","http://media.digikey.com/Photos/Pulsar%20Photos/50-1204_tmb.jpg","http://media.digikey.com/photos/MG%20Chemicals%20Photos/416-S_tmb.JPG","http://media.digikey.com/photos/Pulsar%20Photos/MFG_50-1301A_tmb.jpg"],"/prototyping-products/adapter-breakout-boards/2360393":["http://media.digikey.com/Photos/Chip%20Quik%20Photos/MFG_PA0242_tmb.JPG","http://media.digikey.com/Photos/Adafruit%20Industries%20LLC/MFG_1162%20TQFP-44_tmb.jpg","http://media.digikey.com/Photos/Capital%20Advanced%20Tech%20Photos/MFG_33508_tmb.jpg"],"/prototyping-products/card-extenders/2359877":["http://media.digikey.com/Photos/Twin%20Industries%20Photos/7586-LAEXTM-LF_tmb.JPG","http://media.digikey.com/photos/Twin%20Industries%20Photos/MFG_7586-DH-LAEXTM_tmb.jpg","http://media.digikey.com/photos/Vector%20Photos/MFG_3690-36_tmb.jpg","http://media.digikey.com/Photos/Twin%20Industries%20Photos/2000-6U-EXTM-LF_tmb.jpg"],"/prototyping-products/drill-bits/2360394":["http://media.digikey.com/photos/Injectorall%20Electronics%20Photos/PC300C-66_tmb.jpg","http://media.digikey.com/photos/Injectorall%20Electronics%20Photos/PC300C-52_tmb.jpg","http://media.digikey.com/photos/Injectorall%20Electronics%20Photos/PC300-80_tmb.jpg"],"/prototyping-products/etching-and-fabrication-equipment/2359513":["http://media.digikey.com/photos/GC%20Electronics%20Photos/22-0394_tmb.JPG","http://media.digikey.com/Photos/ITW%20Chemtronics%20Photos/CM8_tmb.jpg","http://media.digikey.com/Photos/Datak/DE-51_tmb.jpg","http://media.digikey.com/photos/MG%20Chemicals%20Photos/4190-GP_tmb.JPG"],"/prototyping-products/jumper-wire/2359516":["http://media.digikey.com/photos/3M%20Photos/923345-02-C_tmb.jpg","http://media.digikey.com/Photos/BUD%20Industries%20Photos/BC-32625_tmb.jpg","http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-511_tmb.JPG"],"/prototyping-products/prototype-boards-perforated/2359508":["http://media.digikey.com/photos/Vector%20Photos/MFG_4610-2_tmb.jpg","http://media.digikey.com/photos/Vector%20Photos/8804_tmb.jpg","http://media.digikey.com/Photos/Twin%20Industries%20Photos/MFG_LED12-C2_tmb.jpg"],"/prototyping-products/prototype-boards-unperforated/2359509":["http://media.digikey.com/Photos/Serpac%20Photos/410_tmb.jpg","http://media.digikey.com/renders/Injectorall%20Electronics%20Renders/304.8mmx304.8mmx1.60mm_tmb.jpg","http://media.digikey.com/photos/MG%20Chemicals%20Photos/612_tmb.jpg"],"/prototyping-products/prototype-repair-tools/2359884":["http://media.digikey.com/photos/MG%20Chemicals%20Photos/8331-14G_tmb.jpg","http://media.digikey.com/photos/ITW%20Chemtronics%20Photos/CW3300G_tmb.jpg","http://media.digikey.com/Photos/MG%20Chemicals%20Photos/841-P_tmb.jpg"],"/prototyping-products/solderless-breadboards/2359510":["http://media.digikey.com/photos/Twin%20Industries%20Photos/TW-E40-1020_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/700-00012_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/922327_tmb.jpg","http://media.digikey.com/photos/Twin%20Industries%20Photos/TW-E41-102B_tmb.jpg"],"/relays/accessories/1048660":["http://media.digikey.com/photos/Omron%20Elect%20Photos/PYF-S-TOOL_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/P2RVM-030R_tmb.jpg","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/20C217_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/MFG_8869600000_tmb.jpg","http://media.digikey.com/photos/Crydom%20Photos/3F20_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/P2RV-S_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/PTP-10_tmb.jpg"],"/relays/i-o-relay-module-racks/1049750":["http://media.digikey.com/Photos/Crydom%20Photos/MFG_PB-4_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_2979472_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_2976187_tmb.jpg"],"/relays/i-o-relay-modules-analog/1049767":["http://media.digikey.com/photos/Grayhill%20Photos/73G-ITCR_tmb.jpg","http://media.digikey.com/photos/Grayhill%20Photos/73G-ITCK_tmb.jpg","http://media.digikey.com/photos/Grayhill%20Photos/73G-OV10,73G-OV10B,73G-OI420,73G-OI020,73G-OV5_tmb.jpg"],"/relays/i-o-relay-modules-input/1048833":["http://media.digikey.com/Photos/Crydom%20Photos/DRIAC24_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/IACM-5_tmb.JPG","http://media.digikey.com/photos/Crouzet%20Photos/C4IDC_tmb.jpg"],"/relays/i-o-relay-modules-output/1049265":["http://media.digikey.com/photos/Crouzet%20Photos/DRODC5_tmb.jpg","http://media.digikey.com/photos/Crouzet%20Photos/84130105_tmb.jpg","http://media.digikey.com/Photos/Crydom%20Photos/MFG_SM-OAC5_tmb.jpg"],"/relays/power-relays-over-2-amps/1049447":["http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/1432772-1_tmb.jpg","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/RP821024_tmb.jpg","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/OJE-SH-105DM,000,%20OJE-SH-112DM,000,%20OJE-SH-124DM,000_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/G8VA-1A4-TR-01-DC12_tmb.jpg","http://media.digikey.com/photos/Omron%20Auto/44510-1031_tmb.jpg","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/T92P7A52-120_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/RT4S4T30_tmb.jpg"],"/relays/relay-sockets/1048731":["http://media.digikey.com/Photos/TE%20Connectivity/1-1904045-1_tmb.JPG","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/27E893_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/1415044-1_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/P7SA-14P_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/PY08-02_tmb.JPG","http://media.digikey.com/Photos/Phoenix%20Photos/2966029_tmb.jpg"],"/relays/signal-relays-up-to-2-amps/1049448":["http://media.digikey.com/Photos/Kemet%20Photos/EC2-Series-Single-Coil_tmb.jpg","http://media.digikey.com/photos/Hamlin%20Photos/HE721A,%20HE721C,%20HE722A%20SERIES_tmb.jpg","http://media.digikey.com/photos/Meder%20Electronics%20Photos/CRR05-1AS_tmb.jpg","http://media.digikey.com/photos/Coto%20Tech%20Photos/9011-05-10,%209011-05-11_tmb.jpg","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/KHAU-17D11_tmb.jpg"],"/relays/solid-state-relays/1048664":["http://media.digikey.com/Photos/Crydom%20Photos/MFG_CSW%20Series_tmb.jpg","http://media.digikey.com/photos/Clare%20Photos/212-8-SIP,%204%20Lead_tmb.jpg","http://media.digikey.com/photos/Toshiba%20Photos/264-4-SMD_tmb.jpg"],"/relays/time-delay-relays/1049305":["http://media.digikey.com/Photos/Omron%20Auto/H3CR-FN%20AC100-240%5EDC100-125_tmb.JPG","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/CNT-35-26,%20CNT-35-76,%20CNT-35-96_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/88827145_tmb.JPG","http://media.digikey.com/Photos/Cramer%20Photos/10000_tmb.JPG","http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/CLB-51-70010,%20CUB-51-70010_tmb.jpg"],"/rf-if-and-rfid/attenuators/3539493":["http://media.digikey.com/photos/Hittite%20Microwave%20Photos/HMC-C018_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/AT-Series_tmb.jpg","http://media.digikey.com/Renders/Panasonic%20Renders/EXB24AB_tmb.jpg"],"/rf-if-and-rfid/balun/3539019":["http://media.digikey.com/Photos/MACom%20Technology%20Solutions/TP-101-PIN_tmb.jpg","http://media.digikey.com/Renders/TDK%20Renders/ATB%20Series%202012_tmb.jpg","http://media.digikey.com/Renders/Walsin%20Technology/RFBLN_tmb.jpg","http://media.digikey.com/Renders/Pulse%20Renders/CX2047LNLT_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MABA-009210-CT1760_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/Filter6_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MABA-007159-000000_tmb.jpg"],"/rf-if-and-rfid/rf-accessories/3539661":["http://media.digikey.com/photos/Linx%20Tech%20Photos/ANT-MAG-B50-RPS_tmb.jpg","http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/AB-DRO-14.5GHZ_tmb.jpg","http://media.digikey.com/Photos/LS%20Research%20LLC/080-0014_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/2867050_tmb.jpg","http://media.digikey.com/Renders/Laird%20Tech%20Renders/BMI-C-001_tmb.jpg","http://media.digikey.com/photos/RF%20Digital%20Corporation/RFD22128_tmb.jpg"],"/rf-if-and-rfid/rf-amplifiers/3539647":["http://media.digikey.com/photos/RFMD%20Photos/689-4-MICROX-NLB_tmb.jpg","http://media.digikey.com/photos/Cree%20Photos/cmpa0060002f_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/MFG_CMPA5585025F_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/ALM-32220-BLKG_tmb.jpg","http://media.digikey.com/Photos/Tallysman%20Wireless/MFG_33-01%20Series_tmb.jpg","http://media.digikey.com/photos/Freescale%20Photos/375-TO-272-WB-16_tmb.jpg","http://media.digikey.com/Photos/Skyworks%20Solutions%20Photos/SKY65116-21_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC606_tmb.jpg","http://media.digikey.com/Renders/MACom%20Technology%20Solutions/TO-8-1_tmb.jpg","http://media.digikey.com/Renders/Hittite%20Microwave%20Renders/12-VFQFN%20Exposed%20Pad_tmb.jpg"],"/rf-if-and-rfid/rf-antennas/3540022":["http://media.digikey.com/photos/Pulse%20Photos/W1038_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/2.45GHz%20Antenna2_tmb.jpg","http://media.digikey.com/photos/Linx%20Tech%20Photos/MFG_ANT-xxx-HESM%20Series_tmb.jpg","http://media.digikey.com/Photos/Taoglas/MFG_SWLP_2450_12_4_B_02_tmb.jpg","http://media.digikey.com/Photos/Taoglas/MFG_TI_10_0112_tmb.jpg","http://media.digikey.com/photos/Linx%20Tech%20Photos/ANT-418-MHW-RPS-S,ANT-433-MHW-RPS-S_tmb.jpg","http://media.digikey.com/Photos/Taoglas/MFG_A_01_C_301111_tmb.jpg","http://media.digikey.com/Photos/Taoglas/MFG_AP-10x-01_tmb.jpg","http://media.digikey.com/Photos/Taoglas/MFG_MA750.A.ABICG.003_tmb.jpg"],"/rf-if-and-rfid/rf-demodulators/3540120":["http://media.digikey.com/Renders/Linear%20Tech%20Renders/16-WQFN_tmb.jpg","http://media.digikey.com/photos/NJR%20Photos/190-14-DMP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/rf-if-and-rfid/rf-detectors/3539651":["http://media.digikey.com/Photos/Crystek%20Photos/CPDETLS-4000_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/6-UFBGA_tmb.jpg","http://media.digikey.com/Renders/Hittite%20Microwave%20Renders/MFG_HMC713MS8E_tmb.jpg"],"/rf-if-and-rfid/rf-die-products/3540012":["http://media.digikey.com/Renders/Avago%20Tech%20Renders/AMMC-2008_tmb.jpg","http://media.digikey.com/Renders/Avago%20Tech%20Renders/HPND-4028_tmb.jpg","http://media.digikey.com/Renders/Avago%20Tech%20Renders/HSCH-53xx%20Series_tmb.jpg","http://media.digikey.com/Renders/Skyworks%20Solutions%20Renders/CLA460X-00%20Series_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MAAP-015030-DIE_tmb.jpg"],"/rf-if-and-rfid/rf-diplexers/3539783":["http://media.digikey.com/Renders/Walsin%20Technology/RFDIP%200603(1608%20Metric)_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/ACMD-7612-TR1_tmb.jpg","http://media.digikey.com/photos/MACom%20Technology%20Solutions/MAFL-011024_tmb.jpg"],"/rf-if-and-rfid/rf-directional-coupler/3539230":["http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MACP-009596-CA0160_tmb.jpg","http://media.digikey.com/photos/MACom%20Technology%20Solutions/JHS-115-PIN_tmb.jpg","http://media.digikey.com/Photos/Anaren,%20Inc/1M803S_tmb.JPG","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/MFG_HDH%20Series(H-Type)_tmb.jpg","http://media.digikey.com/Renders/Johanson%20Tech%20Renders/0910CF15B0100E_tmb.jpg"],"/rf-if-and-rfid/rf-evaluation-and-development-kits-boards/3539644":["http://media.digikey.com/Photos/Peregrine%20Semiconductor/EK42423-02_tmb.jpg","http://media.digikey.com/Photos/Sigma%20Designs/ACC-UZB-U_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/MFG_CC2540DK-MINI_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/EZ430-RF2500_tmb.JPG"],"/rf-if-and-rfid/rf-front-end-lna-pa/3540092":["http://media.digikey.com/Photos/Skyworks%20Solutions%20Photos/SKY65344-21_tmb.jpg","http://media.digikey.com/Photos/Skyworks%20Solutions%20Photos/SKY65338-21_tmb.jpg","http://media.digikey.com/Renders/Infineon%20Renders/P-PG-TSNP-11-2_tmb.jpg"],"/rf-if-and-rfid/rf-misc-ics-and-modules/3539652":["http://media.digikey.com/Photos/Crystek%20Photos/MFG_CBTEE-01-50-6000_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADRF6573ACCZ-R7_tmb.JPG","http://media.digikey.com/Photos/Tallysman%20Wireless/MFG_33-015%20Series_tmb.jpg","http://media.digikey.com/Photos/Skyworks%20Solutions%20Photos/PS088-315_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/SFD25_tmb.jpg"],"/rf-if-and-rfid/rf-mixers/3539648":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC130_tmb.jpg","http://media.digikey.com/photos/Hittite%20Microwave%20Photos/HMC129G8_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/HMC-C015_tmb.jpg","http://media.digikey.com/Photos/Hittite%20Microwave%20Photos/HMC329LM3TR_tmb.JPG","http://media.digikey.com/photos/Hittite%20Microwave%20Photos/HMCxxxC8_tmb.jpg","http://media.digikey.com/photos/MACom%20Technology%20Solutions/MAMX-007238-CM25MH_tmb.jpg"],"/rf-if-and-rfid/rf-modulators/3540119":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC137_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC135_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/24-UTQFN_tmb.jpg"],"/rf-if-and-rfid/rf-power-controller-ics/3539653":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/CB-6-4_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-8-1_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/10-TFSOP,%2010-MSOP_tmb.jpg"],"/rf-if-and-rfid/rf-power-dividers-splitters/3539231":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-12-1_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC362_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/ehf-fd1779_tmb.JPG","http://media.digikey.com/photos/Pulse%20Photos/CX4012LNLT_tmb.jpg","http://media.digikey.com/photos/MACom%20Technology%20Solutions/MAPDCT0028_tmb.jpg"],"/rf-if-and-rfid/rf-receiver-transmitter-and-transceiver-finished-units/3539949":["http://media.digikey.com/photos/Linx%20Tech%20Photos/CMD-HHLR%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Digi%20Int%27l%20Photos/XM-M92-4P-U_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/WOIYELLOWM_tmb.jpg","http://media.digikey.com/photos/Digi%20Int%27l%20Photos/MFG_XL9-UA_tmb.jpg","http://media.digikey.com/Photos/Digi%20Int%27l%20Photos/XA-Z14-CS3PH-A_tmb.jpg","http://media.digikey.com/Photos/RF%20Digital%20Corporation/RFD-Keyfob-1-button-pic_tmb.jpg","http://media.digikey.com/Photos/Electric%20Imp/IMP001-US-B_tmb.JPG"],"/rf-if-and-rfid/rf-receivers/3539946":["http://media.digikey.com/photos/Linx%20Tech%20Photos/MFG_RXM-869-ES__tmb.jpg","http://media.digikey.com/photos/RF%20Solutions%20Photos/ALPHA-RX433S_tmb.JPG","http://media.digikey.com/photos/RF%20Solutions%20Photos/FMRRFQ1-433_tmb.jpg","http://media.digikey.com/Photos/Linx%20Tech%20Photos/MFG_rxm-gnss-tm_tmb.jpg","http://media.digikey.com/Photos/MikroElektronika/MFG_MIKROE-1374_tmb.JPG"],"/rf-if-and-rfid/rf-shields/3539677":["http://media.digikey.com/Photos/Laird%20Tech%20Photos/BMI-S-106_tmb.jpg","http://media.digikey.com/photos/Laird%20Tech%20Photos/BMI-S-205-F_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/BMI-S-201-F_tmb.jpg"],"/rf-if-and-rfid/rf-switches/3539655":["http://media.digikey.com/Renders/Peregrine%20Semiconductor%20Renders/6-TSSOP,%20SC-88,%20SOT-363_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MFG_MASW-004103-13650_tmb.jpg","http://media.digikey.com/Renders/MACom%20Technology%20Solutions/MA4SW210_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/16-LQFN-Exposed-Pad_tmb.jpg","http://media.digikey.com/Photos/Hittite%20Microwave%20Photos/HMC347C8_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MFG_MASW-002103-1363_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-8-2_tmb.jpg"],"/rf-if-and-rfid/rf-transceivers/3539948":["http://media.digikey.com/Photos/Digi%20Int%27l%20Photos/XB24-DMPIT-250_tmb.jpg","http://media.digikey.com/Photos/Microchip%20Tech%20Photos/MRF89XAM9A-I%5ERM_tmb.JPG","http://media.digikey.com/Photos/Laird%20Tech%20Photos/MFG_BTM411-HiRes_tmb.jpg","http://media.digikey.com/Photos/Dynastream%20Innovations/MFG_ANTC782M5IB_tmb.jpg","http://media.digikey.com/photos/Linx%20Tech%20Photos/MFG_TRM-433-LT_tmb.jpg"],"/rf-if-and-rfid/rf-transmitters/3539947":["http://media.digikey.com/photos/RF%20Solutions%20Photos/ALPHA-TX915S_tmb.JPG","http://media.digikey.com/photos/Linx%20Tech%20Photos/TXM-900-HP3-PPO_tmb.jpg","http://media.digikey.com/Photos/Melexis%20Photos/TH72036KLD-CAA-000-TU_tmb.JPG","http://media.digikey.com/photos/Linx%20Tech%20Photos/TXM-433-LR_tmb.jpg","http://media.digikey.com/Photos/RF%20Solutions%20Photos/MFG_QAM-TX2-433_tmb.jpg"],"/rf-if-and-rfid/rfi-and-emi-shielding-and-absorbing-materials/3539897":["http://media.digikey.com/Photos/Laird%20Tech%20Photos/0097062902_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/2-6-1125_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/AB7050HF_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3M1181C-ND_tmb.jpg","http://media.digikey.com/Photos/Laird%20Tech%20Photos/0077003002_tmb.JPG"],"/rf-if-and-rfid/rfid-accessories/3539641":["http://media.digikey.com/photos/Texas%20Instr%20Photos/RI-ACC-008B-00_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RR-IDC-24VDC-LR_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RR-ID-NET-12VDC_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RR-IDISC-ANT-T-A_tmb.jpg","http://media.digikey.com/Photos/Harting/20932040102_tmb.jpg"],"/rf-if-and-rfid/rfid-antennas/3539639":["http://media.digikey.com/photos/Abracon%20Corporation%20Photos/ANFCA-4030-A01_tmb.jpg","http://media.digikey.com/photos/Feig%20Elect%20Photos/1663.000.00.00_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/MFG_RR-IDISC-ANT14-7A,7B,7C_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/MFG_RI-ANT-G04E_tmb.jpg","http://media.digikey.com/Photos/Harting/20932010303_tmb.jpg"],"/rf-if-and-rfid/rfid-evaluation-and-development-kits-boards/3539640":["http://media.digikey.com/photos/NXP%20Semi%20Photos/MFEV700%5EHAB,122_tmb.JPG","http://media.digikey.com/photos/Melexis%20Photos/EVB90109_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/TRF7960ATB_tmb.jpg"],"/rf-if-and-rfid/rfid-ics/3539642":["http://media.digikey.com/photos/NXP%20Semi%20Photos/MF0FCP2U10%5EDH-T_tmb.JPG","http://media.digikey.com/photos/Atmel%20Photos/ATA5577M1330C-PAE_tmb.jpg","http://media.digikey.com/Renders/AMS%20Renders/10-MLPD_tmb.jpg"],"/rf-if-and-rfid/rfid-reader-modules/3539638":["http://media.digikey.com/photos/Feig%20Elect%20Photos/2060.000.00.01_tmb.jpg","http://media.digikey.com/Photos/ThingMagic/MFG_M6E-MICRO_tmb.jpg","http://media.digikey.com/photos/Skyetec%20Photos/SM-MN-00-HF-RCI2C_tmb.JPG","http://media.digikey.com/Photos/Bluetechnix/MFG_909-2131-1_tmb.jpg"],"/rf-if-and-rfid/rfid-transponders-tags/3539637":["http://media.digikey.com/Photos/Parallax%20Photos/32399_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RI-I17-114A-01_tmb.JPG","http://media.digikey.com/Photos/Murata%20Photos/LXMS31ACNA-010_tmb.jpg","http://media.digikey.com/Photos/Atmel%20Photos/AT88SC0808CRF-MX1_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RI-INL-W9QM-30_tmb.JPG","http://media.digikey.com/photos/Texas%20Instr%20Photos/RI-TRP-REHP-01_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/RI-TRP-W9QL-00,RI-TRP-R9QL-20_tmb.jpg","http://media.digikey.com/Photos/Avery%20Dennison/MFG_AD-235u7_tmb.jpg","http://media.digikey.com/Photos/Avery%20Dennison/MFG_AD-806u7_tmb.jpg","http://media.digikey.com/Photos/Maxim%20Photos/MAX66040K-000AA+_tmb.JPG"],"/sensors-transducers/accelerometers/1966355":["http://media.digikey.com/Photos/Kionix/KXSS5-2057_tmb.jpg","http://media.digikey.com/Photos/API%20Technologies/MFG_XL203A_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADIS16448AMLZ_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADXL206HDZ_tmb.jpg","http://media.digikey.com/Photos/Measurement%20Specialties%20Photos/805M1-0020_tmb.jpg"],"/sensors-transducers/accessories/1966164":["http://media.digikey.com/Photos/Thomas%20Research%20Products/WSPLENS360_tmb.jpg","http://media.digikey.com/photos/CUI%20Photos/MFG_CUI-435-1FT_tmb.jpg","http://media.digikey.com/photos/Omron%20Auto/44531-0010_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/RF-210_tmb.jpg"],"/sensors-transducers/amplifiers/1967259":["http://media.digikey.com/photos/Honeywell%20Photos/060-6827-04_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/GA-2_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/FX-101P-Z_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/FX-501_tmb.jpg","http://media.digikey.com/Photos/Omron%20Auto/E3X-HD41%202M_tmb.jpg"],"/sensors-transducers/capacitive-touch-sensors-proximity-sensor-ics/1967373":["http://media.digikey.com/Photos/On%20Semi%20Photos/LC717A00AR-NH_tmb.JPG","http://media.digikey.com/Renders/Freescale%20Renders/8-DFN_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg"],"/sensors-transducers/color-sensors/1966897":["http://media.digikey.com/photos/AMS-Taos%20USA%20Photos/TMD37821_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/HDJD-S822-QR999_tmb.jpg","http://media.digikey.com/Photos/AMS-Taos%20USA%20Photos/TCS3414CS_tmb.jpg","http://media.digikey.com/photos/Optek%20Photos/Optek-OPB780Z(2)_tmb.jpg"],"/sensors-transducers/current-transducers/1966573":["http://media.digikey.com/Photos/Honeywell%20Photos/CSLA2DG_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/CSLW6B40M_tmb.JPG","http://media.digikey.com/Photos/Allegro%20Microsystems/ACS758LCB-50U-PFF-T_tmb.jpg","http://media.digikey.com/photos/CR%20Magnetics%20Photos/MFG_CR4110,4120,4220,4410,4420,5210,5220%20Parts_tmb.jpg","http://media.digikey.com/Photos/LEM%20Photos/HO-8-NP%5ESP33-0000_tmb.jpg","http://media.digikey.com/photos/Allegro%20Microsystems/ACS758KCB-150B-PSS-T_tmb.jpg"],"/sensors-transducers/dust-sensors/1966158":["http://media.digikey.com/photos/Sharp%20Photos/Sharp%20Microelectronics-GP2Y1010AU0F_tmb.jpg","http://media.digikey.com/Photos/Sharp%20Photos/MFG_GP2Y1023AU0F_tmb.jpg","http://media.digikey.com/Photos/Sharp%20Photos/MFG_DN7C3CA006_tmb.jpg"],"/sensors-transducers/encoders/1966131":["http://media.digikey.com/Photos/Panasonic%20Photos/EVQ-VVD00203B_tmb.JPG","http://media.digikey.com/photos/Bourns%20Photos/ECW1D-B24-BC0024_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/HEDS-9701%23C54_tmb.JPG","http://media.digikey.com/photos/Avago%20Tech%20Photos/HEDS-9000%23T00_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/3315Y-025-016L_tmb.JPG"],"/sensors-transducers/float-level-sensors/1966532":["http://media.digikey.com/Photos/Cynergy%203/Little%20EX%20SERIES_tmb.JPG","http://media.digikey.com/Photos/Cynergy%203/MFG_RSF70%20Series_tmb.jpg","http://media.digikey.com/Photos/Cynergy%203/SSF67A25B75PM12_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/LLE101000,%20LLE101101_tmb.jpg","http://media.digikey.com/Photos/Cynergy%203/MFG_SSF29X035_tmb.jpg"],"/sensors-transducers/flow-sensors/1966503":["http://media.digikey.com/Photos/Honeywell%20Photos/HAFBLF0200CAAX3_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/AWM720P1_tmb.JPG","http://media.digikey.com/photos/Honeywell%20Photos/AWM92100V_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/HAFUHH0200L4AXT_tmb.JPG","http://media.digikey.com/Photos/SMC%20Corp%20of%20Amer/PF2W711-N06-67_tmb.jpg"],"/sensors-transducers/force-sensors/1966743":["http://media.digikey.com/photos/Honeywell%20Photos/FSS1500NSB,%20FSS1500NSR,%20FSS1500NST_tmb.jpg","http://media.digikey.com/Photos/Measurement%20Specialties%20Photos/FC2311-0000-0500-L_tmb.JPG","http://media.digikey.com/photos/Honeywell%20Photos/FS03_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/41-SERIES_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/FSG020WNPB_tmb.jpg"],"/sensors-transducers/gas-sensors/1966735":["http://media.digikey.com/photos/Honeywell%20Photos/GMS10RVS_tmb.jpg","http://media.digikey.com/Photos/AMS-Taos%20USA%20Photos/AS-MLV-P2_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/605-00011_tmb.jpg","http://media.digikey.com/photos/Amphenol%20Photos/T6713%20Series_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/27930_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/KGZ-10SP_tmb.jpg"],"/sensors-transducers/gyroscopes/1967243":["http://media.digikey.com/Renders/Bosch%20Sensortec%20Renders/12-LGA_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/ADXRS645HDYZ_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADXRS45xBEYZ_tmb.JPG","http://media.digikey.com/photos/XSens%20Technologies%20BV/MTI-xx-2A5G4_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/ADIS16137BMLZ_tmb.jpg"],"/sensors-transducers/image-sensors-camera/1966754":["http://media.digikey.com/Photos/OmniVision%20Tech/OVM7690-R20A_tmb.jpg","http://media.digikey.com/Photos/FLIR/MFG_500-0690-00_tmb.jpg","http://media.digikey.com/photos/Micron%20Photos/MFG_MT9M131C12STC_tmb.jpg","http://media.digikey.com/photos/Micron%20Photos/MFG_MT9P031I12STC,%20MT9P031I12STM_tmb.jpg","http://media.digikey.com/Photos/OmniVision%20Tech/OVM7692-RYAA_tmb.JPG","http://media.digikey.com/Photos/FLIR/MFG_500-0659-01_tmb.jpg"],"/sensors-transducers/inclinometers/1966770":["http://media.digikey.com/Photos/Murata%20Photos/SCA61T-FAHH1G-1_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CC-16-1_tmb.jpg","http://media.digikey.com/photos/VTI%20Photos/SCA125T-D08-A_tmb.JPG"],"/sensors-transducers/irda-transceiver-modules/1966896":["http://media.digikey.com/photos/Vishay%20Photos/TFDU4101-TR3_tmb.JPG","http://media.digikey.com/photos/Sharp%20Photos/GP2W0004XP0F_tmb.jpg","http://media.digikey.com/Photos/Rohm%20Photos/RPM871-E4A_tmb.JPG"],"/sensors-transducers/lvdt-transducers-linear-variable-differential-transformer/1966540":["http://media.digikey.com/Photos/Measurement%20Specialties%20Photos/GCD-121-125_tmb.jpg","http://media.digikey.com/photos/Measurement%20Specialties%20Photos/HCT%201000%20IS_tmb.JPG","http://media.digikey.com/photos/Measurement%20Specialties%20Photos/02560410-000_tmb.jpg"],"/sensors-transducers/magnetic-sensors-compass-magnetic-field-modules/1967220":["http://media.digikey.com/photos/Honeywell%20Photos/HMR2300-D21-485_tmb.jpg","http://media.digikey.com/photos/Parallax%20Photos/MFG_29123_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/MFG_HMC%206343%20%231_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/DRM4000L-N00-232_tmb.jpg"],"/sensors-transducers/magnetic-sensors-hall-effect-digital-switch-linear-compass-ics/1967232":["http://media.digikey.com/photos/Honeywell%20Photos/480-3-SIP_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/MFG_SM35xLT~Series_tmb.jpg","http://media.digikey.com/Renders/Allegro%20Microsystems%20Renders/6-PowerWFDFN_tmb.jpg"],"/sensors-transducers/magnetic-sensors-position-proximity-speed-modules/1967210":["http://media.digikey.com/Photos/Omron%20Auto/44531-0100_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/SR16C-N_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/.MA230SAN,%20.MA240SAN_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/55SS16,%20513SS16_tmb.jpg","http://media.digikey.com/Photos/Meder%20Electronics%20Photos/MK05-1B90C-500W_tmb.jpg","http://media.digikey.com/Photos/Spectra%20Symbol/MP1-R-0046-353-103-5%25-RH_tmb.JPG","http://media.digikey.com/Photos/Magnasphere%20Photos/MSS-25C_tmb.jpg"],"/sensors-transducers/magnets/1966182":["http://media.digikey.com/Photos/Radial%20Magnet%20Inc%20Photos/1%5E4%20X%201%5E4%20X%201%5E4THICK_tmb.JPG","http://media.digikey.com/photos/Meder%20Electronics%20Photos/4003004025_tmb.jpg","http://media.digikey.com/photos/Meder%20Electronics%20Photos/2500000014_tmb.JPG"],"/sensors-transducers/moisture-sensors-humidity/1966708":["http://media.digikey.com/photos/Honeywell%20Photos/HIH-4031-001_tmb.JPG","http://media.digikey.com/photos/Honeywell%20Photos/HCH-1000-002_tmb.JPG","http://media.digikey.com/photos/Honeywell%20Photos/HIH-4602-C_tmb.JPG","http://media.digikey.com/Photos/Parallax%20Photos/27920_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/HIH-4000-001,%20HIH-4000-003,%20HIH-4000-005_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/MFG_CC2D_tmb.jpg"],"/sensors-transducers/motion-sensors-detectors/1966772":["http://media.digikey.com/photos/Panasonic%20Elect%20Works%20Photos/AMN41122,AMN11112,AMN21112_tmb.jpg","http://media.digikey.com/Photos/Parallax%20Photos/28032_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/EKMx1x03112_tmb.jpg","http://media.digikey.com/photos/Zilog%20Photos/ZEPIR0AAS01SBCG_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/EKMB1x01112_tmb.jpg"],"/sensors-transducers/multifunction/1967155":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADIS16210CMLZ_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/LSM9DS0TR_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/6DF-1N6-C2-HWL_tmb.JPG","http://media.digikey.com/Photos/Analog%20Devices%20Photos/ADIS16485AMLZ_tmb.jpg","http://media.digikey.com/photos/VTI%20Photos/SCC1300-D04_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/14-LGA%20PKG_tmb.jpg"],"/sensors-transducers/optical-sensors-ambient-light-ir-uv-sensors/1966828":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/MFG_OPT101PG4_tmb.jpg","http://media.digikey.com/Photos/Silicon%20Labs%20Photos/MFG_Si114x_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Semiconductors/VCNL4010-GS08_tmb.JPG"],"/sensors-transducers/optical-sensors-distance-measuring/1967026":["http://media.digikey.com/Photos/Sharp%20Photos/GP2Y0A60SZLF_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/Sharp%20Microelectronics-GP2Y0A700K0F_tmb.jpg","http://media.digikey.com/photos/Sharp%20Photos/GP2Y0E02x_tmb.jpg"],"/sensors-transducers/optical-sensors-mouse/1966634":["http://media.digikey.com/Photos/Avago%20Tech%20Photos/ADNS-5050_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/ADNS-2700_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/ADNS-9500_tmb.jpg"],"/sensors-transducers/optical-sensors-photo-detectors-cds-cells/1967023":["http://media.digikey.com/photos/Advanced%20Photonix%20Photos/MFG_PDV-P5001_tmb.jpg","http://media.digikey.com/photos/Advanced%20Photonix%20Photos/PDV-P8104_tmb.JPG","http://media.digikey.com/Photos/Advanced%20Photonix%20Photos/NSL-x9x0_tmb.jpg"],"/sensors-transducers/optical-sensors-photo-detectors-logic-output/1967050":["http://media.digikey.com/photos/Honeywell%20Photos/SD5600-001,SD5620-001_tmb.jpg","http://media.digikey.com/photos/Osram%20Opto%20Photos/SFH5440_tmb.jpg","http://media.digikey.com/photos/TT%20Electronics-Optek%20Photos/OPL550A_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/SDP8314-301_tmb.jpg"],"/sensors-transducers/optical-sensors-photo-detectors-remote-receiver/1967024":["http://media.digikey.com/photos/Sharp%20Photos/GP1UX311QS_tmb.JPG","http://media.digikey.com/photos/Sharp%20Photos/GP1UD267XK_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Semiconductors/TSOP6238TR_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Semiconductors/TSOP85438TR_tmb.JPG"],"/sensors-transducers/optical-sensors-photodiodes/1967048":["http://media.digikey.com/photos/Advanced%20Photonix%20Photos/MFG_SD197-23-21-041_tmb.JPG","http://media.digikey.com/Photos/Advanced%20Photonix%20Photos/PDB-C160SM_tmb.JPG","http://media.digikey.com/photos/TT%20Electronics-Optek%20Photos/OPR5925_tmb.jpg","http://media.digikey.com/photos/Advanced%20Photonix%20Photos/SD444-12-12-171_tmb.JPG","http://media.digikey.com/Renders/Honeywell%20Renders/SD2420-002_tmb.jpg","http://media.digikey.com/photos/Vishay%20Photos/TEMD1020_tmb.JPG","http://media.digikey.com/photos/Advanced%20Photonix%20Photos/MFG_PDV-C173SM_tmb.jpg"],"/sensors-transducers/optical-sensors-photoelectric-industrial/1967397":["http://media.digikey.com/photos/Panasonic%20Photos/CX-442-Z_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/PM2-LF10_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/RT-610-10R_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/EQ-34-J_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/FX-301_tmb.jpg"],"/sensors-transducers/optical-sensors-photointerrupters-slot-type-logic-output/1967053":["http://media.digikey.com/photos/Omron%20Elect%20Photos/EE-SX3070,EE-SX4070_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/EE-SX770P_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Photos/GP-XC12ML_tmb.jpg"],"/sensors-transducers/optical-sensors-photointerrupters-slot-type-transistor-output/1967054":["http://media.digikey.com/photos/Rohm%20Photos/RPI-243_tmb.jpg","http://media.digikey.com/Photos/Omron%20Elect%20Photos/EE-SX1140_tmb.jpg","http://media.digikey.com/photos/Optek%20Photos/OPB817_tmb.jpg"],"/sensors-transducers/optical-sensors-phototransistors/1967049":["http://media.digikey.com/Renders/Everlight%20Electronics/ALS-PT19_tmb.jpg","http://media.digikey.com/Renders/Everlight%20Electronics/PT12-21B_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/sd5410-003_tmb.JPG","http://media.digikey.com/Renders/Everlight%20Electronics/PT91-21C%20TR7_tmb.jpg","http://media.digikey.com/Photos/SunLED/MFG_XZRNI55W-3_tmb.jpg"],"/sensors-transducers/optical-sensors-reflective-analog-output/1967052":["http://media.digikey.com/Photos/TT%20Electronics-Optek%20Photos/OPB710F_tmb.JPG","http://media.digikey.com/Photos/Omron%20Elect%20Photos/EE-SY193_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/HOA1405-001_tmb.jpg","http://media.digikey.com/Photos/Marktech%20Optoelectronics/MFG_MTRS9520D_tmb.jpg"],"/sensors-transducers/optical-sensors-reflective-logic-output/1967257":["http://media.digikey.com/Photos/Honeywell%20Photos/HOA6480-001_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/AEDR-8300-1P2_tmb.JPG","http://media.digikey.com/photos/Omron%20Elect%20Photos/EE-SB5VC_tmb.jpg","http://media.digikey.com/Photos/ISSI%20(Integrated%20Silicon/IS31SE5001-QFLS2-TR_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/HOA2006-001_tmb.jpg"],"/sensors-transducers/position-sensors-angle-linear-position-measuring/1967060":["http://media.digikey.com/photos/Panasonic%20Photos/EVW-AE4001B14_tmb.JPG","http://media.digikey.com/photos/API%20Technologies/6015-1002-030_tmb.jpg","http://media.digikey.com/Photos/API%20Technologies/6915-1002-030_tmb.jpg","http://media.digikey.com/photos/Murata%20Photos/SV01L%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/F56105101_tmb.jpg"],"/sensors-transducers/pressure-sensors-transducers/1966259":["http://media.digikey.com/Photos/Honeywell%20Photos/ASDXRRX030PGAA5_tmb.JPG","http://media.digikey.com/Renders/Measurement%20Specialties%20Renders/BAROMETRIC%20PRESSURE%20SENSOR_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/NBPLANN030PAUNV_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/1865%20GROUP_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/176PC07HD2_tmb.jpg","http://media.digikey.com/Photos/Freescale%20Photos/MP3V5050GP_tmb.jpg"],"/sensors-transducers/proximity-sensors/1966557":["http://media.digikey.com/photos/Omron%20Elect%20Photos/E2E-X10Y1-US_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/IMB1805T_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Photos/GX-H15A_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Elect%20Works%20Photos/GX-F15BI_tmb.jpg"],"/sensors-transducers/proximity-occupancy-sensors-finished-units/1967415":["http://media.digikey.com/Photos/Thomas%20Research%20Products/OMNIIRL_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/LODTRP_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/WSPSMUNV_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/OMNIUS2000RP_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/LHMTS1-G-WH_tmb.jpg"],"/sensors-transducers/rtd-resistance-temperature-detector/1966810":["http://media.digikey.com/Renders/Vishay%20Beyschlag%20Renders/MFU%201206%20(3216%20metric)_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/480-TO-92(Short%20Body)_tmb.jpg","http://media.digikey.com/renders/Zetex%20Renders/SOT-23-3%20PKG_tmb.jpg","http://media.digikey.com/photos/Honeywell%20Photos/R300-F35-M14-C_tmb.JPG","http://media.digikey.com/Photos/Honeywell%20Photos/HEL-705-U-0-12-00_tmb.jpg"],"/sensors-transducers/solar-cells/1966326":["http://media.digikey.com/Photos/Sanyo%20Photos/AM-8801CAR_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2885456_tmb.jpg","http://media.digikey.com/Photos/Clare%20Photos/CPC1832N_tmb.JPG","http://media.digikey.com/photos/Sanyo%20Photos/AM-5610CAR_tmb.jpg"],"/sensors-transducers/specialized-sensors/1967395":["http://media.digikey.com/Photos/Melexis%20Photos/MLX75306KXZ_tmb.jpg","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/MFG_AMG88xx_tmb.jpg","http://media.digikey.com/Photos/Grayhill%20Photos/T101-5C3-111-M1_tmb.jpg","http://media.digikey.com/Photos/Interlink%20Electronics%20Photos/34-00003_tmb.jpg","http://media.digikey.com/Photos/Austria%20Microsystems/N35P102_tmb.jpg","http://media.digikey.com/Photos/Cynergy%203/DM200_tmb.jpg"],"/sensors-transducers/strain-gages/1967323":["http://media.digikey.com/Photos/Micro-Measurements/CEA-06-062UW-350_tmb.jpg","http://media.digikey.com/Photos/Micro-Measurements/LWK-06-W250B-350_tmb.jpg","http://media.digikey.com/Photos/Micro-Measurements/CEA-13-062WT-350%20(Package)_tmb.jpg","http://media.digikey.com/Photos/Micro-Measurements/CEA-06-062WT-350_tmb.JPG"],"/sensors-transducers/temperature-regulators/1966363":["http://media.digikey.com/photos/Honeywell%20Photos/2455RC-90820389_tmb.jpg","http://media.digikey.com/photos/Cantherm%20Photos/THERMOSTAT%20+%20LEADS%20NO_tmb.jpg","http://media.digikey.com/Photos/Honeywell%20Photos/3000-00460029_tmb.jpg"],"/sensors-transducers/temperature-sensors-transducers/1966391":["http://media.digikey.com/Photos/Omron%20Elect%20Photos/MFG_D6T8L06_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/SOT23-5_tmb.jpg","http://media.digikey.com/Photos/Melexis%20Photos/MLX90614ESF-ACA-000-TU_tmb.jpg","http://media.digikey.com/Photos/Melexis%20Photos/MLX90614KSF-ACC-000-TU_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/TO-220-3_tmb.jpg","http://media.digikey.com/renders/National%20Semi%20Renders/TO-92%20PKG_tmb.jpg"],"/sensors-transducers/temperature-switches/1967418":["http://media.digikey.com/renders/Rohm%20Renders/5-HVSOF_HVSOF5%20Pkg_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/AD549JHZ_tmb.JPG","http://media.digikey.com/photos/Microchip%20Tech%20Photos/TO-220-5_StraightLeads_tmb.jpg"],"/sensors-transducers/thermistors-ntc/1966148":["http://media.digikey.com/photos/Vishay%20Photos/NTCLE100E3333JB0_tmb.JPG","http://media.digikey.com/photos/Diodes%20Photos/31-MINIMELF_tmb.jpg","http://media.digikey.com/Renders/Vishay%20BC%20Renders/0603_tmb.jpg","http://media.digikey.com/Photos/Vishay%20BC%20Photos/NTCALUG03A103GC_tmb.jpg","http://media.digikey.com/Renders/Vishay%20BC%20Renders/NTCLE%202-0k%205per_tmb.jpg"],"/sensors-transducers/thermistors-ptc/1967095":["http://media.digikey.com/Photos/Measurement%20Specialties%20Photos/P5005C090S500H_tmb.jpg","http://media.digikey.com/photos/Epcos%20Photos/B59105J0130A020_tmb.JPG","http://media.digikey.com/Renders/Vishay%20BC%20Renders/PTCSL%2090deg_tmb.jpg","http://media.digikey.com/Photos/GE%20Sensing%20Photos/YQR100R060_tmb.JPG","http://media.digikey.com/Renders/Vishay%20BC%20Renders/Y1-VY1_tmb.jpg"],"/sensors-transducers/thermocouple-temperature-probe/1966314":["http://media.digikey.com/Photos/Measurement%20Specialties%20Photos/G9864ST22F0_tmb.jpg","http://media.digikey.com/photos/Omron%20Auto/E52-CA6DN_tmb.jpg","http://media.digikey.com/Photos/Crouzet%20Photos/79696030_tmb.jpg"],"/sensors-transducers/tilt-sensors/1966541":["http://media.digikey.com/Photos/Magnasphere%20Photos/T1-AB-JS_tmb.jpg","http://media.digikey.com/photos/NKK%20Switches%20Photos/MFG_DSBA1P_tmb.jpg","http://media.digikey.com/Photos/Rohm%20Photos/RPI-1035_tmb.jpg"],"/sensors-transducers/ultrasonic-receivers-transmitters/1966682":["http://media.digikey.com/Photos/Parallax%20Photos/28015_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/MA40S4S_tmb.JPG","http://media.digikey.com/photos/Panasonic%20Photos/PANASONIC%20-%20ECG-%20EFR-TQB40K5_tmb.jpg","http://media.digikey.com/Photos/Knowles%20Acoustics%20Photos/SPM0404UD5_tmb.jpg"],"/sensors-transducers/vibration-sensors/1966393":["http://media.digikey.com/Photos/Mide%20Tech%20Photos/V25W_tmb.jpg","http://media.digikey.com/photos/Measurement%20Specialties%20Photos/1005939-1_tmb.jpg","http://media.digikey.com/photos/Omron%20Elect%20Photos/D7E-2_tmb.JPG","http://media.digikey.com/photos/Parallax%20Photos/MFG_605-00004_tmb.jpg","http://media.digikey.com/Photos/Mide%20Tech%20Photos/V22BL_tmb.jpg"],"/soldering-desoldering-rework-products/accessories/1310804":["http://media.digikey.com/Photos/Aven%20Photos/17530-TC_tmb.jpg","http://media.digikey.com/Photos/Chip%20Quik%20Photos/SMDTCLF_tmb.jpg","http://media.digikey.com/Photos/Multicore/292959_tmb.JPG","http://media.digikey.com/Photos/Easy%20Braid%20Photos/EBRMP-1_tmb.JPG","http://media.digikey.com/photos/Cooper%20Industries%20Photos/0051512499_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/T0053118099_tmb.jpg"],"/soldering-desoldering-rework-products/desoldering-braid-wick-pumps/1311239":["http://media.digikey.com/photos/ITW%20Chemtronics%20Photos/80-6-5_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/DP-140_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/S-D-500_tmb.jpg"],"/soldering-desoldering-rework-products/dispensers-dispenser-tips/1311720":["http://media.digikey.com/photos/Chip%20Quik%20Photos/SMDSG30CCR_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/M10LLASSM_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/KDS22TN25_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/SD74_tmb.jpg"],"/soldering-desoldering-rework-products/flux-flux-remover/1311241":["http://media.digikey.com/Photos/Multicore/760089_tmb.jpg","http://media.digikey.com/photos/Kester%20Photos/57-0000-1525_tmb.jpg","http://media.digikey.com/Photos/Chip%20Quik%20Photos/SMD29175G_tmb.JPG"],"/soldering-desoldering-rework-products/fume-smoke-extraction/1311718":["http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/MFG_SA-9-115_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_FUMECUBE%20WEB_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/MFG_SA-91-E_tmb.jpg"],"/soldering-desoldering-rework-products/holders-stands/1311716":["http://media.digikey.com/Photos/Apex%20Tool%20Photos/MFG_T0051504299_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/MFG_T0051504599_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/MFG_0051516999_tmb.jpg"],"/soldering-desoldering-rework-products/solder/1310838":["http://media.digikey.com/photos/Kester%20Photos/24-6337-0027_tmb.jpg","http://media.digikey.com/Photos/Multicore/1769647_tmb.jpg","http://media.digikey.com/photos/Chip%20Quik%20Photos/MFG_SMD291SNL250T3_tmb.jpg","http://media.digikey.com/photos/MG%20Chemicals%20Photos/MFG_4870_tmb.jpg"],"/soldering-desoldering-rework-products/solder-sponge/1310839":["http://media.digikey.com/photos/Easy%20Braid%20Photos/S3030R-O-T_tmb.JPG","http://media.digikey.com/Photos/Metcal%20Photos/AC-YS3-P_tmb.jpg","http://media.digikey.com/photos/Easy%20Braid%20Photos/S2626-M_tmb.jpg"],"/soldering-desoldering-rework-products/solder-stencils-templates/1311721":["http://media.digikey.com/Photos/Chip%20Quik%20Photos/MFG_PA0106-S_tmb.JPG","http://media.digikey.com/Photos/Chip%20Quik%20Photos/MFG_IPC0099-S_tmb.JPG","http://media.digikey.com/Photos/Chip%20Quik%20Photos/MFG_PA0009-S_tmb.jpg","http://media.digikey.com/Photos/Chip%20Quik%20Photos/MFG_IPC0118-S_tmb.JPG"],"/soldering-desoldering-rework-products/soldering-irons-tweezers-handles/1311717":["http://media.digikey.com/photos/Cooper%20Industries%20Photos/0052918099_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_72601_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_72700_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/TB100PK_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/MFG_0052917999_tmb.jpg"],"/soldering-desoldering-rework-products/soldering-desoldering-rework-stations/1310841":["http://media.digikey.com/Photos/Apex%20Tool%20Photos/WD1M_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/MFG_WX2_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_EB-5000S_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_EB-9000PS_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_EB-5000PS-1_tmb.jpg"],"/soldering-desoldering-rework-products/soldering-desoldering-rework-tips-nozzles/1311719":["http://media.digikey.com/Photos/Apex%20Tool%20Photos/ETS_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/LTD_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/0058736804_tmb.jpg","http://media.digikey.com/photos/Apex%20Tool%20Photos/0051315099_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/0054414699_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/LT1X_tmb.jpg"],"/static-control-esd-clean-room-products/accessories/2228308":["http://media.digikey.com/photos/Desco%20Photos/09782_tmb.jpg","http://media.digikey.com/photos/Desco%20Photos/35359_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/6HIC200_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_FPSNAP_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/35493_tmb.jpg"],"/static-control-esd-clean-room-products/clean-room-swabs-and-brushes/2228742":["http://media.digikey.com/photos/Desco%20Photos/35693_tmb.JPG","http://media.digikey.com/photos/MG%20Chemicals%20Photos/812-10_tmb.JPG","http://media.digikey.com/Photos/Desco%20Photos/35686_tmb.jpg","http://media.digikey.com/photos/MG%20Chemicals%20Photos/MG%20CHEMICALS-%20853_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_SW6BPF_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/MFG_SW2PF_tmb.jpg"],"/static-control-esd-clean-room-products/clean-room-treatments-cleaners-wipes/2228420":["http://media.digikey.com/photos/Easy%20Braid%20Photos/EBSC%20100_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/8001_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/2011-B_tmb.jpg","http://media.digikey.com/photos/ITW%20Chemtronics%20Photos/CP400_tmb.jpg","http://media.digikey.com/photos/ACL%20Staticide%20Photos/MFG_6002_tmb.jpg","http://media.digikey.com/photos/ITW%20Chemtronics%20Photos/42272_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_CITRUS-BASE-CLEANER-5GAL_tmb.jpg"],"/static-control-esd-clean-room-products/ionizer-equipment/2228421":["http://media.digikey.com/photos/3M%20Photos/960_tmb.JPG","http://media.digikey.com/Photos/Panasonic%20Elect%20Works%20Photos/ER-F12ANT_tmb.jpg","http://media.digikey.com/photos/Desco%20Photos/19500_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/ER-VANT2_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/60500_tmb.jpg"],"/static-control-esd-clean-room-products/monitors-testers/2228798":["http://media.digikey.com/Photos/Desco%20Photos/19784_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_747_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/724_tmb.JPG"],"/static-control-esd-clean-room-products/static-control-clothing/2228540":["http://media.digikey.com/Photos/Desco%20Photos/68121_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/2C%20LARGE_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/73760_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/73853_tmb.JPG"],"/static-control-esd-clean-room-products/static-control-device-containers/2228419":["http://media.digikey.com/Photos/3M%20Photos/8521_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/37594_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/35874_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/5701_tmb.jpg"],"/static-control-esd-clean-room-products/static-control-grounding-cords-straps/2228415":["http://media.digikey.com/Photos/3M%20Photos/WSGR2_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/2368_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/17202_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/2206_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/2389_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_HGC1M_tmb.jpg"],"/static-control-esd-clean-room-products/static-control-grounding-mats/2228418":["http://media.digikey.com/Renders/Desco%20Renders/Dark-Blue-Rubber-Runner,-50%27,-Conductive-Dissipative_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/9920_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/Gray-Rubber-Dissipative-Runner_tmb.jpg"],"/static-control-esd-clean-room-products/static-control-shielding-bags-materials/2228416":["http://media.digikey.com/Photos/Desco%20Photos/12803_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/1900%20GROUP_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/2120R-Series_tmb.jpg","http://media.digikey.com/Photos/Desco%20Photos/13524_tmb.JPG"],"/switches/pushbutton-switches-hall-effect/1115361":["http://media.digikey.com/Photos/APEM%20Comp%20Photos/IHSR36F3_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/IHLR015XF6_tmb.jpg","http://media.digikey.com/Photos/APEM%20Comp%20Photos/IHSR36F1_tmb.jpg"],"/tapes-adhesives/glue-adhesives-applicators/3867511":["http://media.digikey.com/Photos/3M%20Photos/62968099515_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_800-5OZ_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/DP270-BLACK-200ML_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/62-9171-9153-8_tmb.JPG","http://media.digikey.com/photos/Steinel%20Photos/MFG_76000_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_31130_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_9726_tmb.jpg"],"/tapes-adhesives/tape/3866785":["http://media.digikey.com/photos/3M%20Photos/33+%20SUPER%20X66%20SERIES_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/5702-2%2036YD%20SERIES_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/2-5-467MP_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/AISLETAPE54_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/5413%20AMBER,%202%201%5E2%20IN%20X%2036_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/3M%204646%20CIRCLE-0.5-250_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/3M%204936%20CIRCLE-2-100_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/3-5-4910_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/5-49xx-x(5pk)_tmb.jpg"],"/tapes-adhesives/tape-dispensers/3867542":["http://media.digikey.com/Photos/3M%20Photos/MFG_HB900_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_H12_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_HB903_tmb.jpg"],"/test-and-measurement/accessories/2293844":["http://media.digikey.com/Photos/Mueller%20Photos/4408POM_tmb.jpg","http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/HDO4K-SOFTCASE_tmb.JPG","http://media.digikey.com/photos/Lambda%20Americas%20Photos/MFG_ZUP%20SERIES_tmb.jpg","http://media.digikey.com/Photos/TPI%20Photos/105-52-000_tmb.JPG","http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/AP03X-OFFSET-PIN_tmb.JPG","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/80AK-A_tmb.JPG"],"/test-and-measurement/equipment-electrical-testers-current-probes/2295024":["http://media.digikey.com/photos/Fluke%20Elect%20Photos/I1010_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/FLUKE-I2500-10_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/MFG_FLK-A3002%20FC_tmb.jpg"],"/test-and-measurement/equipment-environmental-testers/2294800":["http://media.digikey.com/Photos/BK%20Precision%20Photos/732A_tmb.jpg","http://media.digikey.com/Photos/TPI%20Photos/MFG_a790_tmb.jpg","http://media.digikey.com/Photos/TPI%20Photos/MFG_556C1_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/MFG_750P-SERIES_tmb.jpg"],"/test-and-measurement/equipment-function-generators/2294797":["http://media.digikey.com/Photos/BK%20Precision%20Photos/MFG_4033_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK4070A_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK4012A_tmb.jpg","http://media.digikey.com/Photos/Lecroy/MFG_WAVESTATION%20front%20view_tmb.jpg","http://media.digikey.com/Photos/Lecroy/MFG_AS1102D_tmb.jpg"],"/test-and-measurement/equipment-multimeters/2294086":["http://media.digikey.com/photos/Fluke%20Elect%20Photos/FLUKE-117_tmb.jpg","http://media.digikey.com/photos/Amprobe%20Photos/33XR-A_tmb.JPG","http://media.digikey.com/photos/BK%20Precision%20Photos/2709B_tmb.JPG","http://media.digikey.com/photos/TPI%20Photos/TPI%20183_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/2707A_tmb.jpg","http://media.digikey.com/photos/Fluke%20Elect%20Photos/8845a_DMM_tmb.JPG","http://media.digikey.com/photos/BK%20Precision%20Photos/BK5491A_tmb.jpg"],"/test-and-measurement/equipment-oscilloscopes/2294009":["http://media.digikey.com/Photos/Lecroy/MFG_WAVESURFER%2062MXS-B_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/MFG_2510%20Series_Side_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/MFG_2190D_tmb.jpg","http://media.digikey.com/Photos/Lecroy/MFG_WAVEACE1001_tmb.jpg","http://media.digikey.com/photos/Fluke%20Elect%20Photos/FLUKE-196C%5E003_tmb.JPG"],"/test-and-measurement/equipment-power-supplies-test-bench/2295022":["http://media.digikey.com/Photos/BK%20Precision%20Photos/1550_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK1715A_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/MFG_9111_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK1770_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/1692_tmb.jpg"],"/test-and-measurement/equipment-specialty/2294595":["http://media.digikey.com/Photos/TPI%20Photos/MFG_9070_tmb.jpg","http://media.digikey.com/Photos/Mide%20Tech%20Photos/LOG-0002-025G_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/CDB-10_tmb.jpg","http://media.digikey.com/Photos/Mide%20Tech%20Photos/LOG-0002-025G_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/879B_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/8540_tmb.jpg"],"/test-and-measurement/equipment-spectrum-analyzers/2294798":["http://media.digikey.com/Photos/BK%20Precision%20Photos/2650A_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK2630_tmb.jpg","http://media.digikey.com/photos/BK%20Precision%20Photos/BK2650_tmb.jpg","http://media.digikey.com/photos/Kaltman%20Creations%20LLC/SPECTRAN%20HF6080_tmb.JPG"],"/test-and-measurement/equipment-variable-transformers/2294614":["http://media.digikey.com/photos/Staco%20Energy%20Photos/3PN2210B_tmb.JPG","http://media.digikey.com/photos/Staco%20Energy%20Photos/3PN221B,%203PN501B_tmb.jpg","http://media.digikey.com/Photos/Staco%20Energy%20Photos/3PNJ201B_tmb.jpg","http://media.digikey.com/photos/Staco%20Energy%20Photos/201_tmb.jpg"],"/test-and-measurement/test-clips-alligator-crocodile-heavy-duty/2294785":["http://media.digikey.com/Photos/TPI%20Photos/BC60ANP_tmb.jpg","http://media.digikey.com/photos/TPI%20Photos/a067b_tmb.JPG","http://media.digikey.com/Photos/TPI%20Photos/BC46TRCP_tmb.jpg","http://media.digikey.com/Photos/Mueller%20Photos/BU-25C_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/72924-0_tmb.jpg","http://media.digikey.com/Photos/Mueller%20Photos/MFG_BU-20434-2_tmb.jpg","http://media.digikey.com/photos/TPI%20Photos/BC24AZP_tmb.jpg"],"/test-and-measurement/test-clips-grabbers-hooks/2294774":["http://media.digikey.com/photos/EZ%20Hook%20Photos/X100W%20RED_tmb.jpg","http://media.digikey.com/photos/Teledyne%20LeCroy%20Photos/PK1-5MM-115G_tmb.jpg","http://media.digikey.com/photos/EZ%20Hook%20Photos/X2015%20RED_tmb.jpg","http://media.digikey.com/photos/EZ%20Hook%20Photos/X100W-S_tmb.jpg"],"/test-and-measurement/test-clips-ic/2294786":["http://media.digikey.com/photos/3M%20Photos/923670-68_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/923665-20_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/5733_tmb.JPG","http://media.digikey.com/photos/3M%20Photos/923690-40_tmb.jpg"],"/test-and-measurement/test-leads-banana-meter-interface/2294789":["http://media.digikey.com/Photos/Pomona%20Photos/Minigrabber-3782,-Banana-to-Hook,-Green_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/B-Series-1-Lead,-Orange-Plug_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/PR%2028A_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/MFG_CT2176-x-2_tmb.jpg"],"/test-and-measurement/test-leads-bnc-interface/2294787":["http://media.digikey.com/Photos/Pomona%20Photos/3789_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/4969_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_2885_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_4530-C-18_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_4725_tmb.jpg"],"/test-and-measurement/test-leads-jumper-specialty/2294788":["http://media.digikey.com/Photos/Pomona%20Photos/Minigrabber-3781-Green_tmb.jpg","http://media.digikey.com/Photos/TPI%20Photos/TLS2010_tmb.jpg","http://media.digikey.com/Photos/Pomona%20Photos/AL-B-RED_tmb.jpg","http://media.digikey.com/photos/Pomona%20Photos/MFG_6576-24-2_01a_c_tmb.jpg"],"/test-and-measurement/test-leads-kits-assortments/2294791":["http://media.digikey.com/photos/Fluke%20Elect%20Photos/TLK289_tmb.JPG","http://media.digikey.com/photos/BK%20Precision%20Photos/TLPS_tmb.JPG","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/TL80A_tmb.jpg"],"/test-and-measurement/test-leads-oscilloscope-probes/2294792":["http://media.digikey.com/Photos/BK%20Precision%20Photos/PR2000B_tmb.jpg","http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/MFG_ADP305_tmb.jpg","http://media.digikey.com/Photos/Lecroy/MFG_PP007_tmb.jpg"],"/test-and-measurement/test-leads-thermocouples-temperature-probes/2294777":["http://media.digikey.com/photos/TPI%20Photos/GK11M_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/80BK-A_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/80T-150UA_tmb.jpg"],"/test-and-measurement/test-points/2294346":["http://media.digikey.com/Renders/Keystone%20Elect%20Renders/5017_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/5009_tmb.JPG","http://media.digikey.com/Photos/Mill-Max%20Mfg%20Photos/1508-0-57-15-00-00-03-0_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/11012_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/1031_tmb.JPG","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/11014-R_tmb.jpg"],"/test-and-measurement/test-probe-tips/2294778":["http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/PK104-2_tmb.JPG","http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/PK30X-5_tmb.jpg","http://media.digikey.com/photos/TPI%20Photos/A055_tmb.JPG","http://media.digikey.com/Photos/Teledyne%20LeCroy%20Photos/PACC-PT001_tmb.jpg"],"/test-and-measurement/thermometers/2294353":["http://media.digikey.com/Photos/TPI%20Photos/312C_tmb.jpg","http://media.digikey.com/Photos/Fluke%20Elect%20Photos/MFG_FLUKE-62%20MAX_tmb.jpg","http://media.digikey.com/Photos/BK%20Precision%20Photos/630_tmb.jpg"],"/tools/accessories/1245268":["http://media.digikey.com/Photos/Apex%20Tool%20Photos/TCMB100MT_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_34026_tmb.jpg","http://media.digikey.com/Photos/Apex%20Tool%20Photos/T0053900299_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_370-1019-10_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_34420_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_AP-622-1_tmb.jpg"],"/tools/assorted-tool-kits/1246052":["http://media.digikey.com/photos/Linx%20Tech%20Photos/CTK-174-02_tmb.JPG","http://media.digikey.com/photos/Cooper%20Industries%20Photos/CTK148MP_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32899_tmb.jpg","http://media.digikey.com/Photos/Wiha/32390_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0159-01-INS_tmb.jpg"],"/tools/crimpers-crimp-heads-die-sets/1245323":["http://media.digikey.com/photos/Stewart%20Connector%20Photos/2906252-01_tmb.JPG","http://media.digikey.com/Photos/Stewart%20Connector%20Photos/2980071-01_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/PA2076_tmb.jpg","http://media.digikey.com/Photos/Amphenol%20Photos/227-K727_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/679305-1_tmb.jpg"],"/tools/crimpers-applicators-presses/1245292":["http://media.digikey.com/photos/3M%20Photos/TH-450_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/SQ%2028-10_tmb.jpg","http://media.digikey.com/Photos/Souriau%20Connection%20Photos/SHANDLES_tmb.jpg","http://media.digikey.com/photos/Astro%20Tools%20Photos/615708_tmb.jpg"],"/tools/crimpers-applicators-presses-accessories/1246296":["http://media.digikey.com/Photos/Molex/63819-0075_tmb.jpg","http://media.digikey.com/Photos/Molex/0634451031_tmb.JPG","http://media.digikey.com/photos/Molex/0638100105_tmb.jpg","http://media.digikey.com/Photos/Hirose%20Elect%20Photos/HR30-7P-10SC-T01_tmb.jpg","http://media.digikey.com/photos/Emerson%20Network%20Photos/140-0000-959_tmb.jpg"],"/tools/cutting-tools/1245743":["http://media.digikey.com/photos/Swanstrom%20Photos/515_tmb.jpg","http://media.digikey.com/photos/Panduit%20Corp%20Photos/DCT_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32611_tmb.jpg","http://media.digikey.com/Photos/Molex/638170100_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32658_tmb.jpg"],"/tools/excavators-hooks-picks-probes-tuning-tools/1246032":["http://media.digikey.com/photos/Wiha/mfg43227_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/H-90_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/20215_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/MFG_M-125_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Spectrol%20Photos/ACCTRITOB308-T000_tmb.jpg"],"/tools/fiber-optics-and-accessories/1246362":["http://media.digikey.com/Photos/3M%20Photos/MFG_15MIC-3M668X-PSA-SHEET-3X8%5E%5E_tmb.jpg","http://media.digikey.com/photos/Industrial%20Fiberoptics%20Photos/IF-PM_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/30MIC%203M261X%20LF%20AO%203MIL%205%20IN_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_FCPUCKSCST_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_5MIC-3M261X-ROLL-4%5E%5EX150%27X3%5E%5E_tmb.jpg"],"/tools/flashlights/1245844":["http://media.digikey.com/Photos/Panasonic%20Photos/BF-AF10B-P%5EA_tmb.jpg","http://media.digikey.com/photos/Energizer%20Photos/TUF4D1H_tmb.jpg","http://media.digikey.com/Photos/Icon/MFG_IXP107A_tmb.jpg"],"/tools/hammers/1246072":["http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0156-12_tmb.jpg","http://media.digikey.com/Photos/Wiha/mfg80030_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg80280_tmb.jpg"],"/tools/heat-guns-torches-accessories/1246323":["http://media.digikey.com/photos/Steinel%20Photos/MFG_34870_tmb.jpg","http://media.digikey.com/photos/Master%20Appliance%20Photos/PH-1200_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/MFG_529535-1_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_07725_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_07062_tmb.JPG","http://media.digikey.com/photos/Steinel%20Photos/07061_tmb.jpg","http://media.digikey.com/photos/Steinel%20Photos/MFG_71270_tmb.jpg"],"/tools/hex-torx-keys/1246464":["http://media.digikey.com/Photos/Harting/09990000313_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_36106_tmb.jpg","http://media.digikey.com/photos/Wiha/54003_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1201947_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_13667_tmb.jpg"],"/tools/insertion-extraction/1245293":["http://media.digikey.com/photos/Aries/T90_tmb.jpg","http://media.digikey.com/photos/Tyco%20Amp%20Photos/822154-1_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/539971-1_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/821903-5_tmb.jpg","http://media.digikey.com/Photos/Molex/0638240200_tmb.jpg","http://media.digikey.com/photos/Molex/0638132400_tmb.jpg"],"/tools/knives-blades/1246033":["http://media.digikey.com/Photos/Aven%20Photos/MFG_44205S_tmb.JPG","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0652-28_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/WK8V_tmb.jpg","http://media.digikey.com/photos/Paladin%20Tools%20Photos/MFG_1912.1_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg43092_tmb.jpg","http://media.digikey.com/photos/Wiha/43040_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0652-25_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0652-29_tmb.jpg","http://media.digikey.com/Photos/Aven%20Photos/MFG_44231_tmb.jpg"],"/tools/personal-protective-equipment-ppe/1246526":["http://media.digikey.com/Photos/3M%20Photos/8210_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_01762-04M_tmb.jpg","http://media.digikey.com/Photos/Easy%20Braid%20Photos/BQY09_tmb.JPG","http://media.digikey.com/Photos/3M%20Photos/MFG_4515%20coverall_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_S-533S_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_M-307_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_AP-603_tmb.jpg","http://media.digikey.com/Photos/3M%20Photos/MFG_311-4109_tmb.jpg"],"/tools/pliers/1246034":["http://media.digikey.com/Photos/Apex%20Tool%20Photos/CN54G_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/LB8_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32669_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32628_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32627_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32810_tmb.jpg"],"/tools/punchdown-blades/1246035":["http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/EPD-914_tmb.JPG","http://media.digikey.com/photos/Greenlee%20Communications/PA3579_tmb.jpg","http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/MFG_EPD-914630_tmb.jpg","http://media.digikey.com/photos/Paladin%20Tools%20Photos/MFG_3581.1_tmb.jpg"],"/tools/punches/1246287":["http://media.digikey.com/Photos/Wiha/MFG_23427_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_23490_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_12492_tmb.jpg"],"/tools/screw-and-nut-drivers/1245990":["http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/SDSP-2_tmb.JPG","http://media.digikey.com/Photos/Apex%20Tool%20Photos/P19_tmb.jpg","http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/MFG_ND-63012_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_16112_tmb.jpg"],"/tools/screw-and-nut-drivers-bits-blades-and-handles/1245764":["http://media.digikey.com/Photos/Wiha/76802_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1212225_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1212226_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_70127_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg719%20spanner%20bit%20series_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg711%20TiN%20series_tmb.jpg"],"/tools/screw-and-nut-drivers-sets/1246293":["http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0254-12_tmb.jpg","http://media.digikey.com/Photos/Wiha/32094_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg33493_tmb.jpg"],"/tools/sockets-sets/1246286":["http://media.digikey.com/Photos/Wiha/31493_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_60190_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_31491_tmb.jpg"],"/tools/sockets-socket-handles/1246307":["http://media.digikey.com/Photos/Wiha/MFG_31715_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_60266_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_60248_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_29012_tmb.jpg"],"/tools/specialized-tools/1245584":["http://media.digikey.com/Photos/TPI%20Photos/MFG_3C301-NB_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_ASNP24-70_tmb.jpg","http://media.digikey.com/Photos/Greenlee%20Communications/MFG_0155-16A_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_32945_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_61662_tmb.jpg"],"/tools/spiral-wrap-expandable-sleeving/1245956":["http://media.digikey.com/Photos/Techflex/MFG_HKB0_00WH_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_170-03040_tmb.jpg","http://media.digikey.com/Photos/Techflex/INN0.75OR_tmb.jpg","http://media.digikey.com/Photos/Techflex/RBB0_tmb.jpg"],"/tools/staking-tools/1246312":["http://media.digikey.com/Photos/Keystone%20Elect%20Photos/MFG_TL-8_tmb.jpg","http://media.digikey.com/Photos/Keystone%20Elect%20Photos/MFG_1721_tmb.jpg","http://media.digikey.com/photos/Keystone%20Elect%20Photos/3077_tmb.jpg"],"/tools/tweezers/1246029":["http://media.digikey.com/photos/Wiha/mfg47299_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg45807_tmb.jpg","http://media.digikey.com/photos/Wiha/mfg49620_tmb.jpg"],"/tools/vacuums/1245748":["http://media.digikey.com/photos/3M%20Photos/SV-497AJM,2_tmb.jpg","http://media.digikey.com/photos/3M%20Photos/SV-497ABF_tmb.jpg"],"/tools/vises/1246313":["http://media.digikey.com/photos/Panavise%20Photos/301_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/0051502699_tmb.jpg","http://media.digikey.com/photos/Panavise%20Photos/300_tmb.jpg","http://media.digikey.com/photos/Panavise%20Photos/303_tmb.jpg","http://media.digikey.com/photos/Panavise%20Photos/311_tmb.JPG"],"/tools/wire-strippers-and-accessories/1245294":["http://media.digikey.com/photos/Paladin%20Tools%20Photos/MFG_1161_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/MFG_1212704_tmb.jpg","http://media.digikey.com/photos/Paladin%20Tools%20Photos/1106.1_tmb.jpg","http://media.digikey.com/Photos/Weidmuller/9003500000_tmb.jpg","http://media.digikey.com/Photos/OK%20Industries%20-%20Jonard%20Photos/MFG_UST-175_tmb.jpg","http://media.digikey.com/Photos/CnC%20Tech/DL-501B_tmb.jpg"],"/tools/wire-tie-guns-and-accessories/1246317":["http://media.digikey.com/Photos/HellermannTyton%20Photos/MK9_tmb.jpg","http://media.digikey.com/Photos/Essentra%20Components%20Photos/MFG_WIT-2A_tmb.jpg","http://media.digikey.com/Photos/HellermannTyton%20Photos/MFG_MK9SS-114_tmb.jpg"],"/tools/wire-wrap/1245295":["http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/HW-UW-224_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/G200%5ER3278_tmb.jpg","http://media.digikey.com/photos/OK%20Industries%20-%20Jonard%20Photos/UW4_tmb.jpg"],"/tools/wrenches/1246505":["http://media.digikey.com/Photos/Wiha/50051_tmb.jpg","http://media.digikey.com/photos/Cooper%20Industries%20Photos/FRR7_tmb.jpg","http://media.digikey.com/Photos/Wiha/MFG_20093_tmb.jpg"],"/transformers/accessories/786516":["http://media.digikey.com/photos/Triad%20Magnetics%20Photos/SP-310_tmb.jpg","http://media.digikey.com/Photos/CR%20Magnetics%20Photos/PH-31-W_tmb.jpg","http://media.digikey.com/Photos/AlfaMag%20Electronics%20Photos/58011_tmb.jpg"],"/transformers/audio-transformers/786564":["http://media.digikey.com/Photos/Hammond%20Mfg%20Photos/MFG_125GSE_tmb.jpg","http://media.digikey.com/photos/Tamura%20Photos/TTC-294_tmb.jpg","http://media.digikey.com/photos/Triad%20Magnetics%20Photos/SP-4,%20SP-21,%20SP-66,%20SP-67,%20SP-69_tmb.jpg"],"/transformers/current-sense-transformers/786724":["http://media.digikey.com/photos/Talema%20Group%20LLC/ACX-1075_tmb.jpg","http://media.digikey.com/Photos/Coiltronics%20Photos/CTX16-18294-R_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B82801C0145A050_tmb.jpg"],"/transformers/isolated-non-isolated-step-up-down-autotransformer/787168":["http://media.digikey.com/Photos/Triad%20Magnetics%20Photos/N-3MG_tmb.jpg","http://media.digikey.com/Photos/Thomas%20Research%20Products/120%5E268-277-500VA-IC_tmb.jpg","http://media.digikey.com/photos/Tripplite%20Photos/mfgIS250HG_tmb.jpg","http://media.digikey.com/Photos/Signal%20Transformers%20Photos/SU-3_tmb.JPG"],"/transformers/miscellaneous-transformers/787724":["http://media.digikey.com/Photos/Pulse%20Photos/PE-68280NL_tmb.jpg"],"/transformers/power-transformers/786735":["http://media.digikey.com/Photos/Triad%20Magnetics%20Photos/FSxx-xxx-C2-B_tmb.jpg","http://media.digikey.com/photos/Amveco%20Magnetics%20Photos/70060,%2070061,%2070062,%2070063,%2070064,%2070065_tmb.jpg","http://media.digikey.com/Photos/Talema%20Group%20LLC/6205X_tmb.jpg","http://media.digikey.com/photos/Amveco%20Magnetics%20Photos/62030,%2062031,%2062032,%2062033,%2062034,%2062035_tmb.jpg","http://media.digikey.com/Photos/Triad%20Magnetics%20Photos/FD7-24_tmb.JPG"],"/transformers/pulse-transformers/786982":["http://media.digikey.com/Photos/Pulse%20Photos/PE-68386NL_tmb.jpg","http://media.digikey.com/Photos/Murata%20Photos/7860%5E3JC_tmb.jpg","http://media.digikey.com/Photos/Pulse%20Photos/520-14-SERIES_tmb.jpg"],"/transformers/specialty-transformers/786946":["http://media.digikey.com/Photos/TDK%20Photos/ATB322524-0110_tmb.JPG","http://media.digikey.com/Photos/Bourns%20Photos/SM-LP-5001_tmb.jpg","http://media.digikey.com/Photos/Pulse%20Photos/P0584NL_tmb.jpg"],"/transformers/switching-converter-smps-transformers/787670":["http://media.digikey.com/Photos/TDK%20Photos/ECO2219SEO-D03V017_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/750341142_tmb.JPG","http://media.digikey.com/Photos/Wurth%20Electronics%20Photos/760390014_tmb.jpg"],"/circuit-protection/accessories/655444":["http://media.digikey.com/photos/Tyco%20Potter%20Brumfield%20Photos/33-012A,33-012C_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/03480001Z_tmb.jpg","http://media.digikey.com/photos/Wickmann%20Photos/57500000001_tmb.JPG"],"/circuit-protection/circuit-breakers/655427":["http://media.digikey.com/Photos/Schurter%20Photos/TA45-A326LxxxC0_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/0700030_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/C20A2P_tmb.jpg","http://media.digikey.com/Photos/Schurter%20Photos/T9-711C-8_tmb.JPG","http://media.digikey.com/Photos/E-T-A%20Photos/1140-G111-P1M1-10A_tmb.jpg"],"/circuit-protection/disconnect-switch-components/656544":["http://media.digikey.com/photos/American%20Elect%20Photos/19401-11_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/19414,%2019419,%2019421_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/19218-11,%2019217-11,%2019216-11,%2019215-11_tmb.jpg"],"/circuit-protection/electrical-specialty-fuses/656626":["http://media.digikey.com/photos/Littelfuse%20Photos/0461%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Cooper%20Bussmann%20Photos/TCF25_tmb.jpg","http://media.digikey.com/photos/Littelfuse%20Photos/BLN-SERIES_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/0214005.LXN_tmb.jpg","http://media.digikey.com/Photos/Cooper%20Bussmann%20Photos/TPC-75_tmb.JPG","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/BK%5EGMT-10A_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/PICO%20259%20SERIES_tmb.jpg"],"/circuit-protection/fuseholders/655422":["http://media.digikey.com/photos/Littelfuse%20Photos/01020074H_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/03500417Z_tmb.jpg","http://media.digikey.com/photos/Wickmann%20Photos/5640000100_tmb.jpg","http://media.digikey.com/photos/American%20Elect%20Photos/2541000_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/LSCR002_tmb.jpg","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/4164_tmb.JPG"],"/circuit-protection/fuses/655421":["http://media.digikey.com/photos/Littelfuse%20Photos/0458%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/0287004%20PINK_tmb.jpg","http://media.digikey.com/Renders/Littelfuse%20Renders/468%20Series_tmb.jpg","http://media.digikey.com/photos/Littelfuse%20Photos/451,%20452%20SERIES_tmb.jpg","http://media.digikey.com/photos/Littelfuse%20Photos/044607.5.ZR_tmb.jpg","http://media.digikey.com/photos/Littelfuse%20Photos/PICO%20II%20R251%20SERIES_tmb.jpg"],"/circuit-protection/gas-discharge-tube-arresters-gdt/655426":["http://media.digikey.com/photos/Epcos%20Photos/T83-A90X_tmb.jpg","http://media.digikey.com/photos/TE%20Connectivity/GTCS23_tmb.jpg","http://media.digikey.com/photos/Bourns%20Photos/2035-15-BLF_tmb.JPG","http://media.digikey.com/photos/Epcos%20Photos/T61-C350X_tmb.jpg"],"/circuit-protection/ground-fault-circuit-interrupter-gfci/656174":["http://media.digikey.com/photos/Sensata%20Tech%20Photos/PGFI-A040KYTT2_tmb.JPG","http://media.digikey.com/photos/Sensata%20Tech%20Photos/PGFP-M110KYTT25_tmb.JPG","http://media.digikey.com/photos/Sensata%20Tech%20Photos/PGFI-M04_tmb.JPG","http://media.digikey.com/photos/Phoenix%20Photos/5602192_tmb.jpg","http://media.digikey.com/photos/Sensata%20Tech%20Photos/PGFS-23005_tmb.JPG"],"/circuit-protection/inrush-current-limiters-icl/656273":["http://media.digikey.com/photos/Murata%20Photos/NTPA%209MM%20SERIES_tmb.JPG","http://media.digikey.com/photos/Epcos%20Photos/B57464S100M_tmb.JPG","http://media.digikey.com/Photos/US%20Sensor%20Photos/ST40002B_tmb.JPG"],"/circuit-protection/lighting-protection/656599":["http://media.digikey.com/Photos/Thomas%20Research%20Products/BSP3-480-20KA_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/LSP05xxxPM_tmb.jpg","http://media.digikey.com/photos/On%20Semi%20Photos/POWERMITE_tmb.jpg"],"/circuit-protection/ptc-resettable-fuses/656272":["http://media.digikey.com/Renders/Bel%20Fuse%20Renders/0ZCK-Series-1206_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/30R900UH_tmb.jpg","http://media.digikey.com/photos/Tyco%20Raychem%20Photos/RXEF110_tmb.jpg","http://media.digikey.com/photos/Tyco%20Raychem%20Photos/SRP200F,350F,SRP420F%20SERIES_tmb.jpg"],"/circuit-protection/surge-suppression-ics/656487":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/TI%2012-DSBGA%20YZG_tmb.jpg","http://media.digikey.com/Renders/Bourns%20Renders/TCS-DL004-250_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/TBU-PL050-100-WH_tmb.jpg"],"/circuit-protection/thermal-cutoffs-cutouts-tco/655696":["http://media.digikey.com/photos/Cantherm%20Photos/SDJ1%20DF084S_tmb.jpg","http://media.digikey.com/photos/Panasonic%20Photos/EYP-2MT102A_tmb.JPG","http://media.digikey.com/Photos/TE%20Connectivity/RTP200R060SA-2_tmb.jpg","http://media.digikey.com/Photos/TDK%20Photos/DFP10112_tmb.jpg"],"/circuit-protection/tvs-diodes/655429":["http://media.digikey.com/Renders/Littelfuse%20Renders/PGB2%200201%20Series_tmb.jpg","http://media.digikey.com/Renders/Semtech%20Renders/SLP2510P8_tmb.jpg","http://media.digikey.com/Renders/TE%20Connectivity/SESD0402S_tmb.jpg","http://media.digikey.com/Renders/Littelfuse%20Renders/18;DO204AC(DO-15);;2_tmb.jpg","http://media.digikey.com/Renders/TE%20Connectivity/PESD0402-140_tmb.jpg","http://media.digikey.com/Renders/Littelfuse%20Renders/0402%201005%20Metric_tmb.jpg"],"/circuit-protection/tvs-mixed-technology/656225":["http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/FR011L5J_tmb.jpg","http://media.digikey.com/photos/Cooper%20Bussmann%20Photos/0603ESDA-MLP7_tmb.JPG","http://media.digikey.com/Photos/IXYS%20Photos/IXBOD1-15R_tmb.jpg","http://media.digikey.com/Photos/TE%20Connectivity/RF3080-000_tmb.jpg","http://media.digikey.com/Photos/Bourns%20Photos/2410-33-G-MSP-S_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2800106_tmb.jpg","http://media.digikey.com/photos/Tyco%20Photos/ZEN132V130A24LS_tmb.JPG"],"/circuit-protection/tvs-thyristors/655745":["http://media.digikey.com/Renders/Littelfuse%20Renders/SC-74,%20SOT-457_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/497-TRANSIL%20DO-15%20SERIES_tmb.jpg","http://media.digikey.com/Renders/STMicro%20Renders/DO-214AC%20SMA_tmb.jpg"],"/circuit-protection/tvs-varistors-movs/655423":["http://media.digikey.com/Renders/Littelfuse%20Renders/MHS%200603_tmb.jpg","http://media.digikey.com/Photos/Epcos%20Photos/B72724D_tmb.JPG","http://media.digikey.com/photos/Littelfuse%20Photos/LA-ZA_Series-14mm_tmb.JPG","http://media.digikey.com/photos/Epcos%20Photos/HIGH%20E%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/DB%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Littelfuse%20Photos/V301HB34_tmb.jpg","http://media.digikey.com/photos/Epcos%20Photos/CU4032%20SERIES_tmb.jpg"],"/discrete-semiconductor-products/accessories/1376340":["http://media.digikey.com/Photos/IXYS%20Photos/ZY180R350_tmb.jpg","http://media.digikey.com/Photos/EPC/MFG_BOOK%20GAN%20FET_tmb.jpg","http://media.digikey.com/Photos/Powerex%20Inc%20Photos/HARDWARE-KIT-%2387_tmb.jpg"],"/discrete-semiconductor-products/bridge-rectifiers/1377580":["http://media.digikey.com/photos/Comchip%20Tech%20Photos/GBPC5008-G_tmb.JPG","http://media.digikey.com/Photos/Micro%20Commercial%20Photos/2KBP04-BP_tmb.JPG","http://media.digikey.com/photos/Diodes%20Photos/31-DF-S_tmb.jpg","http://media.digikey.com/Photos/GeneSiC%20Semiconductor/W01M_tmb.JPG"],"/discrete-semiconductor-products/bridge-rectifiers-modules/1377015":["http://media.digikey.com/Photos/IXYS%20Photos/VUO190-18NO7_tmb.jpg","http://media.digikey.com/Photos/IXYS%20Photos/VUO25-12NO8_tmb.jpg","http://media.digikey.com/Photos/Microsemi%20Photos/APTDF200H60G_tmb.jpg","http://media.digikey.com/Photos/Phoenix%20Photos/2949813_tmb.jpg","http://media.digikey.com/Photos/IXYS%20Photos/VUM33-05N_tmb.jpg"],"/discrete-semiconductor-products/diacs-sidacs/1376320":["http://media.digikey.com/photos/Panasonic%20Photos/MA2B00100F_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92%20PKG_tmb.jpg","http://media.digikey.com/Renders/STMicro%20Renders/DO-213AA_tmb.jpg"],"/discrete-semiconductor-products/diodes-zener-arrays/1377319":["http://media.digikey.com/Renders/Panasonic%20Renders/DZ5S062D0R_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/VMD3_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SOT-363%20PKG_tmb.jpg"],"/discrete-semiconductor-products/diodes-zener-single/1377034":["http://media.digikey.com/photos/Micro%20Commercial%20Photos/bzv55c6v8-tp_tmb.JPG","http://media.digikey.com/Renders/Micro%20Commercial%20Renders/SAC136-TP_tmb.jpg","http://media.digikey.com/Renders/Bourns%20Renders/CD0603%20(1608%20Metric)_tmb.jpg"],"/discrete-semiconductor-products/diodes-rectifiers-arrays/1377014":["http://media.digikey.com/Photos/STMicro%20Photos/STGWF30NC60S_tmb.jpg","http://media.digikey.com/Renders/NXP%20Semi%20Renders/3-HUSON_tmb.jpg","http://media.digikey.com/Renders/Panasonic%20Renders/SSMINI5-F2_tmb.jpg","http://media.digikey.com/Photos/IXYS%20Photos/DHH55-36N1F_tmb.JPG"],"/discrete-semiconductor-products/diodes-rectifiers-modules/1377478":["http://media.digikey.com/photos/IXYS%20Photos/DSEI2X101-06A_tmb.JPG","http://media.digikey.com/Photos/IXYS%20Photos/UGE3126AY4_tmb.jpg","http://media.digikey.com/Photos/GeneSiC%20Semiconductor/MBRH12040R_tmb.jpg","http://media.digikey.com/Photos/GeneSiC%20Semiconductor/FST16035_tmb.jpg","http://media.digikey.com/photos/Phoenix%20Photos/mfg_2949389_tmb.jpg","http://media.digikey.com/Photos/Powerex%20Inc%20Photos/DO-200AB,%20B-PUK_tmb.JPG"],"/discrete-semiconductor-products/diodes-rectifiers-single/1376383":["http://media.digikey.com/photos/Comchip%20Tech%20Photos/6A4-G_tmb.JPG","http://media.digikey.com/Renders/Panasonic%20Renders/DB2J31000L_tmb.jpg","http://media.digikey.com/Renders/Cree%20Renders/10-PowerTQFN_tmb.jpg","http://media.digikey.com/Renders/Bourns%20Renders/CD0603%20(1608%20Metric)_tmb.jpg","http://media.digikey.com/Renders/Comchip%20Renders/CDBQR70_tmb.jpg"],"/discrete-semiconductor-products/fets-arrays/1377094":["http://media.digikey.com/Renders/Toshiba%20Renders/FETs%20-%20Arrays_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/KVU-5-SOT%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Alpha%20&%20Omega%20Semiconductor%20Renders/8-SMD,%20Flat%20Lead%20Exposed%20Pad_tmb.jpg"],"/discrete-semiconductor-products/fets-modules/1377480":["http://media.digikey.com/Photos/IXYS%20Photos/IXFN40N90P_tmb.jpg","http://media.digikey.com/Photos/Microsemi%20Photos/APTC60AM242G_tmb.JPG","http://media.digikey.com/Photos/Microsemi%20Photos/APTM20DUM04G_tmb.jpg","http://media.digikey.com/Photos/Microsemi%20Photos/APTM50HM65FT3G_tmb.jpg"],"/discrete-semiconductor-products/fets-single/1376381":["http://media.digikey.com/Photos/International%20Rectifier%20Photos/IRFH3707TR2PBF_tmb.jpg","http://media.digikey.com/Renders/EPC%20Renders/EPC1012_tmb.jpg","http://media.digikey.com/Photos/Toshiba%20Photos/TO-220-3_tmb.jpg","http://media.digikey.com/Photos/International%20Rectifier%20Photos/IRF6614TR1PBF_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92-3(StandardBody),TO-226_straightlead_tmb.jpg","http://media.digikey.com/Renders/NXP%20Semi%20Renders/SC-101_SOT-883_tmb.jpg"],"/discrete-semiconductor-products/igbts-arrays/1377264":["http://media.digikey.com/Photos/IXYS%20Photos/i4-Pac-5_tmb.jpg"],"/discrete-semiconductor-products/igbts-modules/1377479":["http://media.digikey.com/photos/IXYS%20Photos/IXDN75N120_tmb.jpg","http://media.digikey.com/photos/Microsemi%20Photos/APTGFQ25H120T2G_tmb.jpg","http://media.digikey.com/photos/Microsemi%20Photos/APTGF300A120D3G_tmb.jpg","http://media.digikey.com/Photos/Microsemi%20Photos/APTGT100A60T1G_tmb.jpg"],"/discrete-semiconductor-products/igbts-single/1376382":["http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/TO-252-3_tmb.jpg","http://media.digikey.com/Photos/IXYS%20Photos/i4-Pac%E2%84%A2-5,%203%20leads_tmb.jpg","http://media.digikey.com/Renders/STMicro%20Renders/DPak_tmb.jpg"],"/discrete-semiconductor-products/jfets-junction-field-effect/1377093":["http://media.digikey.com/Photos/Microsemi%20Photos/JANTX2NxxxxUB_tmb.jpg","http://media.digikey.com/photos/Vishay%20Siliconix%20Photos/2N4118A-2_tmb.jpg","http://media.digikey.com/Renders/Toshiba%20Renders/SC-70,%20SOT-323%20PKG_tmb.jpg"],"/discrete-semiconductor-products/power-drivers-modules/1377477":["http://media.digikey.com/Renders/STMicro%20Renders/25-DIP%20Module_tmb.jpg","http://media.digikey.com/photos/International%20Rectifier%20Photos/IRAM109-015SD_tmb.JPG","http://media.digikey.com/Photos/Microsemi%20Photos/APTLGT400A608G_tmb.jpg","http://media.digikey.com/photos/Fairchild%20Semi%20Photos/FSB70625_tmb.jpg","http://media.digikey.com/Photos/Vishay%20Semiconductors/VS-UFL80FA60_tmb.jpg"],"/discrete-semiconductor-products/programmable-unijunction-transistors-puts/1377119":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92-3(StandardBody),TO-226_straightlead_tmb.jpg"],"/discrete-semiconductor-products/rf-diodes/1377002":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/SOD-882_tmb.jpg","http://media.digikey.com/Renders/MACom%20Technology%20Solutions/MA4AGBLP912_tmb.jpg","http://media.digikey.com/Renders/Skyworks%20Solutions%20Renders/2-USFN%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/DB4_tmb.JPG","http://media.digikey.com/Photos/Avago%20Tech%20Photos/5082-0012_tmb.jpg","http://media.digikey.com/Renders/MACom%20Technology%20Solutions/MA4SPS402_tmb.jpg"],"/discrete-semiconductor-products/rf-fets/1377003":["http://media.digikey.com/photos/Microsemi%20Photos/VRF2933_tmb.JPG","http://media.digikey.com/photos/Microsemi%20Photos/VRF151G_tmb.JPG","http://media.digikey.com/Photos/Microsemi%20Photos/ARF1501_tmb.jpg","http://media.digikey.com/photos/Freescale%20Photos/375-TO-272-WB-16_tmb.jpg","http://media.digikey.com/Photos/Central%20Semiconductor%20Corp/TO-206AA%20TO-18-3_tmb.jpg","http://media.digikey.com/Renders/Avago%20Tech%20Renders/8-LPCC_tmb.jpg","http://media.digikey.com/Photos/Cree%20Photos/MFG_CGHV27100F_tmb.jpg"],"/discrete-semiconductor-products/rf-transistors-bjt/1376962":["http://media.digikey.com/Photos/STMicro%20Photos/497-M174%20SERIES_tmb.JPG","http://media.digikey.com/Renders/Infineon%20Renders/TSLP-3-1_tmb.jpg","http://media.digikey.com/Photos/Central%20Semiconductor%20Corp/TO-226-3%20TO-92-3_tmb.jpg"],"/discrete-semiconductor-products/scrs-modules/1377481":["http://media.digikey.com/Photos/IXYS%20Photos/MCC312-16IO1_tmb.jpg","http://media.digikey.com/Photos/Crydom%20Photos/B551SE-2T_tmb.jpg","http://media.digikey.com/photos/Powerex%20Inc%20Photos/t620163004dn_tmb.JPG","http://media.digikey.com/Photos/IXYS%20Photos/MMO110-14IO7_tmb.JPG"],"/discrete-semiconductor-products/scrs-single/1376387":["http://media.digikey.com/Photos/Microsemi%20Photos/TO-5_tmb.JPG","http://media.digikey.com/photos/Vishay%20Photos/VS-50RIA60_tmb.JPG","http://media.digikey.com/photos/Powerex%20Inc%20Photos/C712L_tmb.JPG","http://media.digikey.com/Photos/IXYS%20Photos/MMIX1H60N150V1_tmb.JPG","http://media.digikey.com/Photos/Alpha%20&%20Omega%20Semiconductor/AOT3N50_tmb.jpg"],"/discrete-semiconductor-products/transistors-bjt-arrays/1376378":["http://media.digikey.com/photos/Analog%20Devices%20Photos/505-TO-78_tmb.jpg","http://media.digikey.com/Renders/Diodes%20Renders/DFN1310H4-6_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14SOIC_tmb.jpg"],"/discrete-semiconductor-products/transistors-bjt-arrays-pre-biased/1377267":["http://media.digikey.com/Renders/Panasonic%20Renders/SSSMINI6-F1_tmb.jpg","http://media.digikey.com/Renders/Panasonic%20Renders/SSMINI5-F2_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/SC-75-3_EMT3_tmb.jpg"],"/discrete-semiconductor-products/transistors-bjt-single/1376376":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92-3(StandardBody),TO-226_straightlead_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/SC-62_MPT3_tmb.jpg","http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/TO-220-3_tmb.jpg","http://media.digikey.com/Renders/NXP%20Semi%20Renders/SC-101_SOT-883_tmb.jpg","http://media.digikey.com/Photos/Sanken%20Photos/3-ESIP_tmb.jpg"],"/discrete-semiconductor-products/transistors-bjt-single-pre-biased/1377266":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92-3(StandardBody),TO-226_straightlead_tmb.jpg","http://media.digikey.com/Renders/Diodes%20Renders/3-UFDFN_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/VMT3%20Pkg_tmb.jpg"],"/discrete-semiconductor-products/transistors-modules/1377482":["http://media.digikey.com/Photos/STMicro%20Photos/ISOTOP_tmb.jpg"],"/discrete-semiconductor-products/transistors-special-purpose/1377303":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/SOT1118_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/STC04IE170HP_tmb.JPG","http://media.digikey.com/Photos/Sanken%20Photos/1261;12SIP_SLA;;12_tmb.jpg"],"/discrete-semiconductor-products/triacs/1377581":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/DPak_tmb.jpg","http://media.digikey.com/Photos/STMicro%20Photos/TO-220AB_smooth%20sides_tmb.jpg","http://media.digikey.com/Renders/Littelfuse%20Renders/DO-214AA,%20SMB%20(3%20Lead),%20Compak_tmb.jpg","http://media.digikey.com/Photos/NXP%20Semi%20Photos/ACTT6G-800E,127_tmb.JPG","http://media.digikey.com/photos/Teccor%20Photos/TO-218X,ISOLATED_tmb.jpg"],"/discrete-semiconductor-products/triacs-modules/1376385":["http://media.digikey.com/photos/Teccor%20Photos/TO-3,FASTPAK,ISOLATED_tmb.jpg","http://media.digikey.com/Renders/Littelfuse%20Renders/TO-220%20Isolated%20Tab_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/RD91_tmb.jpg"],"/discrete-semiconductor-products/variable-capacitance-diodes-varicaps-varactors/1376787":["http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MA46H070-1056_tmb.jpg","http://media.digikey.com/Renders/Skyworks%20Solutions%20Renders/SMV1247-040LF_tmb.jpg","http://media.digikey.com/Renders/Toshiba%20Renders/1SS381TL3FT_tmb.jpg","http://media.digikey.com/Photos/MACom%20Technology%20Solutions/MA46H120_tmb.JPG"],"/integrated-circuits-ics/clock-timing-application-specific/2556714":["http://media.digikey.com/Photos/Connor-Winfield%20Photos/FTS375-010.0M_tmb.jpg","http://media.digikey.com/photos/IDT,%20Integrated%20Device%20Technology/IDTCSPUA877ABVG_tmb.JPG","http://media.digikey.com/Photos/IDT,%20Integrated%20Device%20Technology/ICS98ULPA877AKILF_tmb.jpg"],"/integrated-circuits-ics/clock-timing-clock-buffers-drivers/2556715":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/20-DSBGA-YFF_tmb.jpg","http://media.digikey.com/photos/Micrel%20Photos/576-8-MLF_tmb.jpg","http://media.digikey.com/photos/Pericom%20Photos/PI49FCT32805QE_tmb.JPG"],"/integrated-circuits-ics/clock-timing-clock-generators-plls-frequency-synthesizers/2556421":["http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/MFG_ABFT-20_tmb.jpg","http://media.digikey.com/Photos/IDT,%20Integrated%20Device%20Technology/ICS83PN156DKILF_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/10-TFSOP,%2010-MSOP_tmb.jpg"],"/integrated-circuits-ics/clock-timing-delay-lines/2556128":["http://media.digikey.com/Renders/Linear%20Tech%20Renders/6-DFN_05-08-1715_tmb.jpg","http://media.digikey.com/Renders/Micrel%20Renders/24-QFN%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/16-DIP_tmb.jpg"],"/integrated-circuits-ics/clock-timing-ic-batteries/2556713":["http://media.digikey.com/Photos/STMicro%20Photos/M4T28-BR12SH1_tmb.JPG","http://media.digikey.com/Photos/STMicro%20Photos/M4T32-BR12SH1_tmb.JPG","http://media.digikey.com/Photos/STMicro%20Photos/M4T32-BR12SH6_tmb.JPG"],"/integrated-circuits-ics/clock-timing-programmable-timers-and-oscillators/2556130":["http://media.digikey.com/Renders/Maxim%20Renders/10-LCCC%20Pkg%2021-0389_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/8-MSOP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/IDT,%20Integrated%20Device%20Technology%20Renders/10-CLCC_tmb.jpg","http://media.digikey.com/Renders/Panasonic%20Renders/SMINI-5DB_tmb.jpg"],"/integrated-circuits-ics/clock-timing-real-time-clocks/2556170":["http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/MFG_AB-RTCMK-32.768KHZ-T3_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/8-WFDFN%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/Photos/AVX%20Photos/KR3225Y32768EAW30TAA_tmb.jpg","http://media.digikey.com/Photos/Abracon%20Corporation%20Photos/MFG_AB-RTCMC-32.768KHZ-AIGZ-S7-T_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-adcs-dacs-special-purpose/2556768":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/16-WLCSP_tmb.jpg","http://media.digikey.com/Renders/Avago%20Tech%20Renders/SO-8_tmb.jpg","http://media.digikey.com/Photos/Texas%20Instr%20Photos/16-WFDFN%20Exposed%20Pad_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-analog-front-end-afe/2556395":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/296;%20SLM376A;%20NZJ;%20376_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/10-TFSOP,%2010-MSOP_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/Pkg%20SQA24B_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-analog-to-digital-converters-adc/2556291":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DFN%283x2%29DDB-Pkg_tmb.jpg","http://media.digikey.com/photos/Texas%20Instr%20Photos/SM470R1B1MHFQS_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/16-SOIC_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-16-CDIP%20HEAT%20PAD_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-digital-potentiometers/2556350":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/16-WFQFN%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/16-CSBGA%2021-0355_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/16-DIP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/RSE-8-UQFN%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/16-CSBGA%2021-0355_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-digital-to-analog-converters-dac/2556292":["http://media.digikey.com/photos/Analog%20Devices%20Photos/505-16-CDIP_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/8-DFN_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/16-WLCSP_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-8-2_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/48-LFCSP-VQ%20(7x7)_tmb.jpg"],"/integrated-circuits-ics/data-acquisition-touch-screen-controllers/2557134":["http://media.digikey.com/Photos/Microchip%20Tech%20Photos/AR1100BRD_tmb.jpg","http://media.digikey.com/Renders/STMicro%20Renders/12CSP_tmb.jpg","http://media.digikey.com/Photos/Semtech%20Photos/20-WFQFN%20Exposed%20Pad_tmb.jpg"],"/integrated-circuits-ics/embedded-cplds-complex-programmable-logic-devices/2556261":["http://media.digikey.com/Photos/Xilinx%20Photos/XC2C32A-6CPG56C_tmb.JPG","http://media.digikey.com/Renders/Lattice%20Semi%20Corp%20Renders/220;%2025WLCSP-.62-2.5x2.5;%20;%2025_tmb.jpg","http://media.digikey.com/Renders/Cypress%20Semi%20Renders/44-TQFP_tmb.jpg"],"/integrated-circuits-ics/embedded-dsp-digital-signal-processors/2556273":["http://media.digikey.com/Photos/Texas%20Instr%20Photos/DM3725CBP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/144-BGA-Microstar_4073221A_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/QS-308_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/349-LFBGA,%20CSPBGA_tmb.jpg"],"/integrated-circuits-ics/embedded-fpgas-field-programmable-gate-array/2556262":["http://media.digikey.com/Photos/Lattice%20Semi%20Photos/MFG_iCE40%20Blue_tmb.jpg","http://media.digikey.com/photos/Altera%20Photos/544-84-PLCC_tmb.jpg","http://media.digikey.com/Photos/Microsemi%20Photos/A54SX32A-BGG329_tmb.JPG","http://media.digikey.com/Renders/Altera%20Renders/DS-672BGA05-2_0_tmb.jpg","http://media.digikey.com/Photos/Lattice%20Semi%20Photos/LFE3-17EA-6LMG328C_tmb.jpg"],"/integrated-circuits-ics/embedded-fpgas-field-programmable-gate-array-with-microcontrollers/2556750":["http://media.digikey.com/photos/Altera%20Photos/544-1020-FBGA_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/144-LQFP_tmb.jpg","http://media.digikey.com/Renders/Atmel%20Renders/313;100TQFP-1.2-14x14;;100_tmb.jpg"],"/integrated-circuits-ics/embedded-microcontroller-or-microprocessor-modules/2556371":["http://media.digikey.com/Photos/Critical%20Link%20Photos/MFG_L138-FG-225-RC_tmb.jpg","http://media.digikey.com/photos/Rabbit%20Semi%20Photos/101-0674_tmb.jpg","http://media.digikey.com/photos/Parallax%20Photos/BS2PE-IC_tmb.JPG","http://media.digikey.com/photos/Rabbit%20Semi%20Photos/20-101-0494_tmb.JPG","http://media.digikey.com/photos/Digi%20Int%27l%20Photos/DC-ME-01T-C,DC-ME-01T-S,DC-ME4-01T-C_tmb.jpg"],"/integrated-circuits-ics/embedded-microcontrollers/2556109":["http://media.digikey.com/Photos/Microchip%20Tech%20Photos/36-VFTLA%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/14-SOIC_tmb.jpg","http://media.digikey.com/Photos/NXP%20Semi%20Photos/LPC1102UK,118_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-VQFN-RSA_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SOT-23-6%20PKG_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/150;%20C04-005;%20P,%20PD;%2014_tmb.jpg"],"/integrated-circuits-ics/embedded-microcontrollers-application-specific/2556771":["http://media.digikey.com/Photos/CSR%20PLC%20Photos/GSD4E-9333-TR_tmb.JPG","http://media.digikey.com/Renders/STMicro%20Renders/472-TFBGA%20(16x16)_tmb.jpg","http://media.digikey.com/photos/Cypress%20Semi%20Photos/428-24-QSOP_tmb.JPG"],"/integrated-circuits-ics/embedded-microprocessors/2556260":["http://media.digikey.com/photos/Freescale%20Photos/mc7447ahx1000nb_tmb.JPG","http://media.digikey.com/Photos/Freescale%20Photos/i.MX%206SL%20SERIES_tmb.JPG","http://media.digikey.com/Photos/Texas%20Instr%20Photos/684-BFBGA,%20FCBGA_tmb%20(2).jpg"],"/integrated-circuits-ics/embedded-plds-programmable-logic-device/2556353":["http://media.digikey.com/Renders/Atmel%20Renders/313;20J;J;20_tmb.jpg","http://media.digikey.com/photos/Atmel%20Photos/313-20-TSSOP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/JT-24-GDIP%204040110%20Pkg_tmb.jpg"],"/integrated-circuits-ics/embedded-system-on-chip-soc/2557169":["http://media.digikey.com/Photos/Xilinx%20Photos/XC7Z030-1FBG484C_tmb.jpg","http://media.digikey.com/Photos/Xilinx%20Photos/XC7Z010-1CLG225C_tmb.JPG","http://media.digikey.com/Photos/Xilinx%20Photos/XC7Z020-1CLG484I_tmb.jpg"],"/integrated-circuits-ics/interface-analog-switches-multiplexers-demultiplexers/2556671":["http://media.digikey.com/renders/Analog%20Devices%20Renders/6-BGA_6-WLCSP_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-12-1_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/interface-codecs/2556343":["http://media.digikey.com/Renders/National%20Semi%20Renders/V28A_tmb.jpg","http://media.digikey.com/Photos/Cirrus%20Logic%20Photos/CS42L73-CRZR_tmb.jpg","http://media.digikey.com/Photos/AKM%20Semiconductor/AK4556VTP-E2_tmb.jpg"],"/integrated-circuits-ics/interface-controllers/2556697":["http://media.digikey.com/Photos/NXP%20Semi%20Photos/74LVC16374ABQ,518_tmb.jpg","http://media.digikey.com/Photos/Renesas%20Tech%20Photos/UPD720101F1-EA8-A_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/10-UFQFN_tmb.jpg"],"/integrated-circuits-ics/interface-direct-digital-synthesis-dds/2556393":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/LFCSP%20PKG_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/88-QFN_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/SV-100-4_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/32LFCSP_tmb.jpg"],"/integrated-circuits-ics/interface-drivers-receivers-transceivers/2556324":["http://media.digikey.com/photos/Murata%20Photos/NM232DDC_tmb.JPG","http://media.digikey.com/Renders/Micrel%20Renders/24-QFN%20Exposed%20Pad_tmb.jpg","http://media.digikey.com/Renders/Atmel%20Renders/8-SOIC_tmb.jpg"],"/integrated-circuits-ics/interface-encoders-decoders-converters/2556323":["http://media.digikey.com/Renders/AKM%20Semiconductor%20Renders/974;32QFN-.9-5x5;QF;32_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/V28A_tmb.jpg"],"/integrated-circuits-ics/interface-filters-active/2556488":["http://media.digikey.com/renders/Linear%20Tech%20Renders/22-DFN_05-08-1714_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-SSOP_SOT266-1_tmb.jpg"],"/integrated-circuits-ics/interface-i-o-expanders/2556690":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/8-XQFN_tmb.jpg","http://media.digikey.com/Photos/Exar%20Corporations/XRA1201IL24-F_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/14-SOIC_tmb.jpg"],"/integrated-circuits-ics/interface-modems-ics-and-modules/2556379":["http://media.digikey.com/photos/Multi-Tech%20Photos/MFG_MT5656RJ%20SERIES_tmb.jpg","http://media.digikey.com/Photos/Multi-Tech%20Photos/MT9234SMI-HV-92.R1_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/24-LFCSP_tmb.jpg"],"/integrated-circuits-ics/interface-modules/2557199":["http://media.digikey.com/Photos/WIZnet/MFG_WIZ810MJ_tmb.jpg","http://media.digikey.com/Photos/WIZnet/MFG_WIZ107SR_tmb.jpg","http://media.digikey.com/Photos/WIZnet/MFG_WIZ830MJ_tmb.jpg"],"/integrated-circuits-ics/interface-sensor-and-detector-interfaces/2556696":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/DH-24A_tmb.jpg","http://media.digikey.com/Photos/Avago%20Tech%20Photos/APDS-9702-020_tmb.jpg","http://media.digikey.com/Photos/Analog%20Devices%20Photos/1B31AN_tmb.jpg"],"/integrated-circuits-ics/interface-serializers-deserializers/2556699":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/56-BGA-Microstar-Jr-ZQL_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/PWP-28-TSSOP%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Atmel%20Renders/49C2-VFBGA_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/V28A_tmb.jpg"],"/integrated-circuits-ics/interface-signal-buffers-repeaters-splitters/2556700":["http://media.digikey.com/Photos/Pericom%20Photos/PI2EQX4402DNBE_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/12-XFQFN_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/Linear%20Tech%2012-MSOP_tmb.jpg"],"/integrated-circuits-ics/interface-signal-terminators/2556067":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/80-LQFP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/On%20Semi%20Renders/TSOP-5_483_tmb.jpg"],"/integrated-circuits-ics/interface-specialized/2556698":["http://media.digikey.com/Photos/Pericom%20Photos/PI7C9X7958ANBE_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-92-3(StandardBody),TO-226_straightlead_tmb.jpg","http://media.digikey.com/renders/Maxim%20Renders/12-TQFN_21-0136I_tmb.jpg"],"/integrated-circuits-ics/interface-telecom/2556300":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/MFG_HMC7282B_tmb.JPG","http://media.digikey.com/Photos/Exar%20Corporations/XRT86VX38IB329-F_tmb.jpg","http://media.digikey.com/Renders/Cypress%20Semi%20Renders/44-TQFP_tmb.jpg"],"/integrated-circuits-ics/interface-uarts-universal-asynchronous-receiver-transmitter/2556341":["http://media.digikey.com/Photos/Exar%20Corporations/ST16C-48-TQFP_tmb.jpg","http://media.digikey.com/Photos/Exar%20Corporations/XR16M570IL24-F_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/44-PLCC,V44A_tmb.jpg"],"/integrated-circuits-ics/interface-voice-record-and-playback/2556441":["http://media.digikey.com/Photos/Nuvoton%20Technology/ISD15D00YYI_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Nuvoton%20Technology%20Renders/16-TSSOP_tmb.jpg"],"/integrated-circuits-ics/linear-amplifiers-audio/2556583":["http://media.digikey.com/photos/National%20Semi%20Photos/TO-263-9%20(9%20leads+tab)_tmb.JPG","http://media.digikey.com/Renders/Allegro%20Microsystems%20Renders/8-DFN_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/YFF-9-BGA%20Pkg_tmb.jpg"],"/integrated-circuits-ics/linear-amplifiers-instrumentation-op-amps-buffer-amps/2556125":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/CB-8-2_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/14-SOIC_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/6-DFN_05-08-1715_tmb.jpg"],"/integrated-circuits-ics/linear-amplifiers-special-purpose/2556819":["http://media.digikey.com/photos/MACom%20Technology%20Solutions/M02045G-2Y06-T_tmb.jpg","http://media.digikey.com/Photos/Linear%20Tech%20Photos/LTC6409CUDB%23TRMPBF_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-TSSOP_8-MSOP_tmb.jpg"],"/integrated-circuits-ics/linear-amplifiers-video-amps-and-modules/2556526":["http://media.digikey.com/photos/Cirrus%20Logic%20Photos/PA119CEA_tmb.JPG","http://media.digikey.com/Renders/Texas%20Instr%20Renders/YZF-9-BGA%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/8SOIC_tmb.jpg"],"/integrated-circuits-ics/linear-analog-multipliers-dividers/2556859":["http://media.digikey.com/photos/Analog%20Devices%20Photos/AD538ADZ_tmb.JPG","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-TO-100_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-SOIC_(7.5mmwidth)_tmb.jpg"],"/integrated-circuits-ics/linear-audio-processing/2556582":["http://media.digikey.com/Photos/Diodes%20Photos/ZXCD1210JB16TA_tmb.jpg","http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/12-UFBGA,%20WLCSP_tmb.jpg","http://media.digikey.com/renders/Rohm%20Renders/ZIP18_tmb.jpg"],"/integrated-circuits-ics/linear-comparators/2556221":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/8-XQFN_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-8-CDIP_tmb.jpg","http://media.digikey.com/renders/Linear%20Tech%20Renders/TSOT-23-8_05-08-1637_tmb.jpg"],"/integrated-circuits-ics/linear-video-processing/2556085":["http://media.digikey.com/Photos/Sigma%20Designs/GF9351A-CBE2_tmb.jpg","http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/6-TSOP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/microPOWER-Series-10-TFSOP_tmb.jpg"],"/integrated-circuits-ics/logic-buffers-drivers-receivers-transceivers/2556308":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-XFQFN_tmb.jpg","http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/SOT-23-5_tmb.jpg","http://media.digikey.com/Renders/STMicro%20Renders/96-LFBGA%20(13.5x5.5)_tmb.jpg"],"/integrated-circuits-ics/logic-comparators/2556864":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-SOIC_SOT163-1_tmb.jpg","http://media.digikey.com/Renders/Micrel%20Renders/24-Cerpack_tmb.jpg"],"/integrated-circuits-ics/logic-counters-dividers/2556429":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-VQFN,RGY%20%28exposed%20pad%29_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-TSSOP_8-MSOP_tmb.jpg"],"/integrated-circuits-ics/logic-fifos-memory/2556319":["http://media.digikey.com/Photos/IDT,%20Integrated%20Device%20Technology/IDT72T18125L4-4BBG_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-SOIC_tmb.jpg"],"/integrated-circuits-ics/logic-flip-flops/2556318":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-XFQFN_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/SOT-23-5%20PKG_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/5-DSBGA-YZP_tmb.jpg"],"/integrated-circuits-ics/logic-gates-and-inverters/2556317":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/DSF-6-SON%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14-DIP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/YZP-6-BGA%20Pkg_tmb.jpg"],"/integrated-circuits-ics/logic-gates-and-inverters-multi-function-configurable/2556808":["http://media.digikey.com/Renders/NXP%20Semi%20Renders/8-XQFN_tmb.jpg","http://media.digikey.com/Renders/Diodes%20Renders/SOT-23-6%20PKG_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14-DIP_tmb.jpg"],"/integrated-circuits-ics/logic-latches/2556322":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/NXP%20Semi%20Renders/6-XSON_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/56-BGA-Microstar-Jr-ZQL_tmb.jpg"],"/integrated-circuits-ics/logic-multivibrators/2556325":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/TSOT23-5%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/YZP-8-BGA%20Pkg_tmb.jpg"],"/integrated-circuits-ics/logic-parity-generators-and-checkers/2556358":["http://media.digikey.com/renders/NXP%20Semi%20Renders/14-SSOP_SOT337-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14-DIP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/DBQ-24-QSOP%20Pkg_tmb.jpg"],"/integrated-circuits-ics/logic-shift-registers/2556326":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-VQFN,RGY%20%28exposed%20pad%29_tmb.JPG","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14-DIP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/MIC3223%2016-TSSOP%20EPad_tmb.jpg"],"/integrated-circuits-ics/logic-signal-switches-multiplexers-decoders/2556595":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/16-UQFN_488AU_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SC-74,%20SOT-457_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/logic-specialty-logic/2556307":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/176-BGA-ZAL_tmb.jpg","http://media.digikey.com/Renders/NXP%20Semi%20Renders/6-XSON_SOT886%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/14-DIP_tmb.jpg"],"/integrated-circuits-ics/logic-translators/2556437":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/10-TFSOP,%2010-MSOP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-DIP_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/RHL-24-PVQFN%20Pkg_tmb.jpg"],"/integrated-circuits-ics/logic-universal-bus-functions/2556400":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/56-BGA-Microstar-Jr-ZQL_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-TSSOP%20(0.173,%204.40mm%20Width)_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-DIP_tmb.jpg"],"/integrated-circuits-ics/memory/2556980":["http://media.digikey.com/Photos/Micron%20Photos/MT29F4G-63VFBGA_tmb.jpg","http://media.digikey.com/Renders/Atmel%20Renders/8-SOIC_tmb.jpg","http://media.digikey.com/Renders/Adesto%20Renders/1265;%208MA1;%20M;%208_tmb.jpg"],"/integrated-circuits-ics/memory-batteries/2556717":["http://media.digikey.com/photos/Maxim%20Photos/406-POWERCAP_tmb.jpg","http://media.digikey.com/photos/STMicro%20Photos/M4Z32-BR00SH1_tmb.JPG","http://media.digikey.com/photos/STMicro%20Photos/M4Z28-BR00SH1_tmb.JPG"],"/integrated-circuits-ics/memory-configuration-proms-for-fpga-s/2556265":["http://media.digikey.com/Renders/Atmel%20Renders/8-SOIC_tmb.jpg","http://media.digikey.com/photos/Xilinx%20Photos/XCF16PFSG48C_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg"],"/integrated-circuits-ics/memory-controllers/2556499":["http://media.digikey.com/Renders/National%20Semi%20Renders/68-PLCC,V68A_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/8-SOIC_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/VGZ44A_tmb.jpg"],"/integrated-circuits-ics/pmic-ac-dc-converters-offline-switchers/2556672":["http://media.digikey.com/photos/Power%20Integrations%20Photos/TOP261YN_tmb.JPG","http://media.digikey.com/Renders/Power%20Integrations%20Renders/SO-8C_tmb.jpg","http://media.digikey.com/Renders/Power%20Integrations%20Renders/eSIP-7C_tmb.jpg"],"/integrated-circuits-ics/pmic-battery-management/2556336":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DFN%283x2%29DDB-Pkg_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/8-MSOP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/pmic-current-regulation-management/2556448":["http://media.digikey.com/Renders/Rohm%20Renders/RB051M-2YTR_tmb.jpg","http://media.digikey.com/renders/National%20Semi%20Renders/TO-92%20PKG_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/CP-8-1_tmb.jpg"],"/integrated-circuits-ics/pmic-display-drivers/2556426":["http://media.digikey.com/Photos/Austria%20Microsystems/AS1119-BWLT_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/20-SOIC%200.295_tmb.jpg","http://media.digikey.com/photos/Epson%20Toyocom%20Photos/S1D13506F00A200_tmb.JPG"],"/integrated-circuits-ics/pmic-energy-metering/2556716":["http://media.digikey.com/Renders/Analog%20Devices%20Renders/16-WQFN%20Exposed%20Pad,%20CSP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/24-SSOP_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/16-DFN%2005-08-1707_tmb.jpg"],"/integrated-circuits-ics/pmic-hot-swap-controllers/2556351":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/DRV-6-SON%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/DDA-8-SOIC%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/48-TQFP-PFB_tmb.jpg"],"/integrated-circuits-ics/pmic-laser-drivers/2555981":["http://media.digikey.com/Renders/Linear%20Tech%20Renders/16-WQFN_tmb.jpg","http://media.digikey.com/Photos/Intersil%20Photos/X9521V20I_tmb.JPG","http://media.digikey.com/Renders/MACom%20Technology%20Solutions/24-QFN%20Exposed%20Pad_tmb.jpg"],"/integrated-circuits-ics/pmic-led-drivers/2556628":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/DBQ-24-QSOP%20Pkg_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DFN%283x2%29DDB-Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/SOT-23-5%20PKG_tmb.jpg"],"/integrated-circuits-ics/pmic-lighting-ballast-controllers/2556695":["http://media.digikey.com/renders/Maxim%20Renders/14-TDFN_21-0137I_tmb.jpg","http://media.digikey.com/Renders/Atmel%20Renders/8-SOIC_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/pmic-mosfet-bridge-drivers-external-switch/2556427":["http://media.digikey.com/Photos/Clare%20Photos/IXDD630YI_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/SOT-23-5%20PKG_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/Pkg%20SDE06A_tmb.jpg"],"/integrated-circuits-ics/pmic-mosfet-bridge-drivers-internal-switch/2556632":["http://media.digikey.com/Photos/International%20Rectifier%20Photos/IR3550MTRPBF_tmb.jpg","http://media.digikey.com/Renders/Maxim%20Renders/16-VFLGA_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/TO-252-3_tmb.jpg"],"/integrated-circuits-ics/pmic-motor-drivers-and-controllers/2556626":["http://media.digikey.com/photos/Toshiba%20Photos/TB6560AHQ(O)_tmb.JPG","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/PWP-28-TSSOP%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/YZF-9-BGA%20Pkg_tmb.jpg"],"/integrated-circuits-ics/pmic-or-controllers-ideal-diodes/2556704":["http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DFN%283x2%29DDB-Pkg_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DIP_tmb.jpg","http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/16-WLCSP_tmb.jpg"],"/integrated-circuits-ics/pmic-pfc-power-factor-correction/2556705":["http://media.digikey.com/Photos/Power%20Integrations%20Photos/PFS729EG_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SC-74,%20SOT-457_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/16-TFSOP%20Exposed%20Pad_tmb.jpg"],"/integrated-circuits-ics/pmic-power-distribution-switches-load-drivers/2556406":["http://media.digikey.com/Photos/Microsemi%20Photos/DRF1200_tmb.JPG","http://media.digikey.com/Renders/Micrel%20Renders/4-MLF_tmb.jpg","http://media.digikey.com/renders/Fairchild%20Semi%20Renders/SuperSOT-6%20PKG_tmb.jpg"],"/integrated-circuits-ics/pmic-power-management-specialized/2556708":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/34-BGA_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-DFN%283x2%29DDB-Pkg_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/10-MSOP_tmb.jpg"],"/integrated-circuits-ics/pmic-power-over-ethernet-poe-controllers/2557227":["http://media.digikey.com/Renders/Linear%20Tech%20Renders/8-DFN_tmb.jpg","http://media.digikey.com/Renders/Texas%20Instr%20Renders/DDA-8-SOIC%20Pkg_tmb.jpg","http://media.digikey.com/photos/Microsemi%20Photos/PD70x01ILQ-TR_tmb.jpg"],"/integrated-circuits-ics/pmic-power-supply-controllers-monitors/2556707":["http://media.digikey.com/Photos/Linear%20Tech%20Photos/144-BBGA_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/12-WFQFN%20Exp%20Pad_tmb.jpg"],"/integrated-circuits-ics/pmic-rms-to-dc-converters/2556572":["http://media.digikey.com/photos/Analog%20Devices%20Photos/505-14-CDIP%20HEAT%20PAD_tmb.jpg","http://media.digikey.com/Renders/Analog%20Devices%20Renders/20-LFCSP_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-TO-100_tmb.jpg"],"/integrated-circuits-ics/pmic-supervisors/2556197":["http://media.digikey.com/Renders/Fairchild%20Semi%20Renders/10-UMLP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg","http://media.digikey.com/Renders/Microchip%20Tech%20Renders/C04-060%20LB_tmb.jpg"],"/integrated-circuits-ics/pmic-thermal-management/2556560":["http://media.digikey.com/Renders/Maxim%20Renders/16-TQFN%20Exp%20Pad%2021-0136_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-14-CDIP%20HEAT%20PAD_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/10-TFSOP,%2010-MSOP_tmb.jpg"],"/integrated-circuits-ics/pmic-v-f-and-f-v-converters/2556419":["http://media.digikey.com/Photos/Analog%20Devices%20Photos/1B21AN_tmb.jpg","http://media.digikey.com/photos/Analog%20Devices%20Photos/505-16-CDIP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/8-TSSOP_8-MSOP_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-reference/2556223":["http://media.digikey.com/renders/Linear%20Tech%20Renders/TO-46-4_05-08-1341_tmb.jpg","http://media.digikey.com/renders/Linear%20Tech%20Renders/3-DFN%20PKG_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SOT-23-3%20PKG_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-dc-dc-switching-controllers/2556342":["http://media.digikey.com/Renders/Texas%20Instr%20Renders/RGY-20-PVQFN%20Pkg_tmb.jpg","http://media.digikey.com/renders/Linear%20Tech%20Renders/TSOT-23-8_05-08-1637_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-dc-dc-switching-regulators/2556570":["http://media.digikey.com/renders/International%20Rectifier%20Renders/1x-PowerVQFN_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/SOT-23-6%20PKG_tmb.jpg","http://media.digikey.com/Renders/Micrel%20Renders/MIC229%20QFN_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-linear-ldo/2556290":["http://media.digikey.com/photos/Micrel%20Photos/576-SOT-223-3_tmb.jpg","http://media.digikey.com/photos/Micrel%20Photos/576-TO-220-5_tmb.jpg","http://media.digikey.com/Renders/Semtech%20Renders/600;8SOIC-EDP-3.9;;8_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-linear-switching/2557137":["http://media.digikey.com/Renders/Micrel%20Renders/MIC3385%2014-MLF%20QFN_tmb.jpg","http://media.digikey.com/Renders/National%20Semi%20Renders/TLA09BBA_tmb.jpg","http://media.digikey.com/Renders/Linear%20Tech%20Renders/16-TFSOP%20Exposed%20Pad_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-linear-transistor-driver/2556703":["http://media.digikey.com/Renders/Semtech%20Renders/SOT-23-6%20PKG_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/10-TFSOP,%2010-MSOP_tmb.jpg","http://media.digikey.com/Renders/~~Pkg.Case%20or%20Series/DIP16_SOT38-1%20Pkg_tmb.jpg"],"/integrated-circuits-ics/pmic-voltage-regulators-special-purpose/2556693":["http://media.digikey.com/photos/Panasonic%20Photos/AN80T05_tmb.JPG","http://media.digikey.com/Photos/Maxim%20Photos/MAX8570ELT+T_tmb.jpg","http://media.digikey.com/Photos/STMicro%20Photos/L6716TR_tmb.jpg"]};

//loads before document status is ready
function preloadFormat(){
    _log('preloadFormat() Start',DLOG);

    $('#content form[name="attform"]').attr('id', 'mainform'); // this form is only on filter page
    GM_addStyle("#header {display: none;} #content hr {display:none;} #footer{position:relative; top:45px;} #content>form:first-child {display:none} #content>p {display:none;} ");
    // GM_addStyle("#header {display: none;} #content hr {display:none;} #footer {display:none;} #content>p {display:none;} ");

    addResourceCSS();

    $('#header').detach();
    // $('#footer').css({
    //     'margin-top': '50px'
    // });
$('#footer').before('<div style="height:10px;"></div>');
    // $('#footer').remove();
// console.log(exampleFamilyImages);
    _log('preloadFormat() End',DLOG);
}


preloadFormat();

$(document).ready(function() {
    _log('[ready] advanced search starts here. Jquery version '+ jQuery.fn.jquery);
    _log('[ready] hostname is '+ window.location.hostname,DLOG);
    _log('[ready] pathname is '+ window.location.pathname,DLOG);
    _log('[ready] search is '+ window.location.search,DLOG);
    formatPages();

    _log('[ready] end of document ready function');
});

function addResourceCSS(){
    var cssNames = [
        "buttonCSS",
        "advCSS",
        "normalizeCSS",
        "pureCSS",
        "fontAwesomeCSS",
        "stickyCSS",
        "tooltipsterCSS",
        "tooltipster-shadowCSS"
    ];
    for ( var x in cssNames){
        // _log('style tick start '+cssNames[x], DLOG);
        GM_addStyle(GM_getResourceText(cssNames[x]));
        // _log('style tick start'+ cssNames[x], DLOG);
    }


}

function tc(thefunc, name){ // tc = try catch
    try{
        thefunc();
    }catch(err){
        alert('failed on '+ name + '\n' + err.message + 
            '\n\n If you are getting repeated errors try manually updating by clicking on the ++settings++ box in the upper right hand corner and then hit the manual update link.'+
            '\n\n Alternatively, copy and paste this link into your browser:  https://bit.ly/advsearch-user-js'
            );
    }
}

function formatPages() {
    _log('formatPages() Start',DLOG);
    //updateProductDrawer();

    tc(updateCache, 'updateCache');
    tc(addCustomHeader, 'addCustomHeader');
    tc(addControlWidget,'addControlWidget');  // TODO FIX function order dependence on addCustomHeader      
    tc(formatFilterResultsPage, 'formatFilterResultsPage');
    tc(formatDetailPage, 'formatDetailPage');
    tc(formatOrderingPage,'formatOrderingPage');
    tc(formatFastAddPage,'formatFastAddPage');
    tc(addEvents, 'addEvents');
    tc(formatIndexResultsPage, 'formatIndexResultsPage');
    tc(addBreadCrumbLink, 'addBreadCrumbLink');
    tc(addCartHover, 'addCartHover');
    tc(replaceQuestionMark, 'replaceQuestionMark');
    // tc(lazyLoadFix, 'lazyLoadFix');
    
    cleanup();
    _log('formatPages() End',DLOG);
} 

function getMyDigiKeyLink(){
    var retval ='';
    tc(function(){
        if ($('.header-dropdown-content').length){
            retval =$('#header-login').find('.header-dropdown-content a:first').attr('href');
        }
    }, 'getMyDigiKeyLink');
    if (retval == undefined){ retval = 'https://www.digikey.com/classic/RegisteredUser/Login.aspx'}
    return retval;
}

function getIndexLink(){
    var ret = $('#header-middle').find('.header-resource').attr('href'); 
    return (ret == undefined)? 'http://www.digikey.com/product-search/en' : ret;
}

function replaceQuestionMark(){
    _log('replaceQuestionMark() Start',DLOG);
    // $('img[src*="help.png"]').attr('src', 'https://dl.dropboxusercontent.com/u/26263360/img/newhelp.png');
    $('img[src*="help.png"]').addClass('qmark').hide();// css used to replace image as a background image
    $('img[src*="help.png"]').after('<i class="fa fa-question-circle fa-lg" style="color:#999;"></i>');// css used to replace image as a background image
    _log('replaceQuestionMark() End',DLOG);
}

function cleanup () {
    _log('cleanup() Start',DLOG);

    askpermission(version);

    $('input[type=submit],input[type=reset]').addClass('button-small pure-button').css({
        'margin': '2px',
    });
    $('p:contains("No records match your")').show();
    hoveringHelpHighlighter();
    _log('cleanup() End',DLOG);
}

//TODO FINISH  UNUSED
function updateCache(){
    if(Date.now() > parseInt(localStorage.getItem('lastCacheRefresh')) + 604800000){
        cacheflag = true;
    }
    else{
        localStorage.setItem('lastCacheRefresh', 604800000);
        cacheflag = false;
    }
}



function addCustomHeader(){
    _log('addCustomHeader() Start',DLOG);
    //TODO style the form with purecss
    var customform = '<div id="cHeader" style="display:block; background:black; color:white;"><a href="http://digikey.'+theTLD+'">'+
        // '<img align=left top="50px" height=50 src="http://dkc1.digikey.com/us/en/mkt/DKinfo/DKCorp_oval.gif"></a>'+
        '<img align=left top="50px" height=50 src="http://www.digikey.com/Web%20Export/hp/common/logo_black.jpg"></a>'+
        '<form id="headForm" method="get" action="/scripts/dksearch/dksus.dll?KeywordSearch">'+
        '<a href="http://dkc1.digikey.com/us/en/help/help10.html">'+
        '<b>Keywords:</b></a> <input type="search" value="" id="headKeySearch" maxlength="250" size="35" class="dkdirchanger2" name="keywords">'+
        // '<label class="css-label"><input type="checkbox" value="1" name="pbfree" id="pbfree" class="css-checkbox"><b>Lead free</b></label>'+
        // '<label class="css-label"><input type="checkbox" value="1" name="rohs" id="hrohs" class="css-checkbox"><b>RoHS Compliant </b></label> '+
        '<input align=right type="submit" value="New Search" id="searchbutton">'+
        ' <input type="checkbox" style="margin:0 2px;" value="1" name="stock" id="hstock" class="saveState css-checkbox"><label for="hstock" class="css-label">In stock </label>'+
        ' <input type="checkbox" style="padding-left:5px;" value="1" name="has3d" id="has3d" class="css-checkbox"><label style="margin-left:8px;" for="has3d" class="css-label">Has 3D Model</label>'+
        // '<input type="hidden" class="colsort" disabled="disabled" name="ColumnSort" value=1000011>'+
        // '<input type="hidden" class="engquan" disabled="disabled" name=quantity></form>'+
        '<span id="resnum"></span>'+
        '<span id=quicklinks><a href="'+gIndexLink+'">Product Index</a> | '+
        '<a href="'+mydklink+'">My Digi-Key</a> | '+
        '<a id="cartlink" href="http://www.digikey.'+theTLD+'/classic/Ordering/AddPart.aspx?"><i class="fa fa-shopping-cart fa-lg" style="color:red;"></i> Cart<span id=cartquant></span> <i class="fa fa-caret-down fa-lg" style="color:red;"></i></a> | '+
        // '<a href="'+sitemaplink+'">Site Map</a></span>'+
        '<div class="dropShadow" />'+
    '</div>';

    var keywordval = $('.psdkdirchanger').val();
    var stockval = $('#stock').prop('checked');
    var pbfreeval = $('#pbfree').prop('checked');
    var rohsval = $('#rohs').prop('checked');
    _log('stockval is'+ stockval+ ' checked status is '+ $('#stock').prop('checked'),DLOG);
    $('#content').after(customform);
    $('.dkdirchanger2').val(keywordval).focus();
    $('#stock').prop('checked', stockval);
    $('#pbfree').prop('checked', pbfreeval);
    $('#rohs').prop('checked', rohsval);
    // $('.matching-records').appendTo('#resnum').attr("id", "recmatch");
    $('.matching-records').show();
    $('.content-keywordSearch-form').closest('form').remove();

    //TODO flag for removal?
    $('.matching-records:contains("Results")').delegate(function(){
        $(this).text($(this).text().replace('Results', 'awesome'));
    });

    $('#content').wrap('<div class="mainFlexWrapper" style="position:relative; top:65px;"/>');
    $('.dk-url-shortener').css({position:'fixed', right: '130px', top:'28px','z-index':'30'}); //move url shortener


    tc(searchButtonHighlight, 'searchButtonHighlight');
    _log('addCustomHeader() End',DLOG);
}

function addControlWidget() {
    _log('addControlWidget() Start',DLOG);
    $('#content').after('<div id="controlDiv" class="gray-grad" title="settings for advancedsearch v'+version+'">'+
            '<a href="'+downloadLink+'" class="button-small pure-button" style="float:right;"> click to manually update</a> ' +
            // '<button  id="closeControlDiv" class="clean-gray close">X</button>' +
            '<div class="settingscontainer" >'+
                '<img src="http://goo.gl/53qn5g">'+
                '<br><span style="font-weight:bold">Filter Results Page</span><br>'+
                '<input type=checkbox id=qtydefault class="saveState css-checkbox " value="1"><label class="css-label" for="qtydefault">Always initially sort by price @ Qty</label> <input type="text" id="qtydefaulttext" class="saveState css-checkbox" value="1" size="7" defval="1"><br>' +
                '<input type=checkbox id="combinePN" class="saveState css-checkbox " value="1"> <label class="css-label" for="combinePN">Combine Manufacturer PN, DK PN, and Manufacturer into one column to save horizontal space</label> (breaks hover headers in chrome)<br>' +
                '<input type=checkbox id=pricehoverControl class="saveState css-checkbox " value="1"><label class="css-label" for="pricehoverControl">Turn on price break popup on hovering over prices</label><br>' + 
                '<input type=checkbox id=queryHighlight class="saveState css-checkbox " value="1"><label class="css-label" for="queryHighlight">Turn on query term highlighting in on filter pages</label><br>' +   
                '<label>Explore Mode Popup Delay time <input type="text" id="exploreModeDelay" class="saveState" value="300" size="7" defval="300">ms</label><br>'+
                '<br><span style="font-weight:bold">Index/Keyword Results Page</span><br>'+
                '<label><input type=checkbox id=picPrevControl class="saveState css-checkbox " value="1"> <label class="css-label" for="picPrevControl">Turn on picture previews when hovering over Family links on the Index/Keyword Results page</label><br>' +
                '<label><input type=checkbox id=qfControl class="saveState css-checkbox " value="1"> <label class="css-label" for="qfControl">Turn on Quick Pick Box</label><br>' +
                '<label><input type=checkbox id=familyHighlight class="saveState css-checkbox " value="1"> <label class="css-label" for="familyHighlight">Turn on the bolding and text size increase of matched family names on index results page</label><br>' +
                '<label><input type=checkbox id=instantfilter class="saveState css-checkbox " value="1"><label class="css-label" for="instantfilter">Turn on the Product Index Instant Filter to immediately show matching search box keywords</label><br>' +
                '<br><span style="font-weight:bold">Experimental</span><br>'+
                '<input type=checkbox id=analytics class="saveState css-checkbox " value="0"> <label class="css-label" for="analytics">Help improve this script with analytics. These are used only by the creator of this script to help with the search experience. </label><br>' +
                '<input type=checkbox id=spellcheck class="saveState css-checkbox " value="0"> <label class="css-label" for="spellcheck">Turn on rudimentary spell check and suggested search terms</label><br>' +
                '<input type=checkbox id=stickyfilters class="saveState css-checkbox " value="0"><label class="css-label" for="stickyfilters">Turn on sticky filter selections on filter page to elminate the need for ctrl+click (known shift click bug)</label><br>' +
                '<input type=checkbox id=squishedFilters class="saveState css-checkbox " value="0"><label class="css-label" for="squishedFilters">Turn on expandemonium feature (squished multiselect filters) ...only a tech demo...</label><br>' +  
            '</div><br><br>'+
            '<button id=restoredefaults class="button-small pure-button" style="margin-left:20px"> restore defaults </button>'+
            '<br><br><div class="centerme">Have questions or comments? email my <b>gmail.com</b> account <br> <b>bombledmonk@</b></div>'+
        '</div>'
    );
    $('.settingscontainer .css-checkbox').css('z-index',2005);


    $('#content').after('<div id="controlSpan" class="pure-button"><i class="fa fa-cog"></i> settings v' + version + '</div>');
    _log('control dialog tick start ', DLOG);
    // setTimeout(function(){
            $('#controlDiv').dialog({
                autoOpen: false,
                resizable: false,
                // draggable: false,
                height:600,
                width:800,
                modal: true,
                buttons: {
                    "Apply & Refesh Page": function() {
                        $(this).css('color', 'lightgrey');
                        $( this ).dialog( "close" );
                        document.location.reload();
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        // },1500);
    _log('control dialog tick end ', DLOG);

    $('#controlSpan').click(function(){
        $('#controlDiv').dialog('open');
    });

    _log(encodeURIComponent(window.location), true);

    $('#applyControls').click(function(){
        $(this).css('color', 'lightgrey');
        document.location.reload();
    });

    $('#restoredefaults').click(function(){
        $(this).css('color', 'lightgrey');
        _log(Object.keys(localStorage));
        localStorage.clear();
        _log(Object.keys(localStorage));
    });
    
    $('#controlSpan').css({
        'position': 'fixed',
        'right': '10px',
        'top': '20px',
        'z-index': '19',
        'cursor':'pointer'
    });

    addControlWidgetActions2();
    _log('addControlWidget() End',DLOG);
}

function hoveringHelpHighlighter(){
    _log('hoveringHelpHighlighter() Start',DLOG);
    // var hlarray = [
    // [$('#exploremodecheckbox').parent(), $('select[multiple]')],
    // [$('#qtydefault').parent(), $('select[multiple]')],
    // ];
    var zind = $('#headKeySearch').css('z-index');

    $('#picPrevControl, [for=picPrevControl]').hoverIntent({
        over: function(){$('.catfilterlink').addClass('zlevelhhl'); },
        out: function(){$('.catfilterlink').removeClass('zlevelhhl'); },
        interval: 2,
    }); 
    // $('#columnchooser>button').hoverIntent({
    //  over: function(){$('#content').addClass('cwhhl'); },
    //  out: function(){$('#content').removeClass('cwhhl'); },
    //  interval: 2,
    // });
    $('#instantfilter, [for=instantfilter], #spellcheck, [for=spellcheck]').hoverIntent({
        over: function(){$('#cHeader').addClass('zlevelhhl'); },
        out: function(){$('#cHeader').removeClass('zlevelhhl');},
        interval: 2,
    });     
    $('#qfControl').parent().hoverIntent({
        over: function(){$('#qpDiv').addClass('zlevelhhl');},
        out: function(){$('#qpDiv').removeClass('zlevelhhl');},
        interval: 2,
    }); 
    $('#combinePN, [for=combinePN]').hoverIntent({
        over: function(){$('.mfg-partnumber').addClass('zlevelhhl');},
        out: function(){ $('.mfg-partnumber').removeClass('zlevelhhl');},
        interval: 2,
    }); 
    $('#pricehoverControl, [for=pricehoverControl]').hoverIntent({
        over: function(){$('a:contains(.)').addClass('zlevelhhl');},
        out: function(){$('a:contains(.)').removeClass('zlevelhhl');},
        interval: 2,
    });
    $('#qtydefault, [for=qtydefault]').hoverIntent({
        over: function(){$('input[name=quantity]').addClass('zlevelhhl');},
        out: function(){$('input[name=quantity]').removeClass('zlevelhhl');},
        interval: 2,
    });
    $('#exploremodecheckbox, [for=exploremodecheckbox], #stickyfilters, [for=stickyfilters], #wrapFilters, [for=wrapFilters], #squishedFilters, [for=squishedFilters]').hoverIntent({
        over: function(){$('select[multiple]').addClass('explorehhl');},
        out: function(){$('select[multiple]').removeClass('explorehhl');},
        interval: 100,
    });
    _log('hoveringHelpHighlighter() End',DLOG);

}

function addControlWidgetActions2(){
    _log('addControlWidgetActions2() Start',DLOG);
    $('.saveState').each(function(){
        restoreInputState($(this));
    });

    if($('#qtydefault').is(':checked')){
        $('#mainform').find('input[name=ColumnSort]').val('100001');
        $('#mainform').find('input[name=qantity]').val($('#qtydefaulttext').val());
    }

    $('#exploreModeDelay').change(function() {  
        localStorage.setItem('exploreModeDelay', $('#exploreModeDelay').val());
    });
    $('#qtydefaulttext').change(function() {
        localStorage.setItem('qtydefaulttext', $('#qtydefaulttext').val());
        _log('quantity storage set to ' + localStorage.getItem('qtydefaulttext'));
        $('.engquan').val($('#qtydefaulttext').val());
        $('a.catfilterlink').each(function() {
            $(this).attr('href', $(this).attr('href').replace(/&ColumnSort=1000011&quantity=[\d]+/i, '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val()));
        });
        if (document.location.href.search('quantity')){
            document.location.href = document.location.href.replace(/quantity=\d+/i,'quantity='+$('#qtydefaulttext').val());
            $('#applyControls').off('click');
        }
    });

    $('#qtydefault').on('click',function() {
        if($(this).prop('checked') != 'checked') {
            localStorage.setItem($(this).attr('id'), 0);
            $('.engquan').attr('disabled', 'disabled');
            $('.colsort').attr('disabled', 'disabled');
        }
        if($(this).prop('checked') == 'checked') {
            $('.engquan').removeAttr('disabled');
            $('.colsort').removeAttr('disabled');
        }
    });
    _log('addControlWidgetActions2() End',DLOG);
}

function restoreInputState($singleFormElem){
    //_log('restoreInputState($singleFormElem) Start',DLOG);
    $singleFormElem.val(((localStorage.getItem($singleFormElem.attr('id'))) == null) ? $singleFormElem.val() : localStorage.getItem($singleFormElem.attr('id')));
    localStorage.setItem($singleFormElem.attr('id'), $singleFormElem.val());
    if($singleFormElem.attr('type') == 'text'){

    }
     else if($singleFormElem.attr('type') == 'checkbox'){
            $singleFormElem.prop('checked', parseInt($singleFormElem.val()));
    }

    $singleFormElem.change(function(){
        if($(this).attr('type') == 'checkbox'){
            $(this).val($(this).prop('checked') ? 1 : 0);
        }
        localStorage.setItem($(this).attr('id'), $(this).val());
        _log('[restoreInputState()] setting '+ $(this).attr('id') + ' from session storage to '+  localStorage.getItem($(this).attr('id')),DLOG);
    });
    //_log('restoreInputState($singleFormElem) Start',DLOG);
}

function styleCheckboxes(){

    $('.filters-group input[type=checkbox]').not('.css-checkbox').each(function(){
        $(this).parent().wrap('<div style="display:inline-block; margin-right:10px;" />');
        $(this).parent().attr('for',$(this).attr('id'));
        $(this).insertBefore($(this).parent());
    });
    $('.filters-group input[type=checkbox]').not('.css-checkbox').addClass('css-checkbox');
    

    $('.filters-group label[for]').not('.css-label').each(function(){
        $(this).html($(this).text());
    })
    $('.filters-group label[for]').not('.css-label').addClass('css-label');

    $('.filters-group').css({'padding-top':'3px'});

}

function formatFilterResultsPage(){
    if ( $('#productTable').length){
        _log('formatFilterResultsPage() Start',DLOG);
        _log('[ready] number of results '+ parseInt($('.matching-records').text().split(':')[1].replace(/,/g,''),10),DLOG);
        //$('form').find('br').remove(); // remove <br> in forms to improve verticle space utilization.
        $('.quantity-form br').add('#mainform br').remove();
        $('p:contains("To get the most from")').remove();
        $('p:contains("Click RoHS icon next to part")').remove();
        $('p:contains("Your parts have been sorted")').remove();
        $('a.altpkglink').hide();
        $('input[type=reset]').attr('value', 'Clear All').css('margin-left','10px');

        $('#productTable').before('<div id="preProductTable"></div>')
        $('#preProductTable').append($('.results-per-page:first, .paging:first'));
        $('#preProductTable').append($('.download-table:first').css({'float':'','margin-left':'15px'}));

        //$('img[src="http://dkc3.digikey.com/us/images/datasheet.gif"]').attr('src','http://goo.gl/8S0j5');// adds transparent background to gif anonymous stats for this image are located here http://goo.gl/#analytics/goo.gl/8S0j5/all_time
        addMatchingRecordsToApply()
        // addExploreMode();
        addToTopButton();
        addImageBar();
        // highightSortArrow();
        floatApplyFilters();
        fixAssociatedPartInFilterForm();
        //TODO fix dependencies of if statements below
        
        picsToAccel(); //add the thumnails to picture accelerator block
        if(localStorage.getItem('combinePN') == 1) {
            setTimeout(function(){combinePN();}, 1);
        }

        setTimeout(function(){addPartCompare();}, 150);
        if(localStorage.getItem('pricehoverControl') == 1) {
            setTimeout(function(){addPriceHover();}, 3000);
        }

        setTimeout(function(){addStickyHeader()}, 2500);  // wait for the page native javascript to load then reapply modified code

        formatQtyBox();
        addColumnHider();
        updateTableHeaders();
        addApplyFiltersButtonHighlight();
        wrapFilterTable(); //dependent on floatapplyfilters()

        addtrueFilterReset(); // dependent on wrapFilterTable() being in place
        displayAdv();
        
        if(localStorage.getItem('squishedFilters') == 1){
            squishedFilters();
        }
        if(localStorage.getItem('stickyfilters') == 1){
            addStickyFilters();
        }

        fixImageHover();

        akamaiLazyLoadFixForFilterResults();

        $('input[value=Reset]').addClass('button-small pure-button').click(function(){
        // $('input[value=Reset]').addClass('minimal').css({'height':'18px', 'padding':'1px', 'margin':'0px'}).click(function(){
            // getRecordsMatching();
            addApplyFiltersButtonHighlight();
        });
        //setTimeout(function(){addDocRetrieve()}, 2500);
        $('#productTable').addClass('gray');

        $('input[value*="Download Table"]').addClass('button-small pure-button');//.css({'margin':'1px', 'padding':'2px'});
        $('input[name*="quantity"]').attr('size','9').attr('placeholder','set qty');
        
        // doHighlight($('#productTable').text(), $('input[name=k]:last').text());
        // var hlword = $('input[name=k]:last').val()
        // _log('!!!!!!11 '+ $('#headKeySearch').val().toString(), true);
        // wrapText(document.getElementById('productTable'), $('#headKeySearch').val().toString());
        
        if(localStorage.getItem('queryHighlight') == 1){
            if($('#headKeySearch').val().toString().trim() != ''){
                wrapText($('#productTable')[0], $('#headKeySearch').val().toString());  
            }
        } 

        addColumnMath();
        addGraphInterface();
        styleCheckboxes();
        // $('.ps-sortButtons').css('sortFocus');
        addVisualPicker();

        _log('formatFilterResultsPage() End',DLOG);
    }
}


// TODO add the ability to submit using form filters
function addVisualPicker(){
    _log('addVisualPicker() Start',DLOG);
    var dialogHeight = ($(window).height() * 0.8);
    var dialogWidth = ($(window).width() * 0.8);

    $('.selectboxdivclass>b').after('<i class="fa fa-camera pickericon" title="Pick With Images" style="float:right; color:#566; margin-left:3px; cursor:pointer;"></i>');
    $('#content').after(
        '<div id="visualpickerdiv" style="display:none;">'+
            '<div class="pickerbody" style="overflow-y:scroll; height:'+(dialogHeight-90)+'px;"></div>'+
            '<div class="pickerbuttondiv" style="height:30px">'+
            '<div class="moreadder" style="height:30px">'+
                '<span class=moreoptionsmessage /><button class="pure-button myRedButton addmoreoptions">Add More Lines</button>'+
                '<span class="pickerhelp1" style="margin-left:10px"><i style="cursor:pointer;" class="fa fa-question-circle fa-lg"></i></span>'+
            '</div>'+
                '<button class="pure-button done-with-filter" style="float:right; margin-right:20px;">Done</button>'+
                '<button class="pure-button submitPickerForm" style="float:right; margin-right:20px;">Apply</button>'+
                '<span class="pickerhelp2" style="float:right; margin-right:10px;"><i style="cursor:pointer;" class="fa fa-info-circle fa-lg"></i></span>'+
            '</div>'+
        '</div>')
    var p = $('.pickerbody');
    $('.pickerhelp1').tooltipster({
        content: $('<span> The Add More Lines button is exists to limit the number of calls to the server at one time in this experimental feature.</span>'),
        theme: 'tooltipster-shadow'
    });
    $('.pickerhelp2').tooltipster({
        content: $('<span>If you would like to see a more complete representation of example pictures for each filter option above, clear any other filters that may be selected. '+
                '(ex items in Manufacturer or Series).</span>'),
        theme: 'tooltipster-shadow'
    });

    $( "#visualpickerdiv" ).dialog( { 
        autoOpen: false,
        modal: true,
        height: ($(window).height() * 0.8),
        width: ($(window).width() * 0.8),
        close: function(){
            $('.moreadder').prependTo($('.pickerbuttondiv'));
            $('.pickerbody').empty('')
        }, 
    } );

    $('.pickericon').on('click', openVisualPicker );
    
    $('.addmoreoptions').on('click', addImagesToVisualPicker)

    $('#visualpickerdiv').on('click', '.pickerItem, .pickerItem input[type=checkbox]', pickerOptionClick);

    $('.done-with-filter').on('click', function(){
        $( "#visualpickerdiv" ).dialog('close');
    });
    $('.submitPickerForm').on('click', function(){
        $('#mainform').submit();
    })
    mediumImageHover();
    //add special case for manufacturer, pull logo?
    _log('addVisualPicker() End',DLOG);
}

function pickerOptionClick(){
            var p = $('.pickerbody');
        var $cb;
        var $pickerItem;
        if ($(this).hasClass('pickerItem')){
            $cb = $(this).find('input[type=checkbox]');
            $pickerItem = $(this);
            $cb.prop("checked", !$cb.prop("checked"));
        }else{
            $cb = $(this);
            $pickerItem = $(this).closest('.pickerItem');
        }
        $pickerItem.toggleClass('pickerItemSelected pickerItemNotSelected');
        var targetSelect = $('select[name="'+p.data('selectval')+'"]')
        // console.log('targetselect', targetSelect)
        p.find('input[type=checkbox]').each(function(){
            // console.log($pickerItem.prop('checked'), $pickerItem.val());
            targetSelect.find('[value="'+$(this).val()+'"]').prop('selected', $(this).prop('checked'));
        });
}

function openVisualPicker(){
        // _log('clicked on .pickeritem', true);
        var p = $('.pickerbody');
        var filtername = $(this).closest('.selectboxdivclass').find('b').text();
        p.data('selectval', $(this).parent().find('select').attr('name'))
        var $options = $(this).parent().find('select option');


        p.data('optioncount', $options.length)
        p.data('optionsvisible', 0);
        p.data('currentfilter', filtername)
        p.data('theoptions', $options)

        $( "#visualpickerdiv" ).dialog('open');
        $('.addmoreoptions').show();
        addImagesToVisualPicker();
}

function addImagesToVisualPicker(){
        var p = $('.pickerbody');
        var ovisible = p.data('optionsvisible');
        var ocount = p.data('optioncount');
        if(ovisible+5 < ocount){
        // console.log('clicked')
            getSubsetOfOptionImages(p.data('theoptions'), p.data('currentfilter'), ovisible, ovisible+5);
            $( ".moreoptionsmessage" ).text( 'Showing '+ (ovisible+5)+ ' of '+ ocount+ ' available filters Click to add more');
            $( "#visualpickerdiv" ).dialog('option', 'title', 'Filtering on ' + p.data('currentfilter') +' '+ (ovisible+5) + ' showing out of '+ ocount);
            $('.addmoreoptions').show();

        }else{

            getSubsetOfOptionImages(p.data('theoptions'), p.data('currentfilter'), ovisible, ovisible+(ocount-ovisible));
            $( ".moreoptionsmessage" ).text( 'Showing all '+ ocount+ ' of '+ ocount+ ' the available filters');
            $( "#visualpickerdiv" ).dialog('option', 'title', 'Filtering on ' + p.data('currentfilter') +' '+ ocount+ ' showing out of '+ ocount);
            $('.addmoreoptions').hide();
        }
        $('.moreadder').appendTo($('.pickerbody'));

}

function getSubsetOfOptionImages($options, filtername, first, last){
    $options.slice(first,last).each(function(){
        getSingleOptionImageSet($(this), filtername);
    })
    $('.pickerbody').data('optionsvisible', last);
}

function getSingleOptionImageSet($option, filtername){
    //special cases replace - and * with descriptive names
    //fix special case when it goes to detail page, should not need to worry about no search results found
    //add clear this filter button
    //add extra data on hover
    //give choice to see unrestricted examples of filters. 
    //add (no images available message)   

        var selectname = $option.parent().attr('name');
        var optionval = $option.val();
        $option.parent().attr('disabled', true);
        var serialform = $('#mainform').serialize()
        $option.parent().attr('disabled', false);

        var mylink = $('.seohtagbold').find('a:last').attr('href') + '&' +serialform + '&' +$option.parent().attr('name')+'='+$option.val();
        // console.log(mylink)
        // var mylink = $('.seohtagbold').find('a:last').attr('href') + '&pageSize=25&akamai-feo=off&' + $option.parent().attr('name')+'='+$option.val();
        var ddclass = 'store-'+optionval;
        if ($('.'+ddclass).length == 0){
            $('#content').after('<div  class="'+ddclass+'" />');
            var dd = $('.'+ddclass);

            $('.pickerbody').append('<div id="pickerid'+optionval+'" class="pickerItem pickerItemNotSelected" />');
            $('#pickerid'+optionval).append(
                '<div class="pickercheckboxholder" >'+
                    '<input type=checkbox value="'+optionval+'" class="css-checkbox" id="check'+optionval+'" style="z-index:2005;">'+
                    '<label class="css-label" for="check'+optionval+'"></label>'+
                '</div>'+
                '<div class="imageholder imgholder'+optionval+'">'+
                    '<div style="font-weight:bold; font-size:1.2em;">'+$option.text()+' (<span class="matchnum">loading</span>) </div>'+
                ' </div>'
            );

            dd.load(mylink+' #productTable,.image-table,img[src*=pna_en],.matching-records,#reportpartnumber', function(){
                var matching = (dd.find('.matching-records').length > 0 ) ? dd.find('.matching-records').text().split(':')[1].trim() : '1';
                var $images = dd.find('.pszoomer').addClass('pszoomervp').removeClass('pszoomer');

                // $('#pickerid'+optionval).append(
                //     '<div style="width:40px; display:flex; align-items:center;">'+
                //     '<input type=checkbox value="'+optionval+'" class="css-checkbox" id="check'+optionval+'" style="z-index:2005;">'+
                //     '<label class="css-label" for="check'+optionval+'"></label></div>'+
                //     '<div class="imgholder'+optionval+'">'+
                //         '<div style="font-weight:bold; font-size:1.2em;">'+$option.text()+' ('+matching+') </div>'+
                //     ' </div>'
                // );
                $('#pickerid'+optionval).find('.matchnum').text(matching);

                 $images.css({'height':'50px', 'width':'50px'});
                $('.imgholder'+optionval).append(deDuplicateCollection($images, 'src').slice(0,20));

                if($(this).find('.beablock-image').length == 1){
                    $(this).find('img').css({'height':'50px', 'width':'50px'}).appendTo($('.imgholder'+optionval)).addClass('pszoomervp');
                }

                dd.detach();
                presetSelections(selectname)
            });
        }
}

function presetSelections(selectname){
    //grabs he highlighted options from the main form and selects them in the visual picker body.
    $('select[name="'+selectname+'"] option:selected').each(function(){
        $('.pickerbody').find('input[value='+$(this).val()+']').prop('checked',true)
    })
    $('.pickerbody input:checked').closest('.pickerItem').addClass('pickerItemSelected').removeClass('pickerItemNotSelected');
}

function deDuplicateCollection($collection, attribute){
    //deduplicates a collection of  jquery objects based on an attribute
    _log('deDuplicateCollection() Start',DLOG);
    var found = {};
    return $collection.filter(function(){
        var $this = $(this);
        if(found[$this.attr(attribute)]){
           return false;   
        }
        else{
             found[$this.attr(attribute)] = true; 
             return true;  
        }
    });
    _log('deDuplicateCollection() End',DLOG);
    return $collection;  
}

function mediumImageHover(){
    //hover image for visual picker.
    _log('mediumImageHover() Start',DLOG);
    $('#content').after('<img style="display:none; height:300px" id="mzoomie"></img>');
    $('#mzoomie').css({
        'border':'0px solid white', 
        'box-shadow': '0 0 10px 5px #888',
        'position': 'absolute',
        'background': '#f5f5f5'
    });

    $('#visualpickerdiv').hoverIntent(
        function () {
            $('#mzoomie').attr('src','');

            //check if src is from a from a detail page or from a results page
            var src = ($(this).filter('[itemprop]').length == 1)? this.src : $(this).attr('zoomimg');  
            $('#mzoomie').attr('src', src)
            $('#mzoomie').show().position({
                'my': 'left top',
                'at': 'left bottom',
                'of': $(this),
                'collision':'flip',
                'offset': '0 0',
            }).hide().css('z-index', 2000).show();
        },
        function () {
            $('#mzoomie').hide();
        },
        '.pszoomervp'
    );
    _log('mediumImageHover() End',DLOG);
}


function addMatchingRecordsToApply(){
    _log('addMatchingRecordsToApply() Start',DLOG);
    $('.filters-buttons').append('<div class="matching-records" style="display:inline; margin-left:30px; position:relative;">'+$('.matching-records').text()+'</div>');
    //$(".matching-records:last").css({display:'inline', 'margin-left': '30px', postion:'relative'});
    _log('addMatchingRecordsToApply() End',DLOG);
}

function addColumnMath(){
    _log('addColumnMath() Start',DLOG);
    $('#preProductTable').append('<button id="doMath" style="margin:2px 5px;"class="button-small pure-button"><i class="fa fa-calculator"></i> Column Math</button>');
    setTimeout(addColumnMathDialog, 3000);
    $('#doMath').click(function(e){
        _log('ready to do math', true);
        $('#colMathDialog').dialog("open")
        e.preventDefault();
    });
    _log('addColumnMath() End',DLOG);
}

function addColumnMathDialog(){
    //TODO add units of precision in form
    //TODO add normalization checkbox
    _log('addColumnMathDialog() Start',DLOG);
    $('body').append(
        '<div id="colMathDialog" title="Column Math">'+
            '<form><select id="firstMathColumn"></select><br>'+
                '<select id="mathOperator">'+
                    '<option value="div">/</option>'+
                    '<option value="mul">*</option>'+
                    '<option value="add">+</option>'+
                    '<option value="sub">-</option>'+
                '</select><br>'+
                '<select id="secondMathColumn"></select><br><br>'+
                '<button id="doOperation">Go</button>'+
            '</form>'+
        '</div>');
    GM_addStyle('.ui-widget-overlay {opacity: .3 !important;}' );
    $('#doOperation').click(function(e){
        e.preventDefault();
        addMathCol();
        $('#colMathDialog').dialog('close');
    });
    $('#colMathDialog').dialog({
        'autoOpen':false,
        'open': openMathDialog,
        'close': closeMathDialog,
        'modal': true,
        'position': {'my':'bottom', 'at':'top', 'of':$('#productTable'), 'offset': '0px 0px'}
    });
    _log('addColumnMathDialog() End',DLOG);
}

function openMathDialog(){
    _log('openMathDialog() Start',DLOG);
    insertTableSelectValues('#firstMathColumn', '#secondMathColumn');
    $('#firstMathColumn, #secondMathColumn').on('mouseenter.math', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'), table tr th:nth-child('+colval+')').addClass('mathHighlight');
    });
    $('#firstMathColumn, #secondMathColumn').on('mouseleave.math', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'),table tr th:nth-child('+colval+')').removeClass('mathHighlight');
    });
    _log('openMathDialog() End',DLOG);
}

function closeMathDialog(){
    _log('closeMathDialog() Start',DLOG);
    $('#firstMathColumn').empty();
    $('#secondMathColumn').empty();
    _log('closeMathDialog() End',DLOG);
}

function insertTableSelectValues(firstSelector, secondSelector){
    _log('insertTableSelectValues() Start',DLOG);
    var skipClasses = ['.rd-compare-parts','.rd-datasheet','.image', '.mfg-partnumber', '.description','.series', '.packaging' ];
    $('#productTable>thead>tr:eq(0) th').each(function(ind){

        if (!$(this).is(skipClasses.join(','))){
            $(firstSelector).append('<option value='+ind+'>'+$(this).text()+'</option>');
            $(secondSelector).append('<option value='+ind+'>'+$(this).text()+'</option>');
        }
        if($(this).hasClass('unitprice')){ 
            $(firstSelector).find('option[value='+ind+']').prop('selected',true); // set default option to price
        }
    });
    _log('insertTableSelectValues() End',DLOG);
}

function addMathCol(){
    _log('addMathCol() Start', DLOG);
    var fcol = $('#firstMathColumn').val();
    var scol = $('#secondMathColumn').val();
    var ftitle = $('#productTable>thead>tr:eq(0) th').eq(+fcol).text();
    var stitle = $('#productTable>thead>tr:eq(0) th').eq(+scol).text();
    var funit = getNormalization(fcol);
    var sunit = getNormalization(scol);
    var operator = $('#mathOperator').val();
    // console.log('operator', operator);
    console.log('fcol', fcol, ' scol ', scol);
    console.log('funit', funit, ' sunit ', sunit);
    $('#productTable>thead>tr:eq(0)').find('th').eq(scol).after('<th>'+ftitle + operator + stitle +'</th>');
    $('#productTable>thead>tr:eq(1)').find('td').eq(scol).after('<td><div class="sortme">asc</div><div class="sortme">desc</div></td>');
    $('.sortme').click(sortStuff);
    // _log('fcol'+ fcol + ' scol ' + scol);
    $('#productTable>tbody>tr').each(function(ind){
        try{                
            // var firstnum = Qty.parse($(this).find('td').eq(fcol).text().split('@')[0]);
            // var secondnum = Qty.parse($(this).find('td').eq(scol).text().split('@')[0]);
            var firstNum = parseElemForQty($(this).find('td').eq(fcol));
            var secondNum = parseElemForQty($(this).find('td').eq(scol));
            var finalNum = null;
                //console.log('firstnum', firstNum, 'secondNum', secondNum, ' sntext ', $(this).find('td').eq(scol).text());
            
            if(firstNum !== null && secondNum !== null){
                firstNum = toUnit(firstNum, funit);
                secondNum = toUnit(secondNum, sunit);
                try{
                    if (operator == 'div'){
                        finalNum = firstNum.div(secondNum);
                    }
                    if(operator == 'mul'){
                        finalNum = firstNum.mul(secondNum);
                    }
                    if(operator == 'add'){
                        finalNum = firstNum.add(secondNum);
                    }
                    if(operator == 'sub'){
                        finalNum = firstNum.sub(secondNum);
                    }
                        finalNum = finalNum.toPrec(.000001);
                }catch(err){
                    console.log(err, "not compatible with ", operator);
                    finalNum = 'NaN';
                } 
                $(this).find('td').eq(scol).after('<td class="mathcol">'+finalNum +'</td>');
            }
            else{
                console.log(firstNum, secondNum, ' changing finalNum to NaN')
                finalNum = 'NaN';
                $(this).find('td').eq(scol).after('<td class="mathcol">'+'NaN'+'</td>');
            }
            $(this).find('td').eq(+scol+1).data('qtyval',finalNum); 
        } catch(err){console.log('row', ind ,err);}
    });
    _log('addMathCol() End', DLOG);
}


function preProcessForQty($elem){
    var parsableText = '';

    if(typeof $elem === 'string'){ //taking care of the case where there is a need to pass in a string.
        parsableText = $elem;
        // console.log ( parsableText, 'parsabletext');
    }else {
        var etext = $elem.text();

        if($elem.hasClass('CLS 1')){
            //console.log('type = resistance');
            parsableText = etext + 'Ohm'
        }else if ($elem.hasClass('unitprice') || $elem.hasClass('priceme')){
            //console.log('type = price')
            parsableText = etext.split('@')[0] + ' USD';
        }else if ($elem.hasClass('CLS 2')){
            parsableText = etext.split(',')[0];
            if((etext.split(',').length > 2)){
                console.log('there may be more values in this cell than were handled');
            }
        }else if ($elem.hasClass('CLS 33')){
            // console.log('type = Capacity cls 33');
            if(etext.indexOf('Ah') != -1){
                parsableText = etext.replace('Ah', 'A h');
                // console.log('change to A h', parsableText);
            }else{ 
                parsableText = etext;
            }
        }else if (etext.indexOf('(') !== -1){
            parsableText = etext.split('(')[0];
            console.log('type with multiple units in ()');
        }else if ($elem.hasClass('qtyAvailable')){
            // this will have problems with European notation '5,4' vs '5.4'
            parsableText = etext.split('-')[0].replace(/,/g, '');
        }
        else{
            parsableText = etext;
            // console.log('general case', parsableText);
        }
    }
    return parsableText;
}

function parseElemForQty($elem){
    var elemText = preProcessForQty($elem);
    try{
        //console.log(elemText);
        var num = Qty.parse(elemText);
        if(num == null){ 
            console.log("can't parse ", elemText, elemText.length);
            return num;
        }else{ return num;}
    }catch(err){
        console.log('parseElemForQty Error', $elem.text() , err);
    }
}



function getNormalization(colNum){
    //goes through each row of the #productTable and finds the most common label for given column
    var unitarray = [];
    var indexrow;
    $('#productTable>tbody>tr').each(function(ind){
        try{
            indexrow = ind;
            //unitarray.push(Qty.parse($(this).find('td').eq(colNum).text().split('@')[0]).units());
            unitarray.push(parseElemForQty($(this).find('td').eq(colNum)).units());
        }
        catch(err){ 
            //console.log('normalization error on row ', indexrow , err);
        }
    });
   // console.log( unitarray);
   console.log('mode of unitarray ',mode(unitarray));
    return mode(unitarray);
}

function mode(array){
    //stack overflow
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function sortStuff(){
    var ind = $(this).parent().index();
    var direction = $(this).text();
    var rows = $('#productTable>tbody>tr').sort(function(a,b){
        var aval = $(a).find('td').eq(+ind).data('qtyval');
        var bval = $(b).find('td').eq(+ind).data('qtyval');
        if(aval == 'NaN' || bval == 'NaN') {
            return (aval=='NaN') ? 1 : 0;   
        }
        else{
            if(direction == "asc"){
                return aval.compareTo(bval);
            }else{ return (-1 * aval.compareTo(bval))}
        }
    });    
    $('#productTable>tbody').append(rows);
}

function highlightKeywords(){
}

function addGraphInterface(){
    _log('addGraphInterface() Start', DLOG);
    $('body').append('<div id=graphDialog></div>')
    setTimeout(function(){
        $('#graphDialog').dialog({
            'autoOpen':false,
            'open': openGraphDialog,
            'close': closeGraphDialog,
            'modal': true,
            'height': 550,
            'width': 900,
            'position': {'my':'bottom', 'at':'top', 'of':$('#productTable'), 'offset': '0px 0px'}
        });
    },3000);

    
    $('#preProductTable').append('<button id="buildChart" style="margin:2px 5px;"class="button-small pure-button"><i class="fa fa-line-chart"></i> Build Chart</button>');
    
    $('#graphDialog').append(
        '<form><select id="yGraphColumn"></select>'+
            '<span> vs. </span>'+
            '<select id="xGraphColumn"></select>'+
            '<button id="drawGraphButton">Go</button>'+
        '</form>'
    );

    $('#graphDialog').append('<div class="featureNotice">This is a test feature.  All data shown in chart is only from table below on the current page. To view maximum number of points change the number of Results per Page to 500 </div>')
    $('#drawGraphButton').on('click', function(e){
        e.preventDefault();
        console.log('graphcol1', $('#xGraphColumn').val(), 'graphcol2', $('#yGraphColumn').val());
        drawChart($('#xGraphColumn').val(), $('#yGraphColumn').val());

        //$('#graphDialog').dialog('close');
    });
    $('#buildChart').on('click', function(e){ 
        $('#graphDialog').dialog('open'); 
        e.preventDefault();
    });

    $('#graphDialog').append('<div class="graphErrorNotice"></div>')
    _log('addGraphInterface() End', DLOG);
}
    
function openGraphDialog(){
    $('.featureNotice').after('<div id=graphContainer style="width:800px;"></div>');
    insertTableSelectValues('#xGraphColumn', '#yGraphColumn');
    $('#xGraphColumn, #yGraphColumn').on('mouseenter.graph', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'), table tr th:nth-child('+colval+')').addClass('mathHighlight');
    });
    $('#xGraphColumn, #yGraphColumn').on('mouseleave.graph', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'),table tr th:nth-child('+colval+')').removeClass('mathHighlight');
    });

}
function closeGraphDialog(){
    $('#xGraphColumn').empty();
    $('#yGraphColumn').empty();
    $('#graphContainer').remove();
}

function getChartSeriesData(xcol, ycol, xunit, yunit){
    // TODO verify numerical inputs
    // TODO give option for non-numerical.... create dictionary, enumerate, then plot across each unique item

    var pt = $('#productTable');
    var data = [];
    var failedData = [];

    pt.find('tbody>tr').each(function(ind){
        var dp = getDataPoint(xcol,ycol, xunit, yunit, $(this));
        if (dp.usablePoint !== false){
            data.push(dp);
        }else{
            console.log('incomplete data for row', ind);
            failedData.push(dp);
        }
    });
    console.log(failedData);
    return {'validPoints':data, 'failedPoints': failedData};
}


function getDataPoint(xcol, ycol, xunit, yunit, $row){
    var xcell = $row.find('td').eq(xcol)
    var ycell = $row.find('td').eq(ycol)
    var x = parseElemForQty(xcell);
    var y = parseElemForQty(ycell);

    var retData;
    // if( x== undefined || y == undefined){console.log('x', x, 'y', y);}
    if (x !== null && y !== null){
        return {
            'name':$row.find('.mfg-partnumber a:first').text(),
            'dkname': $row.find('meta[itemprop=productID]').attr('content').replace('sku:',''),
            'x': toUnit(x, xunit).scalar,
            'y': toUnit(y, yunit).scalar,
            'usablePoint': true
        }

    }else{ 
        return {
            'name':$row.find('.mfg-partnumber a:first').text(),
            'usablePoint': false
        };
    }
}

function toUnit(q, unit){
    try{
        //console.log('q is', q, 'unit is ', unit);
        //console.log(Qty(q.format(unit).toString()));
        if (q != null){
            return Qty(q.format(unit).toString());
        }else{ return "NaN"}
    }catch(err){
        console.log('error converting ', err); return 'error Parsing';
    }
}

function drawChart(xcol, ycol){
    //TODO, give option to draw not log, vs log graphs
    //TODO always-on hover tooltip
    //TODO make each point clickable to new tab?
    var xname = $('#productTable').find('thead>tr:first th').eq(xcol).text();
    var yname = $('#productTable').find('thead>tr:first th').eq(ycol).text();
    var xunit = getNormalization(xcol);
    var yunit = getNormalization(ycol);
    var pointData = getChartSeriesData( xcol, ycol, xunit, yunit);

    $('#graphContainer').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: (yname + ' vs. ' + xname)
        },
        subtitle: {
            text: 'awesomeness'
        },
        yAxis: {
            title: {
                enabled: true,
                text: (yname +' '+getNormalization(ycol))
            },
            type: 'logarithmic',
            minorTickInterval: 10,
        },
        xAxis: {
            title: {
                text: (xname +' '+getNormalization(xcol))
            },
                        type: 'logarithmic',
            minorTickInterval: 1,
        },

        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.point.name}</b><br />',
                    pointFormat: '<br>{point.x}'+xunit+', {point.y}'+yunit
                }
            }
        },
        series: [{
            name: $('#famBreadCrumb').text(), //dependency identified
            color: 'rgba(223, 83, 83, .5)',
            data: pointData.validPoints,
            },]
    });
    

    $('.graphErrorNotice').text('There were '+ pointData.failedPoints.length +
        ' rows that were not included in this chart due to parsing errors.');
    console.log(pointData.failedPoints);

}

function formatQtyBox(){
    _log('formatQtyBox() Start',DLOG);
    var $srform = $('.quantity-form');
    $srform.find('label,input').appendTo($srform);
    $srform.wrap('<div id=srformdiv style="display:inline-block"/>');
    // $srform.wrap('<div id=srformdiv style="display:inline-block"/>');
    // $('.quantity-form').addClass('pure-form');
    // $srform.find('[name=quantity]').after('<input name="quantity" type="search" maxlength=9>').detach();
    $srform.find('[type=submit]:first').val('See Price @ qty');
    $srform.find('[type=submit]:last').val('x');
    $srform.find('.quantity-title').hide();
    // // $srform.css({'position':'relative', 'left': ($('.qtyAvailable:first').position().left-50)+'px'});
    // $('.quantity-form').css({
    //     'padding-left':'3px',
    //     'position':'relative', 
    //     'left': ($('.qtyAvailable:first').position().left-19)+'px',
    //     'top': '5px'
    //     });// hack to fix position
    // $('th.qtyAvailable, th.unitprice, th.minQty').css({'background':'#ddd'});

    // $srform.css({'margin-right': '10px', 'background':'#ddd'});

    //$srform.children().addBack().css({'display':'inline'});
    $srform.attr('title', $srform.find('p').text());
    $('#productTable').before($('#srformdiv'));
    $srform.find('p').detach();    // hide descriptive paragraph
    // _log('formatQtyBox() tick1',DLOG);
    $('p:contains("To see real-time pricing")').detach();   //hide the "To see reel-time pricing" paragraph
    $('#preProductTable').append($srform);
    _log('formatQtyBox() End',DLOG);
}

function fixImageHover(){
    _log('fixImageHover() Start',DLOG);
    $('.pszoomie').css({
        'border':'0px solid white', 
        'box-shadow': '0 0 10px 5px #888'
    });

    location.assign("javascript:$('.pszoomer').unbind('mouseenter mouseleave');void(0)");

    $('#productTable').hoverIntent(
        function () {
            var d = Math.min(640, 0.8 * Math.min($(window).width(), $(window).height()));
            $('#pszoomie').attr('src','');
            $('#pszoomie')
            .attr('src', $(this).attr('zoomimg'))
            .css('height', d)
            .css('width', d)
            .css('left', ($(window).width() - d) / 2)
            .css('top', ($(window).height() - d) / 2)
            .fadeIn(300);
        },
        function () {
            $('.pszoomie')
            .fadeOut(100);
        },
        '.pszoomer'
    );
    _log('fixImageHover() End',DLOG);
}

function fixAssociatedPartsForIndexResultsPage(){
    if($('.catfilterlink:first').attr('href').indexOf('part=') != -1){
        $('.catfilterlink').each(function(){
            var fullhref = $(this).attr('href');
            var queryarray = fullhref.split('?')[1].split('&');
            var baseurl = fullhref.split('?')[0].split('/');
            var catfamnumber = baseurl.pop();
            var currentitem = $(this);

            currentitem.wrap('<form action="/scripts/dksearch/dksus.dll" method="post" />');
            currentitem.after('<input type=hidden value="'+catfamnumber+'" name="cat" >');

            queryarray.forEach(function(attr){
                if (attr.indexOf('=') != -1){
                    currentitem.after('<input type=hidden value="'+attr.split('=')[1]+'" name="'+attr.split('=')[0]+'" >');
                    currentitem.attr('href',"#");
                    currentitem.click(function(){$(this).closest('form').submit()});
                }                
            })
        });
    }
}

function fixAssociatedPartInFilterForm(){
    var fullquerystring = window.location.search;
    if(fullquerystring.indexOf('&') != -1){
        var queryarray = fullquerystring.split('&');
        var parts = queryarray.filter(function(part){
             if(part.indexOf('part=') != -1){
                return true;
             }else{return false;}
        });
        if (parts.length > 0){
            parts = parts.map(function(part){
                return part.split('=')[1];
            }); 
            parts.forEach(function(part){
                $('#mainform').append('<input type="hidden" name="part" value="'+part+'">');
            });
        }
        // _log('fullquerystring is ' + fullquerystring , true);
    }
    else if($('#earlPH').length){
        var parts = $('#earlPH').val().split('&').filter(function(part){
             if(part.indexOf('part=') != -1){
                return true;
             }else{return false;}
        });
        if (parts.length > 0){
            parts = parts.map(function(part){
                return part.split('=')[1];
            }); 
            parts.forEach(function(part){
                $('#mainform').append('<input type="hidden" name="part" value="'+part+'">');
                $('#mainform').attr('action', "/scripts/dksearch/dksus.dll");
            });
        }
    }
}

function floatApplyFilters(){
    $('.filters-buttons').wrapAll('<div id=floatApply>');
    
    $(window).scroll(function(){
        $('.filters-buttons').children().css('left', $(window).scrollLeft() );
    });
    addSearchWithin();
    $('.filters-buttons').children().css('position', 'relative');
}

function addSearchWithin(){
    // dependancy on floatApplyFilters #floatApply div
    $('.filters-group').prepend('<label>Keyword Filters: <input type="text" name="k" style="margin-right:20px; padding-left:5px;" class="searchWithin" title="Provides a way to change your Keyword search while applying"></label>');
    $('.filters-group').css({padding:'0 0 3px 4px'});
    $('.searchWithin').val($('.dkdirchanger2').val());
}

function addFilterHider(){
}

function addtrueFilterReset(){
    // s = 3FFB = 16379,    v= 3FFF = 16383
    _log('addtrueFilterReset() Start',DLOG);
        var fv = $('#mainform').find('input[name=FV]').length ? $('#mainform').find('input[name=FV]').val() : '0' ;
    if (fv.split(',').length > 2){  
        var famlink = getFamilyLink().split('?')[0];
        $('#mainform').prepend('<div id=filterResetDiv class=gray-grad2 style="padding:5px 5px; width:auto;">'+
                '<span><b>Applied Filters: <b> </span>'+
                '<div id="tempdiv" style="display:none; postion:fixed;"></div>'+
                '<a id="startOverInFam" style="float:right" href='+famlink+'>Start Over in: '+$('.seohtagbold a:last').text()+'</a>'+
            '</div>');
        // _log('')
        setTimeout(function(){
            if (sessionStorage.getItem(famlink) == null){
                $('#tempdiv').load(famlink+' form[name=attform]', function(){
                    sessionStorage.setItem(famlink, htmlEscape($('#tempdiv').html()));
                    trueFilterCallback();
                    $('#tempdiv').empty();
                    _log('addtrueFilterReset() tagsnew',1);
                });
            }
            else {
                $('#tempdiv').append(htmlUnescape(sessionStorage.getItem(famlink)));
                    trueFilterCallback();
                    //_log('addtrueFilterReset() tagstored ' + $('#tempdiv').text(),1);
                    $('#tempdiv').delay(3000).empty();
                    _log('addtrueFilterReset() tagstored',1);
            }
        },200); 
    }
    _log('addtrueFilterReset() End',DLOG);
}

function trueFilterCallback(){
    _log('trueFilterCallback() Start',DLOG);
    var FVarray = $('#mainform').find('input[name=FV]:last').val().split(',');
    var masterResetArray = []; // [[name, pv],[],...]
    var x,y,pvnum,shiftedFV;
    $('#tempdiv').find('select').each(function(ind){
        masterResetArray.push([$(this).closest('table').find('th').eq(ind).text(),$(this).attr('name')]);
    });
    
    _log('masterResetArray ' + masterResetArray+'\n FVval ' +FVarray);
    for ( y=0; y < masterResetArray.length; y++){
        for(x=0; x < FVarray.length; x++){
            pvnum = parseInt(masterResetArray[y][1].replace('pv', '').replace('s','16379').replace('v','16383'), 10);
            shiftedFV = parseInt(FVarray[x],16)>>>18;
            // _log(FVarray[x] +' parsint>>18 ' +shiftedFV +'  '+ pvnum, DLOG);
            if(parseInt(FVarray[x],16)>>>18 == pvnum){
                // _log(FVarray[x] +' parsint>>18 ' +shiftedFV +'  '+ pvnum, DLOG);
                $('#filterResetDiv').append('<span class="trueReset trueResetButton" data-pvnum='+pvnum+' title="Click to Remove this Filter">'+ masterResetArray[y][0]+
                    ' <i class="fa fa-remove ired"></i></span>');
                console.log('pvnum', pvnum);
                    //                 $('#filterResetDiv').append('<span class="trueReset">'+ masterResetArray[y][0]+
                    // ' </span><button class="trueResetButton minimal" style="margin-right:20px" value="'+
                    // pvnum+'"">x</button> ');
                break;
            }
        }
    }

    $('.trueReset').click(function(){
        var x=0;
        var temparr=[];
        for(x=0; x< FVarray.length; x++){
            _log('datapvnum '+(parseInt(FVarray[x],16)>>>18) + ' '+ parseInt($(this).attr('data-pvnum'),10));
            if( (parseInt(FVarray[x],16)>>>18) != parseInt($(this).attr('data-pvnum'), 10) ){
                temparr.push(FVarray[x]);
            }
        }
        _log($('#mainform input[name=FV]').val());
        $('#mainform input[name=FV]').val(temparr.join(','));
        _log($('#mainform input[name=FV]').val());
        $('#mainform').submit();        
        // var x=0;
        // var temparr=[];
        // for(x=0; x< FVarray.length; x++){
        //     _log((parseInt(FVarray[x],16)>>>18) + ' '+ parseInt($(this).val(), 10));
        //     if( (parseInt(FVarray[x],16)>>>18) != parseInt($(this).val(), 10) ){
        //         temparr.push(FVarray[x]);
        //     }
        // }
        // _log($('#mainform input[name=FV]').val());
        // $('#mainform input[name=FV]').val(temparr.join(','));
        // _log($('#mainform input[name=FV]').val());
        // $('#mainform').submit();

    });
    _log('trueFilterCallback() End',DLOG);
}


function getParamList(){
    //TODO finish
    var myobject;

    if (localStorage.getItem(getFamilyLink()) == undefined){
        $('#filterResetDiv').load(getFamilyLink().replace('stock=1','stock=0')+' form[name=attform]', function(){
            myobject = {
                'lastupdate' : Date.getTime(),
                'selectlist' : $('#filterResetDiv').find('select')
            };
            return myobject.selectlist;
        });
    }
    else if (myobject.lastupdate+604800000 <= Date.getTime()) {

    }
    else {
        myobject = localStorage.getItem(getFamilyLink());
    }
    //return somearray
}

function wrapFilterClickFunc(somespan, buttonval){
    if(buttonval == 0){
        $('#selectboxdiv').addClass('wsnowrap').removeClass('morefilters lessfilters');
        $('#morefiltersbutton').hide();
    }
    else if( buttonval == 1){
        $('#selectboxdiv').removeClass('wsnowrap').addClass('morefilters');
        $('#morefiltersbutton').show();
    }
}


// function wrapFilterTable(){
//     _log('wrapFilterTable() Start',DLOG);
//     //button code
//     $('#mainform').wrap('<div id=mainformdiv />');
//     var thehtml = '<div id="wrapfilterschooser" class="tabbedbutton" style="display:inline-block;" title="Instead of scrolling horizontally the filters will wrap to the next line"><div>'+
//         '<input id="wrapFilters" value="0" class="saveState" type="hidden">' +
//         '<button id=wrapfilteron value=0 class="pure-button">Off</button>'+
//         '<button id=wrapfilteroff value=1 class="pure-button">On</button>'+
//         ' Wrap Filters'+
//     '</div></div>';
//     var originalSelects = $('.filters-panel').find('form[name=attform] select');
//     originalSelects.each(function(){
//         $(this).data('limitwidth', ($(this).width()+25));
//     })

//     $('.filters-panel').prepend(thehtml);   
//     addChooserButtonAction($('.filters-panel').find('#wrapfilterschooser'), wrapFilterClickFunc);
//     var $filtersPanel = $('.filters-panel');
//     // var $filtersPanel = $('.filters-panel').detach();
//     var $mainform = $filtersPanel.find('form[name=attform]');
//     $mainform.find('table').hide();
//     //end button code

//     var selectlist = $mainform.find('select');
//     selectlist.each(function(ind){
//         $(this).data('pname', $(this).closest('table').find('th:eq('+ind+')').text());
//         // _log('pv '+ $(this).attr('name') + ' columnname ' + 
//         //      $(this).closest('table').find('th:eq('+ind+')').text()
//             // );
//         });
//     $mainform.prepend('<div id=selectboxdiv class="morefilters" />');
    
//     $(selectlist.get().reverse()).each(function(){
//         var $thisSelect = $(this);
        
//         $mainform.find('#selectboxdiv').prepend(
//             '<div class="selectboxdivclass" style="max-width:'+ $thisSelect.data('limitwidth')+'px;"><b>'+ // this line forces the select header to wrap
//                 $thisSelect.data('pname')+'</b><br>'+$thisSelect.parent().html()+
//             '<br><a name="'+$thisSelect.attr('name')+'" class="clearselect" style="display:none; " href="#">clear</a></div>'
//         );
//         // if($(this).find('option').filter(':selected').length == 1){
//         //     $(this).find('.clearselect').css({visibility:'visible'});
//         // }
//     });
//     $filtersPanel.on('click','.clearselect', function(e){
//         e.preventDefault();
//         $filtersPanel.find('select[name="'+$(this).attr('name')+'"]').find('option').each(function(){
//             $(this).prop('selected',$(this).prop('defaultSelected'));
//         });
//         addApplyFiltersButtonHighlight();
//     });
//     // $('.seohtagbold:first').after($filtersPanel);  //part of a possible speedup detach, do stuff and reattach?  probably no benefit
//     $('#mainform').on('mouseup', 'option', function(){
        
//         if($(this).parent().find('option').filter(':selected').length >=1){
//             $(this).closest('div').find('.clearselect').show();
//         }else{
//             $(this).closest('div').find('.clearselect').hide();
//         }
//     })
    
//     $('#mainformdiv table').detach(); //use this instead of empty or remove to maintain speed

//     $('.filters-group').append(
//         '<div id="morefiltersbutton" class="cupid-green" style="float:right; width:200px; padding:2px; height:10px; cursor:pointer; margin-left:3px;">'+
        
//         '<span style="position:relative; top:-2px;"> + see all '+$('#mainformdiv div>select').length+' filters + </span><span style="display:none; position:relative; top:-2px;"> - see less filters - </span>'+
//         '</div>'+
//         '<div style="float:right;">'+
//             '<input style="float:right" type="checkbox" class="css-checkbox" value="1" name="filterAlwaysExpand" id="filterAlwaysExpand">'+
//             '<label class="css-label" for="filterAlwaysExpand">Always Expand</label>'+
//         '</div>'
//     );

//     //test area

//     // end test area

//     restoreInputState($('#filterAlwaysExpand'));
//     if($('#filterAlwaysExpand').val() == 1){
//         _log('filterAlwaysExpand ' + $('#filterAlwaysExpand').val(), true);
//         $('#selectboxdiv').toggleClass('morefilters lessfilters');
//         $('#morefiltersbutton span').toggle();
//     }
//     $('#morefiltersbutton').click(function(){
//         //$('#mainformdiv').animate({'height': '100%'},200);
//         $('#selectboxdiv').toggleClass('morefilters lessfilters');
//         $('#morefiltersbutton>span').toggle();
//         _log('finished morefiltersbutton click func', true);
//     });

//     if($('#wrapFilters').val() == 0){

//         $('#selectboxdiv').removeClass('morefilters lessfilters');
//         $('#morefiltersbutton').hide();
//         $('#selectboxdiv').addClass('wsnowrap');
//     }else{
//         //$('#selectboxdiv').removeClass('morefilters lessfilters');
//     }

//     location.assign("javascript:setupAttForm();void(0)");

//     _log('wrapFilterTable() End',DLOG);
// }

function wrapFilterTable(){
    _log('wrapFilterTable() Start',DLOG);
    //button code
    $('#mainform').wrap('<div id=mainformdiv />');
    var thehtml = '<div id="wrapfilterschooser" class="tabbedbutton" style="display:inline-block;" title="Instead of scrolling horizontally the filters will wrap to the next line"><div>'+
        '<input id="wrapFilters" value="0" class="saveState" type="hidden">' +
        '<button id=wrapfilteron value=0 class="pure-button">Off</button>'+
        '<button id=wrapfilteroff value=1 class="pure-button">On</button>'+
        ' Wrap Filters'+
    '</div></div><div class="dummydiv"></div>'; //remove dummydiv from here if explore mode comes back.
    var originalSelects = $('.filters-panel').find('form[name=attform] select');
    originalSelects.each(function(){
        $(this).data('limitwidth', ($(this).width()+25));
    })

    $('.filters-panel').prepend(thehtml);   
    addChooserButtonAction($('.filters-panel').find('#wrapfilterschooser'), wrapFilterClickFunc);
    var $filtersPanel = $('.filters-panel');
    // var $filtersPanel = $('.filters-panel').detach();
    var $mainform = $filtersPanel.find('form[name=attform]');
    $mainform.find('table').hide();
    //end button code

    var selectlist = $mainform.find('select');
    selectlist.each(function(ind){
        $(this).data('pname', $(this).closest('table').find('th:eq('+ind+')').text());
        // _log('pv '+ $(this).attr('name') + ' columnname ' + 
        //      $(this).closest('table').find('th:eq('+ind+')').text()
            // );
        });
    $mainform.prepend('<div id=selectboxdiv class="morefilters" />');
    
    $(selectlist.get().reverse()).each(function(){
        var $thisSelect = $(this);
        
        $mainform.find('#selectboxdiv').prepend(
            '<div class="selectboxdivclass" style="max-width:'+ $thisSelect.data('limitwidth')+'px;"><b>'+ // this line forces the select header to wrap
                $thisSelect.data('pname')+'</b><br>'+$thisSelect.parent().html()+
            '<br><a name="'+$thisSelect.attr('name')+'" class="clearselect" style="display:none; " href="#">clear</a></div>'
        );
        // if($(this).find('option').filter(':selected').length == 1){
        //     $(this).find('.clearselect').css({visibility:'visible'});
        // }
    });
    $filtersPanel.on('click','.clearselect', function(e){
        e.preventDefault();
        $filtersPanel.find('select[name="'+$(this).attr('name')+'"]').find('option').each(function(){
            $(this).prop('selected',$(this).prop('defaultSelected'));
        });
        addApplyFiltersButtonHighlight();
    });
    // $('.seohtagbold:first').after($filtersPanel);  //part of a possible speedup detach, do stuff and reattach?  probably no benefit
    $('#mainform').on('mouseup', 'option', function(){
        
        if($(this).parent().find('option').filter(':selected').length >=1){
            $(this).closest('div').find('.clearselect').show();
        }else{
            $(this).closest('div').find('.clearselect').hide();
        }
    })
    
    $('#mainformdiv table').detach(); //use this instead of empty or remove to maintain speed

    $('.filters-group').append(
        '<div id="morefiltersbutton" class="cupid-green" style="float:right; width:200px; padding:2px; height:10px; cursor:pointer; margin-left:3px;">'+
        
        '<span style="position:relative; top:-2px;"> + see all '+$('#mainformdiv div>select').length+' filters + </span><span style="display:none; position:relative; top:-2px;"> - see less filters - </span>'+
        '</div>'+
        '<div style="float:right;">'+
            '<input style="float:right" type="checkbox" class="css-checkbox" value="1" name="filterAlwaysExpand" id="filterAlwaysExpand">'+
            '<label class="css-label" for="filterAlwaysExpand">Always Expand</label>'+
        '</div>'
    );

    //test area

    // end test area

    restoreInputState($('#filterAlwaysExpand'));
    if($('#filterAlwaysExpand').val() == 1){
        _log('filterAlwaysExpand ' + $('#filterAlwaysExpand').val(), true);
        $('#selectboxdiv').toggleClass('morefilters lessfilters');
        $('#morefiltersbutton span').toggle();
    }
    $('#morefiltersbutton').click(function(){
        //$('#mainformdiv').animate({'height': '100%'},200);
        $('#selectboxdiv').toggleClass('morefilters lessfilters');
        $('#morefiltersbutton>span').toggle();
        _log('finished morefiltersbutton click func', true);
    });

    if($('#wrapFilters').val() == 0){

        $('#selectboxdiv').removeClass('morefilters lessfilters');
        $('#morefiltersbutton').hide();
        $('#selectboxdiv').addClass('wsnowrap');
    }else{
        //$('#selectboxdiv').removeClass('morefilters lessfilters');
    }

    location.assign("javascript:setupAttForm();void(0)");

    _log('wrapFilterTable() End',DLOG);
}

function squishedFilters(){
    // hover animation in advancedsearch.css
    var $selects = $('#mainform').find('select');
    $selects.addClass('fullwidth');
    $selects.parent().addClass('fullwidth');
}

function enableDefaultQty(){
    if(localStorage.getItem('qtydefault') == 1) {
        if($('a.catfilterlink').length) {
            //setTimeout(function(){
                addQuantityToCatFilterLinks();
                //},5);
        }
        $('.engquan').removeAttr('disabled');
        $('.colsort').removeAttr('disabled');
        $('.engquan').val($('#qtydefaulttext').val());
    }
}

function formatIndexResultsPage(){
    if($('.catfilterlink').length){
        _log('formatIndexResultsPage() Start',DLOG);
        $('body').addClass('indexPage');
        addIndexPicPrev();
        if(localStorage.getItem('qfControl') == 1) {
            // addQuickFilter3();
        }
        $('h1:contains(Electronic)').hide();
        //fixAssProdFamilyLinks();
        if(localStorage.getItem('instantfilter') == 1){
            console.log('instant filter loaded');
            indexInstantFilter3();
        }

        akamaiLazyLoadFixForIndexResults();

        enableDefaultQty();
        fixAssociatedPartsForIndexResultsPage();

        var productTree = storeProductIndexTree();
        var topResultsData = getTopResultsData();
        // console.log(productTree);
        _log('formatIndexResultsPage() log1',1);
        newProductIndexDiv(productTree)
        _log('formatIndexResultsPage() log2',1);
        addSideIndex(productTree);
        handleTopResults3(topResultsData);
        addFullResultsTitle();
        addProductIndexThumbs();//dependent on fullresults title and newproductindexdiv

        addIndexColumnizerControls();
        addCategorySprites2();

        addToTopButton();
        $('#content').css({'margin':'0px','padding':'0px 10px 10px 10px'});// for the sidebar separator
        $('#headKeySearch').focus();

        _log('formatIndexResultsPage() End',DLOG);
    }
}

function addSideIndex(productTree){
    // $('#content').wrap('<div class="mainFlexWrapper" style="position:relative; top:70px;"/>');
    $('.mainFlexWrapper').prepend('<div class="sideIndex"><div class="sideIndexContent"><div class="sideIndexTitle"><a href="'+gIndexLink+'">Index</a> <a href="#content" style="margin-left:auto; margin-right: 4px;">top</a></div></div></div>');
    var sidetext = '';
    productTree.forEach(function(item){
        //$('.sideIndexContent').append(
            sidetext = sidetext + '<li style="display:flex; align-items:center;"><a href="#'+selectorEscape(item.category)+'">'+item.category+'</a></li>'
        //);
    });
    $('.sideIndexContent').append(sidetext);
    // $('.sideIndex').css('width',($('.sideIndexContent').width()+50)+'px'); //needs to be there for chrome when using display:flex
    $('.sideIndex').css('width',(300)+'px'); //needs to be there for chrome when using display:flex
    // alert($('.sideIndexContent').width());
    $('.sideIndexContent').addClass('fixedsticky').css('top','55px').fixedsticky();
    // $('.sideIndexContent').addClass('fixedsticky').css('top','50px');
    // $('#footer').addClass('fixedsticky').fixedsticky();

    //addCategorySprites2();

    $('.sideIndexContent a').click(smoothScrollToCat);
}

function smoothScrollToCat(e){
    e.preventDefault();
    var destinationHref = $(this).attr('href');
    var dpos = $(destinationHref).position().top;
    var clickedon = $(e.target);
    // clickedon.remove();
    // $('.catfilteritem').not($(destinationHref).closest('.catfilteritem')).fadeTo('fast', .5);
    $('.sideIndexContent a').css({'background': ''});
    setTimeout(function(){clickedon.css({'background':'#ddd'});}, 1);
    $('html,body').animate(
        {scrollTop: dpos-0},
        {       
        duration: 250,
        easing: 'swing', 
        complete: function(){
            //hack to get around the complete function firing early and getting stomped on by the scroll event
            // $(destinationHref).closest('.catfilteritem').fadeTo(0,1);
            // $('.catfilteritem').not($(destinationHref).closest('.catfilteritem')).fadeTo('slow', 1)
            clickedon.css({'background':'#ddd'});
            // setTimeout(function(){clickedon.css({'background':'#ddd'});}, 1);
        }   
    });
    $('.catfilteritem h2').removeClass('highlightCat');
    //get the parent catfilteritem and set highlight background
    $(destinationHref).closest('h2').addClass('highlightCat');

    // $(destinationHref).closest('.catTitle').animate({'background-color': 'red'}, 3000);
}

function addFullResultsTitle(){
    //add Full Results title bar to separate top results from full results. Use keyword in title if available.
    var keyword = $("#headKeySearch").val();
    if(keyword !=''){
        $('#productIndexDiv').before(
            // '<div id="fullResultsTitle" style="width:100%; border: 1px solid #ccc; background:#eee; padding:3px; margin:3px 20px 3px 0px;">'+
            '<div id="fullResultsTitle" class="" style="display:flex;  background:#888; height:25; padding:5px; margin:8px 0px 10px 0px; color:white;">'+
            '<div style="display:flex; font-weight:bold; font-size:15px;">Full Results for <span style="font-size:15px; font-weight:bold; font-style:italic;">&nbsp'+keyword+'</span></div>'+
            '</div>'
        );  
    }else{

        $('#productIndexDiv').before(
            // '<div id="fullResultsTitle" style="width:100%; border: 1px solid #ccc; background:#eee; padding:3px; margin:3px 20px 3px 0px;">'+
            '<div id="fullResultsTitle" class="" style="display:flex;  background:#888; height:25; padding:5px; margin:0px 0px 10px 0px; color:white;">'+
            '<div style="display:flex; font-weight:bold; font-size:15px;">Full Results</div>'+
            '</div>'
        );
    }
        $('#fullResultsTitle').append($('.matching-records').css({'margin':'auto auto',}));

}

function handleTopResults3(trdata){
    var keyword = $("#headKeySearch").val();
    if(keyword !="" && $('#quickPicksDisplay').length > 0){
        var resultList = $('#quickPicksDisplay li');
        // console.log(resultList);
        $('#quickPicksDisplay').remove();

        var topResultsHTML = '<div id="topResultsContainer" class="box effect1">'+
            '<div class="topResultsTitle"><i class="fa fa-arrow"></i>Top Families for <span style="font-size:15px; font-style:italic;">&nbsp'+keyword+'</span></div>'+
            '<div class="topResultsBody" ></div>'+
        '</div>';

        $('#content').prepend(topResultsHTML);
        
        $('.topResultsBody').append( '<table id="topResultsTable"><tbody><tr style="font-weight:bold;"><td>Family</td><td>Category</td></tr></tbody></table>');
        var rows = '';
        var trt = $('#topResultsTable tbody');
        var regExp = /\(([^)]+)\)/;
        trdata.forEach(function(elem){
            trt.append('<tr><td></td><td></td></tr>');
            trt.find('tr:last td:first').append(elem.famLink);
            trt.find('tr:last td:first').append( ' ('+ elem.count + ') ');
            trt.find('tr:last td:last').append('<a class="catjumpto" href="#'+selectorEscape(elem.cat)+'">'+elem.cat+'</a>');
        });

        $('.catjumpto').click(smoothScrollToCat);
        // $('head').append('<style></style>');

        $('#topResultsContainer a').css("textDecoration", "none");
    }
}


function getTopResultsData(){
    var trdata =[];
    var resultList = $('#quickPicksDisplay li');
    var itemsRE = /\(\d+\sitems\)/;
    var itemsREnot = /^(\(\d+\sitems\)).+/;
    resultList.each(function() {
        var famLink = $(this).find('a');
        var cat = $(this).contents().filter(function() {return this.nodeType == 3;}).text().replace(itemsRE, '').trim();
        var count = itemsRE.exec($(this).contents().text()).toString().replace(/\(|\)|\sitems/g, '');

        trdata.push ({
            'famLink':famLink,
            'cat': cat,
            'count': count
        });
    });
    return trdata;
}

function getTopResultsCategories(trdata){
    //collects all the categories represented in the Top Results box
    var array = [];
    trdata.forEach( function(item) {
        array.push(selectorEscape(item.cat));
    });
    return uniqueArray(array).reverse();
}

function storeProductIndexTree(){
    var container = []; 
        $('#productIndexList>li').each(function(){
            var oneCategory = $(this);
            var familyTree = [];
            oneCategory.find('.catfiltersub>li').each(function(){
                familyTree.push(getFamilyItemFromListElem(this)); 
            });
            // console.log('familyTree');
            container.push({
                'category': oneCategory.find('.catfiltertopitem').text(), 
                'catlink': oneCategory.find('.catfiltertopitem a').attr('href'), 
                'families': familyTree
            })  ;
        });
        //console.log(container);
    return container;
}

function getFamilyItemFromListElem(item){
    // var itemsRE = /\(\d+\sitems\)/;
    // var count = itemsRE.exec($(item).contents().text()).toString().replace(/\(|\)|\sitems/g, '');
    // count = parseInt(count);
    var resultCount = $(item).contents().filter(function(){return this.nodeType ===3;}).text().replace('(','');
    var count = parseInt(resultCount);

    // console.log('getFamilyItemFromListElem');

    var name = $(item).find('a').text();
    var link = $(item).find('a').attr('href');
    var famID = $(item).find('a').attr('href').split('/');
    famID = famID[famID.length-1];
    return {
        'name': name,
        'count': count,
        'link': link,
        'famId':  famID
    };
}


function newProductIndexDiv(productTree){
    $('#productIndexList').after('<div id="productIndexDiv" class="" style="white-space:normal;" />').detach();

    productTree.forEach(function(item){
        buildCategoryItem(item);
    });
    
    $('#productIndexDiv').on('click', '.familiesContainer', function(){
        if($(this).closest('.catContainer').hasClass('plContainerized')){
            window.location = ($(this).find('a').attr('href'));
        }
    })

}

function addProductIndexThumbs(){
    $('.catContainer').addClass('plTextOnly');
        $('.famItemContainer').each(function(){
        // var root = 'http://www.digikey.com'+$(this).find('.famTitle a').attr('href').split('?')[0];
        var root = $(this).find('.famTitle a').attr('href').replace('product-search/en/','').split('?')[0];
        // console.log(root);
        var famitem = $(this);
        if (exampleFamilyImages[root] != undefined){
            exampleFamilyImages[root].slice(0,3).forEach(function(item, ind){
                // console.log(root, item);
                famitem.find('.familyimages').append('<img class=lazyimg data-original="'+item+'">');
            })
        }
    });
    $('.lazyimg').lazyload({
        skip_invisible: true,
        threshold : 800
    });
    $('.catTitle').append('<div class="piThumbIcons"><i class="piText fa fa-list fa-2x"></i><i class="piThumbs fa fa-th fa-2x"></i></div>')


    $('#productIndexDiv').on('click', '.piText', function(){
        // $('#productIndexDiv').toggleClass('plTextOnly plContainerized');
        $(this).closest('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
        $(window).scrollTop($(window).scrollTop()+1);
    })
    $('#productIndexDiv').on('click', '.piThumbs', function(){
        // $('#productIndexDiv').toggleClass('plTextOnly plContainerized');
        $(this).closest('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
        $(window).scrollTop($(window).scrollTop()+1);
    })

    $('#fullResultsTitle').append('<div class="piThumbIconsAll">'+
        '<input id="indexThumbsState" type="hidden" class="saveState" value=0>'+
        '<button id="piTextAllButton" class="pure-button" value=0>'+
        '<i class="piTextAll fa fa-list fa-lg"></i></button>'+
        '<button id="piThumbsAllButton" class="pure-button" value=1><i class="piThumbsAll fa fa-th fa-lg"></i></button>'+
        ' Images</div>'
        );

    restoreInputState($('#indexThumbsState'));
    // _log($('#columnchooserstate').length);
    if($('#indexThumbsState').val() == 0){
        _log('indexThumbsState off', DLOG);
        $('#piTextAllButton').addClass('myRedButton');
        $('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
    }else if($('#indexThumbsState').val() == 1){
        _log('indexThumbsState columns', DLOG);
        $('#piThumbsAllButton').addClass('myRedButton');
        $('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
    }



    $('#fullResultsTitle').on('click', '#piTextAllButton', function(){
        localStorage.setItem('indexThumbsState', $(this).val());
        $('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
        // console.log('textall',$('.piThumbIconsAll').find('button'))
        $('#piThumbsAllButton').removeClass('myRedButton');
        // $('.piThumbIconsAll').find('button').addClass('hello').removeClass('myRedButton');
        $('#piTextAllButton').addClass('myRedButton');

        $(window).scrollTop($(window).scrollTop()+1);
    })
    $('#fullResultsTitle').on('click', '#piThumbsAllButton', function(){
        localStorage.setItem('indexThumbsState', $(this).val());
        $('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
        $('#piTextAllButton').removeClass('myRedButton');
        $('#piThumbsAllButton').addClass('myRedButton');
        //         console.log('thumball', $('.piThumbIconsAll').find('button'));

        $(window).scrollTop($(window).scrollTop()+1);
    })



}

function buildCategoryItem(catItem){
    var catSelector = selectorEscape(catItem.category.replace(/\s/g, ''));
    $('#productIndexDiv').append('<div id="'+selectorEscape(catItem.category)+'" class="box effect1 catContainer '+catSelector+'" data-view=0>'+
        '<div class="catTitle"><a href="'+catItem.catlink+'">'+catItem.category+'</a></div>'+
        '<div id="cat-'+catSelector+'" class="familiesContainer"></div>'+
        '</div> ');

    // _log('newprod1'+catItem.category)
    var fams = catItem.families;
    var htmltext = ''
    for(var i in fams){
        htmltext += buildFamilyItemHTML(fams[i], catSelector);
    }
    $('#cat-'+catSelector).append(htmltext);
    // _log('newprod2')

}

function buildFamilyItemHTML(fam, catSelector){
        // console.log(fam);
        //TODO make toggle for pictures/index
        var famSelector = selectorEscape(fam.name.replace(/\s/g, ''));
        // $('#cat-'+catSelector).append('<div class="famItemContainer fam-'+famSelector+'">'+'<div class="fcount">('+fam.count+')</div>'+
        return'<div class="famItemContainer fam-'+famSelector+'">'+'<div class="fcount">('+fam.count+')</div>'+
            '<div class="famTitle"><a href="'+fam.link+'">'+fam.name+'</a> </div> '+
            '<div class="familyimages"></div> '+
            '</div>';
        // getCachedImagesForFamily(fam, catSelector, fam.link, MOCKPICS);
}

// function 

function categoryDivWrap(){
    _log('categoryDivWrap() Start',DLOG);
    $('.catfiltertopitem').each(function(){
        $(this).next('ul').addBack().wrapAll('<div />');
    });
    _log('categoryDivWrap() End',DLOG);
}

function addIndexColumnizerControls(){
    //Adds off, right, top controls to the top index results page
    _log('addIndexColumnizerControls() Start',DLOG);
    var thehtml = '<span id="columnchooser" style="margin-left:auto;" >'+
        '<input id="columnchooserstate" type="hidden" value="2" class="saveState">'+
        '<button id=cwfull value=0  class="pure-button"><i class="fa fa-minus fa-lg"></i></button>'+
        '<button id=cw300 value=1 class="pure-button"><i class="fa fa-bars fa-lg fa-rotate-90"></i></button>'+
        '<button id=cw301 value=2 class="pure-button"><i class="fa fa-bars fa-lg"></i></button>'+
        ' columns'+
    '</span>';
    $('#fullResultsTitle').append(thehtml);

    restoreInputState($('#columnchooserstate'));
    // _log($('#columnchooserstate').length);
    if($('#columnchooserstate').val() == 0){
        _log('columnchooserstate off', DLOG);
        $('#cwfull').addClass('myRedButton');
    }else if($('#columnchooserstate').val() == 1){
        _log('columnchooserstate columns', DLOG);
        $('#cw300').addClass('myRedButton');
        $('#productIndexDiv').addClass('catColumns');
    }else if($('#columnchooserstate').val() == 2){
        _log('columnchooserstate lines', DLOG);
        $('#productIndexDiv').addClass('familyColumns');
        $('#cw301').addClass('myRedButton');
    }

    $('#columnchooser button').on('click', function(){
        localStorage.setItem('columnchooserstate', $(this).val());
        if(localStorage.getItem('columnchooserstate') == 0){
            $('#productIndexDiv').removeClass('familyColumns').removeClass('catColumns')
        }else if(localStorage.getItem('columnchooserstate') == 1){
            $('#productIndexDiv').addClass('catColumns').removeClass('familyColumns');
        }else if(localStorage.getItem('columnchooserstate') == 2){
            $('#productIndexDiv').addClass('familyColumns').removeClass('catColumns');
        }
        $('#columnchooser button').removeClass('myRedButton');
        $(this).toggleClass('myRedButton');
    }).css('padding','3px 3px 3px 3px');

    _log('addIndexColumnizerControls() End',DLOG);
}

function addQuickPicksDisplayControls(){
    //Adds the Off, |||, = columns and off, right, top controls to the top of the quick
    _log('addQuickPicksDisplayControls() Start', DLOG);
    var thehtml = '<span id="qpchooser" style="position:relative; top:70px; margin-left:20px; z-index:6;" >'+
        '<input type=hidden id=qfLocation class="saveState" value="2">' +
        '<button id=qpoff value=0 class="pure-button">Off</button>'+
        '<button id=qpside value=1 class="pure-button">Right</button>'+
        '<button id=qptop value=2 class="pure-button">Top</button>'+
        ' Jump To / Top Results Box'+
    '</span>';
    $('#content').before(thehtml);
    restoreInputState($('#qfLocation'));
    $('#qpchooser').val($('#qfLocation').val());

    if($('#qfLocation').val() == 0){
        _log('qpchooser off', DLOG);
        $('#qpDiv').hide();
        $('#qpoff').addClass('myRedButton');
        // $('#qpside').addClass('clean-gray');
        // $('#qptop').addClass('clean-gray');
    }else if($('#qfLocation').val() == 1){
        _log('qpchooser columns', DLOG);    
    
        // $('#qpoff').addClass('clean-gray');
        $('#qpside').addClass('myRedButton');
        // $('#qptop').addClass('clean-gray');
    }else if($('#qfLocation').val() == 2){
        _log('qpchooser lines', DLOG);

        // $('#qpoff').addClass('clean-gray');
        // $('#qpside').addClass('clean-gray');
        $('#qptop').addClass('myRedButton');
    }

    $('#qpchooser button').on('click', function(){
        $('#qfLocation').val($(this).val());
        localStorage.setItem('qfLocation', $(this).val());
        _log($('#qfLocation').val() + ' qflocation val -- '+ $(this).val());
        if($('#qfLocation').val() == 0){
            $('#qpDiv').hide();
            _log('hiding qpdiv');
        }else if($('#qfLocation').val() == 1){
            $('#qpDiv').removeClass().addClass('rightside').show();
            $('#qpHandle').show();
            _log('rightside qpdiv');
        }else if($('#qfLocation').val() == 2){
            $('#qpDiv').removeClass().addClass('topside').show();
            _log('topside qpdiv');
            $('#qpHandle').hide();
        }

        $('#qpchooser button').removeClass('myRedButton');
        $(this).toggleClass('myRedButton');
    }).css('padding','3px 3px 3px 3px');

    _log('addQuickPicksDisplayControls() End', DLOG);
}

//TODO Evaluate if needed
function fixAssProdFamilyLinks(){
    //trying to fix the problem of associated product being in multiple families and the links to those families not working.... 
    //not working for now
    _log('fixAssProdFamilyLinks() Start',DLOG);
    $('.catfilterlink[href*="part="]').each(function(){
        var myhref = $(this).attr('href').split('?')[1];
        var mypath = $(this).attr('href').split('?')[0];
        var qarray = myhref.split('&');
        var partarray =[];
        var otherparams =[];
        var partsHTML = '';
        $(this).wrap('<form method="post" action="/scripts/dksearch/dksus.dll" />');
        for(var x=0; x<qarray.length; x++){
            if (qarray[x].indexOf('part=')!= -1){
                $(this).parent().append('<input type="hidden" name="part" value="'+qarray[x].replace(/part\=/i,'')+'">');
                //partarray.push(qarray[x].replace(/part\=/i,''));
            }
            else{
                otherparams.push(qarray[x]);
            }
        }
        
        $(this).parent().append('<input type="hidden" cat=>');
        $(this).click(function(){
            $(this).parent().submit();
        });
        _log(partarray);
    });
    _log('fixAssProdFamilyLinks() End',DLOG);
}

function addIndexPicPrev(){
    _log('addIndexPicPrev() Start',DLOG);
    if(localStorage.getItem('picPrevControl') == 1) {
        setTimeout(function(){
            $('.famTitle a').tooltipster({
                content: $('<div class=picPrev><div class=picPrevTitle /> <div class=picPrevBody></div></div>'),
                trigger: 'hover',
                delay: 350,
                // contentCloning: true,
                position: 'bottom-right',
                // interactive: true,
                positionTracker: false,
                onlyOne: true,
                iconTouch: true,
                functionReady: function(origin){

                    var queryCheckedURL = ($(this).attr('href').indexOf('?') != -1) ? 
                                            ($(this).attr('href') + '&stock=1&pageSize=100&akamai-feo=off') : 
                                            ($(this).attr('href') + '?stock=1&pageSize=100&akamai-feo=off');
                    var onlink = $(this);
                        
                    $('.picPrevBody').html('** loading pictures**<br><div class=loader />')

                    if(sessionStorage.getItem(queryCheckedURL) == undefined){
                        $('.picPrevBody').load(queryCheckedURL + ' img.pszoomer', function() {
                            $('.picPrevTitle').html('<span style="vertical-align:top" height="100%"> Example pictures of <b>'+
                                onlink.text() +'</b> (up to first 100 in stock):</span><br> '
                             );
                            $('.picPrevBody').find('img').each(function() {
                                $(this).css('height', '64px');
                                $('img[src="'+$(this).attr('src')+'"]:gt(0)').hide();
                                // $('this').attr('alt','').attr('title', '');
                            });
                            $('.picPrevBody').find('img').attr('alt','').attr('title', '');

                            if($('.picPrevBody').find('img').length == 0){
                                $('.picPrevBody').html('----no pics exist?');
                            }
                            sessionStorage.setItem(queryCheckedURL, $('.picPrev').html());
                            origin.tooltipster('reposition');

                        });
                    }else{
                        $('.picPrev').html(sessionStorage.getItem(queryCheckedURL));
                        origin.tooltipster('reposition');
                    }
                }
            });
            console.log('tooltipster');
        },1000)
    }
    _log('addIndexPicPrev() End',DLOG);
}

function formatDetailPage(){
    if($('#reportpartnumber').length){
        _log('formatDetailPage() Start',DLOG);
        var tablegeneralcss = {
            'border-radius': '5px',
            'border-spacing': '0',
            'border': '0px solid #ccc'
        };
        var trtdcss = {
            'border': '1px solid #ccc'
        };

        var priceTable = $('#reportpartnumber').parent().parent().parent();
        var discPriceTable = priceTable.parent().find('table:contains("Discount Pricing")');
        var digireelTable = $('.product-details-reel-pricing');
        $('.request-quote-description').hide();
        // var dataTable = $('table:contains("Category")');
        var dataTable = $('#errmsgs').siblings('table:eq(1)').find('table:first');
        
        //$('.beablock').removeClass('beablock');
        $('.beablock').css({
        'border-radius': '5px',
        'border': '1px solid #ccc'
        });
        
        priceTable.css(tablegeneralcss);
        priceTable.find('td,th').css(trtdcss);
        digireelTable.css(tablegeneralcss);
        digireelTable.find('td,th').css(trtdcss);
        discPriceTable.css(tablegeneralcss);
        discPriceTable.find('td,th').css(trtdcss);
        dataTable.css(tablegeneralcss);
        dataTable.find('td,th').css(trtdcss);
        

        $('.psdkdirchanger').parent().hide(); // removes the extra search box on the item detail page

        $('.update-quantity').insertAfter('.product-details');
        // $('.product-details-discount-pricing').css({'display':'inline'});
        // $('.update-quantity').css({'display':'inline'});
        $('.catalog-pricing').append($('.product-details-discount-pricing'));
        $('.product-details-discount-pricing br').hide();
        $('.update-quantity br').hide();
        $('.product-details-discount-pricing tr:last').css({'background':'#eeeeee'});
        $('#pricing th').css({'background-color':'#555'});


        //addAssProdLinkToFilters();
        ap.addAssociatedProductViewer();
        addReverseFiltering(dataTable);
        addToTopButton();

        addPriceBreakHelper();

        addDataSheetLoader();
        makeImageHolder();
        addDetailHoverMainImage();
        // addDashNDHover();

        // add3dCad();
        if($('.seohtagbold').find('a[href$=525140]').length == 1){
            addCOBLEDWizard();
        }

        $('td:contains("obsolete") p').css('background-color','#FF8080'); // changes the color of the obsolete callout
        // $('#content').css({'position':'relative', 'top': '45px'});

        _log('formatDetailPage() End',DLOG);
    }
}

function addDetailHoverMainImage(){
    $('.beablock-image img:first').tooltipster({
        content: $('<div class=detailHoverImage><div class=detailHoverTitle /> <div class=detailHoverBody> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'right',
        // interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(){ $('.detailHoverBody').html('<img src="'+$(this).parent().attr('href')+'">')}
    })
}

function add3dCad(){
    _log('add3dCad() start',DLOG);
    var items = $('a[href$="igs"]:first');

    if (items.length !== 0 ){
        $('#content').append('<div>sharecad</div><iframe width="800" height="800" src="//sharecad.org/cadframe/load?url='+items.attr('href')+'" scrolling="no"></iframe>');
    }
    // if (items.length !== 0 ){
    //     // $('#content').append('<div>sharecad</div><iframe width="800" height="800" src="//sharecad.org/cadframe/load?url='+items.attr('href')+'" scrolling="no"></iframe>');
    //     $('#content').append("<div id='iframe3DviewerContainer' style='width:400px;height:210px;border-width: 2px; border-style: solid; border-color: black;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;'><iframe id='iframe3dvieweronline' type='text/html' width='400' height='210' src='http://www.3dvieweronline.com/iframe.php?bg=&textcolor=&text=VIEW THE MODEL' scrolling='no' frameborder='0'/><p>Your browser does not support iframes.</p></iframe></div><div style='font-size:12px;'><strong>Powered by <a href='http://www.3dvieweronline.com' target=_blank>3D Viewer online</a></strong> Allow Pop-Up to use the viewer</div>");
    // }

    _log('add3dCad() end',DLOG);
}

function addCOBLEDWizard(){
    _log('addCOBLEDWizard() start',DLOG);
    var voltageOutput = 'pv48';
    var currentOutputMax = 'pv1120';
    var id = 'ledwiz';
    var param1 = 'Voltage - Forward (Vf) (Typ)';
    var param1Escaped = selectorEscape(param1);
    var param2 = 'Current - Test';
    var param2Escaped = selectorEscape(param2);
    var param1Text = getParametricValueText(param1);
    var param2Text = getParametricValueText(param2);
    var driverLink = '/product-search/en/power-supplies-external-internal-off-board/led-supplies/591038';

    $('.attributes-optional-table').prepend('<div id="'+id+'" style="width:100%;" class="panel panel-default">'+
        '<div class="panel-heading">Compatible Driver Wizard</div>'+
            '<div class="panel-body" style="padding:10px; ">'+
                '<div class="" style="line-height:2em; display:inline-block;">'+
                    'Find Drivers with Vout Max of at least '+
                    '<input id="'+param1Escaped+'" type="text" size='+param1Text.length+' value="'+param1Text+'">'+
                    ' and Current Output Max of less than <input id="'+param2Escaped+'" type="text" value="'+param2Text+'"> '+
                '</div>'+
                // '<div class="" style="line-height:2em; display:inline-block;"></div>'+
                '<div><div id="compatibleDriverWizzardButton" class="button-small pure-button">See Compatible Drivers</div></div>'+
                '<div class="hiddenLEDForm" ></div>'+
                // '<div class="hiddenLEDForm" style="display:none;"></div>'+
            '</div>'+
        '</div>');


    // var param2Text = $('.attributes-table-main').find('tr:contains("'+param2+'")').last().find('td').text();

    $('#compatibleDriverWizzardButton').click(function(){
        console.log(driverLink);
        $('#compatibleDriverWizzardButton').after('<img class="loadingicon" style="margin-left:10px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
        $('.hiddenLEDForm').load(driverLink+' [name=attform]', function(){
            $('form[name=attform]').attr('target', '_blank').hide();
            var vOptions = $(this).find('[name='+voltageOutput+'] option');
            var cOptions = $(this).find('[name='+currentOutputMax+'] option');
            // console.log(cOptions);

            selectSingleValueOptions(cOptions, '<', Qty(param2Text) );
            selectRangeValueOption(vOptions, Qty(param1Text));

            location.assign("javascript:function methodChooser(f) { var serializedEarl = $(f).serialize(); f.method = serializedEarl.length < 1800 ? 'get' : 'post'; return true; } void(0)");
            location.assign("javascript:$('form[name=attform]').submit(); void(0)");
            $('.loadingicon').remove();
            _log('driver wizard done');
            return true;
        });
    });

    hoverHighlightDetailWizParams(param1, $('#'+id));
    hoverHighlightDetailWizParams(param2, $('#'+id));
    
    _log('paramtext '+ param1Text + param2Text, DLOG);

    _log('addCOBLEDWizard() End',DLOG);
}

function selectSingleValueOptions($options, operator, qtyValue ){
    _log('selectSingleValueOptions() Start', DLOG);
    var doNotMatch = '-*';
    if (operator === '<'){
        $options.each(function(){
            var opText = $(this).text().trim();
            if(doNotMatch.indexOf(opText) == -1){
                if(qtyValue.gte(parseElemForQty($(this)))) {
                    $(this).prop('selected',true);
                    // console.log(parseElemForQty($(this)));
                }
            }
            //console.log(qtyValue, parseElemForQty($(this)));
        });
    }
    _log('selectSingleValueOptions() End', DLOG);
}

function selectRangeValueOption($options, qtyValue){
    _log('selectRangeValueOption() Start', DLOG);
    //only checked in LED supplies family
    var doNotMatch = '-*';
        $options.each(function(){
            var opText = $(this).text();
            try{
                opText = $(this).text().trim();
                if(doNotMatch.indexOf(opText) == -1){
                    if(opText.indexOf('~') !== -1 || opText.indexOf('Max') !== -1){
                        // _log('Range to Process '+ opText, DLOG);
                        var range = processRangeText(opText);
                        // _log('After Range Process' + range, DLOG);
                        var fval = preProcessForQty(range[0]);
                        var sval = preProcessForQty(range[1]);
                        if( qtyValue.gte(fval) && qtyValue.lte(sval)){
                            $(this).prop('selected',true);
                        }
                    }else{
                        if(opText.indexOf('AC') !== -1){

                        }else{
                            var singleVal = preProcessForQty(opText);
                            var singleValQty = Qty(singleVal);
                            if(qtyValue.eq(singleValQty)){
                                $(this).prop('selected',true);
                            }
                        }
                    }
                }
            }catch(e){
                console.log('selectRangeValueOption failed to parse', opText, ' error ', e);
            }
        });
    _log('selectRangeValueOption() End', DLOG);
}
function processRangeText(rtext){
    //only check in LED supplies family
    if(rtext.indexOf('Max') !== -1){
        rtext = rtext.replace(' (Max)', '');
        // console.log(' rtext ', rtext, ' base ');
        var baseUnit = rtext.replace(/^.*\d(.*)$/, "$1");
         // console.log(opText, ' max processor');
         return ['0 '+ baseUnit, rtext];
    }else{
        var splitRange = rtext.split('~');
        var val1 = splitRange[0].trim();
        var val2 = splitRange[1].trim();
        var baseUnit = val2.split(' ')[1];
        if (val1.indexOf(baseUnit) === -1){
            if(baseUnit){
                return [val1 + ' ' + baseUnit, val2];
            }else{ return [val1 , val2];}
        }else{ return splitRange;}
    }
}

function getParametricValueText(paramtext){
    return $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').text();
}

function hoverHighlightDetailWizParams(paramtext, $hoverObject){
    $hoverObject.on('mouseenter', function(){
       $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').css({'background-color':'#ffc10e'}); 
    }); 
    $hoverObject.on('mouseleave', function(){
       $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').css({'background-color':''}); 
    }); 
}

function addPriceBreakHelper(){
    _log('addPriceBreakHelper() Start',DLOG);
    var ptable = $('#pricing');
    // var eurocheckRE = /(?.*,\d\d)/; 
    // check if part is not orderable
    if(ptable.filter(':contains(call)').size() == 0){
        var pricingrows = ptable.find('tr:gt(0)');
        var tdlast = pricingrows.eq(0).find('td:last').text();
        var isEuro = (tdlast[tdlast.length-3] == ',');  //check if the last a comma is used before the last two digits of the extend price 

            var firstpb = simpleInternationalParse(pricingrows.eq(0).find('td:eq(0)').text(), isEuro);
            pricingrows.each(function(index){
                if(pricingrows.eq(index+1)){
                        // priceVal = simpleInternationalParse(price.replace(/[^0-9-.]/g, ''));
                    var pricebreak =  simpleInternationalParse(pricingrows.eq(index).find('td:eq(0)').text(), isEuro);
                    var unitprice = simpleInternationalParse(pricingrows.eq(index).find('td:eq(1)').text(), isEuro);
                    var nextextendedprice = simpleInternationalParse(pricingrows.eq(index+1).find('td:eq(2)').text(), isEuro);
                    var breakeven = Math.ceil(nextextendedprice/unitprice);

                    if ( breakeven >= pricebreak && firstpb == 1){
                        ptable.find('tr:first').eq(index).append('<th style=" border: 1px solid rgb(204, 204, 204);" title="If ordering the green quantity or more, it is a better deal to buy the next price break quantity.">Break-Even Qty</th>');
                        pricingrows.eq(index).append('<td style="color:green; text-align:center; border: 1px solid rgb(204, 204, 204);" title="If ordering the green quantity or more, it is a better deal to buy the next price break quantity.">'+breakeven +' </td>');
                    }               
                }
            });
    }
    _log('addPriceBreakHelper() Start',DLOG);
}

function simpleInternationalParse(text, isEuro){
    return isEuro ? (parseFloat(text.replace(/\./g, '').replace(/\,/g, '.'))) : (parseFloat(text.replace(/,/g,'')));
}

function addDataSheetLoader(){
        _log('addDataSheetLoader() Start',DLOG);
        var dslink = $('tr:contains("Datasheet") td>a:first').attr('href');
        var hidenav = '#navpanes=0&zoom=100';
        
        //KEEP different methods  KEEP*************>>>>
        //$('#content').append('<embed src="'+dslink+'" width=100% height=800px>');
        // $('#content').append('<embed src="'+dslink+'#toolbar=0&navpanes=0&scrollbar=0" width=100% height=auto>');
        // $('#content').append('<object data="'+dslink+'" type="application/pdf" width=100% height=10000px>');
        // $('#content').append('<div style="height:10000px;"><object data="'+dslink+hidenav+'" type="application/pdf" width=100% height=100%></div>');
        // $('#content').append('<div style="height:auto;"><object data="'+dslink+'#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width=100% height=100%></div>');
        // $('#content').append('<iframe src="http://docs.google.com/gview?url='+dslink+'" style="width:100%; height:800px;" frameborder="0"></iframe>');
        // $('#content').append('<iframe src="http://docs.google.com/viewer?url='+htmlEscape(dslink)+'&embedded=true" width="100%" height="800px" style="border: none;"></iframe>');
        
        $('#content').append('<div id=datasheetdiv><div>'+
            '<span id="datasheetchooser" class="tabbedbutton" style="" title="Enable or Disable the autoloading datasheets">'+
            '<input id="datasheetchooserinput" value="1" class="saveState" type="hidden">' +
            '<button id=datasheetoff value=0 class="pure-button">Off</button>'+
            '<button id=datasheeton value=1 class="pure-button">On</button>'+
            ' Datasheet Autoloader: '+
            '</span></div><br>'+
        '</div>');
        addChooserButtonAction($('#datasheetchooser'), dataSheetButtonAction);
        
        if($('tr:contains("Datasheet") td>a:first').length > 0 && $('#datasheetchooserinput').val() == 1){
            setTimeout(function(){$('#datasheetdiv').append('<embed src="'+dslink+hidenav+'" width=100% height='+($(window).height()-70)+'px>');},500);
            $('tr:contains("Datasheet") td>a:first').wrap('<div style="background:lightgrey; padding:3px;"/>').after('<a style="float:right;" href=#datasheetdiv><button class="pure-button" style="width:40px; font-size:11px; padding:2px; margin:0px" ><i class="fa fa-arrow-circle-down fa-lg"></i></button></a>').parent().localScroll();
            // $('tr:contains("Datasheet") td:first div').css({'white-space':'nowrap'});
        }
        _log('addDataSheetLoader() End',DLOG);
}

function dataSheetButtonAction(){
    var dslink = $('tr:contains("Datasheet") td>a:first').attr('href');
    var hidenav = '#navpanes=0&zoom=100';
    if($('#datasheetchooserinput').val() == 1){
        $('#datasheetdiv>embed').remove();
        setTimeout(function(){$('#datasheetdiv').append('<embed src="'+dslink+hidenav+'" width=100% height='+($(window).height()-70)+'px>');},500);
    }
    else if ($('#datasheetchooserinput').val() == 0){
        $('#datasheetdiv>embed').remove();
    }
}


function addReverseFiltering($tableToFilter){
    _log('addReverseFiltering() Start',DLOG);
    var categoryRow = $tableToFilter.find('th:contains("Category")').parent();
    var lastFilterRow = $tableToFilter.find('tr:contains("Note"),tr:contains("Online Catalog"),tr:contains("Mating Products"),tr:contains("For Use With"),tr:contains("Associated Product"),tr:contains("OtherNames")').eq(0);
    var formRowsTD = $tableToFilter.find('tr>td').slice(categoryRow.index(),lastFilterRow.index());  //get the valid rows on which to add check boxes
    
    formRowsTD.each(function(ind){
        if (ind==0){
            $(this).append('<span style="float:right"><input id="catfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="catfilter"></label></span>');
        }else if (ind==1){
            $(this).append('<span style="float:right"><input id="familyfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="familyfilter"></label></span>');
        }else{
            $(this).append('<span style="float:right"><input type=checkbox class="css-checkbox" id="revcheck'+ind+'"><label class="css-label" for="revcheck'+ind+'"></label></span>');
        }
    });

    $('.attributes-table-main form:first').after(
        '<a class="similarPartLink" target="_blank">'+
        '<div style="float:right; cursor:pointer;" class="pure-button similarPartsButton">See <span></span> Similar Parts</div>'+
        '</a>'
    );

    formRowsTD.find('input').change(function(){
        var i = getReverseFilterLink(formRowsTD);
        _log('url is '+i);
        $('.similarPartLink').attr('href', i);
        $('.similarPartsButton span').html('<img src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
        $('.similarPartsButton span').load(i + ' .matching-records', function() {
            $(this).text($(this).text().split(':')[1]);
        });
    });

    $('.attributes-table-main form:first').css({float:'left'}).find('input').addClass('pure-button'); // move the Report an Error button to the left
    _log('addReverseFiltering() End',DLOG);
}

function getReverseFilterLink(formRowsTD){
    _log('getReverseFilterLink() Start',DLOG);
    var reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
    if($('#familyfilter:checked').length){
        // _log('familfilter '+ $('#familyfilter:checked').attr('checked') + $('#familyfilter').closest('td').find('a').attr('href'));
        reverseFilterLink = $('#familyfilter').closest('td').find('a').attr('href')+'?k=';
    }else if ($('#catfilter:checked').length){
        // _log('catfilter '+ $('#catfilter:checked').closest('td').find('a').html());
        reverseFilterLink = $('#catfilter:checked').closest('td').find('a').attr('href')+'?k=';
    }else{
        reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
    }
    formRowsTD.find('input:checked').not('#catfilter,#familyfilter').each(function(){
        reverseFilterLink = reverseFilterLink +$(this).parent().parent().text().replace(/\s/g,'+')+ '+';
    });
    // _log('new reversefilterlink ' + reverseFilterLink);
    reverseFilterLink = reverseFilterLink.replace('%','%25');
    _log('getReverseFilterLink() End',DLOG);
    return reverseFilterLink;
}

function addBreadCrumbLink(){
    _log('addBreadCrumbLink() Start',DLOG);
    if ($('#productTable').size() > 0) {
        appendURLParam($('.seohtagbold a:last'), 'akamai-feo', 'off');
    }
    addBreadcrumbHover();
    _log('addBreadCrumbLink() End',DLOG);
}

function appendURLParam(href, param, value){
    _log('appendURLParam() Start',DLOG);
    
    if (href instanceof $){
        var $a = href;
        href = $a.attr('href');
        if( href.indexOf('?') !== -1){
            href += '&'+param+'='+value;
        }else{
            href += '?'+param+'='+value;
        }
        $a.attr('href', href);
        _log('added param to jquery object '+param ,DLOG);

    }
    else if ($.type(href) === 'string'){
        console.log('im a string');
        if( href.indexOf('?') !== -1){
            href += '&'+param+'='+value;
        }else{
            href += '?'+param+'='+value;
        }
        return href;
    }
    _log('appendURLParam() End',DLOG);
}


function getFamilyLink(){
    _log('getFamilyLink() Start',DLOG);
    var myhref = $('.seohtagbold').find('a:last').attr('href');
    var mainform = $('#mainform')
    var modifiers = mainform.find('input[type=checkbox], input[name=quantity], input[name=ColumnSort]').serialize()+'&akamai-feo=off';

    _log('getFamilyLink() End',DLOG);
    return myhref;
}

function addStickyHeader () {
    location.assign("javascript:$(window).unbind('scroll resize');void(0)");
    $('div.stickyHeader').remove();
    CreateFloatingHeader();
    $(window).scroll(function () { UpdateFloatingHeader(); });
    $(window).resize(function () { UpdateFloatingHeader(); });
    //      $('#productTable thead>tr:first th').attr('border', 0).css({
            // 'border-top-left-radius': '5px',
            // "border-spacing":0
    //      });
    $("#productTable thead").css('background-color', 'white');
    $('#productTable thead>tr:eq(1)').css('background-color','#e8e8e8');
    $('.stickyThead>tr:eq(1)').css('background-color','#e8e8e8');
}

function CreateFloatingHeader() {
    var origTable = $('#productTable');
    var tableClone = $(origTable).clone(true).empty().removeClass('stickyHeader');
    tableClone.css('margin-bottom', '');
    var theadClone = $(origTable).find('thead').clone(true);
    theadClone.addClass('stickyThead');
    var stickyHeader = $('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
    stickyHeader.append(tableClone).find('table').append(theadClone);
    $(origTable).after(stickyHeader);

    var widthValues = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    var tableWidth = $(origTable).width();
    var tableHeight = $(origTable).height();

    for (var i = 0; i < widthValues.length; i++) {
        var parsedValue = Number($('#productTable').css(widthValues[i]).replace(/px/ig, ""));
        if (!isNaN(parsedValue)) {
            tableWidth += parsedValue;
        }
    }

    var headerCells = $(origTable).find('thead th');
    var headerCellHeight = $(headerCells[0]).height();

    var stickyHeaderCells = stickyHeader.find('th');
    stickyHeader.css('width', tableWidth);
    for (var i = 0, l = headerCells.length; i < l; i++) {
        $(stickyHeaderCells[i]).css('width', $(headerCells[i]).css('width'));
        // $(stickyHeaderCells[i]).css('background-color', '#E1E0E0');
    }

    var cutoffTop = $(origTable).offset().top;
    var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
    var leftInit = $(origTable).offset().left;
    var currentPosition = $(window).scrollTop()+50;
    $(stickyHeader).offset({ left: leftInit, top: currentPosition });

    // Fix to make sure it's visible on refresh
    if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
        stickyHeader.removeClass('hide');
        $(stickyHeader).offset({ left: leftInit, top: currentPosition });
    }
    else {
        stickyHeader.addClass('hide');
    }
}

function UpdateFloatingHeader() {
    var stickyHeader = $('div.stickyHeader');
    var headerCells = $('#productTable').find('thead th');
    var headerCellHeight = $(headerCells[0]).height();
    var widthValues = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    var tableWidth = $('#productTable').width();
    var tableHeight = $('#productTable').height();
    for (var i = 0; i < widthValues.length; i++) {
        var parsedValue = Number($('#productTable').css(widthValues[i]).replace(/px/ig, ""));
        if (!isNaN(parsedValue)) {
            tableWidth += parsedValue;
        }
    }
    var stickyHeaderCells = stickyHeader.find('th');
    stickyHeader.css("width", tableWidth);
    for (var i = 0, l = headerCells.length; i < l; i++) {
        $(stickyHeaderCells[i]).css('width', $(headerCells[i]).css('width'));
        // $(stickyHeaderCells[i]).css('background-color', '#E1E0E0');
    }
    var cutoffTop = $('#productTable').offset().top;
    var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
    var currentTopPosition = $(window).scrollTop()+50;
    var currentLeftPosition = $(window).scrollLeft();
    var cutoffLeft = $('#productTable').offset().left;

    if (currentTopPosition > cutoffTop && currentTopPosition < cutoffBottom) {
        stickyHeader.removeClass('hide');
        $(stickyHeader).offset({ left: cutoffLeft, top: currentTopPosition });
    }
    else {
        stickyHeader.addClass('hide');
    }
}

//adds floating table header in the productTable search results
//TODO see if needed.... might be unused
function addPersistHeader() {
    _log('addPersistHeader() Start',DLOG);
    GM_addStyle(".floatingHeader {position: fixed; top: 0;visibility: hidden; display:inline-block;}");
    var floatingHeader;
    $('#productTable').addClass('persist-area');
    $('#productTable>thead').find('tr:first').addClass('persist-header');
    $(".persist-area").each(function() {
        floatingHeader = $(".persist-header", this);
        
        floatingHeader.before(floatingHeader.clone().attr('id','realheader'));
    
        floatingHeader.children().css("width", function(i, val){
            return $(floatingHeader).children().eq(i).css("width", val);
        });
        
        floatingHeader.addClass("floatingHeader");
        floatingHeader.css('width', $('.persist-area').width());
    });

    floatingHeader.find('th').width(function(i, val) {
            if(i==2){return 64;}// for the image column so the alt text doesn't mess with the column width of images.
            else{return $('#realheader').find('tr:first>th').eq(i).width();}

    });

    $(window).scroll(updateTableHeaders).trigger("scroll");
    _log('addPersistHeader() End',DLOG);
}

function updateTableHeaders() {
    $(".persist-area").each(function() {

        var el = $(this),
            offset = el.offset(),
            scrollTop = $(window).scrollTop(),
            floatingHeader = $(".floatingHeader", this);

        if((scrollTop > offset.top - 50) && (scrollTop < offset.top + el.height())) {
            //_log('scrollTop = ' + scrollTop + ', offset.top = ' + offset.top + ', el.height = '+ el.height() + ' offset.left = '+ offset.left,DLOG);
            floatingHeader.css({
                "visibility": "visible",
                "top": 50,
                "backgroundColor": 'white',
                "left": offset.left - $(document).scrollLeft(),
                'border-spacing': '0'
            });
        } else {
            floatingHeader.css({
                "visibility": "hidden"
            });
        }
    });
}

function addImageBar() {
    _log('addImageBar() Start',DLOG);
    if($('#productTable').size() == 1) {
        _log('adding image bar', DLOG);
        $('#mainform').after('<div id="accDiv" class="collapsed"><div id="accContent">loading...</div></div>');
        $('#accDiv').css({
            // 'width': ($(window).width() - 100),
            'wdith': '100%',
            'height': '66px',
            'border': '1px solid lightgrey',
            'box-shadow': '1px 1px 2px #aaa',
            'margin-bottom': '8px',
            'border-radius': '1px',
        });
        $('#accContent').css({
            'overflow': 'hidden',
            'height': '100%'
        });
        $('#accDiv').append('<div id="expand1"><div id="expand2">+ Expand +</div></div>');
        $('#expand1').css({
            'float': 'right',
            'position': 'relative',
            'top': 1,
            'background': 'linear-gradient(to bottom, #f5f5f5 0px, #e8e8e8 100%)',
            'width': 80,
            'border': '1px solid #eee',
            'border-radius': '0px 0px 1px 1px',
            'box-shadow': '1px 1px 3px #aaa'
        });
        $('#expand2').css({
            'text-align': 'center',
            'cursor': 'pointer'
        });
    }

    $('#content').after('<div id="itemInfo"></div>');
    $('#itemInfo').hide();

    $('#content').after('<div id="bigpic"></div>');
    $('#bigpic').hide();
    _log('addImageBar() End',DLOG);
}

function addToTopButton(){
    //css in stylesheet
    $('#content').after('<div class="totop" href="#content"><a href="#content" style="text-decoration:none"><span>^^^<br/>Top<br/>^^^</span></a></div>');
    $('.totop').localScroll({
        duration: 500,
        offset: -600,
    });
}

function addChooserButtonAction(somespan, clickfunc){
    _log('addChooserButtonAction() Start' ,DLOG);
    somespan.find('button').css({'padding':'3px 5px 4px 5px'}); //TODO fix

    var $input = somespan.find('input') ;
    var inputid = $input.attr('id');
    restoreInputState($('#'+inputid));

    _log('restored input state of '+inputid + ' is '+ $input.val(), DLOG);
    // console.log('$input',$input);
    somespan.find('button').removeClass('myRedButton');
    somespan.find('button[value='+$input.val()+']').addClass('myRedButton');
    // somespan.find('button').not('[value='+$input.val()+']').addClass('clean-gray');
    somespan.find('button').not('[value='+$input.val()+']');

    somespan.on('click', 'button' , function(){
        var bval = $(this).val();
        $input.val(bval);
        _log('setting ' + inputid + ' to ' + $input.val() + ' button val is ' + bval, true);
        localStorage.setItem(inputid, $(this).val());   
        _log('setting ' + inputid + ' to ' + $input.val() + ' button val is ' + bval, true);
        _log('getting ' + inputid + ' is ' + localStorage.getItem(inputid) + ' button val is ' + $(this).val(), true);        
        somespan.find('button').removeClass('myRedButton');
        somespan.find('button[value='+$input.val()+']').addClass('myRedButton');
        somespan.find('button').not('[value='+$input.val()+']');
        clickfunc(somespan, $(this).val());
    });
        _log('addChooserButtonAction() End',DLOG);
}

// function exploreModeClickFunc(somespan, buttonval){
//     // somespan.find('input:first').val(buttonval);
//     // localStorage.setItem(somespan.find('input:first').attr('id'), buttonval);            
//     // somespan.find('button').removeClass();
//     // somespan.find('button[value='+somespan.find('input').val()+']').addClass('thoughtbot2');
//     // somespan.find('button').not('[value='+somespan.find('input').val()+']').addClass('clean-gray');
// }

// function addExploreMode(){
//     _log('addExploreMode() Start',DLOG);
//     var thehtml = '<div id="exploremodechooser" class="tabbedbutton" style="display:inline-block;" title="Hover over each option in the multi-select boxes below to get a preview">'+
//         '<input id="exploremodecheckbox" value="0" class="saveState" type="hidden">' +
//         '<button id=exploremodeon value=0 class="pure-button">Off</button>'+
//         '<button id=exploremodeoff value=1 class="pure-button">On</button>'+
//         ' Explore Mode (beta)'+
//     '</div><div class="dummydiv"></div>';
    
//     // $('#mainform').before(thehtml);
//     $('.filters-panel').prepend(thehtml);
//     addChooserButtonAction($('#exploremodechooser'),exploreModeClickFunc);
//     _log('addExploreMode() tick1',DLOG);

//     var exploreHoverConfig = {
//         id:'exploreMode', 
//         title : 'Exploring',
//         message : 'Loading....', 
//         hoverOver :$('option'), 
//         height : '420px', 
//         width :'580px', 
//         interactive : true, 
//         my : 'top',
//         at : 'bottom', 
//         collision: 'fit',
//         offset :'0 5',
//         onparent: true, 
//         someFunc : loadExploreWindow,
//         interval : parseInt($('#exploreModeDelay').val()),
//         bubbleTo : $('#mainform'),
//         selector : 'option',
//     };

//     setTimeout(function(){
//         createHoverWindow2(exploreHoverConfig);
//         $('#exploreMode').on('mouseover', 'img', function(){
//             getExplorePreview($(this).parent());
//         });
//     }, 500);
//     _log('addExploreMode() tick2',DLOG);

//     _log('addExploreMode() End',DLOG);
// }

// function getExplorePreview(thisanchor){
//     _log('getting explore preview '+ thisanchor.prop('href'));
//     $('#explorePrev').empty().append('');

//     $('#removeme').load(thisanchor.prop('href') + ' table[itemtype*="org/Product"]',function(){
//         $('#explorePrev').add('#exploreInfo').empty();
//         $('#explorePrev').append($('#removeme').find('img'));
//         $('#exploreInfo').append('<br><b>Manufacturer:</b> '+$('#removeme').find('[itemprop=name]').text());
//         $('#exploreInfo').append('<br><b>Manuf PN:</b> '+$('#removeme').find('[itemprop=model]').text());
//         $('#exploreInfo').append('<br><b>Description:</b> '+$('#removeme').find('[itemprop=description]').text());
//         $('#removeme').empty();
//     });
//     $('#explorePrev').fadeIn(300);
// }

// //TODO change to include the actual results under each selection change source from breadcrumb
// function loadExploreWindow($hoveredObj){
//     if($('#exploremodecheckbox').val() == 1){
//         var optionVal = $hoveredObj.val();
//         var mylink = $('.seohtagbold').find('a:last').attr('href') + '&pageSize=25&akamai-feo=off&' + $hoveredObj.parent().attr('name')+'='+$hoveredObj.val();
//         _log( optionVal +' loadExploreWindow mylink is ' + mylink);

//         $('#exploreModeContent').html('<img style="margin-left:60px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">'+
//             ' loading ' + $hoveredObj.text());
//         $(".dummydiv").load(mylink+' #productTable,div:contains("Image shown is a"):last,img[src*=pna_en],.matching-records,#reportpartnumber', function(){
//             $('#exploreModeContent').html(
//                 '<div style="float:right;">'+
//                     '<div style="width:201px; height:201px; border:1px solid lightgray; margin:6px;">'+
//                         '<div id="explorePrev">'+
//                         '</div>'+
//                     '</div>'+
//                     '<div id=exploreInfo style="width:201px; height:3em;">'+
//                     '</div>'+
//                 '</div>'+
//                 '<div style="display:hidden" id=removeme></div>');
//             _log('loaded!!!!!!!!!!!!!!!!!!!!!!!!1');
//             $('#exploreModeTitle').text('Exploring '+ $hoveredObj.text());
//             if($('.dummydiv').find('a>img[src*=tmb],a>img[src*=nophoto]').length > 1){
//                 $('#exploreModeContent').append($('.dummydiv').find('a>img[src*=tmb],a>img[src*=nophoto]').parent());
//             }else if($('.dummydiv').find('img[src*=jpg]').length){
//                 $('#exploreModeContent').append($('.dummydiv').find('img[src*=jpg]').width('64px'));
//             }
//             $('#exploreModeContent').find('img').css({'width':'64px', 'margin':'3px'}).addClass('hoverborder');
//             if($('#exploreModeContent>a').length == 0){
//                 $('#exploreModeContent').text('No Pictures of ').append($('.dummydiv').find('.matching-records').add('#reportpartnumber').text());
//             }

//             $('.dummydiv').empty();

//         });
//     }           
//     else{
//             $('#exploreMode').hide();
//         }

//  //_log($hoveredObj.val() + ' '+$hoveredObj.text() + ' '+ mylink, DLOG);
// }

function displayAdv(){
    _log('displayAdv() Start',DLOG);
    var filterfunctions = [ //['Series',                function(name, e){getAttributeExampleImgs(name, e);}, 'Ex Pics'],
                            //['Connector Type',        function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Connector Style',       function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Number of Positions',   function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Contact Type',      function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            ['pv127' ,'Voltage - Input',        function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv48' ,'Voltage - Output',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv276' ,'Voltage - Supply',   function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1112' ,'Voltage - Supply (Vcc/Vdd)',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv659' ,'Voltage - Supply, Single/Dual',  function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1525' ,'Voltage - Output 1',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1526' ,'Voltage - Output 2',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1527' ,'Voltage - Output 3',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv252' ,'Operating Temperature',  function(name, e){temperatureHelper(name, e);}, '+ helper'],
                            ['pv772' ,'Voltage - Load', function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1113' ,'Connectivity',  function(name, e){checkboxHelper(name, e);}, '+checkboxes'],
                            ['pv1114' ,'Peripherals',   function(name, e){checkboxHelper(name, e);}, '+checkboxes'],
                            ['pv16' ,'Package / Case',  function(name, e){checkboxHelper2(name, e);}, '+checkboxes'],
                            ['pv1291' ,'Supplier Device Package',   function(name, e){checkboxHelper2(name, e);}, '+checkboxes'],
    ];

    for (var x=0; x<filterfunctions.length; x++){
        $('select[name="'+filterfunctions[x][0]+'"]').parent().append('<span class="adv pure-button myRedButton" order="'+x+'" > '+filterfunctions[x][3]+'</span>');
    }
    $('.adv').click(function(){
        var i= $(this).attr('order');
        filterfunctions[i][2]( filterfunctions[i][1], $('select[name="'+filterfunctions[i][0]+'"]'));
    });

    _log('displayAdv() End',DLOG);
}

function createHelperBox(name,$selectElem, boxheight, boxwidth){
    _log('createHelperBox() Start',DLOG);
    $('.helperBox').remove(); // probly not needed
    $('#content').after('<div class="helperBox gray-grad"><div id="helpertitlemessage" style="float:left;">hello</div><button class="closeHelperBox clean-gray close">X</button><br><br><div id="helperBoxContent"></div></div>');
    $('.helperBox').css({
        'position': 'relative',
        'border': '1px solid grey',
        'width': boxwidth,
        'height': boxheight,
        "borderRadius": "5px",
        'box-shadow': '3px 3px 3px rgb(136, 136, 136)'
    }).hide()
    .slideDown()
    .position({
        my: 'left top',
        at: 'left top',
        of: $selectElem
    });

    $('.closeHelperBox').click(function() {
    $('.helperBox').slideUp(400,
            function(){$(this).remove();
        });
    }); 
    _log('createHelperBox() End',DLOG);
}

function opampVoltageHelper(){
    // add single or dual supply range?
    
}

function voltageHelper(name, $selectElem) {
    //TODO differentiate between in and out.... add vin min, vin max
    //TODO add ability to select multi output devices
    //TODO deal with +- ranges
    _log('voltagehelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG);
    //_log(arguments.callee.caller); 

    createHelperBox(name,$selectElem,'150px','200px');

    $('#helperBoxContent').html('<label><b>desired ' + name + 
        ':</b> <br><input id=voltin type="text" size="5"><b>Volts</b> <br>(enter key or apply)</label><br>'+
        '<button id=helperbutton class="clean-gray clearfix">apply</button><span id=voltmess></span>');
    $('#helperbutton').css({
        'float':'right',
        'padding':'3px',
        'margin-right':'10px',
        'margin-top':'10px',
    });

    $('#voltin').focus();
    $('#helperbutton').click(function() {
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    $('#helperBoxContent').find('input').change(function(){
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    
    _log('end voltageHelper');
}

function temperatureHelper(name, $selectElem) {
    //TODO differentiate between in and out.... add vin min, vin max
    //TODO add ability to select multi output devices
    //TODO deal with +- ranges
    _log('temperaturehelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG);
    //_log(arguments.callee.caller); 

    createHelperBox(name,$selectElem,'150px','200px');

    $('#helperBoxContent').html('<label><b>desired ' + name + 
        ':</b> <br><input id=voltin type="text" size="5"><b>C</b> <br>(enter key or apply)</label><br>'+
        '<button id=helperbutton class="clean-gray clearfix">apply</button><span id=voltmess></span>');
    $('#helperbutton').css({
        'float':'right',
        'padding':'3px',
        'margin-right':'10px',
        'margin-top':'10px',
    });

    $('#voltin').focus();
    $('#helperbutton').click(function() {
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    $('#helperBoxContent').find('input').change(function(){
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    
    _log('end voltageHelper');
}

function voltageHelper2(name, $selectElem){

}

function applyRangeSelect2(name, $selectElem){
    var userinputvalue = parseFloat($('#helperBoxContent').find('input').val());
    var commaselector = ':contains(,),:contains(、)'; //the oddball comma is for the .jp site
    var tildeselector = ':contains(~),:contains(～)'; //the oddball tilde is for the .jp site
    // var commaregex = /,、/g ;
    // var tilde regex = /~～/g ;
    var $optionList = $selectElem.find('option');
    // _log($optionList.filter(commaselector).size(), true);

    $optionList.filter(commaselector).each(function(){
        var thisOption = $(this);
        var splitOnComma = $(this).text().split(/[,、]/g);  // implicitly tested for comma by selector
        // _log('splitoncomma is ' +splitOnComma, true);
        splitOnComma.forEach(function(element, index, array){
            if ((element.indexOf('~') != -1) || (element.indexOf('～')!= -1)){
                if(isInRange(userinputvalue, element)){
                    thisOption.prop('selected', true);
                }
            }else if(parseFloat(element) == userinputvalue){
                thisOption.prop('selected', true);
                _log(element, true);
            }
        });
    });

    $optionList.not(commaselector).each(function(){
        var thisOption = $(this);
        var otext = $(this).text();
        if ((otext.indexOf('~') != -1) || (otext.indexOf('～')!= -1)){
                if(isInRange(userinputvalue, otext)){
                    thisOption.prop('selected', true);
                }
            }else {
                if(parseFloat(otext) == userinputvalue){
                    thisOption.prop('selected', true);
                    _log(otext, true);  
                }
                thisOption.filter(':contains("Up to")').each(function(index) {
                    if((parseFloat($(this).text().split('Up to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
                        $(this).prop('selected', true);
                    }
                });
                thisOption.filter(':contains("Adj to")').each(function(index) {
                    // if((parseFloat($(this).text().split('Adj to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
                        $(this).prop('selected', true);
                    // }
                });
                thisOption.filter(':contains("Down to")').each(function(index) {
                    if((parseFloat($(this).text().split("Down to")[1]) <= userinputvalue) && (userinputvalue <= 0)) {
                        $(this).prop('selected', true);
                    }
                });

            }
    });

    // getRecordsMatching();
    var selNum = $selectElem.find('option:selected').size();
    $('#voltmess').text(' ' + selNum + ' options selected in ' + name);
    $('.helperBox').delay(200).slideUp(500);
}

function isInRange(userinput, teststring){
    var rangeSplit = teststring.split(/[\~\～]/);
    var firstval = parseFloat(rangeSplit[0]);
    var secondval = parseFloat(rangeSplit[1]);
    //_log(rangeSplit +' '+firstval +' '+secondval,DLOG);
    if(secondval > firstval) {
        if(firstval <= userinput && userinput <= secondval) {
            // optElem.prop('selected', true);
            return true
        }else {return false}
    } else {
        if(secondval <= userinput && userinput <= firstval) {
            // optElem.prop('selected', true);
            return true
        }else {return false}
    }
}

function applyRangeSelect(name, $selectElem){
    //The odd squiggly is support for the .jp website
    $selectElem.find('option').prop('selected', false);
    var userinputvalue = parseFloat($('#helperBoxContent').find('input').val());
    _log(userinputvalue, DLOG);

    $selectElem.find('option:contains(~),option:contains(～)').not(':contains(,)').not(':contains("&#x2213;")').each(function(index) {
        selectInRange($(this), userinputvalue);

    });

    $selectElem.find('option:contains("Up to")').each(function(index) {
        if((parseFloat($(this).text().split('Up to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
            $(this).prop('selected', true);
        }
    });
    $selectElem.find('option:contains("Down to")').each(function(index) {
        if((parseFloat($(this).text().split("Down to")[1]) <= userinputvalue) && (userinputvalue <= 0)) {
            $(this).prop('selected', true);
        }
    });
    $selectElem.find('option').not(':contains(~),:contains(～)').not(':contains("Down to")').not(':contains("Up to")').not(':contains("&#x2213;")').each(function(index) {
        if(parseFloat($(this).text()) == userinputvalue) {
            $(this).prop('selected', true);
        }
    });

}

function selectInRange(optElem, input) {
    var rangeSplit = optElem.text().split(/[\~\～]/);
    var firstval = parseFloat(rangeSplit[0]);
    var secondval = parseFloat(rangeSplit[1]);
    //_log(rangeSplit +' '+firstval +' '+secondval,DLOG);
    if(secondval > firstval) {
        if(firstval <= input && input <= secondval) {
            optElem.prop('selected', true);
        }
    } else {
        if(secondval <= input && input <= firstval) {
            optElem.prop('selected', true);
        }
    }
}

function checkboxHelper(name, $selectElem){
    _log('checkboxHelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG); 
    createHelperBox(name,$selectElem,'','80%');

    $('#helperBoxContent').html('');

    var masterarray = [];
    $selectElem.find('option').each(function(){
        var smalla = $(this).get(0).text.replace('\\n','').replace('\\c','').replace(/\(/,'').replace(/\)/,'').replace(/\./,'').split(',');
        masterarray = masterarray.concat(smalla);
        //_log(masterarray);
    });

    masterarray = $.map(masterarray, function(e){return e.trim()});

    masterarray = uniqueArray(masterarray);

    masterarray = uniqueArray(masterarray).sort();

    $('#helperBoxContent').addClass('columnized5');
    masterarray.forEach(function(e,i,a){
       $('#helperBoxContent').append('<label><input type="checkbox"> '+e+' </input></label><br> ');
    });

    $('#helperBoxContent').after('ok');
    $('#helperBoxContent').find('input[type=checkbox]').change(function(){
        // add logical AND, and OR
        $selectElem.find('option').prop('selected',false);
        $selectElem.attr('selectedIndex', 0);
        _log(' ' + $('#helperBoxContent').find(':checked').length + ' checkboxes checked and '+ $selectElem.find('option').length + ' total option permutations');

        var checkedWordArray = [];
        var additiveSelector = 'option:contains("';

        $('#helperBoxContent').find(':checked').each(function(index){
            _log('length '+ $('#helperBoxContent').find(':checked').length + ' index ' + index);
            if($('#helperBoxContent').find(':checked').length-1 == index){
                additiveSelector = additiveSelector + $(this).parent().text().trim() + '")';
            }else{
                additiveSelector = additiveSelector + $(this).parent().text().trim() + '"):contains("';
            }
        });
        _log(additiveSelector);
        $selectElem.find(additiveSelector).prop('selected','true');
        $('#helpertitlemessage').text($selectElem.find('option:selected').length + ' lines selected using ANDed combination of checkboxes');
        if($selectElem.find('option:selected').length > 0){
            // getRecordsMatching();
        }else{
            $('#helpertitlemessage').text('There are no lines matching all checkboxes');
        } 
    });

    _log('end checkboxHelper');
}

function checkboxHelper2(name, $selectElem){
    _log('checkboxHelper2 name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG); 
    createHelperBox(name,$selectElem,'','40%');

    $('#helperBoxContent').html('');

    var masterarray = [];
    $selectElem.find('option').each(function(){
        var smalla = $(this).get(0).text.replace('\\n','').replace('\\c','').replace(/\(/,'').replace(/\)/,'').replace(/\./,'').split(',');
        masterarray = masterarray.concat(smalla);
        //_log(masterarray);
    });
    masterarray = uniqueArray(masterarray);
    for(var y=0; y<masterarray.length; y++){
        masterarray[y] = trim(masterarray[y]);
    }
    masterarray = uniqueArray(masterarray).sort();

    $('#helperBoxContent').addClass('columnized5');
    for( var x=0; x<masterarray.length; x++){
        $('#helperBoxContent').append('<label><input type="checkbox"> '+masterarray[x]+' </input></label><br> ');
    }

    $('#helperBoxContent').after('ok');
    $('#helperBoxContent').find('input[type=checkbox]').change(function(){
        // add logical AND, and OR
        $selectElem.find('option').prop('selected',false);
        $selectElem.attr('selectedIndex', 0);
        _log(' ' + $('#helperBoxContent').find(':checked').length + ' checkboxes checked and '+ $selectElem.find('option').length + ' total option permutations');

        $('#helperBoxContent').find(':checked').each(function(index){
            $selectElem.find('option:contains("'+$(this).parent().text().trim()+'")').prop('selected', true);
            _log('the box was checked', true);
        });

        // $selectElem.find(additiveSelector).prop('selected','true');
        // $('#helpertitlemessage').text($selectElem.find('option:selected').length + ' lines selected using ORed combination of checkboxes');
        $('#helpertitlemessage').text('ORed combination of checkboxes, close to see selected');
        if($selectElem.find('option:selected').length > 0){
            // getRecordsMatching();
        }else{
            $('#helpertitlemessage').text('There are no lines matching all checkboxes');
        } 
    });

    _log('end checkboxHelper2');
}

function getAttributeExampleImgs(name,$selectElem) {
    _log('populating pictures for '+$selectElem.attr('name'));
    $('#accContent').html('');
    $selectElem.find('option').each(function(index) {
        var myURL = getURL(false, false);
        //_log('myurl'+$(this).parent().attr('name'));
        var myregex = new RegExp('&' + $(this).parent().attr('name') + '=[0-9]+', 'ig');
        //_log('myregex '+ myregex);
        myURL = myURL.replace(myregex, '') + $(this).parent().attr('name') + '=' + $(this).val();
        //_log('regexed url '+ myURL);
        $('#accContent').append('<a id="imgprev' + index + '" href="' + myURL + '" title="' + $(this).text() + '"></a>');
        $('#imgprev' + index).load(myURL + ' img[src*="tmb"]:first,div.beablock>a>img', function() {
            if($(this).find('img:not([src*=tmb])').size() > 0) {
                var thumb = $(this).find('img:not([src*=tmb])').attr('src').replace('_sml', '').replace('.jpg', '_tmb.jpg');
                $(this).find('img:not([src*=tmb])').attr('src', thumb).removeAttr('title').removeAttr('width');
            }
        });
        if(index > 30) {
            return false;
        }
        
    });
}

function akamaiLazyLoadFixForIndexResults(){
    $('.catfilterlink').each(function(){
            var querycheckedURL = ($(this).attr('href').indexOf('?') != -1) ? ($(this).attr('href') + '&akamai-feo=off') : ($(this).attr('href') + '?akamai-feo=off');
            $(this).attr('href', querycheckedURL);
    });
}

function akamaiLazyLoadFixForFilterResults(){
    $('#mainform').append('<input type=hidden value="off" name="akamai-feo">');
}



function addKeywordMatchedSprites(){
    $('.quickpick').each(function(){
        $(this).next('br').before('<div class=/>');
    });
}


function addCategorySprites2(){
    _log('addCategorySprites() Start',DLOG);
    // $('.sideIndexContent li').each(function(ind) {
    //     $(this).prepend('<span style="display:none;" class="catSprite2 '+$(this).text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase() +
    //             '" >'+
    //             // '" style="margin:3px; position:relative; top:11px; border:1px solid gray; border-radius:5px; display:inline-block;" >'+
    //             '</span>' 
    //     );
        //**************************************
        // KEEP for testing, this is the code for category images without using the sprites
        // $('#qpDivCont').append('<a href="#' + 
        //  $(this).text().replace(/[\s\(\)\\\/\,]/g, '') + 
        //  '"><img align=center style="margin:2px; border:1px solid gray; border-radius:5px;" src="https://dl.dropboxusercontent.com/u/26263360/img/caticons/'+
        //  $(this).text().replace(/[\s\(\)\\\/\,]/g, '')+'.png">' + 
        //  $(this).text() + '</a><br>'
        // );                   
        //**************************************
    // });
    $('.catTitle').each(function(){
        $(this).prepend('<span class="catSprite2 '+$(this).text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase() +
                '" >'+
                // '" style="margin:3px; position:relative; top:11px; border:1px solid gray; border-radius:5px; display:inline-block;" >'+
                '</span>' 
        );

    });
    _log('addCategorySprites() End',DLOG);
}


// Adds alternate search terms or patterns to add related categories to the Quick Filter box 
function getQFAlts(searchterm) {
    _log('getQFAlts(searchterm) function ' + searchterm,DLOG);
    var altArray = [
        [/microcontroller/i, 'mcu'],
        [/mcu/i, 'microcontroller'],
        [/msp430/i, 'microcontroller', 'mcu'],
        [/pic\s?[\d]+?/i, 'microcontroller', 'mcu'],
        [/atmega/i, 'microcontroller', 'mcu'],
        [/avr/i, 'microcontroller', 'mcu'],
        [/cortex/i, 'microcontroller', 'mcu'],
        [/\b(M0|M3|M4|R4)\b/, 'microcontroller', 'mcu'],
        [/bluetooth/i, 'finished', 'transceiver', 'evaluation'],
        [/gps/i, 'finished', 'receiver', 'evaluation'], 
        [/usb/i, 'microcontroller', 'mcu','smart cables'], 
        [/adapters/i, 'between series', 'smart cables'], 
        [/rj[\-\s]?\d+/i, 'modular', 'ethernet'], 
        [/ethernet/i, 'modular'], 
        [/sma/i, '(RF)','adapter','coaxial'], 
        [/bnc/i, '(RF)','adapter','coaxial'], 
        [/db-?\d+/i, 'd-sub'], 
        [/sram/i, 'memory'],
        [/eeprom/i, 'memory'], 
        [/ssr/i, 'solid'], 
        [/fpga/i, 'demo'], 
        [/arduino/i, 'boards'], 
        [/cree/i, 'led','eval'], 
        [/rs-?\d+/i, 'uart','cables','drivers'], 
        [/\d+k/i, 'resistor'], 
        [/\d+uf/i, 'capacitor'],
        [/dsub/i, 'd-sub'], 
        [/battery/i, 'batteries'], 
        [/accessory/i, 'accessories'], 
        [/assembly/i, 'assemblies'], 
        [/epoxy/i, 'epoxies'], 
        [/supply/i, 'supplies'], 
        [/mosfet/i, 'fet'] 
    ];
    _log('altarray.length is '+altArray.length,DLOG);
    for(var x = 0; x < altArray.length; x++) {
        //_log(' trying ' + altArray[x][0],DLOG);
        if(searchterm.match(altArray[x][0])) {
            //if(searchterm.match(/microcontroller/i)){
            var returnString = '';
            for(var y = 1; y < altArray[x].length; y++) {
                returnString = returnString + ' ' + altArray[x][y];
            }
            _log('alternate search terms are '+ returnString,DLOG);
            return returnString;
        }
    }
    return '';
}

function checkCategoryQF(keywordArray) {
    for(var x = 0; x < keywordArray.length; x++) {
        $('h1:contains("' + keywordArray[x] + '")').each(function() {
            $(this).next().find('a.catfilterlink').css({
                'fontSize': ((parseInt($(this).css('fontSize'),10) < 17) ? (parseInt($(this).css('fontSize'),10) + 2) : (parseInt($(this).css('fontSize'),10))),
                "font-weight": 'bold'
            });
            $(this).next().find('a.catfilterlink').addClass('quickpick');
            $(this).next().find('a.catfilterlink').each(function() {
                $('#qpDivCont').append( '<div class="clearfix">'+ $(this).parent('li').html() + ' ' + $(this).parent('li').prev('.catfiltertopitem').text() + ' in ' + $(this).closest('ul').prev().text() + '<div style="float:right;" class="'+$(this).closest('ul').prev().text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase()+'"></div></div>');
            });
        });
    }
}

// for the common word replace stemming, spell checking and expansion
function processInput(elem) {
    var qarray = $(elem).val().split(' ');

    for(var y = 0; y < qarray.length; y++) {
        qarray[y] = commonWordReplace(qarray[y]);
    }

    var myval = Array();
    for(var x = 0; x < qarray.length; x++) {
        //_log('alt add ' +commonWordAltAdd(qarray[x]).join(', '),DLOG);
        if(commonWordExpand(qarray[x]) != null) {
            myval = myval.concat(commonWordExpand(qarray[x]));
            myval = myval.join(' ');
        }
    }
    _log('logging myval '+ myval,DLOG);
    if(myval != null) {
        qarray = myval.concat(qarray.join(' '));
    }
    $(elem).val((qarray));
}

function commonWordReplace(someword) {
    _log('commonWordReplace someword = ' + someword);
    var altArray = [
        ['capacitors', 'capacitor'],
        ['resistors', 'resistor'],
        ['capacitors', 'capacitor'],
        ['connectors', 'connector'],
        ['diodes', 'diode'],
        ['leds', 'led'],
        ['transformers', 'transformer'],
        ['enclosures', 'enclosure'],
        ['headers', 'header'],
        ['dsub', 'd-sub'],
        ['potentiometers', 'potentiometer'],
        ['blocks', 'block'],
        ['dcdc', 'dc dc'],
        ['dc-dc', 'dc dc'],
        ['dc/dc', 'dc dc'],
        ['fans', 'fan'],
        ['regulators', 'regulator'],
        ['crystals', 'crystal'],
        ['oscillators', 'oscillator'],
        ['circuits', 'circuit'],
        ['microcontrollers', 'microcontroller'],
        ['uc', 'microcontroller'],
        ['converters', 'converter'],
        ['soldering', 'solder'],
        ['supports', 'support'],
        ['heatshrink', 'heat shrink'],
        ['heatsink', 'heat sink'],
        ['ssl', 'ssl | solid state lighting | led']
    ];

    for(var p = 0; p < altArray.length; p++) {
        if(someword != null && (someword.toLowerCase() == altArray[p][0])) {
            _log(someword+' was changed to '+ altArray[p][1]);
            return altArray[p][1];
        }
    }
    _log('commonWordReplace nothing returned, returning "' + someword+'"');
    return someword;
}

function commonWordExpand(someword) {
    _log('commonWordExpand start someword = '+ someword);
    var altArray = [
        ['battery', 'batteries'],
        ['batteries', 'battery'],
        ['supply', 'supplies'],
        ['supplies', 'supply'],
        //['heatsink', 'heat sink'],
        //  ['heatshrink', 'heat shrink'],
        //  ['ssl', 'ssl | solid state lighting | led'],
        ['tube', 'tubing'],
        //['suppression', 'tvs'],
        //['capacitor', 'capacitance'], 
        ['epoxy', 'epoxies'],
        ['multimeter', 'DMM | multi meter']
    ];
    var retval = Array();
    for(var p = 0; p < altArray.length; p++) {
        if(someword.toLowerCase() == altArray[p][0]) {
            for(u = 1; u < altArray[p].length; u++) {
                retval[u - 1] = altArray[p][u] + ' | ';
            }
            _log('commonWordExpand returning retval= '+ retval);
            return retval;
        }
    }
    _log('commonWordExpand returning nothing');
    return null;
}


function addQuantityToCatFilterLinks() {
    _log('addQuantityToCatFilterLinks() Start',DLOG);
    try {
        if($('a.catfilterlink').attr('href').indexOf('?') == -1) {
            _log('catfilter links has no question questionmark '+ ($('a.catfilterlink').attr('href').indexOf('?') == -1));
            $('a.catfilterlink').each(function() {
                $(this).attr('href', $(this).attr('href') + '?ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val());
            });
        } else if($('a.catfilterlink').attr('href').indexOf('quantity=') == -1) {
            _log('catfilter links has no quantity ' + ($('a.catfilterlink').attr('href').indexOf('quantity=') == -1 ));
            $('a.catfilterlink').each(function() {
                $(this).attr('href', $(this).attr('href') + '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val());
            });
        } else if($('a.catfilterlink').attr('href').indexOf('quantity=') != -1) {
            _log('catfilter links has quantity ' + ($('a.catfilterlink').attr('href').indexOf('quantity=') != -1 ) + 'there are this many catfilter links '+ $('a.catfilterlink').size());
            $('a.catfilterlink').each(function() {
                $(this).attr('href', ($(this).attr('href').replace(/&quantity=\d+/i, '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val())));
            });
        } else if (document.location.href.search('quantity')){
            document.location.href = document.location.href.replace(/quantity=\d+/i,'quantity='+$('#qtydefaulttext').val());
        }
    } catch(err) {}
    _log('addQuantityToCatFilterLinks() End',DLOG);
}


function indexInstantFilter3(){
    if($('body.indexPage').length>0){
        $('#headKeySearch').keyup(function(){
            var keywords = $(this).val().trim();
            var keywordarray = keywords.split(' ');
            var attrfilters = '';
            keywordarray.forEach(function(word){
                attrfilters += '[href*='+word+']';
            });
            _log('keyword array length ' + attrfilters);
            $('.famItemContainer').addClass('hideme');
            $('.catContainer').hide();
            $('.famItemContainer a'+attrfilters).closest('.famItemContainer').removeClass('hideme');

            $('.famItemContainer').not('.hideme').closest('.catContainer').show();
            // $('.hideme').hide();
            if($(this).val() == ''){
                $('.famItemContainer').removeClass('hideme');
                $('.famItemContainer').closest('.catContainer').show();
            }
            console.log('hi keywords here')
        });
    }
}

function getURL(stripQuery, inclFormData) {
    // strip query 
    // included serialized form data
    //$('mainform')
    var querycheckedURL = (window.location.toString().indexOf('?') != -1) ? (window.location.toString() + '&"') : (window.location.toString() + '?');
    if(stripQuery) {
        querycheckedURL = (window.location.toString().split('?')[0] + '?');
    }
    var serializedFormData = $('#mainform').serialize();
    var myloc = inclFormData ? (querycheckedURL + serializedFormData) : querycheckedURL;
    return myloc;
}

function addStickyFilters(){
    //adds stickyfilters to multi select boxes 
    
        $('option').mousedown(function(e,index) {
            if(!e.ctrlKey && !e.shiftKey){
                e.preventDefault();
                $(this).prop('selected', $(this).prop('selected') ? false : true);
                //e.parent().prop('selectedIndex',index);
                return false;
            }
        });
}

function addApplyFiltersButtonHighlight(){
	_log('addApplyFiltersButtonHighlight() Start',DLOG);
    $('#mainform').on('mouseup','option,input[type=reset],input[value=Reset]', function(e){
        buttonHighlightAction();
    });
    $('#mainform').on('change', 'input[type=checkbox], input[type=text]', function(e){
        $('input[value="Apply Filters"]').addClass('myRedButton');
        // $('input[value="Apply Filters"]').removeClass('button-small pure-button').addClass('thoughtbot2');
    });
    $('#mainform').on('keyup', 'input[type=checkbox], input[type=text]', function(e){
        $('input[value="Apply Filters"]').addClass('myRedButton');
        // $('input[value="Apply Filters"]').removeClass('button-small pure-button').addClass('thoughtbot2');
    });
    $('#mainform').on('click','.clearselect', function(e){
        //dependancy on clearselect link being added/existing
        buttonHighlightAction();
        $(this).hide();
    });
    _log('addApplyFiltersButtonHighlight() End',DLOG);
}

function buttonHighlightAction() {
    setTimeout(function(){
        if($('#mainform option:selected').length>0){
            $('input[value="Apply Filters"]').toggleClass('myRedButton',true);
        }else{
            $('input[value="Apply Filters"]').toggleClass('myRedButton',false);
        }       
    },10);
}



function searchButtonHighlight(){
    $('.dkdirchanger2').on('keyup', function(){
        if($(this).val().length !== 0){
            $('#searchbutton').addClass('myRedButton');
        }else{
            $('#searchbutton').removeClass('myRedButton');
        }
    });
}

function addEvents(){
    _log('addEvents() Start',DLOG);

    $('#expand2').click(function(e){
            _log($(this).attr('id')+' acc expand click');
            if($('#accDiv.expanded').length){
                $('#accDiv').animate({height:'65px'}, 300);
                $('#expand2').text('+ Expand +');
                $('#accDiv').toggleClass('expanded collapsed');
            }
            else if($('#accDiv.collapsed').length){
                $('#accDiv').animate({height:'130px'}, 300, function(){
                    $('#accDiv').css('height','100%');
                });
                
                $('#expand2').text('- Collapse -');
                $('#accDiv').toggleClass('expanded collapsed');
            }
        
    });

    //adds rudimentary spell check
    if(localStorage.getItem('spellcheck') == 1){
        $('#headKeySearch').blur(function(){ processInput(this); }); 
        $('#headKeySearch').keydown(function(myevent){ 
            _log(myevent.keyCode +' keydown event happend');
            if(myevent.keyCode == 13){
                _log('event 13 happend '+ this + ' has been passed');
                processInput(this);
            }
        });
    }

    _log('addEvents() End',DLOG);
}

function addColumnHider(){
    _log('addColumnHider() Start',DLOG);
    $('#preProductTable').append('<button id=showCols style="margin:2px 5px;"class="button-small pure-button">Show hidden Columns</button>');
    $('#showCols').click(function(e){
        e.preventDefault();
        $('.hiddenCol').fadeIn(800);
        // $('#showCols').removeClass('thoughtbot2').addClass('button-small pure-button');
        $('#showCols').removeClass('myRedButton');
        _log('showing hidden columns');
    });
    $('#productTable').find('th').each(function(i,e){
        $(this).attr('title','double-click to hide column');
    });
        $('#productTable').on('dblclick', 'th',function(){
            var colIndex = $(this).index()+1;
            _log($(this).text()+' acc expand click is sibling number ' + $(this).index() );
            _log('trying to hide col ' + colIndex);
            $('#productTable').find('td:nth-child('+colIndex+'),th:nth-child('+colIndex+')').addClass('hiddenCol').fadeOut(400);
            $('#showCols').addClass('myRedButton');   
            // $('#showCols').removeClass('button-small pure-button').addClass('thoughtbot2');   
        });
    addDashedColumnsHider();
    _log('addColumnHider() End',DLOG);
}


function addDashedColumnsHider(){
    //dev
    _log('addDashedColumnsHider() Start',DLOG);    
    $('#preProductTable').append('<button id=identCols style="margin:2px 5px;"class="button-small pure-button">Hide Identical Columns</button>');
    $('#identCols').click(function(e){
        e.preventDefault();
        hideIdenticalColumns();
    });
    _log('addDashedColumnsHider() End',DLOG);
}


function hideIdenticalColumns(){
        $('#productTable').find('th').each(function(){
        var colIndex = $(this).index()+1;
        var firstText = $('#productTable').find('tbody td:nth-child('+colIndex+')').first();
        console.log('firstMathcolumn' + firstText.html());
        // _log('first text is' + firstText.html());
        var result = $('#productTable').find('tbody td:nth-child('+colIndex+')').filter( function(index){
            if($(this).html() != firstText.html()){
                return false;
            }else{
                return true;
            }});
        _log( $(this).html() + 'and first result '+ firstText.html() +' :' +
         result.length + 'tbody tr count: ' + $('#productTable').find('tbody>tr').length);
        if(result.length == $('#productTable').find('tbody>tr').length){
            $('#productTable').find('td:nth-child('+colIndex+'),th:nth-child('+colIndex+')').addClass('hiddenCol').fadeOut(400);
            $('#showCols').addClass('myRedButton');   
        }
    })
}

function addPartCompare(){
    _log('addPartCompare() Start',DLOG);
    $('form[name=compform]').attr('id','compareForm');
    $('#content').append('<div style="height:150px;"></div>');
    addBottomCompare();
    $('#compareForm').change(function(){
            if($('#compareForm input:checked').length > 0 && $('#bottomCompare:hidden').length == 1){
                $('#bottomCompare').show('slide', {'direction':'down'}, 500);
                populateCompare($('#compareForm input:checked'));
            }
            else if($('#compareForm input:checked').length===0){
                $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
            }else{
                populateCompare($('#compareForm input:checked'));
            }           
        });
    _log('addPartCompare() End',DLOG);
}

function populateCompare($checkedItems){
    $('#bottomCompareCont').empty();
    $('#bottomCompareCont').append('<table style="height:100%"><tbody><tr></tr></tbody></table>');
    $checkedItems.removeClass();
    $checkedItems.each(function(i){
        var mytr = $(this).closest('tr');
        $('#bottomCompareCont>table tr:first').append('<td class="compdivs" valign=top align=center>'+
            '<span class=clickcheck style="float:right; cursor:pointer; color:red;">x</span>'+
            mytr.find('a[href*="-ND"]:first').html()+'<br>' +mytr.find('a[href*="-ND"]:eq(2)').html()+'</td>');
        $('.clickcheck:last').data('mycheck',$(this));
    });

    $('#complink').attr('href','http://www.digikey.'+theTLD+'/scripts/DkSearch/dksus.dll?'+$('#compareForm').serialize().replace('=',''));
    $('#compcount').text($checkedItems.length);
    $('.clickcheck').click(function(){
        $($(this).data('mycheck')).prop('checked','');
        populateCompare($('#compareForm input:checked'));
    });
}

function addBottomCompare(){
    _log('addBottomCompare() Start',DLOG);
    $('#content').after('<div id=bottomCompare class="gray-grad">'+
        '<div style="float:left; margin:1px 5px 0px 1px; width:100px; height:110px;" class=clearfix>'+
        '<button class="minimal close" style="margin:4px; float:left; padding:2px;">hide</button><br>'+
        '<a style="margin:2px;" href="" id="complink" target="_blank"></a>'+
        '<br><span><span id=compcount>0</span> items selected</span></div>'+
        '<button class="close minimal" >hide</button>'+
        '<div id=bottomCompareCont style="height:100%">bottom world</div></div>');

    $('#bottomCompare').css({
        'position': 'fixed',
        'bottom' : '0px',
        'width': '100%',
        'height': '110px',
        //'background': 'white',
        'border-top': '3px solid red',
        'box-shadow': '0px -1px 2px 2px #888',
    }).hide();

    $('#bottomCompare .close').click(function(){
        $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
    });

    $('#complink').after($('#compare-button').attr('value','Compare\n Now').addClass('minimal').css('height','50px'));
    _log('addBottomCompare() End',DLOG);
}

function addPriceHover(){
    _log('addPriceHover() Start',DLOG);
    //adds price hover over td.unitprice

    $('td.unitprice').tooltipster({
        content: $('<div class=priceHover><div class=priceHoverTitle /> <div class=priceHoverBody> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'right',
        // interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: loadPrices
    })

    _log('addPriceHover() End',DLOG);
}

// function loadPrices($hoveredObj){
function loadPrices(origin){
    $('.priceHoverBody').html('...loading <img style="margin-left:60px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
    // console.log($(this).closest('tr').find('.mfg-partnumber a:first').attr('href'));
    // console.log($(this).text());
    $('.priceHoverBody').load($(this).closest('tr').find('.mfg-partnumber a:first').attr('href')+' #pricing', function(){
        addPriceBreakHelper();
        origin.tooltipster('reposition');
    });
}

function combinePN(){
    _log('combinePN() Start',DLOG);
    // var productTable = $('#productTable').eq(0).detach();
    var productTable = $('#productTable').eq(0);
    var mfpnIndex = productTable.find('th').index($('th.mfg-partnumber')) + 1;

    productTable.find('td:nth-child(' + mfpnIndex + ')').each(function() {
        $(this).append('<br>' + $(this).prev().html() + '<br>' + $(this).next().text());
        //$(this).css('white-space', 'nowrap');
        
    });
    
    var firstcol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)-1) + '),th:nth-child(' + (parseInt(mfpnIndex)-1) + ')');
    var seccol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)+1) + '),th:nth-child(' + (parseInt(mfpnIndex)+1) + ')');
    firstcol.remove();
    seccol.remove();

    $('a[href*=1000002]').parent().empty(); // remove
    productTable.find('th:contains("Manufacturer Part Number")').each(function() {
        $(this).text('Part# & Manu');
    });
    productTable.find('th:contains("Number")').each(function() {
        $(this).text($(this).text().replace('Number', '#'));
    });
    $('#ColSort1000002,#ColSort-1000002,#ColSort1000001,#ColSort-1000001').parent().parent().empty();

    // $('.quantity-form').css({'position':'relative', 'left': ($('.qtyAvailable:first').position().left-19)+'px'});// hack to fix position

    // console.log(productTable);
    _log('combinePN() End',DLOG);
}

function picsToAccel() {
    _log('picsToAccel() Start',DLOG);
    $('#accContent').empty();
    //var pictureLinkSet = $('img[src*="_tmb"]').parent(); // find the links wrapping all tmb images
    // var pictureSet = $('img[src*="_tmb"]'); // find the links wrapping all tmb images
    var pictureSet = $('.pszoomer'); // find the links wrapping all tmb images
    var piclinkhtml ='';
    pictureSet.each(function(mykey, myvalue) {
        //if statement to cull out consecutive images
        if(pictureSet.eq(mykey - 1).attr('src') != $(this).attr('src')) { 
            var imganchor = $(this).parent();
            imganchor.attr('id', 'popthumb' + mykey);
            piclinkhtml = piclinkhtml +'<a href="#popthumb'+ mykey +'">'+ imganchor.html() + '</a>';
        } else {}
    });
    _log('picsToAccel() tick1',DLOG);
    $('#accContent').append(piclinkhtml);
    _log('picsToAccel() tick2',DLOG);
    $('#accContent img').each(function(){ $(this).attr('src', $(this).attr('data-blzsrc'));});
    _log('picsToAccel() afterpicturelinkset ',DLOG);

    $('#accContent').append('<< last one');
    
    $('#accContent').localScroll({
        offset: {
            top: -300,
            left: 0
        }
    });

    $('#accContent').find('img').toggleClass('pszoomer accelimg hoverborder');

    $('#accContent').hoverIntent(showAccelTmb, hideAccelTmb, '.accelimg');
    $('#accContent').on('mouseenter', '.accelimg', infoHoverIn2);
    $('#accContent').on('mouseleave', '.accelimg', infoHoverOut);
    $('#accContent').on('click', '.accelimg',function(e) {
        var thishref = $(this).parent().attr('href');
        $(thishref).parent().parent().css('background-color', '');
        $(thishref).parent().parent().animate({
            'backgroundColor': 'pink'
        }, 1500);
        $(thishref).parent().parent().animate({
            'backgroundColor': 'lightcyan'
        }, 1500);
    });

    _log('picsToAccel() End',DLOG);
}

function infoHoverIn2(e){
    // var infoselector = $(this).parent().attr('href').replace('<a href="', '').replace('"/>', '');
    var targetImageID = $(this).parent().attr('href');
    _log('targetImageID is '+$(targetImageID).attr('href')+ ' .... '+ targetImageID  );
    var info = '';
    var thisitem = $(this);
    $(targetImageID).parent().siblings().each(function(mykey, myval) {
        info += '<b>' + $('#productTable>thead>tr:first>th:eq(' + (mykey + 1) + ')').text() + '</b> : ' + 
        $(this).text() + '<br>';
    });
    $('#itemInfo').html(info).show();   
    $('#itemInfo').position({
        'my': 'left top',
        'at': 'left bottom',
        'of': thisitem,
        'collision':'flip',
        'offset': '0 0',
    });

    //KEEP  This adds the price breaks to each picture
    //$('#itemInfo').append('<div id="breakdown"></div>');
    // $('#breakdown').load($(targetImageID).attr('href') + ' #pricing', function(){
    //  $('#itemInfo').position({
    //  'my': 'right top',
    //  'at': 'right bottom',
    //  'of': thisitem,
    //  'collision':'flip',
    // });
    //});

    //css for border in stylesheet
 }

function infoHoverOut(e) {
    $('#itemInfo').hide();
    //css for border in stylesheet
}

function showAccelTmb(e) {
    $('#bigpic').fadeIn(300);
    $('#bigpic').html('<img src="' + $(this).attr('src').replace('_tmb', '') + '" height="250" width="250">');
    $('#bigpic').position({
        'my': 'left top',
        'at': 'right top',
        'of': $('#itemInfo'),
        'offset': '5 0',
        'collision':'flip',
    });
}

function hideAccelTmb(e) {
    $('#bigpic').hide();
}

function addBreadcrumbHover(){
    //add hover over to the category link of the bread crumbs
    _log('addBreadcrumbHover() Start',DLOG);
    $('h1.seohtagbold').find('a:eq(1)').append(' <i class="fa fa-caret-down fa-lg" style="color:red;"></i>');

    $('h1.seohtagbold').find('a:eq(1)').tooltipster({
        content: $('<div class=priceHover><div class=breadcrumbHoverTitle /> <div class=breadcrumbHoverContent> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // minWidth: '90%',
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: loadBreadcrumbHover
    })

    _log('addBreadcrumbHover() End',DLOG);
}

function loadBreadcrumbHover(origin){
    var $hoveredObj = $(this);
    if($('.breadcrumbHoverContent').find('ul').length){
        //do nothing because it has already been loaded once
    } else{
        $('.breadcrumbHoverContent').html('Loading....');
        $('.breadcrumbHoverContent').load( $hoveredObj.attr('href') + ' #content>ul', function(){
            var linkcount = $(this).find('li').length;
            if(linkcount > 25){
                $(this).addClass('columnized3');
                $(this).parent().css({'overflow':'auto'});
                $(this).parent().css({'width': '97%'});
            }
            origin.tooltipster('reposition');
        });
    }
}

//--------------------------------------------------


var detailPageInfo = (function(){
    return{  
        getImage : function($pageobject){return $pageobject.find('img[itemprop=image],img[src*=nophoto]').css({'width': '48px', 'height': '48px'});},
        getMPN : function($pageobject){return $pageobject.find('h1[itemprop=model]').text();},
        getManufacturer : function($pageobject){return $pageobject.find('h2[itemprop=manufacturer]').text();}, //could also do contents()
        getDescription : function($pageobject){return $pageobject.find('td[itemprop=description]').text();},
        getPackaging : function($pageobject){return $pageobject.find('.attributes-table-main a[href*="Standard%20Packaging%20Help"]').last().closest('tr').find('td').text();},
        getUnitPrice : function($pageobject){return $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(1)').contents();},
        getQuantityAvailable : function($pageobject){return $pageobject.find('#quantityavailable').html().split('<br>')[0];},
        getMinQuantity : function($pageobject){return $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(0)').text();}
    };
})();

var ap = (function(){
    var columnList = [
        {'name':'Image', 'f': detailPageInfo.getImage,},
        {'name':'Manufacturer Part Number', 'f':detailPageInfo.getMPN},
        {'name':'Manufacturer', 'f':detailPageInfo.getManufacturer},
        {'name':'Description', 'f':detailPageInfo.getDescription},
        {'name':'Packaging', 'f':detailPageInfo.getPackaging},
        {'name':'Unit Price', 'f':detailPageInfo.getUnitPrice},
        {'name':'Quantity Available', 'f':detailPageInfo.getQuantityAvailable},
        {'name':'Min Quantity', 'f':detailPageInfo.getMinQuantity}
    ];
    var cLen = columnList.length;
    var perPage = 5;

    var buildProductViewerBox = function(item){

        var firstRowHTML = '';
        for (var z=0; z<columnList.length; z++){
            firstRowHTML = firstRowHTML+ '<th>' + columnList[z].name + '</th>';
        }
        var allRows = ''
        for(var z=0; z<item.list.length; z++){
            allRows = allRows + buildRowHTML(item.list[z]);
        }
        var itemSel = selectorEscape(item.title)
        
        $('.attributes-optional-table').append(
            '<div id="asd-id-'+itemSel+'" class="asd-container panel panel-default">'+
                '<div class="asd-title panel-heading">'+item.title+' ('+ item.list.length +')</div>'+
                '<div class="asd-content panel-body">'+
                '<table id="table-'+itemSel+'" class="asd-table tstripe"> '+
                    '<thead><tr>'+firstRowHTML+'</tr></thead>'+
                    '<tbody>'+allRows+'</tbody>'+
                '</table>'+
                '</div>'+
            '</div>'
        );
        
        $('#asd-id-'+itemSel).data('itemlist', item.list);
        
        $('#table-'+itemSel).find('tbody tr').each(function(ind){
            $(this).data('linkobj',item.list[ind]);
            $(this).data('boxSel', $('#asd-id-'+itemSel));
        });
        
        $('#table-'+ itemSel).find('tbody>tr').slice(perPage).hide();

        if (item.list.length > perPage){
            addPageination(itemSel, item.list.length);
        }

        addFilterAllForm($('#asd-id-'+itemSel));

        var listlength = (item.list.length >= perPage) ? perPage :item.list.length;
        for(var z=0; z<listlength; z++){
            getDetailPage(item.list[z], $('#asd-id-'+itemSel));
        }

    },

    addPageination = function (itemSel, listLen) {
        $('#asd-id-'+itemSel).find('.asd-content').append('<div class="pagination page-'+itemSel+'">'+
                '<a href="#" class="first" data-action="first">&laquo;</a>'+
                '<a href="#" class="previous" data-action="previous">&lsaquo;</a>'+
                '<input type="text" readonly="readonly" data-max-page="'+Math.ceil(listLen/perPage)+'" />'+
                '<a href="#" class="next" data-action="next">&rsaquo;</a>'+
                '<a href="#" class="last" data-action="last">&raquo;</a>'+
            '</div>');

            $('.page-'+itemSel).jqPagination({
                paged: function(page) {
                    var $rows = $('#table-'+itemSel+' tbody > tr')
                    $rows.hide()// do something with the page variable
                    var $showing = $rows.slice((page*5 - 5),(page * 5)).show()// do something with the page variable
                    $showing.not('.filled').each(function(){
                        getDetailPage($(this).data('linkobj'), $(this).data('boxSel'));
                    })
                }
            });
    }

    buildRowHTML = function(pnlinkobj){
        var row = "";
        for (var i = 0; i < columnList.length; i++) {
            row = row + '<td class="col-'+selectorEscape(columnList[i].name)+'"></td>';
        };
        row = '<tr class="'+selectorEscape(pnlinkobj.pn)+'">' + row + '</tr>'
        return row;
    },

    getDetailPage =    function (pnlinkobj, $boxSel){
        var jqxhr = $.get(pnlinkobj.href)
                .done(function(data){
                    var $d = $(data);
                    fillRow($d, pnlinkobj, $boxSel)
                })
                .fail(function(){console.log(pnlinkobj, ' failed');})
                .always(function(){});
    },
    fillRow = function ($DetailPageContent, pnlinkobj, $boxSel){
        var rowSel = selectorEscape(pnlinkobj.pn);
        var row = $('.'+rowSel);

        for (var x=0; x<cLen; x++){
            row.not('.filled').find('.col-'+selectorEscape(columnList[x].name)).append(columnList[x].f($DetailPageContent));
            if (x < 2){ row.find('.col-'+selectorEscape(columnList[x].name)).contents().wrap('<a href="'+pnlinkobj.href+'" />') ; }
        }
        row.addClass('filled');
        console.log('addrowdone');
    },

    getAssociationListFromElem = function (parentElem){
        var pnlinkarray = []
        parentElem.find('.more-expander-item').each(function(){
            pnlinkarray.push({
                'href': $(this).find('a:first').attr('href'),
                'pn': $(this).find('a:first').text()
            });
        });
        //console.log(pnlinkarray);
        return pnlinkarray;
    },

    addFilterAllForm = function($boxSel){
        var pnlist = '';
        var itemlist = $boxSel.data('itemlist');
        itemlist.forEach(function(x){ pnlist = pnlist+'<input type=hidden name="part" value="'+x.pn+'">'});
        console.log(pnlist);
        var formHTML = '<div style="float:right;"><div style="clear:both; margin:0px 15px 1px 0px;"><form  action="/scripts/DkSearch/dksus.dll" method=get>'+
        '<input type=submit value="View All '+itemlist.length+'">'+ '<input id="associatedInStock" type="checkbox" class="css-checkbox"><label class="css-label" for="associatedInStock">In Stock</label>'+
            pnlist+
        '</form></div></div><div style="clear:both;"></div>';
        $boxSel.find('.asd-content').append(formHTML);
    },

    addAssociatedImageHover = function(){
        _log('associatedImageHover() Start',DLOG);

       $('body').append('<img border="0/" src="" style="display: none; box-shadow: 0 0 10px 5px #888; position:absolute;" class="pszoomie2 psshadow" id="pszoomie2">');

        $('.asd-container').hoverIntent({
            over: function () {
                $('#pszoomie2').attr('src','');
                $('#pszoomie2')
                .attr('src', $(this).attr('src'))
                .show('fade', 200)
                .position({
                    my : 'right middle',
                    at : 'left middle',
                    of: $(this), 
                    offset : '-10 0',
                    collision : 'fit fit'
                });
            },
            out: function () {
                $('.pszoomie2').fadeOut(100);
            },
            'selector': '.col-Image img'
        }
        );
        _log('associatedImageHover() End',DLOG);
    },

    addAssociatedProductViewer = function (){
        var boxDataArray = [];
        $('.expander-div-10').each(function(){
            boxDataArray.push({
                'title': $(this).closest('tr').find('th').text(), 
                'list':getAssociationListFromElem($(this))
            });
            $(this).closest('tr').hide()
        });

        $('.expander-div-5').each(function(){
            if($(this).find('.product-details-also-evaluated').length < 1){
                boxDataArray.push({
                    'title': $(this).parent().find('.beablocktitle').text().split('\n')[0], 
                    'list':getAssociationListFromElem($(this))
                });
            }
        });
        $('.attributes-optional-table .rd-extra-option').hide();
        for (var i=0; i<boxDataArray.length; i++){
            buildProductViewerBox(boxDataArray[i]);
        }
        addAssociatedImageHover();
    };

    return {'addAssociatedProductViewer': addAssociatedProductViewer};
})();




//*************************** TODO fix collision events 
// function addDashNDHover(){
//     var DashNDConfig = {
//         id:'DashNDHover', 
//         title : 'Associated Product',
//         message : 'Loading....', 
//         hoverOver : $('a:contains("-ND")'), 
//         highlight : true,
//         interactive : true, 
//         my : 'left bottom',
//         at : 'right top', 
//         offset : '0 -20', 
//         collision : 'fit flipfit',
//         someFunc : loadDashNDHover
//     };
//     createHoverWindow(DashNDConfig);
// }

// function loadDashNDHover($hoveredObj, wcon){
//     $("#DashNDHoverContent").text('Loading....');
//     //_log('wcon title '+ wcon.title);
//     $("#DashNDHoverContent").load($hoveredObj.attr('href')+' table[itemtype="http://schema.org/Product"]', function(){
//         //edit add to order button functionality so it will work    
//         $('#DashNDHover').position({
//             my : 'left bottom',
//             at : 'right top',
//             of: $hoveredObj, 
//             offset : '0 -10',
//             collision : 'fit fit'
//         });

//         $(this).find('form').attr('method');
//     });
// }



function addCartHover(){
    //avoid applying cart logic to the cart page
    if(window.location.pathname.indexOf('Ordering') == -1 ){
        $('<div class=cartHoverContainer><div></div><div class=cartHoverContent></div></div>').insertAfter('#content').hide();

        loadCartDetails();
    }
}

function loadCartDetails(serialstring){
    _log('loadCartDetails() Start',DLOG);
    if(serialstring == undefined){serialstring = '';}
    var ordet = ' #ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_ordOrderDetails';
    $('.cartHoverContent').gmload('http://www.digikey.'+theTLD+'/classic/Ordering/AddPart.aspx?'+serialstring+ordet, function(){
        $('#cartquant').text( ' ('+($('img[src*="close-x"]').length)+')');
        _log('loadCartDetails() loaded',DLOG);

        $('#cartlink').tooltipster({
        // content: $('<div class=cartHover><div class=cartHoverTitle /> <div class=cartHoverContent> hit</div></div>'),
        content: $('.cartHoverContent'),
        trigger: 'hover',
        delay: 350,
        contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(){console.log('hovering')}
        })
    });
    _log('loadCartDetails() End',DLOG);
}


function formatOrderingPage(){
    if($('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_ordOrderDetails').length){
        _log('inlineChangeQty() Start',DLOG);
        $('form').show();
        // getCartImages();
        _log('inlineChangeQty() End',DLOG);
    }
}



// function createHoverWindow2(wcon){
//     _log('createHoverWindow2() Start',DLOG);
//     wcon = {
//         id : wcon.id, //required
//         hoverOver : wcon.hoverOver, //required
//         highlight : wcon.highlight, //true or false
//         title : wcon.title || '',
//         bubbleTo: wcon.bubbleTo || '',
//         message : wcon.message || '',
//         height : wcon.height || '', 
//         width : wcon.width || '', 
//         interactive : wcon.interactive || false, 
//         //position
//         my : wcon.my || 'right top', 
//         at : wcon.at || 'right bottom',
//         of : wcon.of || wcon.id,
//         offset : wcon.offset || '10 10',
//         collision : wcon.collision || '',
//         onparent : wcon.onparent || false, // postion on the parent of hovered object true or false
//         //hoverIntentConfig
//         interval: wcon.interval || 100,
//         sensitivity: wcon.sensitivity || 7,

//         //Intent function
//         someFunc : wcon.someFunc || function(){},
//         selector: wcon.selector || null,
//     };

//     _log('createHoverWindow2() tick1',DLOG);
//     $('#content').after(
//         '<div id="'+ wcon.id +'" class="gray-grad">'+
//         '<div class="clearfix" style="font-weight:bolder; width:100%; margin:4px 3px 3px 5px; display:inline;">'+
//         '<div id='+wcon.id+'Title style="float:left; margin:4px 3px 3px 5px;">'+ wcon.title +'</div>'+
//         '<button class="close clean-gray">X</button>'+'</div>'+
//         //'<button class="close'+ wcon.id +' clean-gray">X</button><br />'+
//         '<div id="'+ wcon.id +'Content">'+ wcon.message +'</div><br /></div>'
//     );

//     _log('createHoverWindow2() tick2',DLOG);
//     $('#'+wcon.id).css({
//         'position': 'fixed',
//         'box-shadow': '0 0 3px 5px #888',
//         'z-index': '20',
//         'border-radius': '5px',
//         'width': wcon.width,
//         'height': wcon.height,
//     }).hide();
    
//     _log('createHoverWindow2() tick3',DLOG);
//         wcon.bubbleTo.hoverIntent({
//             over: function(){
//                 $('#'+wcon.id).slideDown(200);
//                 if($.isFunction(wcon.someFunc($(this)))){
//                     wcon.someFunc($(this), wcon);
//                 }
                
//                 $('#'+wcon.id).position({
//                     my: wcon.my,
//                     at: wcon.at,
//                     of: (wcon.onparent ? $(this).parent(): $(this)), // position on the parent of hovered object if true
//                     offset: wcon.offset,
//                     collision : wcon.collision
//                 });
//                 if(wcon.highlight){
//                     $(this).css({'box-shadow':'0 0 1px 1px blue'});
//                 }
//             },
//             out: function(){
//                 if(!wcon.interactive){
//                     $('#'+wcon.id).fadeOut(200);
//                     if(wcon.highlight){
//                         $(this).css({'box-shadow':''});
//                     }
//                 }
//             },
//             interval: wcon.interval,
//             sensitivity: wcon.sensitivity,
//             selector : wcon.selector,
//         });
    
//     _log('createHoverWindow2() tick4',DLOG);
//     if(wcon.interactive){
//         $('#'+wcon.id).add(wcon.hoverOver).lazybind(
//             'mouseout', 
//             function(){
//                 $('#'+wcon.id).slideUp();
//                 if(wcon.highlight){
//                     wcon.hoverOver.css({'box-shadow':''});
//                 }
//             },
//             540,
//             'mouseover'
//         );
//     _log('createHoverWindow2() tick5',DLOG);
//     }
//     $('#'+wcon.id).on('click', '.close', function() {
//         $(this).parent().parent().slideUp(400);
//     });
//     _log('createHoverWindow2() End',DLOG);
// }


function makeImageHolder(){
    _log('makeImageHolder() Start',DLOG);
    //for detail page image holder

    $('.image-disclaimer').after('<div id="imageTray"></div>')
    var images = getImageLinks();
    images.forEach(function(image){
        $('#imageTray').append('<img class="trayThumbnail" height=64px style="border:1px solid #ccc; margin:1px;" src="'+image+'">');
    });
    $('.trayThumbnail').mouseenter(function(){
        console.log('hovering', $(this).attr('src'))
        $('.image-table img:first').attr('src', $(this).attr('src'));
        $('.image-table a:first').attr('href', $(this).attr('src'));
    });
    $('.image-disclaimer').hide();

    $('.image-table').insertBefore($('.product-details-main'));
    $('.beablock-image').css({'margin-left':'0px', 'border':'1px solid #ccc'});
    $('.beablock-image img').css({'border':'1px solid #ccc'});

    _log('makeImageHolder() End',DLOG);
}

function getImageLinks(){
    //for detail page image holder
    _log('getImageLinks() Start',DLOG);
    var imageURLs = [];
    var images = $('.attributes-table-main').find('a[href$=jpg], a[href$=JPG]').each(function(){
        imageURLs.push($(this).attr('href'));
    });
    images.parent().parent().hide();
    _log('getImageLinks() End',DLOG);
    return imageURLs;
}


// Loging function
function _log(somestring, detailed_logging){
    if (detailed_logging == null) detailed_logging=true;
    try{
        if(detailed_logging == true){unsafeWindow.console.log((Date.now()-starttimestamp)+'ms '+(Date.now()-sincelast)+'[as] '+somestring);}
        sincelast = Date.now();
    }
    catch(err){}
}



function formatFastAddPage(){
    if($('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtQty1').length){
        $('p').add('#aspnetForm').show();
        $('#mainContent').before('<b>Quick Paste</b><br>Copy multiple part numbers and quantities from a spreadsheet and paste into this box (experimental).  '+
            '<br>Exclude any header lines.  It should be able to pick out Quantity and Part Number in either order. Customer Ref not yet supported.  <br />'+
            '<textarea rows="2" cols="40" id="pastebox"></textarea> <br /><div class="pure-button button-small myRedButton" style="width:40px">OK</div>');
        
        $('#pastebox').change(function(){
            var lines = $('#pastebox').val().split(/\n\r?/gi);
            var line = [];
            var cols = [];
            var farray = [];
            for(var x=0; x<=lines.length; x++){
                line = lines[x];
                if(line != undefined){
                    if(line.split(/\t/g).length == 2){
                        cols = line.split(/\t/g);
                        if (cols[0].indexOf('-ND') != -1){
                            farray.push([cols[0],cols[1]]);
                            _log('DK# in first column, adding to farray '+ [cols[0],cols[1]] );
                        }else if (cols[1].indexOf('-ND') != -1){
                            farray.push([cols[1],cols[0]]);
                            _log('DK# in second column, adding to farray '+ [cols[1],cols[0]] );
                        }else {
                            alert('not finding -nd');
                        }
                    }

                }
                
                _log(farray.length);
                //_log(lines[x]);
            }
            addMoreRows(farray);
            var $onRow = $('.oddrow:first');
            for(var x=0; x<farray.length; x++){
                $onRow.find('input:eq(0)').val(farray[x][1]);
                $onRow.find('input:eq(1)').val(farray[x][0]);
                $onRow = $onRow.next();
            }
            $('#pastebox').val('');
        });
    }
}
function addMoreRows(farray){
    if(farray.length > 20){
        for(var x=21; x<farray.length; x++){
            $('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_tblAddParts').find('tr:last').after(
                '<tr class="evenrow" style="border-width:1px;border-style:solid;">'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+ x +
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtQty'+x+
                '" type="text" style="width:65px;" maxlength="9" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtQty'+x+'">'+
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtPart'+x+'" type="text" style="width:290px;" maxlength="48" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtPart'+x+'">'+
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtCref'+x+'" type="text" style="width:145px;" maxlength="48" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtCref'+x+'">'+
                '</td>'
            );
        }
    }
}





//useful for unbinding functions that are outside of the scope of greasemonkey
// location.assign("javascript:$(window).unbind('scroll resize');void(0)");


//note this.href is better than $(this).attr('href');



