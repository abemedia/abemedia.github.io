// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js', function () {
	$('.tip').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	})
});

// equal heights
$(window).resize(function() {
    var $col = $('.equal>*'),
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

//portfolio previews
function previews() {
	var index=0;
	$(".active .preview").each(function(i, e) {
		var $img = $(e).find(".preview-img"),
			$screen = $(e).find(".screen"),
			items = $screen.parents(".item").find(".screen").length;
		if($img.height() > ( 1.1 * $screen.height() )) {
			var topMargin = $screen.height() - $img.height() + "px",
				isPhone = $(e).hasClass("iphone5"),
				duration = isPhone ? $img.height() * 2.5 : $img.height() * 4.5;
					
			$img.delay(isPhone ? 0 : 400).animate({ top: topMargin }, {
				duration: duration,
				specialEasing: {
					width: "linear",
					height: "easeOutBounce"
				},
				complete: function() {
					$(this).delay(isPhone ? 100 : 1000).animate({ top: 0 }, {
						duration: duration/1.5,
						specialEasing: {
							width: "linear",
							height: "easeOutBounce"
						},
						complete: function() {
							index++;
							if(items == index) {
								$('#previews').carousel("cycle");
							}
						}
					})
				}
			})
		} else setTimeout(function() { $('#previews').carousel("cycle"); }, 3000);
	});
	return this;
}
$(window).load(function() {setTimeout(previews(), 1000)});
$('#previews')
	.on('slide.bs.carousel', function() {
		$(".preview-img").clearQueue().stop();
	})
	.on('slid.bs.carousel', function() {
		$('#previews').carousel("pause");
		$(".preview-img").css({ top:0 });
		setTimeout(previews(), 1000);
	});
$("#previews").hover(function() {
	$(".preview-img").pause();
}, function() {
	$(".preview-img").resume();
});
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var drg_h = $drag.outerHeight(),
                pos_y = $drag.offset().top + drg_h - e.pageY;
            $drag.parents().on("mousemove", function(e) {
				var full_pos = Math.round(e.pageY + pos_y - drg_h),
					minTop = $('.draggable').parent().offset().top - ($('.draggable').height() - $('.draggable').parent().height());
				if(full_pos > $('.draggable').parent().offset().top) full_pos = $('.draggable').parent().offset().top;
				if(full_pos < minTop) full_pos = minTop;
				$('.draggable').offset({
					top: full_pos
				}).on("mouseup", function() {
					$(this).removeClass('draggable');
				});
			});
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
$(".preview-img").drags();

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

/*
 * Pause jQuery plugin v0.1
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 */
(function(){var e=jQuery,f="jQuery.pause",d=1,b=e.fn.animate,a={};function c(){return new Date().getTime()}e.fn.animate=function(k,h,j,i){var g=e.speed(h,j,i);g.complete=g.old;return this.each(function(){if(!this[f]){this[f]=d++}var l=e.extend({},g);b.apply(e(this),[k,e.extend({},l)]);a[this[f]]={run:true,prop:k,opt:l,start:c(),done:0}})};e.fn.pause=function(){return this.each(function(){if(!this[f]){this[f]=d++}var g=a[this[f]];if(g&&g.run){g.done+=c()-g.start;if(g.done>g.opt.duration){delete a[this[f]]}else{e(this).stop();g.run=false}}})};e.fn.resume=function(){return this.each(function(){if(!this[f]){this[f]=d++}var g=a[this[f]];if(g&&!g.run){g.opt.duration-=g.done;g.done=0;g.run=true;g.start=c();b.apply(e(this),[g.prop,e.extend({},g.opt)])}})}})();