// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js');

// equal heights
$(window).resize(function() {
    var $column = $('.box-list-small li'),
        maxHeight = array(),
        rows = array(),
        rowTop = 0,
        rowIndex = 0;
        
    $column.each( function() {
        $el = $(this);
        $el.removeAttr('style');
        if($el.offset().top > rowTop) {
            rowTop = $el.offset().top;
            rowIndex++;
            maxHeight[rowIndex] = $el.height();
        } else if($el.height() > maxHeight) {
            maxHeight[rowIndex] = $el.height();
        } 
        rows[rowIndex].push($el);
    });
    for (i = 0 ; i < rowIndex ; i++) {
        rows[i].height(maxHeight[i]);
    }
    $column.height(maxHeight);
});
$(window).load(function() {
    $(window).trigger('resize');
});

/*
$(window).resize(function() {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    
    $('.box-list-small li').each(function() {
    
        $el = $(this);
        topPostion = $el.position().top;
        
        if (currentRowStart != topPostion) {
                     // we just came to a new row.  Set all the heights on the completed row
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        
            // set the variables for the new row
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            // another div on the current row.  Add it to the list and check if it's taller
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
           
        // do the last row
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
       
    });
});
$(window).load(function() {
    $(window).trigger('resize');
});
*/
// tocify
if ($(".toc").length > 0) {
    var tocCallback = function () {
        var toc = $("#sidebar.toc").tocify({
            selectors: "h2, h3",
            scrollTo: 50,
            highlightOffset: 50
        }).data("toc-tocify");
        $(".optionName").popover({
            trigger: "hover"
        });
    };

    $.getScript('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', function () {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery.tocify/1.7.0/jquery.tocify.min.js', tocCallback);
    });
}

/*
// zopim chat
window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
$.src='//v2.zopim.com/?14JibENISkzX2WdkicVa9c44GnlgSyGe';z.t=+new Date;$.
type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');

$zopim(function() {
    $zopim.livechat.button.show();
});
*/
