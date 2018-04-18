(function($){
    jQuery.fn.gmload = function( url, params, callback ) {
        var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        if ( typeof url !== "string" && _load ) {
            return _load.apply( this, arguments );
        }

        // Don't do a request if no elements are being requested
        if ( !this.length ) {
            return this;
        }

        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if ( off >= 0 ) {
            selector = url.slice( off, url.length );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

        // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
                "Accept": "text/xml"            // If not specified, browser defaults will be used.
            },
            onload: function(response) {
                var responseXML = null;
                // Inject responseXML into existing Object (only appropriate for XML content).
                if (!response.responseXML) {
                    responseXML = new DOMParser()
                    .parseFromString(response.responseText, "text/xml");
                }
                // See if a selector was specified
                self.html( selector ?

                // Create a dummy div to hold the results
                jQuery("<div>")

                    // inject the contents of the document in, removing the scripts
                    // to avoid any 'Permission Denied' errors in IE
                    .append( response.responseText.replace( rscript, "" ) )

                    // Locate the specified elements
                    .find( selector ) :

                // If not, just inject the full result
                response.responseText );
                callback();
            }
        });
    };
})(jQuery);



$.extend($.expr[":"], {
    exactly: function( element, index, details, collection ){
        return $(element).text().trim() === details[3];
    }
});

// // Loging function
// function _log(somestring, detailed_logging){
//     if (detailed_logging == null) detailed_logging=true;
//     try{
//         if(detailed_logging == true){unsafeWindow.console.log((Date.now()-starttimestamp)+'ms '+(Date.now()-sincelast)+'[as] '+somestring);}
//         sincelast = Date.now();
//     }
//     catch(err){}
// }

jQuery.expr.filters.offscreen = function(el) {
    return (
            (el.offsetLeft + el.offsetWidth) < 0 ||
            (el.offsetTop + el.offsetHeight) < 0 ||
            (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
    );
};


(function($){
    $.fn.lazybind = function(event, fn, timeout, abort){
        var timer = null;
        $(this).bind(event, function(){
            timer = setTimeout(fn, timeout);
        });
        if(abort == undefined){
            return;
        }
        $(this).bind(abort, function(){
            if(timer != null){
                clearTimeout(timer);
            }
        });
    };
})(jQuery);

// Reusable generic function
function surroundMatchingText(textNode, regex, surrounderCreateFunc) {
    var parent = textNode.parentNode;
    var result, surroundingNode, matchedTextNode, matchLength, matchedText;
    while ( textNode && (result = regex.exec(textNode.data)) ) {
        matchedTextNode = textNode.splitText(result.index);
        matchedText = result[0];
        matchLength = matchedText.length;
        textNode = (matchedTextNode.length > matchLength) ?
            matchedTextNode.splitText(matchLength) : null;
        surroundingNode = surrounderCreateFunc(matchedTextNode.cloneNode(true));
        parent.insertBefore(surroundingNode, matchedTextNode);
        parent.removeChild(matchedTextNode);
    }
}

// This function does the surrounding for every matched piece of text
// and can be customized  to do what you like
function createSpan(matchedTextNode) {
    var el = document.createElement("span");
    el.style.backgroundColor = "lightgreen";
    el.appendChild(matchedTextNode);
    return el;
}

// The main function
function wrapText(container, text) {
    text = text.replace(/\W/gi,'');
    var wordsToHighlight = text.trim().split(' ');
    //_log(wordsToHighlight, DLOG);
    for (var x=0; x < wordsToHighlight.length; x++){
        surroundInElement(container, new RegExp(wordsToHighlight[x], "gi"), createSpan);
    }
}

//Functions off of a stack exchange post
// Reusable generic function
function surroundInElement(el, regex, surrounderCreateFunc) {
    // script and style elements are left alone
    if (!/^(script|style)$/.test(el.tagName)) {
        var child = el.lastChild;
        while (child) {
            if (child.nodeType == 1) {
                surroundInElement(child, regex, surrounderCreateFunc);
            } else if (child.nodeType == 3) {
                surroundMatchingText(child, regex, surrounderCreateFunc);
            }
            child = child.previousSibling;
        }
    }
}

function askpermission(theversion){
    if(localStorage.getItem('achoice') == undefined){
        var conf = confirm('---- Message from advancedsearch Greasemonkey userscript author ----\n\n Can I collect some analytics to help improve this script?  \n\n Please say yes (OK)... It will make a big difference in the future. To opt out click Cancel.\n\nYou can turn this on or off in the +controls+ menu at any point in the future.');
        if (conf){

            addpiwik(theversion);
            localStorage.setItem('achoice', 1);
            localStorage.setItem('analytics', 1);
            $('#analytics').prop('checked', 1);
            $('#analytics').val(1);
        }else{
            localStorage.setItem('achoice', 0);
        }
    }else if (localStorage.getItem('analytics') == 1){
        addpiwik(theversion);
    }else {}
}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function addpiwik(theversion){
    // _log('addpiwik() Start',DLOG);
    // console.log(version);
    var theuid = getID();
    var webref = document.referrer.toString();//.replace(/\&/g, '_');
    var docloc = document.location.toString().replace(/\&/g, 'xxx');
    var iview = 'c:'+localStorage.getItem('columnchooserstate') +
    ' q:' + localStorage.getItem('qfLocation')+
    ' w:' + localStorage.getItem('wrapFilters')+
    ' e:' + localStorage.getItem('exploremodecheckbox')+
    ' d:' + localStorage.getItem('datasheetchooserinput');

    
    var cvar = '{"1":["version", "'+theversion+'"], "2":["iview", "'+iview+'"]}';
    // var docloc = document.location.toString().replace(/\&/g, '&');
    // _log(docloc, DLOG);
    var imgsrc = ('https://he-st.com/p/piwik.php?idsite=1&amp;rec=1'+
        '&amp;url='+ encodeURIComponent( docloc) +
        '&amp;_id='+ encodeURIComponent( theuid) +
        // '&amp;action_name='+ webref +
        '&amp;res='+ window.screen.availHeight + 'x' + window.screen.availWidth +
        '&amp;_cvar='+ encodeURIComponent(cvar)
    );
    $('body').append('<img src="'+imgsrc+'" style="border:0" alt="" />');
    // _log('addpiwik() End',DLOG);
}

//change contains expression to case insensitive
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};


