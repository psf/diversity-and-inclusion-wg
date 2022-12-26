/*----------------------------------------------

[Main JavaScript]

Theme   : Shock
Version : 1.0.0
Author  : Codings
Support : codings.dev

----------------------------------------------*/

/*----------------------------------------------

[Content Index]

1. Preloader
2. Popup
3. Side Widget
4. Icon
5. One Page Link
6. Helper
7. Slider
8. Shuffle
9. Lax
10. Lightbox
11. Load More
12. Form Validation
13. Tooltip
14. Animated Underline
15. Progress bar
16. Typed Text
17. Circular Text
18. time Switch
19. Scroll Down
20. ZZZ Divider

----------------------------------------------*/

/*----------------------------------------------
1. Preloader
----------------------------------------------*/

// #region Preloader

jQuery(function ($) {
	'use strict';

	var images    = $('img');
	var preloader = $('#preloader');
	var delay     = preloader.data('delay');

	imagesLoaded(images, function() {

		if ( ! delay ) { delay = 0; }
		
		setTimeout(function() {
			preloader.addClass('loaded');

		}, delay);
	})
		
	setTimeout(function() {
		preloader.addClass('loaded');

	}, 10000);
})

// #endregion Preloader

/*----------------------------------------------
2. Popup
----------------------------------------------*/

// #region Popup Bar

void ( function (root, factory) {

	if ( typeof define === 'function' && define.amd ) {
		define(factory);
	
	} else if ( typeof exports === 'object' ) {
		module.exports = factory();
	
	} else {
		root.PopupBar = factory();
	}

} (this, function () {

		function PopupBar() {
			ready(run);
		}
	
		const navbar = document.querySelector('.navbar.auto-hide');

		function run() {
			if ( window.localStorage.PopupBarDismissed ) {
				return;
			} 

			show();
		}

		function dismiss() {
			var notice = document.getElementById('popup-bar');

			if ( notice ) {
				notice.classList.remove('show-down-animation');
			}

			if ( notice ) {
				notice.classList.add('show-up-animation');
			}

			window.localStorage.PopupBarDismissed = true;
			navbar.style.top = '0';
		}

		function undismiss() {
			delete window.localStorage.PopupBarDismissed;
		}

		function show() {
			var $dismiss = document.getElementById('popup-bar-dismiss');
			if ($dismiss !== null) {
				$dismiss.onclick = dismiss;
			}

			var $div = document.getElementById('popup-bar');
			if ($div !== null) {
				$div.classList.remove('d-none');
				$div.classList.add('show-down-animation');
				navbar.style.top = '50px';
			}
		}

		function ready(fn) {
			if ( document.readyState === 'complete' ) {
				return fn();

			} else if ( document.addEventListener ) {
				document.addEventListener('DOMContentLoaded', fn);

			} else {
				document.attachEvent('onreadystatechange', function () {
					if (document.readyState === 'interactive') fn()
				})
			}
		}

		PopupBar.run = run;
		PopupBar.dismiss = dismiss;
		PopupBar.undismiss = undismiss;

		return PopupBar
	})
)

PopupBar();

// #endregion Popup Bar

// #region Popup Box

void (function (root, factory) {

	if ( typeof define === 'function' && define.amd ) {
		define(factory);

	} else if ( typeof exports === 'object' ) {
		module.exports = factory();
	
	}	else {
		root.PopupBox = factory()
	}

} (this, function () {

		function PopupBox() {
			ready(run);
		}

		function run() {
			if ( window.localStorage.PopupBoxDismissed ) {
				return;
			}

			show();
		}

		function dismiss() {
			var notice = document.getElementById('popup-box');

			if ( notice ) {
				notice.classList.remove('bounce-in-up-animation');
			}

			if ( notice ) {
				notice.classList.add('bounce-out-down-animation');
			}
			
			window.localStorage.PopupBoxDismissed = true;
		}

		function undismiss() {
			delete window.localStorage.PopupBoxDismissed;
		}

		function show() {
			var $dismiss = document.getElementById('popup-box-dismiss');
			if ($dismiss !== null) {
				$dismiss.onclick = dismiss;
			}

			var $div = document.getElementById('popup-box');
			if ($div !== null) {
				$div.classList.remove('d-none');
				$div.classList.add('bounce-in-up-animation');
			}
		}

		function ready(fn) {
			if ( document.readyState === 'complete' ) {
				return fn();

			} else if ( document.addEventListener ) {
				document.addEventListener('DOMContentLoaded', fn);

			} else {
				document.attachEvent('onreadystatechange', function () {
					if ( document.readyState === 'interactive' ) {
						fn();
					} 
				})
			}
		}

		PopupBox.run = run;
		PopupBox.dismiss = dismiss;
		PopupBox.undismiss = undismiss;

		return PopupBox;
	})
)

