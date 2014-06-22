(function($) {
	$.fn.smoove = function(options) {
		options = $.extend({
			offset: 50,
			move: false,
			rotate: false,
			scale: false,
			opacity: 0,
			transition: "all 1s ease, opacity 1.5s ease"
		}, options);
        
        //if($('body').width() == $(window).width()) $('body').css('overflow-x','hidden');
        
        var $items = $(this);
        function smooveIt() { 
            $items.each(function() {
                params = $.extend(options, $(this).data());
                $(this).css({
                    WebkitTransition : params.transition,
                    MozTransition    : params.transition,
                    MsTransition     : params.transition,
                    OTransition      : params.transition,
                    transition       : params.transition
                });
                itemtop = $(window).scrollTop() + $(window).height() - $(this).offset().top;
                    
                if(itemtop < params.offset) {
                    $(this).css({
                        opacity: params.opacity
                    });
                    params.transform = '';
                    if(params.move) params.transform += ' translate(' + params.move + ')';
                    if(params.moveX) params.transform += ' translateX(' + params.moveX + ')';
                    if(params.moveY) params.transform += ' translateY(' + params.moveY + ')';
                    
                    if(params.rotate) {
                        params.transform += ' rotate(' + params.rotate + 'deg)';
                    }
                    if(params.transform) {
                        $(this).css({
                            WebkitTransform : params.transform,
                            MozTransform    : params.transform,
                            MsTransform     : params.transform,
                            OTransform      : params.transform,
                            transform       : params.transform
                        });
                    }/*
                    if(params.top) {
                        $(this).css('margin-top', params.top);
                        $(this).css('margin-bottom', -params.top);
                    }
                    else if(params.bottom) {
                        $(this).css('margin-bottom', params.bottom);
                        $(this).css('margin-top', -params.bottom);
                    }
                    if(params.left) {
                        $(this).css('margin-left', params.left);
                        $(this).css('margin-right', -params.left);
                    }
                    else if(params.right) {
                        $(this).css('margin-right', params.right);
                        $(this).css('margin-left', -params.right);
                    }*/
                }
                else {
                    $(this).css({
                        opacity : 1,
                        transform: ''
                    });
                }
            });
        }
        $(window).scroll(function() { smooveIt(); });
        $(window).resize(function() { smooveIt(); });
        smooveIt();
    }
})(jQuery);
