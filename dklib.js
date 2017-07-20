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