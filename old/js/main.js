$(document).ready(function () {
    $("img").lazyload({
        threshold: 100,
    });
});

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

let spareParts = new Swiper(".spare-parts__slider", {
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

const navHideLinks = $(".slide > a");

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
let dataTransferPool = new DataTransfer();
let filesList = document.querySelectorAll(".files-list");
let dropArea = document.querySelectorAll(".drag-area");
let filesInput = document.querySelectorAll("input[type='file']");

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

filesInput.forEach(function (el) {
    el.addEventListener("change", inputChange, false);
});

function inputChange(e) {
    let files = this.files;
    Array.prototype.forEach.call(files, function (el, index) {
        dataTransferPool.items.add(el);
    });
    this.files = dataTransferPool.files;
    console.log(this.files);
    if (files) {
        this.closest(".drag-area").classList.add("uploaded");
        [...files].forEach((el) => filesPull.push(el));
        filesPull.forEach((el, index) => {
            let listItem = document.createElement("div");
            listItem.classList.add("file-list__item");
            listItem.innerText = el.name;
            this.closest(".drag-area")
                .querySelector(".files-list")
                .appendChild(listItem);
            filesPull = [];
        });
    }
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    Array.prototype.forEach.call(files, function (el, index) {
        dataTransferPool.items.add(el);
    });
    this.querySelector("input[type=file]").files = dataTransferPool.files;
    console.log(this.querySelector("input[type=file]").files);
    if (files) {
        this.classList.add("uploaded");
        [...files].forEach((el) => filesPull.push(el));
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
        let popupName = $(e.target).attr("data-section");
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

hideText(
    ".about-text__btn",
    ".about-text__wrapper",
    1400,
    "Показать eще",
    "Скрыть"
);
hideText(
    ".specification-btn",
    ".product-card__table-wrapper",
    280,
    "Показать остальные характеристики",
    "Скрыть характеристики"
);

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
    if (window.screen.width > 1470) {
        $(".spare-parts .container-slider").css({
            "margin-left": ($("main").width() - 1470) / 2,
            width: $("main").width() - ($("main").width() - 1470) / 2 + 15,
            "max-width": "none",
        });

        $(".additional-products .container-slider").css({
            "margin-left": ($("main").width() - 1470) / 2,
            width: $("main").width() - ($("main").width() - 1470) / 2 + 15,
            "max-width": "none",
        });

        $(".certificates__slider").css({
            width:
                $("main").width() - ($("main").width() - 1470) / 2 + 15 - 875,
            position: "absolute",
            left: 875,
        });
        $(".certificates__wrapper").css({
            "min-height": 430,
        });
    }
});

$(window).on("scroll", () => {
    if ($(window).scrollTop() > 500) {
        $(".scroll-top-button").addClass("visible");
    } else {
        $(".scroll-top-button").removeClass("visible");
    }
});

$(document).on('click', '.show-password', function(e){
	if ($(this).find('.show-password-checkbox').is(':checked')){
		$('#password-input').attr('type', 'text');
	} else {
		$('#password-input').attr('type', 'password');
	}
}); 