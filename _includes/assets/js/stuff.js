// stuff for the things...
$('.tip').tooltip({
	selector: "[data-toggle=tooltip]",
	container: "body"
});

// equal heights
$(window).resize(function() {
	var $col = $('.equal>*'),
		maxHeight = [],
		rows = [],
		rowTop = 0,
		rowIndex = 0;

	$col.each(function() {
			$el = $(this);
			$el.removeAttr('style');
			if ($el.offset().top > rowTop) {
				rowIndex++;
				rows[rowIndex] = [];
				rowTop = $el.offset().top;
				maxHeight[rowIndex] = 0;
			}
			if ($el.height() > maxHeight[rowIndex]) {
				maxHeight[rowIndex] = $el.height();
			}
			rows[rowIndex].push($el);
		});
	for (row = 1; row <= rowIndex; row++) {
			for (i = 0; i <= rows[row].length; i++) {
				$(rows[row][i]).height(maxHeight[row]);
			}
		}
});
$(window).load(function() {
	$(window).trigger('resize');
});

// tocify
if ($(".toc").length > 0) {
	var tocCallback = function() {
		var toc = $("#sidebar.toc").tocify({
			selectors: "h2, h3",
			scrollTo: 50,
			highlightOffset: 50
		}).data("toc-tocify");
		$(".optionName").popover({
			trigger: "hover"
		});
	};
	$.getScript('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', function() {
		$.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery.tocify/1.7.0/jquery.tocify.min.js', tocCallback);
	});
}

//portfolio previews
function previews() {
	var index = 0;
	$(".active .preview").each(function(i, e) {
		var $img = $(e).find(".preview-img"),
			$screen = $(e).find(".screen"),
			items = $screen.parents(".item").find(".screen").length;
		if ($img.height() > (1.1 * $screen.height())) {
				var topMargin = $screen.height() - $img.height() + "px",
					isPhone = $(e).hasClass("iphone5"),
					duration = isPhone ? $img.height() * 2.5 : $img.height() * 4.5;

				$img.delay(isPhone ? 1000 : 1400).animate({
						top: topMargin
					}, {
						duration: duration,
						specialEasing: {
							width: "linear",
							height: "easeOutBounce"
						},
						complete: function() {
							$(this).delay(isPhone ? 100 : 1000).animate({
								top: 0
							}, {
								duration: duration / 1.5,
								specialEasing: {
									width: "linear",
									height: "easeOutBounce"
								},
								complete: function() {
									index++;
									if (items == index) {
										$('#previews').carousel("cycle");
									}
								}
							});
						}
					});
			}
		else setTimeout(function() {
				$('#previews').carousel("cycle");
			}, 3000);
	});
	return this;
}
$(window).load(function() {
	previews();
});
$('#previews').on('slide.bs.carousel', function() {
	$(".preview-img").clearQueue().stop();
}).on('slid.bs.carousel', function() {
	$('#previews').carousel("pause");
	$(".preview-img").css({
		top: 0
	});
	previews();
});
$("#previews").hover(function() {
	$("#previews").addClass("hover");
	$('#previews').carousel("pause");
	$(".preview-img").clearQueue().stop();
}, function() {
	$("#previews").removeClass("hover");
	if (!$(".draggable").length > 0) previews();
});
(function($) {
	$.fn.drags = function(opt) {
		opt = $.extend({
			handle: "",
			cursor: "move"
		}, opt);
		if (opt.handle === "") {
			var $el = this;
		}
		else {
			var $el = this.find(opt.handle);
		}
		return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
			$("html").css('cursor', opt.cursor);
			if (opt.handle === "") {
				var $drag = $(this).addClass('draggable');
			}
			else {
				var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
			}
			var drg_h = $drag.outerHeight(),
				pos_y = $drag.offset().top + drg_h - e.pageY;
			$drag.parents().on("mousemove", function(e) {
					var full_pos = Math.round(e.pageY + pos_y - drg_h),
						minTop = Math.round($drag.parent().offset().top - ($drag.height() - $drag.parent().height()));
					if (full_pos > $drag.parent().offset().top) full_pos = Math.round($drag.parent().offset().top);
					if (full_pos < minTop) full_pos = minTop;
					$('.draggable').offset({
							top: full_pos
						})
					$("html").on("mouseup", function() {
							$('.draggable').removeClass('draggable');
							$("html").css('cursor', "");
							if (!$("#previews").hasClass("hover")) previews();
						});
				});
			e.preventDefault(); // disable selection
		});
		$("html").on("mouseup", function() {
			if (opt.handle === "") {
				$('.draggable').removeClass('draggable');
				$("html").css('cursor', "");
				if (!$("#previews").hasClass("hover")) previews();
			}
			else {
				$('.draggable').removeClass('active-handle').parent().removeClass('draggable');
				$("html").css('cursor', "");
				if (!$("#previews").hasClass("hover")) previews();
			}
		});
	};
})(jQuery);
$(".preview-img").drags({
	cursor: "ns-resize"
});

var disqus_shortname = '{{ site.disqus_shortname }}';
var disqus_url = $("link[rel='canonical']").attr("href");
if ($("#disqus_thread").length > 0) {
    var comments = document.getElementById('disqus_thread'),
        disqusLoaded=false;
        
    function loadDisqus() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        disqusLoaded = true;
    }
    
    function findTop(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }
    
    if(window.location.hash.indexOf('#comment') > 0) loadDisqus();
    if(comments) {
        var commentsOffset = findTop(comments);
        window.onscroll = function() {
            if(!disqusLoaded && window.pageYOffset > commentsOffset - 1500) loadDisqus();
        }
    }
}
if ($(".comment-link").length > 0) {
	(function () {
		var s = document.createElement('script'); s.async = true;
		s.type = 'text/javascript';
		s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
		(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
	}());
}


if ($(".img-link").length > 0) {
	$('.img-link').click(function () {
        $( "body" ).append( '<div id="imgModal" class="modal img-modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="img thumbnail"><img /><span></span></div><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div>' );
		$('.img-modal img').attr('src', $(this).attr('data-img'));
		$('.img-modal span').text($(this).attr('data-title'));
	});
};