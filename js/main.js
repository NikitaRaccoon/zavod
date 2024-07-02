 $(document).ready(function(){
     $("img").lazyload();
 })

 !function () { var s, i, c, a, o = { frameRate: 150, animationTime: 500, stepSize: 100, pulseAlgorithm: !0, pulseScale: 4, pulseNormalize: 1, accelerationDelta: 50, accelerationMax: 3, keyboardSupport: !0, arrowScroll: 50, fixedBackground: !0, excluded: "" }, p = o, u = !1, d = !1, n = { x: 0, y: 0 }, f = !1, m = document.documentElement, l = [], h = /^Mac/.test(navigator.platform), w = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 }, v = { 37: 1, 38: 1, 39: 1, 40: 1 }; function y() { if (!f && document.body) { f = !0; var e = document.body, t = document.documentElement, o = window.innerHeight, n = e.scrollHeight; if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0; else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) { var r, a = document.createElement("div"); a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function () { r = r || setTimeout(function () { u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null) }, 500) }, setTimeout(c, 10), Y("resize", c); if ((i = new R(c)).observe(e, { attributes: !0, childList: !0, characterData: !1 }), m.offsetHeight <= o) { var l = document.createElement("div"); l.style.clear = "both", e.appendChild(l) } } p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll") } } var b = [], g = !1, r = Date.now(); function S(d, f, m) { if (function (e, t) { e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0) }(f, m), 1 != p.accelerationMax) { var e = Date.now() - r; if (e < p.accelerationDelta) { var t = (1 + 50 / e) / 2; 1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t) } r = Date.now() } if (b.push({ x: f, y: m, lastX: f < 0 ? .99 : -.99, lastY: m < 0 ? .99 : -.99, start: Date.now() }), !g) { var o = q(), h = d === o || d === document.body; null == d.$scrollBehavior && function (e) { var t = M(e); if (null == B[t]) { var o = getComputedStyle(e, "")["scroll-behavior"]; B[t] = "smooth" == o } return B[t] }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto"); var w = function (e) { for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) { var a = b[r], l = t - a.start, i = l >= p.animationTime, c = i ? 1 : l / p.animationTime; p.pulseAlgorithm && (c = F(c)); var s = a.x * c - a.lastX >> 0, u = a.y * c - a.lastY >> 0; o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--) } h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null)) }; j(w, d, 0), g = !0 } } function e(e) { f || y(); var t = e.target; if (e.defaultPrevented || e.ctrlKey) return !0; if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0; var o = -e.wheelDeltaX || e.deltaX || 0, n = -e.wheelDeltaY || e.deltaY || 0; h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40); var r = z(t); return r ? !!function (e) { if (!e) return; l.length || (l = [e, e, e]); e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function () { try { localStorage.SS_deltaBuffer = l.join(",") } catch (e) { } }, 1e3); var t = 120 < e && P(e), o = !P(120) && !P(100) && !t; return e < 50 || o }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", { value: window.frameElement }), parent.wheel(e)) } function x(e) { var t = e.target, o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar; document.body.contains(s) || (s = document.activeElement); var n = /^(button|submit|radio|checkbox|file|color|image)$/i; if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function (e) { var t = e.target, o = !1; if (-1 != document.URL.indexOf("www.youtube.com/watch")) do { if (o = t.classList && t.classList.contains("html5-video-controls")) break } while (t = t.parentNode); return o }(e) || t.isContentEditable || o) return !0; if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0; if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0; var r = 0, a = 0, l = z(s); if (!l) return !d || !W || parent.keydown(e); var i = l.clientHeight; switch (l == document.body && (i = window.innerHeight), e.keyCode) { case w.up: a = -p.arrowScroll; break; case w.down: a = p.arrowScroll; break; case w.spacebar: a = -(e.shiftKey ? 1 : -1) * i * .9; break; case w.pageup: a = .9 * -i; break; case w.pagedown: a = .9 * i; break; case w.home: l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop; break; case w.end: var c = l.scrollHeight - l.scrollTop - i; a = 0 < c ? 10 + c : 0; break; case w.left: r = -p.arrowScroll; break; case w.right: r = p.arrowScroll; break; default: return !0 }S(l, r, a), e.preventDefault(), C() } function t(e) { s = e.target } var k, D, M = (k = 0, function (e) { return e.uniqueID || (e.uniqueID = k++) }), E = {}, T = {}, B = {}; function C() { clearTimeout(D), D = setInterval(function () { E = T = B = {} }, 1e3) } function H(e, t, o) { for (var n = o ? E : T, r = e.length; r--;)n[M(e[r])] = t; return t } function z(e) { var t = [], o = document.body, n = m.scrollHeight; do { var r = (!1 ? E : T)[M(e)]; if (r) return H(t, r); if (t.push(e), n === e.scrollHeight) { var a = O(m) && O(o) || X(m); if (d && L(m) || !d && a) return H(t, q()) } else if (L(e) && X(e)) return H(t, e) } while (e = e.parentElement) } function L(e) { return e.clientHeight + 10 < e.scrollHeight } function O(e) { return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y") } function X(e) { var t = getComputedStyle(e, "").getPropertyValue("overflow-y"); return "scroll" === t || "auto" === t } function Y(e, t, o) { window.addEventListener(e, t, o || !1) } function A(e, t, o) { window.removeEventListener(e, t, o || !1) } function N(e, t) { return e && (e.nodeName || "").toLowerCase() === t.toLowerCase() } if (window.localStorage && localStorage.SS_deltaBuffer) try { l = localStorage.SS_deltaBuffer.split(",") } catch (e) { } function K(e, t) { return Math.floor(e / t) == e / t } function P(e) { return K(l[0], e) && K(l[1], e) && K(l[2], e) } var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) { window.setTimeout(e, o || 1e3 / 60) }, R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, q = ($ = document.scrollingElement, function () { if (!$) { var e = document.createElement("div"); e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e); var t = document.body.scrollTop; document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e) } return $ }); function V(e) { var t; return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize } function F(e) { return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e)) } var I = window.navigator.userAgent, _ = /Edge/.test(I), W = /chrome/i.test(I) && !_, U = /safari/i.test(I) && !_, G = /mobile/i.test(I), J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I), Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)), Z = (W || U || J) && !G, ee = !1; try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function () { ee = !0 } })) } catch (e) { } var te = !!ee && { passive: !1 }, oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"; function ne(e) { for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t]) } oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function () { i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y) }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () { return ne }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne }();

