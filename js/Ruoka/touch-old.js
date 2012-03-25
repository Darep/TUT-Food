

function updateOrientation()
{
    // TODO: implement landscape
}


function handleTouch(event)
{

	if (event) {
		
		event.preventDefault();

		if ($(event.target).parent().is('#blah')) {
			
			var $touch_area = $('#switcher');
			$touch_area.bind('touchmove', scrubmove).bind('touchend', scrubend);
			
		} else {
	
			var $touch_area = $('#wrap');
	
			var startX = event.touches[0].pageX,
				startY = event.touches[0].pageY,
				startTime = (new Date).getTime(),
				deltaX = 0,
				deltaY = 0,
				deltaT = 0;

			if (typeof initialized == 'undefined') {
				page = 0;
				currX = 0;
				max_pages = $('#menus').children('li').length;
				page_width = $('#menus').children('li').width();

				initialized = 1;
			}

			$touch_area.bind('touchmove', touchmove).bind('touchend', touchend);
		}
		

	}

	
	function updateChanges()
	{
		var first = event.changedTouches[0] || null;
		deltaX = first.pageX - startX;
		deltaY = first.pageY - startY;
		deltaT = (new Date).getTime() - startTime;
	}

	
	function movePage(direction)
	{
		
		var new_page = page + direction;
		
		if (new_page < 0 || new_page == max_pages) {
			$touch_area.unbind('touchmove touchend');
			return;
		}

		page = new_page;
		var amount = page * -page_width;
		
		$('#menus').animate(
			{
				'left': amount
			}, 180, 'linear' , function () {
				$('#switcher .act').removeClass('act');
				$('#switcher span:nth-child(' + (page + 1) + ')').addClass('act');
			}
		);

		
		$touch_area.unbind('touchmove touchend');
		
	}
	
	
	function touchmove(event)
	{

		updateChanges();

		var amount = currX + deltaX;
		if ((amount <= 0) && (amount >= (max_pages-1) * -page_width)) {
			//$('#menus').css('left', amount);
		}
		
	}


	function touchend(e)
	{		
		
		updateChanges();
		currX = currX + deltaX;
		
		var absX = Math.abs(deltaX);
		var absY = Math.abs(deltaY);
						
		// Check for swipe
		if ((absX > absY) && (absX > 45) && (deltaT < 1000)) {
			if (deltaX < 0) {
				movePage(1);
			} else {
				movePage(-1);
			}
		}

		var new_page = page
			threshold = page_width - 25;
		
		
		if (deltaX > threshold) {
			// moving to next page
			if (page == (max_pages - 1)) {
				return;
			}
			new_page = page + 1;
		}
		else if (deltaX < -threshold) {
			// moving to the previous page
			if (page == 0) {
				return;
			}
			new_page = page - 1;
		}

		$touch_area.unbind('touchmove touchend');
	}
	
	
	function scrubmove(e)
	{
		/*
		i = 0;
		if (i == 0) {
			for (x in e.currentTarget) {
				
			}
			//console.dir(e);
			i = 1;
		}
		*/
		
		//console.log('index: ' + $(e.currentTarget).index('#switcher span') );
	}
	
	
	function scrubend(event)
	{
		$touch_area.unbind('touchmove touchend');
	}

} // END handleTouch(e)


function loaded()
{
    // pan to the bottom, hides the location bar on iPhone
	window.scrollTo(0, 1);
    document.getElementsByTagName('body')[0].addEventListener("touchstart", handleTouch, false);
}

$(document).ready(loaded);
//window.addEventListener("load", function() { setTimeout(loaded, 100) }, false);