function selectorEscape(str) {
    //escapes special characters so a string can safely be used for class names and in selectors.
    if (str){return str.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g,'');}
    return str;
}

function string2form(form, serializedStr) {// Unused
    var fields = JSON.parse(serializedStr);
    for(var i = 0; i < fields.length; i++) {
        var controlName = fields[i].name;
        var controlValue = fields[i].value;
        form.find("[name='" + controlName + "']").val(controlValue);
    }
}

function getID(){
    // console.log('getid ', localStorage.getItem('uid').length, 'uid ', localStorage.getItem('uid'));
    if (localStorage.getItem('uid') == null){
        var y = '';
        var possible = "ABCDEF0123456789";
        for( var i=0; i < 16; i++ ){
            y += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        localStorage.setItem('uid', y);
        return y;
    }
    else { return localStorage.getItem('uid'); }
}

//highlighting function
(function($) {
    $.fn.highlight = function(str, className) {
        str = str.replace(/\W/gi, '');
        var regex = new RegExp(str, "gi");
        return this.each(function() {
            $(this).contents().filter(function() {
                return this.nodeType == 3 && regex.test(this.nodeValue);
            }).replaceWith(function() {
                return(this.nodeValue || "").replace(regex, function(match) {
                    return "<span class=\"" + className + "\">" + match + "</span>";
                });
            });
        });
    };
})(jQuery);

function uniqueArray(ar) {
    var f = {},
    i = 0,
    l = ar.length,
    r = [];
    while (i < l) {
        !f[ar[i]] && r.push(ar[i]);
        f[ar[i++]] = 1;
    }
    return r;
}

function trim (str) {
    //TODO de-globalize
    str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

function getQuerystring(key, default_) {
    if(default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)", 'i');
    var qs = regex.exec(window.location.href);
    if(qs == null) return default_;
    else return qs[1];
}





// ------------- Hibernating code -----------------

//function addProductDrawer(){//No longer used, but here for reference
//     //localStorage.setItem('drawercontent', $(this).html());
//             //$(this).remove();
//             $('#content').after(
//                 '<div id=pDrawer class=container>'+
                    
//                     '<div id=pDrawerCont style="float:left;" class="left"></div>'+
//                     '<div id=pDrawerHandle style="float:left" class="right">C</div>'+
                    
//                 '</div>'
//             );
//             $('#pDrawer').append(localStorage.getItem('drawercontent'));
//             $('#pDrawer').css({
//                 'position': 'fixed',
//                 'width': '340px',
//                 'height': '100%',
//                 'right': '0px',
//                 'top': '50px',
//                 //'bottom': '50px',
//                 'font-size': '15px',
//                 'backgroundColor': '#CCC',
//                 'border': '1px solid #CCC',
//                 "borderRadius": "5px 0px 0px 5px",
//                 'padding': '5px',
//                 //'box-shadow': ' 1px 1px 2px #888',
//                 'overflow': 'auto'
//             });
//             $('#pDrawerCont').css({
//                 //'float': 'left',
//                 'width': $('#pDrawer').width()-10,
//             });         
//             $('#pDrawerHandle').css({
//                 //'float': 'left',
//                 //'line-height': '100%',
//                 //'position': 'absolute',
//                 'height' : '100%',
//                 'background': 'white',
//                 'width': '10px',
//                 "borderRadius": "5px 0px 0px 5px",
//                 'cursor': "pointer" 
//             });


//             $('#pDrawerHandle').click(function(){
//                 _log('sliding right');
//                 //$('#pDrawer').animate({'width':'10px'});
//                 // $('#pDrawer').toggle(
//                 //  function(){
//                 //      $(this).css({'overflow': ''});
//                 //      $(this).animate({'width':'10px'});
//                 //  }, function(){
//                 //      $(this).css({'overflow': 'auto'});
//                 //      $(this).animate({'width':'340px'});
//                 // });

//             });
//             // $('.clear').css({
//             //  'clear': 'both',
//             // });

//             //GM_addStyle('.clearfix:after {visibility: hidden;display: block;font-size: 0;content: " ";clear: both;height: 0;} * html .clearfix { zoom: 1; } /* IE6 */ *:first-child+html .clearfix { zoom: 1; } /* IE7 */');


//             $('.category').css({
//                 'cursor': 'pointer',
//             });
            
//             $('.category').click(function(){
//                 //$('#pDrawerCont').find('ul').toggle(false);
//                 $('.category').not(this).next('ul').toggle(false);
//                 $('.category').not(this).find('.plus').toggle(true);
//                 $('.category').not(this).find('.minus').toggle(false);
//                 $(this).next('ul').toggle();
//                 $(this).find('.minus,.plus').toggle();
//                 // $(this).next('ul').toggle(
//                 //  function(){
//                 //      $(this).show().height('0%');
//                 //      $(this).animate({'height': '100%'}, 200);
//                 //      $(this).parent().find('.catexpandplus').hide();
//                 //      $(this).parent().find('.catexpandminus').show();
//                 //  }, 
//                 //  function(){
//                 //      $(this).parent().find('.catexpandplus').show();
//                 //      $(this).parent().find('.catexpandminus').hide();
//                 //  }
//                 // );
//                 //$(this).find('.catexpand').toggle();
//             });
// }

// function updateProductDrawer(){//No longer used, but here for reference
//     var d = new Date();
//     localStorage.removeItem('drawerupdate');
//     if (localStorage.getItem('drawerupdate')==null || localStorage.getItem('drawerupdate')+86400000 < d.getTime()){
//         localStorage.setItem('drawerupdate', d.getTime());
//         _log('drawer '+ localStorage.getItem('drawercontent')+ ' drawerupdate ' +localStorage.getItem('drawerupdate'));
//         saveProductDrawer();
//     } 
//     else if(localStorage.getItem('drawerupdate')+86400000 > d.getTime()){
//         addProductDrawer();
//     }
//     //_log(d.getTime()+' drawer '+ localStorage.getItem('drawercontent').length+ ' drawerupdate ' +localStorage.getItem('drawerupdate'));
// }

// function saveProductDrawer(){//No longer used, but here for reference
//     $('<div>').load('http://www.digikey.'+theTLD+'/product-search/en #content', function(){
//         $(this).find('hr,h1,p,form').remove();  
//         $(this).find('#content').children().unwrap();

//         $(this).html( $(this).html().replace(/h2/gi, 'div'));
//         $(this).find('.catfiltertopitem').removeClass('catfiltertopitem').addClass('category');
//         $(this).find('ul').css({
//             'display': 'none',
//         });
//         $(this).find('.category>a').each(function(){
//             $(this).before('<span class="toggler plus">+ </span><span class="toggler minus" style="display:none">- </span>'+$(this).text()+' ');
//             $(this).text('(link)');
//         });
//         localStorage.setItem('drawercontent', $(this).html());
//         addProductDrawer();
//     });
// }


// function processURL() {/* TODO UNUSED - functionality to parse the search string and preselect values in the drill down search*/
//     _log(window.location.search);
//     _log(decodeURIComponent(window.location.search));
//     var searchString = decodeURIComponent(window.location.search);
//     var fVOLT = rVOLT.exec(searchString)[0].replace('=', '');
//     _log( fVOLT);
//     if(fVOLT) {
//         _log($('select[name="PV48"]').find('option:contains('+fVOLT+')').size());
//         vopt = $('select[name="PV48"]').find('option:contains(' + fVOLT + ')');
//         _log(vopt.size());
//         var x = 0;
//         for(x; x < vopt.size(); x++) {
//             var myregex = new RegExp('([^.\d])(' + fVOLT + '|' + fVOLT.replace(/\s/g, '') + ')', 'i');
//             if((/(\b|[^.])5v/i).test(vopt[x].text)) {
//                 _log(vopt[x].text.replace(/\s/g,''));
//             }
//         }
//     }
// }


// function sortingExample(){ //unused keep for example
//     var ind = $(this).index();
//     var rows = $('#productTable>tbody>tr').sort(function(a,b){
//         var atext = $(a).find('td').eq(ind).text();
//         var btext = $(b).find('td').eq(ind).text();
//         var anum = parseFloat(atext);
//         var bnum = parseFloat(btext)
//         //console.log(anum , bnum);
//         if(isNaN(anum-bnum)) {
//             return (isNaN(anum)) ? 1 : 0;   
//         }
//         else{
//             return parseFloat(atext) - parseFloat(btext);
//         }
        
//     });
    
//     $('#productTable>tbody').append(rows);
// }

// extra regexs to save for later
//frnum = /(\W|\b)([0-9]+)(\.)?[0-9]*[\s\+]?/; // fractional number
//VOLT = /\s?(volts?|voltage|v-?ac|v-?dc|v)\b/;
//rVOLT = new RegExp(frnum.source + VOLT.source, 'i');
// AMP = /\s?(amps?|a)\\b/i;
// VOLTAMP = /\s?(va)\\b/i;
// OHM = /\s?(ohms?|meg|resistors?|res|pot)\\b/i;
// CAP = /\s?(farads?|f|cap(acitor)?)\\b/i;
// INDUCTOR = /\s?(henry|h)\\b/i;
// MEMORY = /\s?(byte|b)\\b/i;
// METER = /\s?(meters?|m)\\b/i;
// INCH = /[\s]?(inches|inch|(?<![a-z])in|\")\\b/i;
// FOOT = /\s?(feet|foot|ft|\')\\b/i;
// HERTZ = /\s?(hertz|hz)\\b/i;
// TEMP = /\s?(degrees\s[fc]|deg\s[fc])\\b/i;
// SECOND = /\s?(second|sec|s)\\b/i;



// function getFamilyLinkOLD(){
//     _log('getFamilyLink() Start',DLOG);
//     var myhref = $('h1.seohtagbold').find('a:last').attr('href').split('?')[0];
//     var myhtml = $('h1.seohtagbold').html();
//     var thesplit = myhtml.split(/&gt;/g);
//     var mypop = thesplit.pop();
//     var modifiers = $('#mainform input[type=checkbox], #mainform input[name=quantity], #mainform input[name=ColumnSort]').serialize()+'&akamai-feo=off';
//     //this needs to remain in this logical order of replacement to get desired results.  Do not combine.
//     var finalhref = myhref+'/'+mypop.toLowerCase().trim()
//         .replace('&nbsp;','')
//         .replace('\/', '-')
//         .replace(/-\s/,'')
//         .replace(/[,\(\)]/g,'')
//         .replace(/&nbsp;|\s/g,'-')
//         .replace('---','-')+
//         '?'+modifiers;
//     _log('getFamilyLink() End',DLOG);
//     return finalhref;
// }


//No longer used, but here for reference

//SAVE FOR REFERENCE
// var tablelen = $('#mainform>th').length;
// var maxHeight = Math.max.apply(null, $('#mainform>table>tbody').map(function (){
// return $(this).height();
// }).get());

// function addDocRetrieve(){//No longer used, but here for reference
//     $('#productTable tr a').find('img[src*="8S0j5"],img[src*="datasheet.gif"]').parent().parent()
//     .append('<br><div class="documentation pointer" style="margin-top:3px; line-height:10px">more v</div>');
//     $('.documentation').each(function(){
//         var mylink = $(this).closest('tr').find('a[href*=-ND]:first').attr('href');
//     });
//     var docConfig = {
//         id:'docHover', 
//         title : 'More Related Documents',
//         message : 'Loading....', 
//         hoverOver : $('.documentation'), 
//         //height : '220px', 
//         width :'400px', 
//         interactive : true, 
//         my : 'left top',
//         at : 'right top', 
//         offset :'5 -35', 
//         someFunc : loadDocs
//     };
//     createHoverWindow(docConfig);
// }
// function loadDocs($hoveredObj){//No longer used, but here for reference
//     $('#docHoverContent').text('Loading....');
//     var mylink = $hoveredObj.closest('tr').find('a[href*=-ND]:first').attr('href');
//     $('#docHoverContent').load(mylink+ ' table:contains("Datasheets"):first', function(){
//         $(this).find('tr')
//             .not(':contains(Datasheets)')
//             .not(':contains("Product Training")')
//             .not(':contains("Reference Design Library")')
//             .not(':contains("Reference Design Library")')
//             .hide();
//         $(this).find('td .beablock').hide();
//     });
//buglist
//http://www.digikey.com/product-detail/en/TEACL-PIC-LV/658-1020-5-ND/1687139
// }





// // associated parts function.
// var apOld = (function(){
//     var columnList = [
//         {'name':'Image', 'f': detailPageInfo.getImage,},
//         {'name':'Manufacturer Part Number', 'f':detailPageInfo.getMPN},
//         {'name':'Manufacturer', 'f':detailPageInfo.getManufacturer},
//         {'name':'Description', 'f':detailPageInfo.getDescription},
//         {'name':'Packaging', 'f':detailPageInfo.getPackaging},
//         {'name':'Unit Price', 'f':detailPageInfo.getUnitPrice},
//         {'name':'Quantity Available', 'f':detailPageInfo.getQuantityAvailable},
//         {'name':'Min Quantity', 'f':detailPageInfo.getMinQuantity}
//     ];
//     var cLen = columnList.length;
//     var perPage = 5;

//     var buildProductViewerBox = function(item){

//         var firstRowHTML = '';
//         for (var z=0; z<columnList.length; z++){
//             firstRowHTML = firstRowHTML+ '<th>' + columnList[z].name + '</th>';
//         }
//         var allRows = ''
//         for(var z=0; z<item.list.length; z++){
//             allRows = allRows + buildRowHTML(item.list[z]);
//         }
//         var itemSel = selectorEscape(item.title)

//         $('#additional-product-options-section').append(
//             '<div id="asd-id-'+itemSel+'" class="asd-containerOld panel panel-default">'+
//                 '<div class="asd-title panel-heading">'+item.title+' ('+ item.list.length +')</div>'+
//                 '<div class="asd-content panel-body">'+
//                 '<table id="table-'+itemSel+'" class="asd-table tstripe"> '+
//                     '<thead><tr>'+firstRowHTML+'</tr></thead>'+
//                     '<tbody>'+allRows+'</tbody>'+
//                 '</table>'+
//                 '</div>'+
//             '</div>'
//         );

//         $('#asd-id-'+itemSel).data('itemlist', item.list);

//         $('#table-'+itemSel).find('tbody tr').each(function(ind){
//             $(this).data('linkobj',item.list[ind]);
//             $(this).data('boxSel', $('#asd-id-'+itemSel));
//         });

//         $('#table-'+ itemSel).find('tbody>tr').slice(perPage).hide();

//         if (item.list.length > perPage){
//             addPageination(itemSel, item.list.length);
//         }

//         addFilterAllForm($('#asd-id-'+itemSel));

//         var listlength = (item.list.length >= perPage) ? perPage :item.list.length;
//         for(var z=0; z<listlength; z++){
//             getDetailPage(item.list[z], $('#asd-id-'+itemSel));
//         }

//     },

//     addPageination = function (itemSel, listLen) {
//         $('#asd-id-'+itemSel).find('.asd-content').append('<div class="pagination page-'+itemSel+'">'+
//                 '<a href="#" class="first" data-action="first">&laquo;</a>'+
//                 '<a href="#" class="previous" data-action="previous">&lsaquo;</a>'+
//                 '<input type="text" readonly="readonly" data-max-page="'+Math.ceil(listLen/perPage)+'" />'+
//                 '<a href="#" class="next" data-action="next">&rsaquo;</a>'+
//                 '<a href="#" class="last" data-action="last">&raquo;</a>'+
//             '</div>');

//             $('.page-'+itemSel).jqPagination({
//                 paged: function(page) {
//                     var $rows = $('#table-'+itemSel+' tbody > tr')
//                     $rows.hide()// do something with the page variable
//                     var $showing = $rows.slice((page*5 - 5),(page * 5)).show()// do something with the page variable
//                     $showing.not('.filled').each(function(){
//                         getDetailPage($(this).data('linkobj'), $(this).data('boxSel'));
//                     })
//                 }
//             });
//     }

//     buildRowHTML = function(pnlinkobj){
//         var row = "";
//         for (var i = 0; i < columnList.length; i++) {
//             row = row + '<td class="col-'+selectorEscape(columnList[i].name)+'"></td>';
//         };
//         row = '<tr class="'+selectorEscape(pnlinkobj.pn)+'">' + row + '</tr>'
//         return row;
//     },

//     getDetailPage =    function (pnlinkobj, $boxSel){
//         var jqxhr = $.get(pnlinkobj.href)
//                 .done(function(data){
//                     var $d = $(data);
//                     fillRow($d, pnlinkobj, $boxSel)
//                 })
//                 .fail(function(){console.log(pnlinkobj, ' failed');})
//                 .always(function(){});
//     },
//     fillRow = function ($DetailPageContent, pnlinkobj, $boxSel){
//         var rowSel = selectorEscape(pnlinkobj.pn);
//         var row = $('.'+rowSel);

//         for (var x=0; x<cLen; x++){
//             row.not('.filled').find('.col-'+selectorEscape(columnList[x].name)).append(columnList[x].f($DetailPageContent));
//             if (x < 2){ row.find('.col-'+selectorEscape(columnList[x].name)).contents().wrap('<a href="'+pnlinkobj.href+'" />') ; }
//         }
//         row.addClass('filled');
//         console.log('addrowdone');
//     },

//     getAssociationListFromElem = function (parentElem){
//         var pnlinkarray = []
//         parentElem.find('.more-expander-item').each(function(){
//             pnlinkarray.push({
//                 'href': $(this).find('a:first').attr('href'),
//                 'pn': $(this).find('a:first').text()
//             });
//         });
//         //console.log(pnlinkarray);
//         return pnlinkarray;
//     },

//     addFilterAllForm = function($boxSel){
//         var pnlist = '';
//         var itemlist = $boxSel.data('itemlist');
//         itemlist.forEach(function(x){ pnlist = pnlist+'<input type=hidden name="part" value="'+x.pn+'">'});
//         console.log(pnlist);
//         var formHTML = '<div style="float:right;"><div style="clear:both; margin:0px 15px 1px 0px;"><form  action="/scripts/DkSearch/dksus.dll" method=get>'+
//         '<input type=submit value="View All '+itemlist.length+'">'+ '<input id="associatedInStock" type="checkbox" class="css-checkbox"><label class="css-label" for="associatedInStock">In Stock</label>'+
//             pnlist+
//         '</form></div></div><div style="clear:both;"></div>';
//         $boxSel.find('.asd-content').append(formHTML);
//     },

//     addAssociatedImageHover = function(){
//         _log('associatedImageHover() Start',DLOG);

//        $('body').append('<img border="0/" src="" style="heightdisplay: none; height:200px; width:200px; box-shadow: 0 0 10px 5px #888; position:absolute;" class="pszoomie2 psshadow" id="pszoomie2">');

//         $('.asd-containerOld').hoverIntent({
//             over: function () {
//                 $('#pszoomie2').attr('src','');
//                 $('#pszoomie2')
//                 .attr('src', $(this).attr('src'))
//                 .show('fade', 200)
//                 .position({
//                     my : 'right middle',
//                     at : 'left middle',
//                     of: $(this), 
//                     offset : '-10 0',
//                     collision : 'fit fit'
//                 });
//             },
//             out: function () {
//                 $('.pszoomie2').fadeOut(100);
//             },
//             'selector': '.col-Image img'
//         }
//         );
//         _log('associatedImageHover() End',DLOG);
//     },

//     addAssociatedProductViewer = function (){
//         var boxDataArray = [];
//         // $('.expander-div-10').each(function(){
//         //     boxDataArray.push({
//         //         'title': $(this).closest('tr').find('th').text(), 
//         //         'list':getAssociationListFromElem($(this))
//         //     });
//         //     $(this).closest('tr').hide()
//         // });
//         $('.expander-div-5').each(function(){
//             if($(this).find('.product-details-also-evaluated').length < 1){
//                 boxDataArray.push({
//                     'title': $(this).parent().find('.bota-headline').text().split('\n')[0], 
//                     'list':getAssociationListFromElem($(this))
//                 });
//             }
//         });
//         $('#additional-product-options-section .bota').hide();
//         for (var i=0; i<boxDataArray.length; i++){
//             buildProductViewerBox(boxDataArray[i]);
//         }
//         addAssociatedImageHover();
//     };

//     return {'addAssociatedProductViewer': addAssociatedProductViewer};
// })();

// var ap= (function(){
//     var columnList = [
//         {'name':'Image', 'f': detailPageInfo2.getImage,},
//         {'name':'Manufacturer Part Number', 'f':detailPageInfo2.getMPN},
//         {'name':'Manufacturer', 'f':detailPageInfo2.getManufacturer},
//         {'name':'Description', 'f':detailPageInfo2.getDescription},
//         // {'name':'Packaging', 'f':detailPageInfo2.getPackaging},
//         {'name':'Unit Price', 'f':detailPageInfo2.getUnitPrice},
//         {'name':'Quantity Available', 'f':detailPageInfo2.getQuantityAvailable},
//         // {'name':'Min Quantity', 'f':detailPageInfo2.getMinQuantity}
//     ];
//     var assTypes = [
//         "MatingProducts",
//         "AssociatedProduct"
//     ];

//     // reference: description, detailLink, imageLink, manufacturer, manufacturerPartNumber, minimumOrderQuantity, 
//     // nonStock, packageType, quantityAvailable, reportPartNumber, unitPrice
//     var cLen = columnList.length;
//     var perPage = 5;



//     var buildProductViewerBox = function(associationSet){
//         var firstRowHTML = '';
//         for (var z=0; z<columnList.length; z++){
//             firstRowHTML = firstRowHTML+ '<th>' + columnList[z].name + '</th>';
//         }
//         var allRows = '';
//         for(var z=0; z<associationSet.list.length; z++){
//             allRows = allRows + buildRowHTML(associationSet.list[z]);
//         }
//         var escTitle = selectorEscape(associationSet.title);


//         $('#additional-product-options-section').append(
//             '<div id="asd-id-'+escTitle+'" class="asd-container panel panel-default">'+
//                 '<div class="asd-title panel-heading">'+associationSet.title+' ('+ associationSet.list.length +')</div>'+
//                 '<div class="asd-content panel-body">'+
//                 '<table id="table-'+escTitle+'" class="asd-table tstripe"> '+
//                     '<thead><tr>'+firstRowHTML+'</tr></thead>'+
//                     '<tbody>'+allRows+'</tbody>'+
//                 '</table>'+
//                 '</div>'+
//             '</div>'
//         );

//         $('#asd-id-'+escTitle).data('associationSetlist', associationSet.list);

//         $('#table-'+escTitle).find('tbody tr').each(function(ind){
//             $(this).data('linkobj',associationSet.list[ind]);
//             $(this).data('boxSel', $('#asd-id-'+escTitle));
//         });


//         $('#table-'+ escTitle).find('tbody>tr').slice(perPage).hide();
//         if (associationSet.list.length > perPage){
//             addPageination(escTitle, associationSet.list.length);
//         }
//         addFilterAllForm($('#asd-id-'+escTitle), associationSet.viewAllLink, associationSet.list.length); //addback

//         var listlength = (associationSet.list.length >= perPage) ? perPage :associationSet.list.length;
//         for(var z=0; z<listlength; z++){
//             var associationSetData = $('#table-'+escTitle).find('.'+selectorEscape(associationSet.list[z].manufacturerPartNumber)).data('linkobj');
//             var $boxSel = $('#table-'+escTitle).find('.'+selectorEscape(associationSet.list[z].manufacturerPartNumber)).data('boxSel');
//             fillRow(associationSetData , $boxSel);
//         }

//     },

//     fillRow = function (itemData, $boxSel){
//         var rowSel = selectorEscape(itemData.manufacturerPartNumber);
//         var row = $('.'+rowSel);

//         for (var x=0; x<cLen; x++){
//             row.not('.filled').find('.col-'+selectorEscape(columnList[x].name)).append(columnList[x].f(itemData));
//             if (x < 2){ row.find('.col-'+selectorEscape(columnList[x].name)).contents().wrap('<a href="'+itemData.detailLink+'" />') ; }
//         }
//         row.addClass('filled');
//     },

//     addPageination = function (itemSel, listLen) {
//         $('#asd-id-'+itemSel).find('.asd-content').append('<div class="pagination page-'+itemSel+'">'+
//                 '<a href="#" class="first" data-action="first">&laquo;</a>'+
//                 '<a href="#" class="previous" data-action="previous">&lsaquo;</a>'+
//                 '<input type="text" readonly="readonly" data-max-page="'+Math.ceil(listLen/perPage)+'" />'+
//                 '<a href="#" class="next" data-action="next">&rsaquo;</a>'+
//                 '<a href="#" class="last" data-action="last">&raquo;</a>'+
//             '</div>');

//             $('.page-'+itemSel).jqPagination({
//                 paged: function(page) {
//                     var $rows = $('#table-'+itemSel+' tbody > tr');
//                     $rows.hide()// do something with the page variable
//                     var $showing = $rows.slice((page*5 - 5),(page * 5)).show()// do something with the page variable
//                     $showing.not('.filled').each(function(){
//                         var itemData = $(this).data('linkobj');
//                         var $boxSel = $(this).data('boxSel');
//                         fillRow(itemData, $boxSel)
//                         // getDetailPage($(this).data('linkobj'), $(this).data('boxSel'));
//                     })
//                 }
//             });
//     },



//     buildRowHTML = function(item){
//         var row = "";
//         for (var i = 0; i < columnList.length; i++) {
//             row = row + '<td class="col-'+selectorEscape(columnList[i].name)+'"></td>';
//         };
//         row = '<tr class="'+selectorEscape(item.manufacturerPartNumber)+'">' + row + '</tr>'
//         return row;
//     },

//     getAssociationListFromElem = function (parentElem){
//         var pnlinkarray = []
//         parentElem.find('.more-expander-item').each(function(){
//             pnlinkarray.push({
//                 'href': $(this).find('a:first').attr('href'),
//                 'pn': $(this).find('a:first').text()
//             });
//         });
//         console.log('>>>>>>>>>>>',pnlinkarray);
//         return pnlinkarray;
//     },

//     addFilterAllForm = function($boxSel,viewAllLink,listlength){
//         var pnlist = '';
//         // var itemlist = $boxSel.data('itemlist');
//         // itemlist.forEach(function(x){ pnlist = pnlist+'<input type=hidden name="part" value="'+x.pn+'">'});
//         // console.log(pnlist);
//         var formHTML = '<div style="float:right;" id="'+$boxSel.attr('id')+'-link""><div style="clear:both; margin:0px 15px 1px 0px;">'+
//         '<a id="'+$boxSel.attr('id')+'-link"" href="'+viewAllLink+'" target="_blank">View All <span>'+listlength+'</span> </a>'+ '<input id="'+$boxSel.attr('id')+'-stock" type="checkbox" class="css-checkbox"><label class="css-label" for="'+$boxSel.attr('id')+'-stock">In Stock</label>'+

//         '</div></div><div style="clear:both;"></div>';

//         $boxSel.find('.asd-content').append(formHTML);

//         $('#'+$boxSel.attr('id')+'-stock').data('allstocklink', viewAllLink)

//         $('#'+$boxSel.attr('id')+'-stock').click(function(){
//             if($(this).prop('checked') == true ){
//                 console.log('ischecked')
//                 $('#'+$boxSel.attr('id')+'-link a').attr('href', $(this).data('allstocklink')+'&stock=1')
//             }else{
//                 console.log('is not checked')
//                 $('#'+$boxSel.attr('id')+'-link a').attr('href', $(this).data('allstocklink'))
//             }
//             $(this).parent().parent().find('span').load($('#'+$boxSel.attr('id')+'-link a').attr('href')+' .matching-records:first', function(){
//                 $(this).text($('.matching-records').text().split(':')[1])
//             })
//         });
//     },

//     addAssociatedImageHover = function(){
//         _log('associatedImageHover() Start',DLOG);

//        $('body').append('<img border="0/" src="" style="display: none; height:200px; width:200px; box-shadow: 0 0 10px 5px #888; position:absolute;" class="pszoomie2 psshadow" id="pszoomie2">');

//         $('.asd-container').hoverIntent({
//             over: function () {
//                 $('#pszoomie2').attr('src','');
//                 $('#pszoomie2')
//                 .attr('src', $(this).attr('src').replace('_tmb', '_sml'))
//                 .show('fade', 200)
//                 .position({
//                     my : 'right middle',
//                     at : 'left middle',
//                     of: $(this), 
//                     offset : '-10 0',
//                     collision : 'fit fit'
//                 });
//             },
//             out: function () {
//                 $('.pszoomie2').fadeOut(100);
//             },
//             'selector': '.col-Image img'
//         }
//         );
//         _log('associatedImageHover() End',DLOG);
//     },

//     addAssociatedProductViewer = function (){
//         var boxDataArray = [];

//         boxDataArray = getAllAssociations();
//         for (var i=0; i<boxDataArray.length; i++){
//             buildProductViewerBox(boxDataArray[i]);
//             console.log('**********************************', boxDataArray[i])
//         }
//         addAssociatedImageHover();
//         $('.additional-interested').insertAfter('#bottomhalf');
//         // handleExpanderDiv5();
//     };

//     return {'addAssociatedProductViewer': addAssociatedProductViewer};
// })();


// function getAssociationNames(){
//     var names = [];
//     $('.expander-div-5').each(function(){
//         if($(this).find('.product-details-suggested-subs').length == 1){
//             names.push('Direct Subs')
//             $(this).parent('.bota').detach();
//         }else if ($(this).find('.product-details-alternate-packaging').length ==1){
//             names.push('AlternatePackaging');
//             $(this).parent('.bota').detach();
//         }
//     })
//     $('.expander-div-10').each(function(){
//         names.push($(this).closest('tr').find('th').text()); 
//         $(this).closest('tr').hide();
//     });
//     return names;
// }
// function getAssociationDataFromPageByType(assType){
//     var escaped = selectorEscape(assType);
//     return (window.eval(escaped));
// }
// function getAllAssociations(){
//     var assocationData = [];
//     var names = getAssociationNames();
//     names.forEach(function(el,idx,arr){
//         var escaped = selectorEscape(el);
//         var alldata = window.eval(escaped);
//         console.log(escaped, 'escaped eval', alldata[0]);
//         assocationData.push({
//             'title': el,
//             'list': (alldata[0].showAllLink != undefined) ? alldata.slice(1) : alldata.slice(0),
//             'viewAllLink': (alldata[0].showAllLink != undefined) ? alldata[0].showAllLink : 'none'
//         }) ;
//     });
//     console.log('associatione data', assocationData);
//     return assocationData;
// }




// function addPartCompare(){
//     _log('addPartCompare() Start',DLOG);
//     $('form[name=compform]').attr('id','compareForm');
//     $('#content').append('<div style="height:150px;"></div>');
//     addBottomCompare();
//     $('#compareForm').change(function(){
//             if($('#compareForm input:checked').length > 0 && $('#bottomCompare:hidden').length == 1){
//                 $('#bottomCompare').show('slide', {'direction':'down'}, 500);
//                 populateCompare($('#compareForm input:checked'));
//             }
//             else if($('#compareForm input:checked').length===0){
//                 $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
//             }else{
//                 populateCompare($('#compareForm input:checked'));
//             }           
//         });
//     _log('addPartCompare() End',DLOG);
// }

// function populateCompare($checkedItems){
//     $('#bottomCompareCont').empty();
//     $('#bottomCompareCont').append('<table style="height:100%"><tbody><tr></tr></tbody></table>');
//     $checkedItems.removeClass();
//     $checkedItems.each(function(i){
//         var mytr = $(this).closest('tr');
//         $('#bottomCompareCont>table tr:first').append('<td class="compdivs" valign=top align=center>'+
//             '<span class=clickcheck style="float:right; cursor:pointer; color:red;">x</span>'+
//             mytr.find('a[href*="-ND"]:first').html()+'<br>' +mytr.find('a[href*="-ND"]:eq(2)').html()+'</td>');
//         $('.clickcheck:last').data('mycheck',$(this));
//     });

//     $('#complink').attr('href','http://www.digikey.'+theTLD+'/scripts/DkSearch/dksus.dll?'+$('#compareForm').serialize().replace('=',''));
//     $('#compcount').text($checkedItems.length);
//     $('.clickcheck').click(function(){
//         $($(this).data('mycheck')).prop('checked','');
//         populateCompare($('#compareForm input:checked'));
//     });
// }

// function addBottomCompare(){
//     _log('addBottomCompare() Start',DLOG);
//     $('#content').after('<div id=bottomCompare class="gray-grad">'+
//         '<div style="float:left; margin:1px 5px 0px 1px; width:100px; height:110px;" class=clearfix>'+
//         '<button class="minimal close" style="margin:4px; float:left; padding:2px;">hide</button><br>'+
//         '<a style="margin:2px;" href="" id="complink" target="_blank"></a>'+
//         '<br><span><span id=compcount>0</span> items selected</span></div>'+
//         '<button class="close minimal" >hide</button>'+
//         '<div id=bottomCompareCont style="height:100%">bottom world</div></div>');

//     $('#bottomCompare').css({
//         'position': 'fixed',
//         'bottom' : '0px',
//         'width': '100%',
//         'height': '110px',
//         //'background': 'white',
//         'border-top': '3px solid red',
//         'box-shadow': '0px -1px 2px 2px #888',
//         'z-index': '10'
//     }).hide();

//     $('#bottomCompare .close').click(function(){
//         $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
//     });

//     $('#complink').after($('#compare-button').attr('value','Compare\n Now').addClass('minimal').css('height','50px'));
//     _log('addBottomCompare() End',DLOG);
// }




// function applyRangeSelect(name, $selectElem){
//     //The odd squiggly is support for the .jp website
//     $selectElem.find('option').prop('selected', false);
//     var userinputvalue = parseFloat($('#helperBoxContent').find('input').val());
//     _log(userinputvalue, DLOG);

//     $selectElem.find('option:contains(~),option:contains(～)').not(':contains(,)').not(':contains("&#x2213;")').each(function(index) {
//         selectInRange($(this), userinputvalue);

//     });

//     $selectElem.find('option:contains("Up to")').each(function(index) {
//         if((parseFloat($(this).text().split('Up to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
//             $(this).prop('selected', true);
//         }
//     });
//     $selectElem.find('option:contains("Down to")').each(function(index) {
//         if((parseFloat($(this).text().split("Down to")[1]) <= userinputvalue) && (userinputvalue <= 0)) {
//             $(this).prop('selected', true);
//         }
//     });
//     $selectElem.find('option').not(':contains(~),:contains(～)').not(':contains("Down to")').not(':contains("Up to")').not(':contains("&#x2213;")').each(function(index) {
//         if(parseFloat($(this).text()) == userinputvalue) {
//             $(this).prop('selected', true);
//         }
//     });

// }





// find numeric values
// function addReverseFiltering($tableToFilter){
//     _log('addReverseFiltering() Start',DLOG);
//     var categoryRow = $tableToFilter.find('th:contains("Category")').parent();
//     var lastFilterRow = $tableToFilter.find('tr:contains("Note"),tr:contains("Online Catalog"),tr:contains("Mating Products"),tr:contains("For Use With"),tr:contains("Associated Product"),tr:contains("Other Names")').not('tr:contains("Application Note")').eq(0);
//     var formRowsTD = $tableToFilter.find('tr>td').slice(categoryRow.index(),lastFilterRow.index());  //get the valid rows on which to add check boxes
//     formRowsTD.each(function(ind){
//         if (ind==0){
//             $(this).append('<span style="float:right"><input id="catfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="catfilter"></label></span>');
//         }else if (ind==1){
//             $(this).append('<span style="float:right"><input id="familyfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="familyfilter"></label></span>');
//         }else{
//             $(this).append('<span style="float:right"><input type=checkbox class="css-checkbox" id="revcheck'+ind+'"><label class="css-label" for="revcheck'+ind+'"></label></span>');
//         }
//     });

//     $('.product-info-section form:first').after(
//         '<a class="similarPartLink" target="_blank">'+
//         '<div style="float:right; cursor:pointer;" class="pure-button similarPartsButton">See <span></span> Similar Parts</div>'+
//         '</a>'
//     );

//     formRowsTD.find('input').change(function(){
//         var i = getReverseFilterLink(formRowsTD);
//         _log('url is '+i);
//         $('.similarPartLink').attr('href', i);
//         $('.similarPartsButton span').html('<img src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
//         $('.similarPartsButton span').load(i + ' .matching-records', function() {
//             $(this).text($(this).text().split(':')[1]);
//         });
//     });

//     $('.product-info-section form:first').css({float:'left', 'margin-top': '5px'}).find('input').addClass('pure-button'); // move the Report an Error button to the left
//     _log('addReverseFiltering() End',DLOG);
// }

// function getReverseFilterLink(formRowsTD){
//     _log('getReverseFilterLink() Start',DLOG);
//     var reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
//     if($('#familyfilter:checked').length){
//         // _log('familfilter '+ $('#familyfilter:checked').attr('checked') + $('#familyfilter').closest('td').find('a').attr('href'));
//         reverseFilterLink = $('#familyfilter').closest('td').find('a').attr('href')+'?k=';
//     }else if ($('#catfilter:checked').length){
//         // _log('catfilter '+ $('#catfilter:checked').closest('td').find('a').html());
//         reverseFilterLink = $('#catfilter:checked').closest('td').find('a').attr('href')+'?k=';
//     }else{
//         reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
//     }
//     formRowsTD.find('input:checked').not('#catfilter,#familyfilter').each(function(){
//         reverseFilterLink = reverseFilterLink +$(this).parent().parent().text().replace(/\s/g,'+')+ '+';
//     });
//     // _log('new reversefilterlink ' + reverseFilterLink);
//     reverseFilterLink = reverseFilterLink.replace('%','%25');
//     _log('getReverseFilterLink() End',DLOG);
//     return reverseFilterLink;
// }






// function openVisualPickerOLD(){
//         // _log('clicked on .pickeritem', true);
//         var p = $('.pickerbody');
//         var filtername = $(this).closest('.selectboxdivclass').find('b').text();  //for wrapping function
//         console.log(colIndex);
//         p.data('selectval', $(this).parent().find('select').attr('name'));
//         var $options = $(this).parent().find('select option');


//         p.data('optioncount', $options.length);
//         p.data('optionsvisible', 0);
//         p.data('currentfilter', filtername);
//         p.data('theoptions', $options);

//         $( "#visualpickerdiv" ).dialog('open');
//         $('.addmoreoptions').show();
//         addImagesToVisualPicker();
// }