const heroSection = document.querySelector(".hero");
const backgrounds = document.querySelectorAll(".hero-background img");

function buildSwiperSlider(sliderElm) {
    const sliderIdentifier = $(sliderElm).attr("data-slider-id");
    return new Swiper(`[data-slider-id="${sliderIdentifier}"]`, {
        slidesPerView: "auto",
        spaceBetween: 10,
        preventClicks: false,
        preventClicksPropagation: false,

        slideToClickedSlide: false,
    });
}

let heroMainSlider = new Swiper(".main-slider", {
    slidesPerView: "atuo",
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    loopedSlides: 8,

    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination-main",
        type: "bullets",
        clickable: true,
        enabled: false,
    },

    breakpoints: {
        991: {
            pagination: {
                enabled: true,
            },
        },
    },

    on: {
        slideChange: function () {
            if (window.screen.width > 991) {
                if (
                    document.querySelector(".swiper-slide-active") &&
                    document.querySelector(".swiper-slide-active").nodeType ===
                        Node.ELEMENT_NODE
                ) {
                    let backgroundNumber = document
                        .querySelector(".swiper-slide-visible")
                        .getAttribute("data-set");
                    backgrounds.forEach((el) => el.classList.remove("visible"));
                    document
                        .querySelector(`.background-${backgroundNumber}`)
                        .classList.add("visible");
                }
            }
        },
    },
});

let heroThumbSlider = new Swiper(".thumbs-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: true,
    loopedSlides: 8,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (current, total) {
            return (
                '<span class="' +
                current +
                '"></span>' +
                " из " +
                '<span class="' +
                total +
                '"></span>'
            );
        },
    },

    autoplay: {
        delay: 6000,
    },
    breakpoints: {
        991: {
            spaceBetween: 40,
        },
    },
});

let spareParts = new Swiper(".spare-parts__slider:not(.inner)", {
    slidesPerView: "auto",
    breakpoints: {
        991: {
            spaceBetween: 30,
        },
    },
});

let certificatesSlider = new Swiper(".certificates__slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
        nextEl: ".certificates__slider-next",
        prevEl: ".certificates__slider-prev",
    },
});

let additionalProductsSlider = new Swiper(".additional-products__slider", {
    slidesPerView: "auto",
    breakpoints: {
        991: {
            spaceBetween: 30,
        },
    },
});

