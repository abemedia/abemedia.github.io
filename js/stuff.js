// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js', function() {
	$('.tip').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	});
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

/* ShareThis */
var switchTo5x = true;
$.getScript('//w.sharethis.com/button/buttons.js', function() {
	stLight.options({
		publisher: "789dd053-d988-42a9-bd7b-1d9f3c14bc6f",
		onhover: false
	});
	var url = $('link[name=canonical]').attr("href");
	
	$(".share-btn").each(function() {
        stButtons.getCount(url, $(this).attr("data-service"), $(this).find(".btn-bubble"));
    });
	/*
	 $(window).load(function() {
	 var legacy = parseInt($('.legacy-comments-count').text());
	 var disqus = $('.comments-counter a').first();
	 var disqus_count = parseInt(disqus.text());
	 disqus_count = (isNaN(disqus_count)) ? 0 : disqus_count;
	 var total = legacy + disqus_count;
	 $('.comments-counter a').text(total);
	 
	 if (total == 3) {
	 $('.comments-icon').text('Comment');
	 }
	 
	 var url = $('link[name=canonical]').attr("href");
	 $.getJSON('http://graph.facebook.com/' + url, function(data) {
	 
	 var sharethis_count = jQuery('.st_sharethis_vcount .stBubble_count');
	 var facebook_count = jQuery('.st_facebook_vcount .stBubble_count');
	 var twitter_count = jQuery('.st_twitter_vcount .stBubble_count');
	 var google_count = jQuery('.st_googleplus_vcount .stBubble_count');
	 var other_count = jQuery('.other-counter .stBubble_count');
	 
	 var sharethis_int = parseFloat(sharethis_count.html(), 10);
	 sharethis_int = (sharethis_int % 1 != 0) ? sharethis_int * 1000 : sharethis_int;
	 var facebook_int = parseFloat(facebook_count.html(), 10);
	 facebook_int = (facebook_int % 1 != 0) ? facebook_int * 1000 : facebook_int;
	 var twitter_int = parseFloat(twitter_count.html(), 10);
	 twitter_int = (twitter_int % 1 != 0) ? twitter_int * 1000 : twitter_int;
	 var google_int = parseFloat(google_count.html(), 10);
	 google_int = (google_int % 1 != 0) ? google_int * 1000 : google_int;
	 
	 
	 var total_facebook_int = facebook_int;
	 
	 var older_facebook_int = data.shares ? data.shares : 0;
	 if (!isNaN(older_facebook_int)) {
	 total_facebook_int = facebook_int + older_facebook_int;
	 facebook_count.html(total_facebook_int);
	 sharethis_int = sharethis_int + older_facebook_int;
	 sharethis_count.html(sharethis_int);
	 }
	 
	 var fb_tw_gp_pin_stmbl_count = twitter_int + google_int + total_facebook_int;
	 
	 var other_int = sharethis_int - fb_tw_gp_pin_stmbl_count;
	 other_count.html(other_int);
	 
	 if (sharethis_count.html() == "0" && twitter_count.html() == "0" && facebook_count.html() == "0" && google_count.html() == "0" && pinterest_count.html() == "0" && stumble_count.html() == "0" && other_count.html() == "0") {
	 jQuery('.stBubble').css('display', 'none');
	 jQuery('.stButton').css('border', 'none');
	 jQuery('.stButton').css('margin-top', '15px');
	 jQuery('.st_sharethis_vcount div.stBubble').css('display', 'block');
	 jQuery('.st_sharethis_vcount span.stButton').css('margin-top', '0');
	 }
	 
	 jQuery('.share-buttons-wrapper').css('visibility', 'visible');
	 // ShareThis
	 
	 var shares_counter = jQuery('.st_sharethis_vcount .stBubble_count');
	 var shares = parseInt(shares_counter.first().text());
	 if (shares >= 1000 && shares < 10000) {
	 shares = (shares / 1000).toFixed(1);
	 shares = (shares.indexOf('.0') != -1) ? parseInt(shares).toFixed(0) : shares;
	 shares_counter.text(shares + 'K');
	 }
	 else if (shares >= 10000) {
	 shares = (shares / 1000).toFixed(0);
	 shares_counter.text(shares + 'K');
	 }
	 });
	 if (!jQuery.support.cors) { // IE 8 Hack
	 jQuery('.share-buttons-wrapper').css('visibility', 'visible');
	 }
	 });
	 */
});

if ($("#disqus_thread").length > 0) {
	var disqus_shortname = 'abemedia';
	(function() {
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
}