document.addEventListener('DOMContentLoaded', () => {

	// HEADER START
	var headerMobile = $('.header-mobile');
	$('.hamburger').on('click', function() {
		headerMobile.addClass('is-active');
	});
	$('.header-mobile-close').on('click', function() {
		headerMobile.removeClass('is-active');
	});

	$('.menu-item-has-children > a').append('<span class="menu-item-plus">+</span>');

	// Slide Down Function START
	function slideDown(element, duration) {
		element.style.display = 'block';
		let height = element.offsetHeight;
		element.style.height = 0;
		element.style.overflow = 'hidden';
	
		let start = null;
		function step(timestamp) {
			if (!start) start = timestamp;
			let progress = timestamp - start;
			let currentHeight = Math.min(progress / duration * height, height);
			element.style.height = currentHeight + 'px';
			if (progress < duration) {
				window.requestAnimationFrame(step);
			} else {
				element.style.height = '';
			}
		}
		window.requestAnimationFrame(step);
	}
	// Slide Down Function END

	
	// Sub Menu Slide Up Function START
	function slideUp(element, duration) {
		let height = element.offsetHeight;
		element.style.height = height + 'px';
		element.style.overflow = 'hidden';
	
		let start = null;
		function step(timestamp) {
			if (!start) start = timestamp;
			let progress = timestamp - start;
			let currentHeight = Math.max(height - (progress / duration * height), 0);
			element.style.height = currentHeight + 'px';
			if (progress < duration) {
				window.requestAnimationFrame(step);
			} else {
				element.style.display = 'none';
				element.style.height = '';
			}
		}
		window.requestAnimationFrame(step);
	}
	// Sub Menu Slide Up Function END

	// Sub Menu Function START
	function subMenuOpen() {
		if(window.matchMedia('(max-width: 992px)').matches) {
			const plusButtons = document.querySelectorAll('.menu-item-plus');

			plusButtons.forEach(button => {
				button.addEventListener('click', function(event) {
					event.preventDefault();
					const subMenu = button.closest('.menu-item-has-children').querySelector('.sub-menu');
					if (subMenu.style.display === 'block' || subMenu.style.height !== '') {
						slideUp(subMenu, 300); 
						subMenu.classList.remove('is-active');
						button.classList.remove('is-active');
						button.innerHTML = '+';
					} else {
						slideDown(subMenu, 300);
						subMenu.classList.add('is-active');
						button.classList.add('is-active');
						button.innerHTML = '-';
					}
				});
			});
		}
	}
	subMenuOpen();
	$(window).on('resize', function() {
		subMenuOpen();
	});
	// Sub Menu Function END
	
	// HEADER END

	// MAGNIFIC POPUP START
	$('.magnific-iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
        removalDelay: 160,
		preloader: false,
	});
	$('.magnific-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
        removalDelay: 160,
		preloader: true,
		gallery: {
			enabled: true
		}
	});
	$('.magnific-inline').magnificPopup({
		type: 'inline',
		mainClass: 'mfp-fade',
        removalDelay: 160,
		preloader: true,
	});
	// MAGNIFIC POPUP END

	// SCROLL FUNCTIONS START
	function scrollUpShow() {
		if($(this).scrollTop() > 700) {
			$('.scroller-wrap').addClass('is-active');
		}
		else {
			$('.scroller-wrap').removeClass('is-active');
		}
	}
	scrollUpShow();
	$(window).on('scroll', function() {
        var $numScroll = $('.num-scroll');
        if ($numScroll.length && isScrolledIntoView($numScroll) && !counted) {
            $('.num-js').each(function() {
                countUp($(this));
            });
            counted = true;
        }

		// Scroller START
		scrollUpShow();
		let scrollTop = $(window).scrollTop();
		let docHeight = $(document).height();
		let winHeight = $(window).height();

		let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
		scrollPercent = Math.round(scrollPercent);

		$('.scroller-percent').text(scrollPercent + '%');
		// Scroller END
    });

	$('#scroller-up').on('click', function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});

	$('#scroller-down').on('click', function() {
		$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
	});
	// SCROLL FUNCTIONS END

	// FAQ ACCORDIONS START
	const faqQuestion = document.querySelectorAll('.faq-item');
	faqQuestion.forEach(button => {
		button.addEventListener('click', function(event) {
			event.preventDefault();
			const answer = button.querySelector('.faq-answer');
			if (answer.style.display === 'block' || answer.style.height !== '') {
				slideUp(answer, 300); 
				answer.classList.remove('is-active');
				button.classList.remove('is-active');
			} else {
				slideDown(answer, 300);
				answer.classList.add('is-active');
				button.classList.add('is-active');
			}
		});
	});
	// FAQ ACCORDIONS END

	// NUMBER COUNTER START
	function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    function countUp($element) {
        var countTo = $element.data('count');
        $({ countNum: $element.text() }).animate({
            countNum: countTo
        },
        {
            duration: 3000,
            easing: 'swing',
            step: function() {
                $element.text(Math.floor(this.countNum));
            },
            complete: function() {
                $element.text(this.countNum);
            }
        });
    }

    var counted = false;
    $(window).on('scroll', function() {
        var $numScroll = $('.num-scroll');
        if ($numScroll.length && isScrolledIntoView($numScroll) && !counted) {
            $('.num-js').each(function() {
                countUp($(this));
            });
            counted = true;
        }
    });
	// NUMBER COUNTER END

	// WHY US START
	var animationDone = false;

    function startProgress() {
        if (animationDone) return;

        if ($('.progress-js').length) {
            var skillsTop = $('.progress-js').offset().top - 200;
        }
        if ($(window).scrollTop() >= skillsTop) {
            $('.progress-drag').each(function() {
                var $this = $(this);
                var percentNum = $this.closest('.progress-item').find('.progress-percent').data('percent');
                
                $({numberValue: 0}).animate({numberValue: percentNum}, {
                    duration: 1500,
                    easing: 'linear',
                    step: function() {
                        var roundedValue = Math.floor(this.numberValue);
                        $this.closest('.progress-item').find('.progress-percent').text(roundedValue + '%');
                        $this.width(roundedValue + '%');
                    },
                    complete: function() {
                        $this.closest('.progress-item').find('.progress-percent').text(percentNum + '%');
                        $this.width(percentNum + '%');
                    }
                });
            });

            animationDone = true;
        }
    }

	startProgress();
	$(window).on('scroll', function() {
		startProgress();
	});

	$('.beforeafter-container').cndkbeforeafter({
		showText: false,
	});
	// WHY US END

	// TESTIMONIALS START
	const swiperReviews = new Swiper('.swiper-reviews', {
		speed: 1000,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-reviews .swiper-pagination',
			clickable: true
		},
		effect: 'cube',
		cubeEffect: {
			shadow: false
		}
	});

	const swiperReviewsV2 = new Swiper('.swiper-reviews-v2', {
		speed: 1000,
		spaceBetween: 30,
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-reviews-v2 .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			700: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		}
	});
	// TESTIMONIALS END

	// GALLERY START
	const swiperGallery = new Swiper('.swiper-gallery', {
		speed: 1000,
		spaceBetween: 0,
		mousewheel: true,
		scrollbar: {
			el: '.swiper-gallery .swiper-scrollbar',
			draggable: true,
			dragSize: 65
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			545: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			}
		}
	});
	// GALLERY END

	// NEWS START
	const swiperNews = new Swiper('.swiper-news', {
		speed: 1000,
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-news .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			992: {
				spaceBetween: 30,
			}
		}
	});

	const swiperNewsV2 = new Swiper('.swiper-news-v2', {
		speed: 1000,
		navigation: {
			nextEl: '.news-v2-wrap .swiper-button-next',
			prevEl: '.news-v2-wrap .swiper-button-prev',
		},
		breakpoints: {
			0: {
				spaceBetween: 20,
				slidesPerView: 1,
			},
			575: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			992: {
				spaceBetween: 30,
				slidesPerView: 3,
			}
		}
	});
	// NEWS END

	// SERVICES START
	const swiperServicesV2 = new Swiper('.swiper-services-v2', {
		speed: 1000,
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-services-v2 .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			992: {
				spaceBetween: 30,
			}
		}
	});
	// SERVICES END

	// PARTNERS START
	const swiperPartners = new Swiper('.swiper-partners', {
		speed: 1000,
		
		autoplay: {
			delay: 3000,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			430: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			520: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
		}
	});

	const swiperPartnersV2 = new Swiper('.swiper-partners-v2', {
		speed: 1000,
		autoplay: {
			delay: 3000,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			430: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			520: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		}
	});
	// PARTNERS END

	// TIMER START
	function startTimer(duration, display) {
		let timer = duration, hours, minutes, seconds;
		setInterval(function () {
			hours = Math.floor(timer / 3600);
			minutes = Math.floor((timer % 3600) / 60);
			seconds = timer % 60;

			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			display.textContent = hours + ":" + minutes + ":" + seconds;

			if (--timer < 0) {
				timer = 0;
			}
		}, 1000);
	}
	window.onload = function () {
		const duration = 5 * 3600 + 4 * 60 + 2;
		const display = document.querySelector('#countdown');
		if (display !== null) {
			startTimer(duration, display);
		}
	};
	// TIMER END
	
})