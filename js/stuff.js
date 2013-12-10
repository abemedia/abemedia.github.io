// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js');

// equal heights
$(window).resize(function() {
    var $col = $('.box-list-small li'),
        maxHeight = new Array(),
        rows = new Array(),
        rowTop = 0,
        rowIndex = 0;
        
    $col.each( function() {
        $el = $(this);
        $el.removeAttr('style');
        if($el.offset().top > rowTop) {
            rowIndex++;
            rows[rowIndex] = new Array();
            rowTop = $el.offset().top;
            maxHeight[rowIndex] = 0;
        }
        if($el.height() > maxHeight[rowIndex]) {
            maxHeight[rowIndex] = $el.height();
        } 
        rows[rowIndex].push($el);
    });
    for (row = 1 ; row <= rowIndex ; row++) {
        for (i = 0 ; i <= rows[row].length ; i++) {
            $(rows[row][i]).height(maxHeight[row]);
        }
    }
});
$(window).load(function() {
    $(window).trigger('resize');
});

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
