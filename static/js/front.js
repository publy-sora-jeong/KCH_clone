(() => {

    let vh;
    let timer, timer2;


    window.addEventListener('load', () => {
        setViewHeight();
        langSelect();
        skipContents();
    });
    window.addEventListener('resize', () => {
        setViewHeight();
    });

    $('#fullpage').fullpage({
        navigation: true,
        slidesToSections: true,
        scrollingSpeed: 770,
        navigationPosition: 'left',
        //normalScrollElements: '.section-footer', 
        //fixedElements: 'footer',

        afterLoad: function (anchorLink, index) {
            $('.business--txt .swiper-slide').removeClass('text-ani');
            $('.merit-list .num').text().replace(/,/g, '');
            $(".merit-svg svg *").css({
                'stroke-dasharray': 400,
                'stroke-dashoffset': 400
            });

            switch (index) {
                case 1:
                case 2:
                case 3:
                case 5:
                default:
                    $('header').removeClass('theme-dark');
                    $('#fp-nav').removeClass('theme-dark');
                    $('.section-recruit').removeClass('bg-animate');
            }

            if (index == 2) {
                $.fn.fullpage.setAllowScrolling(false);
                $('header').addClass('theme-dark');
                $('.business--txt .swiper-slide.swiper-slide-active').addClass('text-ani');
            } else {
                $.fn.fullpage.setAllowScrolling(true);
            }

            if (index == 3) {
                $('.merit-lines li').addClass('in');
                meritCounter();
                animate_merit();
            } else {
                $('.merit-lines li').removeClass('in')
            }

            if (index == 4) {
                $('header').addClass('theme-dark');
                $('#fp-nav').addClass('theme-dark');

            }
            if (index == 5 || index == 6) {
                $('.section-recruit').addClass('bg-animate');
            }
            //TEST 
            //$.fn.fullpage.moveTo(4);
        },

        // onleave
        onLeave: function (anchorLink, destination, direction, index) {
            clearInterval(timer);
            clearInterval(timer2);
            $(".merit-svg svg *").css({
                'stroke-dasharray': 400,
                'stroke-dashoffset': 400
            });
            if (destination != 1) {
                $('.scroll-fadeout').stop().fadeOut(1000);
            } else {
                $('.scroll-fadeout').stop().fadeIn(1000);
            }
        },

        afterResize: function (width, height) {
            var fullpageContainer = this;
            //alert("The sections have finished resizing");
        }

    });

    const mainHeroOpt = {
        speed: 800,
        effect: "fade",
        loop: true,
        pagination: {
            el: ".hero-pager",
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
        },
        on: {
            init: function () {
                $('.slide01').removeClass('swiper-slide-active');

                setTimeout(() => {
                    $('.slide01').addClass('swiper-slide-active');
                }, 100);
            }
        }
    }

    if ($('.main-hero-slider').length > 0) {
        const mainHero = new Swiper(".main-hero-slider", mainHeroOpt);
    }

    //MAIN Business
    const main_business_bg = new Swiper('.business--bg', {
        direction: "vertical",
        effect: "slide",
        loop: false,
        speed: 1100,
        parallax: true,
        autoplay: false,
        allowTouchMove: false,
        simulateTouch: false,
        grabCursor: false,
        observer: true,
        mousewheel: {
            releaseOnEdges: true
        },
        mousewheel: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.m_count',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return '0' + (current) + '/0' + (total);
            }
        },
        navigation: {
            prevEl: '.section-business .button_prev',
            nextEl: '.section-business .button_next',
        },
        on: {
            slidePrevTransitionEnd: function () {
                $(".section-business .business--bg").removeClass('next');
                $(".section-business .business--bg").addClass('prev');


            },
            slideNextTransitionEnd: function () {
                $(".section-business .business--bg").removeClass('prev');
                $(".section-business .business--bg").addClass('next');
            },
        },

    });

    const main_business_txt = new Swiper('.business--txt', {
        speed: 1100,
        loop: false,
        effect: 'fade',
        autoplay: false,
        fadeEffect: {
            crossFade: true
        },
        allowTouchMove: false,
        simulateTouch: false,
        grabCursor: false,
        mousewheel: {
            releaseOnEdges: true
        },
        mousewheel: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.count-wrap',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return `
                    <div class="big">
                        <b>0</b>
                        <div class="num">
                            <span>${current}</span>
                        </div>
                    </div>
                    <div class="total">/0${total}</div>
                    `
            }
        },
        on: {
            init: function () {
                $('.business--bg .swiper-slide.swiper-slide-active').addClass('scroll-off')
            },
            transitionStart: function () {
                /* */
            },
            transitionEnd: function () {
                $('.business--bg .swiper-slide.swiper-slide-active').addClass('scroll-off')
                $('.business--txt .swiper-slide.swiper-slide-active').addClass('text-ani')
            },
            slideChange: function () {
                $('.business--bg .swiper-slide').removeClass('scroll-off');
                $('.business--txt .swiper-slide').removeClass('text-ani');
            },
            slidePrevTransitionStart: function () {
                $('.business--txt .swiper-slide').removeClass('text-ani');
            },
            slidePrevTransitionEnd: function () {
                /* */
            },
        },
    });

    $('#section02').on('DOMMouseScroll mousewheel wheel', function (e) {
        let delta = e.originalEvent.wheelDelta;
        if (delta > 0) {
            if ($('.business--bg .biz-01').hasClass('scroll-off')) {
                $.fn.fullpage.moveTo(1);
            }
        } else if (delta < 0) {
            if ($('.business--bg .biz-04').hasClass('scroll-off')) {
                $.fn.fullpage.moveTo(3);
                // main_business_bg.allowTouchMove = false
                // main_business_bg.simulateTouch = false,
                // main_business_bg.grabCursor  = false

            }
        }
    });
    main_business_bg.controller.control = main_business_txt;
    main_business_txt.controller.control = main_business_bg;


    //MENU

    const clickElems = {
        menu: document.querySelector('.js-open-menu'),
        closeMenu: document.querySelector('.js-close-menu'),
    }
    const menuElem = {
        //sitemap animate
        allMenu: document.querySelector('.allmenu'),
        allMenuInner: document.querySelector('.allmenu-inner'),
        leftBg: document.querySelector('.allmenu__leftbg')
    }

    for (const key in clickElems) {
        if (Object.hasOwnProperty.call(clickElems, key)) {
            const element = clickElems[key];

            element.addEventListener('click', e => {
                e.stopPropagation();

                //GNB OPEN
                if (element === clickElems.menu) {
                    // fadeIn(menuElem.allMenu, 600);
                    $('#allmenu').fadeIn(500, function () {
                        $('.left-bg').stop().animate({
                            width: '33.6312%'
                        }, 600, function () {
                            $('.allmenu-inner').addClass('on');
                            animate_allgnb();
                        })
                    })
                }

                //GNB CLOSE
                if (element === clickElems.closeMenu) {
                    clearInterval(timer);
                    $('.left-bg').stop().animate({
                        width: 0
                    }, 300, function () {
                        $('.allmenu-inner').removeClass('on');
                        $('#allmenu').stop().animate({
                            right: '-100%'
                        }, 500, function () {
                            $(this).css({
                                right: 0,
                                'display': 'none'
                            })
                        });
                    });
                    $("#allmenu .all_gnb figure svg g *").css({
                        'stroke-dashoffset': 150
                    });
                }
            });
        }
    }

})();


//common - set viewport height(100%)
function setViewHeight() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

//common - language select
function langSelect() {
    $('.lang-select button').on('click', function () {
        $(this).next('.lang-select .list').stop().slideDown()
    });
    $('.lang-select .list').on('mouseleave focusout', function () {
        $('.lang-select .list').stop().slideUp();
    });
}

//main - section-merit number counter 
function meritCounter() {
    $('.merit-list .num').each(function () {
        $(this).text(Number($(this).attr('data-num')));

        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            },
            complete: function () {
                $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));;
            }
        });
    });
}

function skipContents() {
    $(".skiptoContent").focusin(function () {
        $(this).animate({
                top: 0,
                height: 30,
                opacity: 1,
            },
            0
        );
    });
    $(".skiptoContent").focusout(function () {
        $(this).animate({
                top: -30,
                height: 0,
                opacity: 0,
            },
            150
        );
    });
}



//FADEOUT
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

//FADEIN
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            el.style.display = "block";
            requestAnimationFrame(fade);
        }
    })();
};




function animate_allgnb() {
    let i = 150;
    timer = setInterval(() => {

        if (i <= 0) clearInterval(timer)
        else i--;
        $("#allmenu .all_gnb figure svg g *").css({
            'stroke-dashoffset': i
        })
    }, 25);
}

function animate_merit() {
    let i = 400;
    timer2 = setInterval(() => {

        if (i <= 0) {
            clearInterval(timer2);
        } else i--;
        $(".merit-svg *").css({
            'stroke-dashoffset': i
        })
    }, 25);
}