let productThumbsSlider = new Swiper(".product-card__thumbs", {
    slidesPerView: "auto",
    spaceBetween: 5,
    navigation: {
        nextEl: ".product-card__button-next",
        prevEl: ".product-card__button-prev",
    },
    breakpoints: {
        991: {
            spaceBetween: 15,
        },
    },
});

let productCardCertificates = new Swiper(".product-card__certificates", {
    slidesPerView: "auto",
    spaceBetween: 15,
});

let activitySlider = new Swiper(".activity-areas__slider", {
    slidesPerView: "auto",
});

if (window.screen.width < 991) {
    let productSlider = new Swiper(".product__tails.swiper", {
        slidesPerView: "auto",
        loop: true,
    });

    let additionalsSlider = new Swiper(".additional__tiles", {
        slidesPerView: "auto",
        loop: true,
    });

    let socialSlider = new Swiper(".social__tiles", {
        slidesPerView: "auto",
        loop: true,
    });

    let allSliders = $("[data-slider-id]");
    $.each(allSliders, function (i, el) {
        buildSwiperSlider(el);
    });

    let tabsLinksSlider = new Swiper(".contacts-personal__tabs-links", {
        slidesPerView: "auto",
        spaceBetween: 30,
    });
}

heroThumbSlider.controller.control = heroMainSlider;
heroMainSlider.controller.control = heroThumbSlider;

// header

const haderSearchContainer = document.querySelector(".header");
const burgerButton = document.querySelector(".burger-button");

burgerButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("body").classList.toggle("burger");
});

const navHideLinks = $(".slide>a");

navHideLinks.on("click", (event) => {
    event.preventDefault();
    if (!$(event.target).parent().hasClass("opened")) {
        $(event.target).parent().addClass("opened");
        $(event.target).next().slideDown();
    } else {
        $(event.target).parent().removeClass("opened");
        $(event.target).next().slideUp();
    }
});

let phoneInputs = document.querySelectorAll('input[type="tel"]');
let phoneMask = new Inputmask("+7 (999) 999-99-99", {
    placeholder: "_",
    clearMaskOnLostFocus: true,
});
phoneMask.mask(phoneInputs);

//drag and drop
let filesPull = [];
let filesList = document.querySelectorAll(".files-list");
let dropArea = document.querySelectorAll(".drag-area");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.forEach((el) =>
        el.addEventListener(eventName, preventDefaults, false)
    );
});
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
    dropArea.forEach(function (el) {
        el.addEventListener(eventName, highlight, false);
    });
});
["dragleave", "drop"].forEach((eventName) => {
    dropArea.forEach(function (el) {
        el.addEventListener(eventName, unhighlight, false);
    });
});
function highlight(e) {
    this.classList.add("highlight");
}
function unhighlight(e) {
    this.classList.remove("highlight");
}

dropArea.forEach(function (el) {
    el.addEventListener("drop", handleDrop, false);
});

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (files) {
        this.classList.add("uploaded");
        [...files].forEach((el) => filesPull.push(el));
        console.log(filesPull);
        filesPull.forEach((el, index) => {
            let listItem = document.createElement("div");
            listItem.classList.add("file-list__item");
            listItem.innerText = el.name;
            this.querySelector(".files-list").appendChild(listItem);
            filesPull = [];
        });
    }
}