PopupBox();

// #endregion Popup Box

/*----------------------------------------------
3. Side Widget
----------------------------------------------*/

// #region Side Widget

jQuery(function ($) {
	'use strict';

	$(window).scroll(function () {

		var current_position = $(window).scrollTop();
		var widget = $('.shock-body .side-widget');

		widget.each(function() {

			if ( $(this).is('[data-position]') ) {
				var display_in = $(this).data('position');
	
			} else {
				var display_in = window.innerHeight;
			}

			if ( ! $(this).hasClass('active') ) {
	
				if ( current_position > display_in ) {
					$(this).addClass('show');
	
				} else {
					$(this).removeClass('show');
				}
			}
		})
	})
})

// #endregion Side Widget

/*----------------------------------------------
4. Icon
----------------------------------------------*/

// #region Icon

jQuery(function ($) {
	'use strict';

	const cache = {};

	$.fn.svgIconInit = function fnSvgIconInit() {
		this.each(imgToSvg);
		return this;
	};

	function imgToSvg() {
		const $img = $(this);
		const src = $img.attr('src');

		if ( ! cache[src] ) {
			const d = $.Deferred();
			$.get(src, (data) => {
					d.resolve($(data).find('svg'));
			});
			cache[src] = d.promise();
		}

		cache[src].then((svg) => {
			const $svg = $(svg).clone();

			if ( $img.attr('id') ) $svg.attr('id', $img.attr('id'));
			if ( $img.attr('class') ) $svg.attr('class', $img.attr('class'));
			if ( $img.attr('style') ) $svg.attr('style', $img.attr('style'));

			if ( $img.attr('width') ) {
				$svg.attr('width', $img.attr('width'));
				if ( ! $img.attr('height') ) $svg.removeAttr('height');
			}
			if ( $img.attr('height') ) {
				$svg.attr('height', $img.attr('height'));
				if ( ! $img.attr('width') ) $svg.removeAttr('width');
			}

			$svg.insertAfter($img);
			$img.trigger('svgInlined', $svg[0]);
			$img.remove();
		})
	}

	$('[data-dni-icon]').svgIconInit();	
})

// #endregion Icon

/*----------------------------------------------
5. One Page Link
----------------------------------------------*/

// #region One Page Link

jQuery(function ($) {
	'use strict';

	$('.one-page-section').each(function () {
		var $this = $(this);

		$this.append('<span class="one-page-item"></span>');

		var item = $this.find('.one-page-item');

		item.bind('inview', function (event, isInView) {

			if ( isInView ) {

				let section = $this.attr('id');
				let link    = '#' + section;
				let element = $('.one-page-link');
				let active  = $('a[href="' + link + '"].one-page-link');

				element.removeClass('active');
				active.addClass('active');
			}

		})
	})
})

// #endregion One Page Link

/*----------------------------------------------
6. Helper
----------------------------------------------*/

// #region Helper

jQuery(function ($) {
	'use strict';

	var navbar  = $('#navbar');
	var height  = navbar.outerHeight();
	var section = $('.has-holder');

	section.each(function() {
		$(this).prepend('<div class="navbar-holder" style="padding-top: '+height+'px" />');
	})
})

jQuery(function ($) {
	'use strict';

	// Text Color
	$('[data-text-color]').each(function () {
		let attr = $(this).data('text-color');
		$(this).css('color',  attr);
	})

	// Background Color
	$('[data-bg-color]').each(function () {
		let attr = $(this).data('bg-color');
		$(this).css('background-color',  attr);
	})

	// Background Image
	$('[data-bg-image]').each(function () {
		let attr = $(this).data('bg-image');
		$(this).css('background-image', 'url(' + attr + ')');
	})
})

jQuery(function ($) {
	'use strict';

	function autoWidth() {
		var section = $('.js-auto-width');

		section.each(function() {

			var sectionWidth   = $(this).width();
			var containerWidth = $(this).find('.container').width();
			var wrapper        = $(this).find('.js-auto-width-wrapper');
			var width          = (( sectionWidth - containerWidth) / 2);

			wrapper.css('width', 'calc(100% + ' + width + 'px)');
		})

	} autoWidth();
})

