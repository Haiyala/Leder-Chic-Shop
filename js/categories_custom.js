/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Favorite
5. Init Fix Product Border
6. Init Isotope Filtering
7. Init Price Slider
8. Init Checkboxes



******************************/

jQuery(document).ready(function(NAD)
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = NAD('.header');
	var topNav = NAD('.top_nav')
	var mainSlider = NAD('.main_slider');
	var hamburger = NAD('.hamburger_container');
	var menu = NAD('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = NAD('.hamburger_close');
	var fsOverlay = NAD('.fs_menu_overlay');

	setHeader();

	NAD(window).on('resize', function()
	{
		initFixProductBorder();
		setHeader();
	});

	NAD(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initFavorite();
	initFixProductBorder();
	initIsotopeFiltering();
	initPriceSlider();
	initCheckboxes();

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

	4. Init Favorite

	*/

    function initFavorite()
    {
    	if(NAD('.favorite').length)
    	{
    		var favs = NAD('.favorite');

    		favs.each(function()
    		{
    			var fav = NAD(this);
    			var active = false;
    			if(fav.hasClass('active'))
    			{
    				active = true;
    			}

    			fav.on('click', function()
    			{
    				if(active)
    				{
    					fav.removeClass('active');
    					active = false;
    				}
    				else
    				{
    					fav.addClass('active');
    					active = true;
    				}
    			});
    		});
    	}
    }

    /* 

	5. Init Fix Product Border

	*/

    function initFixProductBorder()
    {
    	if(NAD('.product_filter').length)
    	{
			var products = NAD('.product_filter:visible');
    		var wdth = window.innerWidth;

    		// reset border
    		products.each(function()
    		{
    			NAD(this).css('border-right', 'solid 1px #e9e9e9');
    		});

    		// if window width is 991px or less

    		if(wdth < 480)
			{
				for(var i = 0; i < products.length; i++)
				{
					var product = NAD(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 576)
			{
				if(products.length < 5)
				{
					var product = NAD(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 1; i < products.length; i+=2)
				{
					var product = NAD(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 768)
			{
				if(products.length < 5)
				{
					var product = NAD(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 2; i < products.length; i+=3)
				{
					var product = NAD(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 992)
			{
				if(products.length < 5)
				{
					var product = NAD(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 2; i < products.length; i+=3)
				{
					var product = NAD(products[i]);
					product.css('border-right', 'none');
				}
			}

			//if window width is larger than 991px
			else
			{
				if(products.length < 5)
				{
					var product = NAD(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 3; i < products.length; i+=4)
				{
					var product = NAD(products[i]);
					product.css('border-right', 'none');
				}
			}	
    	}
    }

    /* 

	6. Init Isotope Filtering

	*/

    function initIsotopeFiltering()
    {
    	var sortTypes = NAD('.type_sorting_btn');
    	var sortNums = NAD('.num_sorting_btn');
    	var sortTypesSelected = NAD('.sorting_type .item_sorting_btn is-checked span');
    	var filterButton = NAD('.filter_button');

    	if(NAD('.product-grid').length)
    	{
    		NAD('.product-grid').isotope({
    			itemSelector: '.product-item',
	            getSortData: {
	            	price: function(itemElement)
	            	{
	            		var priceEle = NAD(itemElement).find('.product_price').text().replace( 'NAD', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_name'
	            },
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });

    		// Short based on the value from the sorting_type dropdown
	        sortTypes.each(function()
	        {
	        	NAD(this).on('click', function()
	        	{
	        		NAD('.type_sorting_text').text(NAD(this).text());
	        		var option = NAD(this).attr('data-isotope-option');
	        		option = JSON.parse( option );
    				NAD('.product-grid').isotope( option );
	        	});
	        });

	        // Show only a selected number of items
	        sortNums.each(function()
	        {
	        	NAD(this).on('click', function()
	        	{
	        		var numSortingText = NAD(this).text();
					var numFilter = ':nth-child(-n+' + numSortingText + ')';
	        		NAD('.num_sorting_text').text(NAD(this).text());
    				NAD('.product-grid').isotope({filter: numFilter });
	        	});
	        });	

	        // Filter based on the price range slider
	        filterButton.on('click', function()
	        {
	        	NAD('.product-grid').isotope({
		            filter: function()
		            {
		            	var priceRange = NAD('#amount').val();
			        	var priceMin = parseFloat(priceRange.split('-')[0].replace('NAD', ''));
			        	var priceMax = parseFloat(priceRange.split('-')[1].replace('NAD', ''));
			        	var itemPrice = NAD(this).find('.product_price').clone().children().remove().end().text().replace( 'NAD', '' );

			        	return (itemPrice > priceMin) && (itemPrice < priceMax);
		            },
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });
	        });
    	}
    }

    /* 

	7. Init Price Slider

	*/

    function initPriceSlider()
    {
		NAD( "#slider-range" ).slider(
		{
			range: true,
			min: 0,
			max: 1000,
			values: [ 0, 580 ],
			slide: function( event, ui )
			{
				NAD( "#amount" ).val( "NAD" + ui.values[ 0 ] + " - NAD" + ui.values[ 1 ] );
			}
		});
			
		NAD( "#amount" ).val( "NAD" + NAD( "#slider-range" ).slider( "values", 0 ) + " - NAD" + NAD( "#slider-range" ).slider( "values", 1 ) );
    }

    /* 

	8. Init Checkboxes

	*/

    function initCheckboxes()
    {
    	if(NAD('.checkboxes li').length)
    	{
    		var boxes = NAD('.checkboxes li');

    		boxes.each(function()
    		{
    			var box = NAD(this);

    			box.on('click', function()
    			{
    				if(box.hasClass('active'))
    				{
    					box.find('i').removeClass('fa-square');
    					box.find('i').addClass('fa-square-o');
    					box.toggleClass('active');
    				}
    				else
    				{
    					box.find('i').removeClass('fa-square-o');
    					box.find('i').addClass('fa-square');
    					box.toggleClass('active');
    				}
    				// box.toggleClass('active');
    			});
    		});

    		if(NAD('.show_more').length)
    		{
    			var checkboxes = NAD('.checkboxes');

    			NAD('.show_more').on('click', function()
    			{
    				checkboxes.toggleClass('active');
    			});
    		}
    	};
    }
});