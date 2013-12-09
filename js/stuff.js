// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js');

// equal heights
$(window).resize( function() {
    var $column = $('.box-list-small li'),
        maxHeight = 0;
    $column.each( function() {
        $(this).removeAttr('style');
        if($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        } 
    });
    $column.height(maxHeight);
});
$(document).ready( function() {
    $(window).trigger('resize');
});

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