jQuery(function ($) {
	'use strict';

	var item = $('.focus-trigger');

	item.each(function() {

		$(this).hover(function() {
			$(this).find('.focus-trigger-field').trigger('focus');
		})
	})
})

// #endregion Helper

/*----------------------------------------------
7. Slider
----------------------------------------------*/

// #region Slider

jQuery(function ($) {

	// Slider
	$('.shock-section .slider').each(function () {

		// Autoplay
		if ( $(this).is('[data-autoplay]') ) {
			var autoplay = { delay: $(this).data('autoplay') };
		} else {
			var autoplay = false;
		}

		// Loop
		if ( $(this).is('[data-loop]') ) {
			var loop = $(this).data('loop');
		} else {
			var loop = false;
		}

		// Columns
		if ( $(this).is('[data-columns]') ) {
			var columns = $(this).data('columns');
			var columns = columns.split(',');
		} else {
			var columns = [1,1,1,1];
		}

		// Navigation
		if ( $(this).hasClass('has-navigation') ) {
			has_navigation = { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' };
		} else {
			has_navigation = false;
		}

		// Pagination
		if ( $(this).hasClass('has-pagination') ) {
			has_pagination = { el: '.swiper-pagination', clickable: true };
		} else {
			has_pagination = false;
		}

		// Scrollbar
		if ( $(this).hasClass('has-scrollbar') ) {
			has_scrollbar = { el: '.swiper-scrollbar', snapOnRelease: true, draggable: true };
		} else {
			has_scrollbar = false;
		}

		// Settings
		const carouselSlider = new Swiper(this, {
			autoplay: autoplay,
			speed: 600,
			loop: loop,
			navigation: has_navigation,
			pagination: has_pagination,
			scrollbar: has_scrollbar,
			grabCursor: true,
			spaceBetween: 0,
			autoHeight: true,
			centerInsufficientSlides: true,
			slidesPerView: columns[3],
			breakpoints: {
				375: {
					slidesPerView: columns[2]
				},
				768: {
					slidesPerView: columns[1]
				},
				1200: {
					slidesPerView: columns[0]
				}
			},
		})

		// Scrollbar cursor
		if ( $(this).hasClass('has-scrollbar') ) {

			carouselSlider.on('scrollbarDragMove', function () {
				$('.swiper-scrollbar-drag').css('cursor', 'grabbing');
			})

			carouselSlider.on('scrollbarDragEnd', function () {
				$('.swiper-scrollbar-drag').css('cursor', 'grab');
			})
		}
	})

	// Thumbnail Slider
	const ThumbnailSliderControl = new Swiper('.shock-section .thumbnail-slider .thumbnail-slider-control', {
		speed: 600,
		loop: true,
		slidesPerView: 1,
		breakpoints: {
			320: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 4
			},
			1200: {
				slidesPerView: 6
			}
		},
		spaceBetween: 15,
	})

	const ThumbnailSlider = new Swiper('.shock-section .thumbnail-slider .thumbnail-slider-items', {
		speed: 600,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: ThumbnailSliderControl,
		},
	})
})

// #endregion Slider

/*----------------------------------------------
8. Shuffle
----------------------------------------------*/

// #region Shuffle 

jQuery(function ($) {
	'use strict';

	var section = $('.shock-section .shuffle');

	section.each(function (index) {

		var $this = $(this);
		var count = index + 1;

		$this.find('.shuffle-container').addClass('shuffle-container-' + count);
		$this.find('.shuffle-item').addClass('shuffle-item-' + count);
		$this.find('.shuffle-sizer').addClass('shuffle-sizer-' + count);
		$this.find('.shuffle-button').addClass('shuffle-button-' + count);

		var container = $('.shuffle-container-' + count);
		var button = $('.shuffle-button-' + count);

		var Filter = new Shuffle(container, {
			itemSelector: '.shuffle-item-' + count,
			sizer: '.shuffle-sizer-' + count,
			buffer: 1,
		})

		button.on('click', function () {

			var button = $(this);
			var value = button.data('value');

			$this.find('.shuffle-button').removeClass('active');
			button.addClass('active');

			if (value == 'All') {
				Filter.filter();

			} else {
				Filter.filter(value);
			}
		})
	})
})

// #endregion Shuffle 

/*----------------------------------------------
9. Lax
----------------------------------------------*/

// #region Lax

