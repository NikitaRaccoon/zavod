// $(document).ready(function () {
//     $("img").lazyload({
//         threshold: 100,
//     });
// });

$(document).on('click', '.clear-btn', function() {
    $(this).siblings('input').val('')
})

$("select").select2({
    minimumResultsForSearch: -1,
    width: "100%",
});

let phoneInputs = document.querySelectorAll('input[type="tel"]');
let phoneMask = new Inputmask("+7 (999) 999-99-99", {
    placeholder: "_",
    clearMaskOnLostFocus: true,
});
phoneMask.mask(phoneInputs);

$(document).on('click', '.burger-btn', function(e) {
    e.preventDefault();
    $('body').toggleClass('burger')
})

// drag and drop
if(document.querySelectorAll('.drag-area').length) {
    let filesPull = [];
let dataTransferPool = new DataTransfer();
let filesList = document.querySelectorAll(".files-list");
let dropArea = document.querySelectorAll(".drag-area");
let filesInput = document.querySelectorAll(".drag-area input[type='file']");

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
}


let inputFile = document.querySelector('.form__group-col.photo input')
let img = document.querySelector('.form__group-col.photo img')

inputFile.addEventListener('change', function(e) {
    img.src = URL.createObjectURL(inputFile.files[0])
})