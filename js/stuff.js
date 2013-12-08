// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js');

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

// equal heights
function equalHeight(group) {
    group.css("height", "");
    tallest = 0;
    group.each(function () {
        //$(this).height("auto");
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    console.log(tallest);
    group.css("height", tallest + 'px');
}
$(document).ready(function () {
    equalHeight($(".box-list-small .box"));
});
$(window).resize(function () {
    equalHeight($(".box-list-small .box"));
});
/*
$.fn.eqHeights = function(options) {

    var defaults = {  
        child: false ,
      parentSelector:null
    };  
    var options = $.extend(defaults, options); 

    var el = $(this);
    if (el.length > 0 && !el.data('eqHeights')) {
        $(window).bind('resize.eqHeights', function() {
            el.eqHeights();
        });
        el.data('eqHeights', true);
    }

    if( options.child && options.child.length > 0 ){
        var elmtns = $(options.child, this);
    } else {
        var elmtns = $(this).children();
    }

    var prevTop = 0;
    var max_height = 0;
    var elements = [];
    var parentEl;
    elmtns.height('auto').each(function() {

      if(options.parentSelector && parentEl !== $(this).parents(options.parentSelector).get(0)){
        $(elements).height(max_height);
        max_height = 0;
        prevTop = 0;
        elements=[];
        parentEl = $(this).parents(options.parentSelector).get(0);
      }

        var thisTop = this.offsetTop;

        if (prevTop > 0 && prevTop != thisTop) {
            $(elements).height(max_height);
            max_height = $(this).height();
            elements = [];
        }
        max_height = Math.max(max_height, $(this).height());

        prevTop = this.offsetTop;
        elements.push(this);
    });

    $(elements).height(max_height);
};

// run on load so it gets the size:
// can't have the same pattern for some reason or it scans the page and makes all the same height. Each row should be separate but it doesn't work that way.
$(window).load(function() {

//$('[class*="eq-"]').eqHeights();
  $('.box-list-small li').eqHeights({parentSelector:'.box-list-small'});
/*$('.foo2 [class*="eq-"]').eqHeights();

  }); 
*/
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