jQuery(function ($) {
	'use strict';

	window.onload = function () {
		lax.init()

		// Settings
		lax.addDriver('scrollY', function () {
			return window.scrollY;
		}, { inertiaEnabled: true })

		lax.addElements('[data-lax="inertia-top"]', {
			scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, 0, 0], { inertia: 10 } ] }
		})

		lax.addElements('[data-lax="inertia-bottom"]', {
			scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, 0, 0], { inertia: -10 } ] }
		})

		lax.addElements('[data-lax="v-top"]', {
			scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, -35, 0], { inertia: 5 } ] }
		})

		lax.addElements('[data-lax="v-bottom"]', {
			scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, 35, 0], { inertia: -5 } ] }
		})

		lax.addElements('[data-lax="h-left"]', {
			scrollY: { translateX: [ ['elInY', 'elOutY'], [75, -100] ] }
		})

		lax.addElements('[data-lax="h-right"]', {
			scrollY: { translateX: [ ['elInY', 'elOutY'], [-75, 100] ] }
		})

		// Scrolling Grid
		$('.scrolling-grid .bricklayer').each(function () {

			if ( $(this).data('columns') == 1 ) {
				var lax_v_down = null;
				var lax_v_up = '.scrolling-grid [data-columns="1"] .bricklayer-column:nth-child(2)';
			}

			else if ( $(this).data('columns') == 2 ) {
				var lax_v_down = '.scrolling-grid [data-columns="2"] .bricklayer-column:nth-child(2)';
				var lax_v_up = '.scrolling-grid [data-columns="2"] .bricklayer-column:nth-child(3)';
			}

			else if ( $(this).data('columns') == 3 ) {
				var lax_v_down = '.scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(4)';
				var lax_v_up = '.scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(3)';
			}

			else if ( $(this).data('columns') == 4 ) {
				var lax_v_down = '.scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(4)';
				var lax_v_up = '.scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(5)';
			}

			else if ( $(this).data('columns') == 5 ) {
				var lax_v_down = '.scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(4), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(6)';
				var lax_v_up = '.scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(5)';
			}

			else if ( $(this).data('columns') == 6 ) {
				var lax_v_down = '.scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(4), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(6)';
				var lax_v_up = '.scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(5), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(7)';
			}

			else {
				var lax_v_down = null;
				var lax_v_up = null;
			}

			lax.addElements(lax_v_down, {
				scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, 100, 0] ] }
			})

			lax.addElements(lax_v_up, {
				scrollY: { translateY: [ ['elInY', 'elCenterY', 'elOutY'], [0, -100, 0] ] }
			})
		})
	}
})

// #endregion Lax

/*----------------------------------------------
10. Lightbox
----------------------------------------------*/

// #region Lightbox

jQuery(function ($) {
	$('.shock-section .gallery').lightGallery({
		selector: '.shock-section .gallery .lightbox-link:not(.prevent)',
		thumbnail: false,
		share: false,
		download: false
	})
})

// #endregion Lightbox

/*----------------------------------------------
11. Load More
----------------------------------------------*/

// #region Load More

jQuery(function ($) {
	'use strict';

	var display = $('#load-more').data('display');
	var button  = $('#load-more-button');
	var item    = $('.load-more-item').hide();
	
	item.slice(0, display).show();

	button.on('click', function(e) {
		e.preventDefault();

		var item_hidden  = $('.load-more-item:hidden');
		var item_columns = $('#load-more').data('columns');

		if (item_hidden.length == item_columns) {
			$(this).find('.button-icon').removeClass('fa-arrow-rotate-right').addClass('fa-check');
			$(this).find('.button-text').text('All items loaded');
		}

		else if (item_hidden.length == 0) {
			return false;
		}

		item_hidden.slice(0, item_columns).fadeIn();

		$('html, body').animate({
			scrollTop: $(this).offset().top - 400
		}, 200)
	})
})

// #endregion Load More

/*----------------------------------------------
12. Form Validation
----------------------------------------------*/

// #region Form Validation

jQuery(function ($) {
	'use strict';

	var required_form = $('.needs-validation');

	Array.prototype.slice.call(required_form).forEach(function (form) {

		// Submit
		form.addEventListener('submit', function (event) {

			// Check
			if ( ! form.checkValidity() ) {
				event.preventDefault();
				event.stopPropagation();
			}

			// Validation
			form.classList.add('was-validated');

		}, false);
	})
})

// #endregion Form Validation

/*----------------------------------------------
13. Tooltip
----------------------------------------------*/

