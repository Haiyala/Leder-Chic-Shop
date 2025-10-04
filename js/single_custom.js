/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Thumbnail
5. Init Quantity
6. Init Star Rating
7. Init Favorite
8. Init Tabs



******************************/

jQuery(document).ready(function(NAD)
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = NAD('.header');
	var topNav = NAD('.top_nav')
	var hamburger = NAD('.hamburger_container');
	var menu = NAD('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = NAD('.hamburger_close');
	var fsOverlay = NAD('.fs_menu_overlay');

	setHeader();

	NAD(window).on('resize', function()
	{
		setHeader();
	});

	NAD(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initThumbnail();
	initQuantity();
	initStarRating();
	initFavorite();
	initTabs();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if(NAD(window).scrollTop() > 100)
			{
				header.css({'top':"0"});
			}
			else
			{
				header.css({'top':"0"});
			}
		}
		else
		{
			if(NAD(window).scrollTop() > 100)
			{
				header.css({'top':"-50px"});
			}
			else
			{
				header.css({'top':"0"});
			}
		}
		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if(hamburger.length)
		{
			hamburger.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
			});
		}

		if(fsOverlay.length)
		{
			fsOverlay.on('click', function()
			{
				if(menuActive)
				{
					closeMenu();
				}
			});
		}

		if(hamburgerClose.length)
		{
			hamburgerClose.on('click', function()
			{
				if(menuActive)
				{
					closeMenu();
				}
			});
		}

		if(NAD('.menu_item').length)
		{
			var items = document.getElementsByClassName('menu_item');
			var i;

			for(i = 0; i < items.length; i++)
			{
				if(items[i].classList.contains("has-children"))
				{
					items[i].onclick = function()
					{
						this.classList.toggle("active");
						var panel = this.children[1];
					    if(panel.style.maxHeight)
					    {
					    	panel.style.maxHeight = null;
					    }
					    else
					    {
					    	panel.style.maxHeight = panel.scrollHeight + "px";
					    }
					}
				}	
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		// menu.css('right', "0");
		fsOverlay.css('pointer-events', "auto");
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		fsOverlay.css('pointer-events', "none");
		menuActive = false;
	}

	/* 

	4. Init Thumbnail

	*/

	function initThumbnail()
	{
		if(NAD('.single_product_thumbnails ul li').length)
		{
			var thumbs = NAD('.single_product_thumbnails ul li');
			var singleImage = NAD('.single_product_image_background');

			thumbs.each(function()
			{
				var item = NAD(this);
				item.on('click', function()
				{
					thumbs.removeClass('active');
					item.addClass('active');
					var img = item.find('img').data('image');
					singleImage.css('background-image', 'url(' + img + ')');
				});
			});
		}	
	}

	/* 

	5. Init Quantity

	*/

	function initQuantity()
	{
		if(NAD('.plus').length && NAD('.minus').length)
		{
			var plus = NAD('.plus');
			var minus = NAD('.minus');
			var value = NAD('#quantity_value');

			plus.on('click', function()
			{
				var x = parseInt(value.text());
				value.text(x + 1);
			});

			minus.on('click', function()
			{
				var x = parseInt(value.text());
				if(x > 1)
				{
					value.text(x - 1);
				}
			});
		}
	}

	/* 

	6. Init Star Rating

	*/

	function initStarRating()
	{
		if(NAD('.user_star_rating li').length)
		{
			var stars = NAD('.user_star_rating li');

			stars.each(function()
			{
				var star = NAD(this);

				star.on('click', function()
				{
					var i = star.index();

					stars.find('i').each(function()
					{
						NAD(this).removeClass('fa-star');
						NAD(this).addClass('fa-star-o');
					});
					for(var x = 0; x <= i; x++)
					{
						NAD(stars[x]).find('i').removeClass('fa-star-o');
						NAD(stars[x]).find('i').addClass('fa-star');
					};
				});
			});
		}
	}

	/* 

	7. Init Favorite

	*/

	function initFavorite()
	{
		if(NAD('.product_favorite').length)
		{
			var fav = NAD('.product_favorite');

			fav.on('click', function()
			{
				fav.toggleClass('active');
			});
		}
	}

	/* 

	8. Init Tabs

	*/

	function initTabs()
	{
		if(NAD('.tabs').length)
		{
			var tabs = NAD('.tabs li');
			var tabContainers = NAD('.tab_container');

			tabs.each(function()
			{
				var tab = NAD(this);
				var tab_id = tab.data('active-tab');

				tab.on('click', function()
				{
					if(!tab.hasClass('active'))
					{
						tabs.removeClass('active');
						tabContainers.removeClass('active');
						tab.addClass('active');
						NAD('#' + tab_id).addClass('active');
					}
				});
			});
		}
	}
});