$(document).on("click", ".scroll-top-button", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

let popupWrapper = $(".popup-wrapper");
let popupInner = $(".popup-inner");
let closePopupBtn = $(".popup-close");

$(document).on("click", ".button-form", (e) => {
    if ($(e.target).is("[data-section]")) {
        let popupName = $(this).attr("data-section");
        let popupTitle = $('[data-type="product-1"]').find(".popup-title span");
        popupTitle.text(popupName);
    } else if ($(e.target).closest(".button-form").is("[data-section]")) {
        let popupName = $(e.target)
            .closest(".button-form")
            .attr("data-section");
        let popupTitle = $('[data-type="product-1"]').find(".popup-title span");
        popupTitle.text(popupName);
    }
    e.preventDefault();
    if ($(e.target).hasClass("button-form")) {
        let dataType = $(e.target).attr("data-name");
        popupWrapper.addClass("active");
        $(`[data-type="${dataType}"]`).addClass("active");
    } else if ($(e.target).closest(".button-form")) {
        let dataType = $(e.target).closest(".button-form").attr("data-name");
        popupWrapper.addClass("active");
        $(`[data-type="${dataType}"]`).addClass("active");
    }
});

closePopupBtn.on("click", (e) => {
    e.preventDefault;
    popupWrapper.removeClass("active");
    popupInner.removeClass("active");
});

$('[data-fancybox="gallery"]').fancybox({
    infobar: false,
    buttons: ["close"],
});

$(document).on("click", ".catalog__item-thumbs a", function (e) {
    e.preventDefault();
    let imgNumber = $(this).attr("data-number");
    let slide = $(this).closest(".catalog__item");
    let images = slide.find(".catalog__item-images img");
    images.removeClass("visible");
    slide.find(`[data-img="${imgNumber}"]`).addClass("visible");
});

$(document).on("click", "[data-number]", function (e) {
    e.preventDefault();
    let imgNumber = $(this).attr("data-number");
    let slide = $(this).closest(".product-card__media");
    let images = slide.find(".product-card__images img");
    images.removeClass("visible");
    slide.find(`[data-img="${imgNumber}"]`).addClass("visible");
});

$(document).on('click', '.show-password', function(e){
    if ($(this).find('.show-password-checkbox').is(':checked')){
        $('#password-input').attr('type', 'text');
    } else {
        $('#password-input').attr('type', 'password');
    }
}); 


function hideText(btn, textContainer, height, textHidden, textOpened) {
    $(document).on("click", btn, function (e) {
        let talbeWrapper = $(this).siblings(textContainer);
        let tableWrapperHeight = talbeWrapper.prop("scrollHeight");
        let tableWrapperShadow = talbeWrapper.find("span");
        let tableHeight = height;
        e.preventDefault();
    
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            talbeWrapper.css("height", tableHeight);
            tableWrapperShadow.removeClass("hidden");
            $(this).find("span").text(textHidden);
        } else {
            $(this).addClass("active");
            talbeWrapper.css("height", tableWrapperHeight);
            tableWrapperShadow.addClass("hidden");
            $(this).find("span").text(textOpened);
        }
    });  
}

hideText('.about-text__btn', '.about-text__wrapper', 1400, 'Показать eще', "Скрыть"  )
hideText('.specification-btn', '.product-card__table-wrapper', 280, 'Показать остальные характеристики', "Скрыть характеристики"  )
// $(document).on("click", ".specification-btn", function (e) {
//     let talbeWrapper = $(this).siblings(".product-card__table-wrapper");
//     let tableWrapperHeight = talbeWrapper.prop("scrollHeight");
//     let tableWrapperShadow = talbeWrapper.find("span");
//     let tableHeight = 280;
//     e.preventDefault();

//     if ($(this).hasClass("active")) {
//         $(this).removeClass("active");
//         talbeWrapper.css("height", tableHeight);
//         tableWrapperShadow.removeClass("hidden");
//         $(this).find("span").text("Показать остальные характеристики");
//     } else {
//         $(this).addClass("active");
//         talbeWrapper.css("height", tableWrapperHeight);
//         tableWrapperShadow.addClass("hidden");
//         $(this).find("span").text("Скрыть характеристики");
//     }
// });



let tabsItems = $("[data-tab]");
let tabsLinks = $("[data-tab-name]");
$(document).on("click", "[data-tab-name]", function (e) {
    e.preventDefault();
    let = tabsName = $(this).attr("data-tab-name");
    tabsLinks.removeClass("active");
    tabsItems.removeClass("active");
    $(this).addClass("active");
    $(`[data-tab="${tabsName}"]`).addClass("active");
});

$(document).ready(function () {
    if(window.screen.width > 1470) {
    
    $('.spare-parts .container-slider:not(.inner)').css({
        'margin-left': ($('main').width() - 1470) / 2,
        'width': $('main').width() - ($('main').width() - 1470) / 2 + 15,
        'max-width': 'none',
    })

    $('.additional-products .container-slider').css({
        'margin-left': ($('main').width() - 1470) / 2,
        'width': $('main').width() - ($('main').width() - 1470) / 2 + 15,
        'max-width': 'none',
    })

    $('.certificates__slider').css({
        'width': $('main').width() - ($('main').width() - 1470) / 2 + 15 - 875,
        'position': 'absolute',
        'left': 875
    })
    $('.certificates__wrapper').css({
        'min-height': 430, 
    })

}})

    
$(document).on('click', '.catalog-tables__item-top', function() {
    let t = $(this).closest('.catalog-tables__item')

    if(t.hasClass('opened')) {
        t.removeClass('opened')
        t.find('.catalog-tables__item-bottom').slideUp()
    } else {
        t.addClass('opened')
        t.find('.catalog-tables__item-bottom').slideDown()
    }
})