// #region Tooltip

jQuery(function ($) {
	'use strict';

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"].index-1'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			container: '.tooltip-item.index-1',
			trigger : 'hover'
		});
	})

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"].index-2'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			container: '.tooltip-item.index-2',
			trigger : 'hover'
		});
	})

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"].index-3'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			container: '.tooltip-item.index-3',
			trigger : 'hover'
		});
	})

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"].index-4'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			container: '.tooltip-item.index-4',
			trigger : 'hover'
		});
	})
})

// #endregion Tooltip

/*----------------------------------------------
14. Animated Underline
----------------------------------------------*/

// #region Animated Underline

jQuery(function ($) {
	'use strict';

	$('.animated-underline').each(function () {
		var $this = $(this);

		$this.one('inview', function (event, isInView) {

			if ( isInView ) {
				if ( ! $this.hasClass('when-hover') ) {
					setTimeout(function () {
						$this.addClass('active');
					}, 400)

				} else {
					let parent = $this.parents().eq(1);
					parent.hover(function () {
						$this.addClass('active');
					})
				}
			}
		})
	})
})

// #endregion Animated Underline

/*----------------------------------------------
15. Progress bar
----------------------------------------------*/

// #region Progress bar

jQuery(function ($) {
	'use strict';

	// Counter
	$('.animated-counter').each(function () {

		var $this = $(this);

		$this.one('inview', function (event, isInView) {

			if ( isInView ) {
				$this.find('.counter').each(function () {

					var $this = $(this);

					var bar = new ProgressBar.SemiCircle(this, {
						duration: parseInt($this.data('duration')),
						strokeWidth: 0,
						trailWidth: 0,
						color: null,
						trailColor: null,
						svgStyle: { display: 'none' },
						easing: 'easeInOut',
						text: {
							style: {
								color: $this.data('text-color'),
								backgroundColor: $this.data('text-bg-color')
							}
						},
						step: (state, bar) => {
							bar.setText(Math.round(bar.value() * 100) + $this.data('symbol'));
						}
					})

					$this.find('.progressbar-text').css('top', '');
					$this.find('.progressbar-text').css('bottom', '');
					$this.find('.progressbar-text').css('transform', '');

					bar.animate(parseInt($this.data('value')) / 100);

					$this.addClass('active');
				})
			}
		})
	})

	// Line Progress bar
	$('.line-progress-bar').each(function () {

		var $this = $(this);

		$this.one('inview', function (event, isInView) {

			if ( isInView ) {

				$this.find('.counter').each(function () {

					var $this = $(this);

					if ( $this.hasClass('outline') ) {
						var text_width = '120px';

					} else {
						var text_width = '70px';
					}

					var bar = new ProgressBar.Line(this, {
						duration: parseInt($this.data('duration')),
						strokeWidth: $this.data('bar-stroke'),
						trailWidth: $this.data('bar-stroke-empty'),
						color: $this.data('bar-color'),
						trailColor: $this.data('empty-bar-color'),
						svgStyle: { width: '100%', height: '100%' },
						easing: 'linear',
						text: {
							style: {
								position: null,
								right: null,
								left: 'calc( ' + $this.data('value') + '% - ' + text_width + ' )',
								top: null,
								margin: null,
								padding: null,
								transform: null,
								transition: parseInt($this.data('duration') - 200) + 'ms linear',
								color: $this.data('text-color'),
								backgroundColor: $this.data('text-bg-color')
							}
						},
						step: (state, bar) => {
							bar.setText(Math.round(bar.value() * 100) + $this.data('symbol'));
						}
					})

					bar.animate(parseInt($this.data('value')) / 100);

					$this.addClass('active');
				})
			}
		})
	})

	// Radial Progress Bar
	$('.radial-progress-bar').each(function () {

		var $this = $(this);

		$this.one('inview', function (event, isInView) {

			if ( isInView ) {
				$this.find('.counter').each(function () {

					var $this = $(this);

					var bar = new ProgressBar.SemiCircle(this, {
						duration: parseInt($this.data('duration')),
						strokeWidth: $this.data('bar-stroke'),
						trailWidth: $this.data('bar-stroke-empty'),
						color: $this.data('bar-color'),
						trailColor: $this.data('empty-bar-color'),
						svgStyle: { width: '100%', height: '100%' },
						easing: 'easeInOut',
						text: {
							style: {
								color: $this.data('text-color'),
								backgroundColor: $this.data('text-bg-color')
							}
						},
						step: (state, bar) => {
							bar.setText(Math.round(bar.value() * 100) + $this.data('symbol'));
						}
					})

					$this.find('.progressbar-text').css('top', '');
					$this.find('.progressbar-text').css('bottom', '');
					$this.find('.progressbar-text').css('transform', '');

					bar.animate(parseInt($this.data('value')) / 100);

					$this.addClass('active');
				})
			}
		})
	})
})

