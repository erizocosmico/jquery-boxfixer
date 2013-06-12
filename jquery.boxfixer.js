(function($) {
  $.boxFixer = {}
  	// Queue of elements
	$.boxFixer.queue = new Array();
	
	// If the function has been binded to the scroll event or not
	$.boxFixer.eventBinded = false;
	
	// Function to add an element to the queue. The params are the element, the distance from top
	// that has to be reached to execute the handler and the function to execute.
	$.boxFixer.addToQueue = function(element, distance, handler) {
		$.boxFixer.queue.push({element: element, distance: distance, handler: handler});
	}
	
	// This function can be accessed as any other function in jQuery i.e: $('selector').fixAtDistance(d);
	// The function will add to the queue the elements we want and bind the function to the scroll event
	// if it hasn't been done yet. Those elements will be fixed when the user reaches the specified distance
	// passed as parameter by just changing its position to fixed. If the param classToApply is given
	// then it will just change the class at the specified distance. So, you will have to take care in that class
	// of fixing the item.
	$.fn.fixAtDistance = function (distance, classToApply) {

		return this.each(function() {
			
			// Add the element to the queue
			$.boxFixer.addToQueue(this, distance, function (element, distance, fromTop) {
				// Have we reached the specified distance?
				if (fromTop >= distance) {
					// If we have then fix the element or add the class
					if (classToApply === undefined) {
						$(element).css('position', 'fixed');
					} else {
						$(element).addClass(classToApply);
					}
				} else {
					// If we haven't then change the position to static (in case it was fixed before)
					// or remove the class
					if (classToApply === undefined) {
						$(element).css('position', 'static');
					} else {
						$(element).removeClass(classToApply);
					}
				}
			});
			
			// Have we binded the function to the scroll event? if we did there is no need
			// to bind it again
			if (!$.boxFixer.eventBinded) {
				// Let's bind the function to the event
				$(window).scroll(function() {
					// Get the current distance from the top of the page
					var distanceFromTop = $(window).scrollTop();
					// Let's execute the handler of every element in the queue
					for (i = 0; i < $.boxFixer.queue.length; i++) {
						elem = $.boxFixer.queue[i];
						elem.handler(elem.element, elem.distance, distanceFromTop);
					}
				});
				// We've binded it
				$.boxFixer.eventBinded = true;
			}
			
		});
	}
}(jQuery));
