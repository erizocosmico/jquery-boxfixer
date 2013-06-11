(function($) {
  $.boxFixer = {}
	$.boxFixer.queue = new Array();
	$.boxFixer.eventBinded = false;
	$.boxFixer.addToQueue = function(element, distance, handler) {
		$.boxFixer.queue.push({element: element, distance: distance, handler: handler});
	}
	
	$.fn.fixAtDistance = function (distance, classToApply) {
		return this.each(function() {
			
			$.boxFixer.addToQueue(this, distance, function (element, distance, fromTop) {
				if (fromTop >= distance) {
					if (classToApply === undefined) {
						$(element).css('position', 'fixed');
					} else {
						$(element).addClass(classToApply);
					}
				} else {
					if (classToApply === undefined) {
						$(element).css('position', 'static');
					} else {
						$(element).removeClass(classToApply);
					}
				}
			});
			
			if (!$.boxFixer.eventBinded) {
				$(window).scroll(function() {
					console.log($.boxFixer.queue.length);
					var distanceFromTop = $(window).scrollTop();
					for (i = 0; i < $.boxFixer.queue.length; i++) {
						elem = $.boxFixer.queue[i];
						elem.handler(elem.element, elem.distance, distanceFromTop);
					}
				});
				$.boxFixer.eventBinded = true;
			}
			
		});
	}
}(jQuery));