// #endregion Progress bar

/*----------------------------------------------
16. Typed Text
----------------------------------------------*/

// #region Typed Text

jQuery(function ($) {
	'use strict';

	if (document.querySelector('.typed-text') !== null) {	
		var options = {
			stringsElement: '#typed-strings',
			typeSpeed: 60,
			backSpeed: 30,
			backDelay: 2000,
			startDelay: 300,
			loop: true
		};
		var typed = new Typed('.typed-text', options);
	}

	if (document.querySelector('.typed-text-2') !== null) {
		var options_2 = {
			stringsElement: '#typed-strings-2',
			typeSpeed: 60,
			backSpeed: 30,
			backDelay: 2000,
			startDelay: 300,
			loop: true
		};
		var typed_2 = new Typed('.typed-text-2', options_2);
	}
})

// #endregion Typed Text

/*----------------------------------------------
17. Circular Text
----------------------------------------------*/

// #region Circular Text

jQuery(function ($) {
	'use strict';

	var CircularText = {
		
		init: function(el, str) {

			var element = document.querySelector(el);
			var text = str ? str : element.innerHTML;
			element.innerHTML = '';

			for (var i = 0; i < text.length; i++) {
				var letter = text[i];
				var span = document.createElement('span');
				var node = document.createTextNode(letter);
				var r = (360/text.length)*(i);
				var x = (Math.PI/text.length).toFixed(0) * (i);
				var y = (Math.PI/text.length).toFixed(0) * (i);
				span.appendChild(node);
				span.style.webkitTransform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
				span.style.transform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
				element.appendChild(span);
			}
		}
	};

	if (document.querySelector('.circular-text') !== null) {
		CircularText.init('.circular-text .emblem');
	}
	if (document.querySelector('.circular-text.index-2') !== null) {
		CircularText.init('.circular-text.index-2 .emblem');
	}
	if (document.querySelector('.circular-text.index-3') !== null) {
		CircularText.init('.circular-text.index-3 .emblem');
	}
	if (document.querySelector('.circular-text.index-4') !== null) {
		CircularText.init('.circular-text.index-4 .emblem');
	}
})

// #endregion Circular Text

/*----------------------------------------------
18. time Switch
----------------------------------------------*/

// #region time Switch

jQuery(function ($) {
	'use strict';

	function countUp(countFrom, countTo) {

		var selector = { countNum: countFrom.text() };
		
		$(selector).animate({ countNum: countTo },
			{
				duration: 1000,
				easing: 'linear',
				step: function () {
					countFrom.text(Math.floor(this.countNum));
				},
				complete: function () {
					countFrom.text(this.countNum);
				}
			}
		)
	}

	$('.js-switch-time').each(function () {

		var $this = $(this);
		var button = $this.find('.js-switch-time-button');
		var time = $this.find('.time');

		time.css('display', 'inline-block');
		time.css('width', (time.width() + 15));

		button.click(function () {

			time.each(function () {
				var $this = $(this), monthly_value = $this.data('monthly'), annual_value = $this.data('annual');

				if ($this.text() == monthly_value) {
					countUp($this, annual_value);

				} else {
					countUp($this, monthly_value);
				}
			})
		})
	})
})

// #endregion time Switch

/*----------------------------------------------
19. Scroll Down
----------------------------------------------*/

// #region Scroll Down

jQuery(function ($) {
	$(document).on('click', '#scroll-down', function () {
		window.scrollTo(0, $(window).height());
	})
})

// #endregion Scroll Down

/*----------------------------------------------
20. ZZZ Divider
----------------------------------------------*/

// #region ZZZ

jQuery(function ($) {
	'use strict';

	$('.zzz').each(function () {
		var $this = $(this);

		$this.one('inview', function (event, isInView) {

			if ( isInView ) {

				if ( ! $this.hasClass('when-hover') ) {
					$this.addClass('active');

				} else {
					let parent = $this.parents().eq(1);
					parent.hover(function () {
						$this.addClass('active');
					})
				}
			}
		})
	})
})

// #endregion ZZZ