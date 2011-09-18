/*!
 * Ruoka UI
 */

(function () {	
	var Ruoka = window.Ruoka || {};
	
	Ruoka.UI = {
		element: $('body'),
		wrapper: $('<div class="menusWrap"></div>'),
		page: 0,
		pages: 0,
		pageWidth: 0,
		
		slideThreshold: 0.45,
		swipeThreshold: 0.2,
	
		startX: 0,
		startY: 0,
		startTime: 0,
			
		init: function (element) {
			if (!Modernizr.touch) return;
			
			this.initSliding(element);
			
		    var self = this;

		    document.body.addEventListener('touchstart', function(e) { return self.onTouchStart(e); }, false);
			
			this.element.bind('swipe', function(e, direction) { self.onSwipe(e, direction); });
			this.element.bind('slide', function(e, direction) { self.onSwipe(e, direction); });
		},
		
		updateOrientation: function () {
			
		},
		
		initSliding: function (element) {
			this.wrapper.html(element.html());
			element.empty();
			element.append(this.wrapper);
				
			var menus = this.wrapper.children(),
				windowWidth = window.innerWidth;
			
			element.css({
				overflow: 'hidden',
				width: windowWidth + 'px'
			});
			
			this.wrapper.css({
				position: 'relative',
				marginLeft: '0',
				overflow: 'hidden',
				width: (windowWidth * menus.length) + 'px'				
			});
			
			menus.css({
				display: 'inline-block',
				float: 'left',
				width: windowWidth + 'px'
			});
			
			this.pages = menus.length;
			this.pageWidth = windowWidth;
		},
		
		// movePage
		onSwipe: function (e, direction) {
			console.log('swipe');
			
			if (direction == 1 && this.page == (this.pages - 1)) return;
			if (direction == -1 && this.page == 0) return;
			
			this.page = this.page + direction;
			
			var amount = this.pageWidth * this.page;
			this.wrapper.css({
				marginLeft: -amount
			});
		},
		
		onTouchStart: function (e) {
			// only track one finger
			if (e.targetTouches.length != 1) return false;

			this.startX = e.targetTouches[0].clientX; 
			this.startY = e.targetTouches[0].clientY;
			this.startTime = (new Date).getTime();
			
			var self = this;
			$(document.body).bind('touchmove', function (e) { return self.onTouchMove(e); });
			$(document.body).bind('touchend', function (e) { return self.onTouchEnd(e); });
			
		    return false;
		},
		
		onTouchMove: function (e) {
			e.preventDefault(); // prevent scrolling, zooming, etc.
			e = e.originalEvent; // jQuery removes touches...
			
			// only track one finger
			if (e.targetTouches.length != 1) return false;
			
		    this.newX = e.targetTouches[0].clientX;
		    this.newY = e.targetTouches[0].clientY;
		    
			var leftDelta = this.newX - this.startX;
		    var topDelta = this.newY - this.startY;
		    
		    return false;
		},
		
		onTouchEnd: function (e) {
			e.preventDefault(); // prevent scrolling, zooming, etc.
			e = e.originalEvent; // jQuery removes touches...
			
			// abort if there are still fingers touching
			if (e.targetTouches.length > 0) return false;
			
			// if screen moved over 45%, move page
			var deltaX = this.startX - this.newX;
			var deltaY = this.startY - this.newY;

			var absDeltaX = Math.abs(deltaX);
			
			var ratio = absDeltaX / window.innerWidth;
			var duration = (new Date).getTime() - this.startTime;
			
			var direction = 1;
			
			if (deltaX < 0) {
				direction = -1;
			}
			
			if (duration < 1000 && ratio > this.swipeThreshold) {
				this.element.trigger('swipe', direction);
			}
			else if (ratio > this.slideThreshold) {
				this.element.trigger('slide', direction);
			}
			
			$(document.body).unbind('touchmove');
			$(document.body).unbind('touchend');
			
			return false;
		}
	};
	
	window.Ruoka = Ruoka;
})();
