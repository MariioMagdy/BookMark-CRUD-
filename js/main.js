
var bookMname = document.getElementById("siteName");
var bookUrl = document.getElementById("siteUrl");
var btn = document.getElementById("sub");
var erro = document.querySelector(".error");
var erroT = document.querySelector(".errorT");
var bookMarks;




if (localStorage.getItem("BookStorage") == null) {
    bookMarks = [];
}

else {
    bookMarks = JSON.parse(localStorage.getItem("BookStorage"));
    displayData();
}



btn.onclick = function () {
    addBookMark();
    displayData();
    reset();

}

function addBookMark() {

    if (bookMname.value != "" && bookUrl.value != "") {
        var bookMark = {
            bookMarkName: bookMname.value,
            url: bookUrl.value,
        }

        bookMarks.push(bookMark);
        localStorage.setItem("BookStorage", JSON.stringify(bookMarks))
    }
    else {
        alert("Please fill the empty fields");

    }


}


function displayData() {
    var data = "";

    for (var i = 0; i < bookMarks.length; i++) {

        data += "<div class='text-center py-3 text-white'><span class='mr-5 font-weight-bold h1 text-capitalize'>" + bookMarks[i].bookMarkName + "  " + "</span><span>" + ' <a class="btn btn-primary mr-4" target="_blank" href="' + bookMarks[i].url + '">Visit</a> ' + "</span><span>" + '<a class="btn btn-danger mr-4" href="#" onclick="handleDelete(' + i + ');">Delete</a> ' + "</span><span class='hel'>" + '<a class="btn btn-info mr-4 hel" href="#" onclick="Update(' + i + ')">Update</a> ' + "</span></div>"

    }

    document.getElementById("bookmarkCon").innerHTML = data;
}

function search(letter) {

    var data = "";
    for (var i = 0; i < bookMarks.length; i++) {
        if (bookMarks[i].bookMarkName.toUpperCase().includes(letter.toUpperCase())) {
            data += "<div class='text-center py-3 text-white'><span class='mr-5 font-weight-bold h1 text-capitalize'>" + bookMarks[i].bookMarkName + "  " + "</span><span>" + ' <a class="btn btn-primary mr-4" target="_blank" href="' + bookMarks[i].url + '">Visit</a> ' + "</span><span>" + '<a class="btn btn-danger mr-4" href="#" onclick="handleDelete(' + i + ')">Delete</a> ' + "</span><span>" + '<a class="btn btn-info mr-4" href="#" onclick="Update(' + i + ')">Update</a> ' + "</span></div>"
        }
    }

    document.getElementById("bookmarkCon").innerHTML = data;
}


function Update(index) {


    bookMname.value = bookMarks[index].bookMarkName;
    bookUrl.value = bookMarks[index].url;
    document.getElementById("up").innerHTML = "<div class='text-center text-capitalize'><button onclick='addUpdate(" + index + ") 'class='btn btn-secondary text-white font-weight-bold mb-3'>Update</button></div>";
    add();



}

function addUpdate(index) {
    bookMarks[index].bookMarkName = bookMname.value;
    bookMarks[index].url = bookUrl.value;
    localStorage.setItem("BookStorage", JSON.stringify(bookMarks))
    displayData()

}


function reset() {
    document.getElementById("myForm").reset();

}

function handleDelete(index) {

    if (confirm('Are you sure you want to delete this record?')) {
        bookMarks.splice(index, 1);
        localStorage.setItem("BookStorage", JSON.stringify(bookMarks));
        displayData();
    }


}


bookMname.addEventListener("keyup", function () {
    validName()
})

function validName() {
    var regexName = /^[a-zA-Z]+$/
    if (regexName.test(bookMname.value) == false) {
        bookMname.classList.add("is-invalid")
        bookMname.classList.remove("is-valid")
        erro.style.display = "block"

    }
    else {

        bookMname.classList.add("is-valid")
        bookMname.classList.remove("is-invalid")
        erro.style.display = "none"
    }
}


bookUrl.addEventListener("keyup", function () {

    bookValid()
})

function bookValid() {
    // var regexUrl = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com|.net|.org)$/ email
    var regexUrl = /^(https?:\/\/)(www.)[a-zA-Z0-9]+(.com|.net|.org)(\/)+[a-zA-Z0-9]*/
    if (regexUrl.test(bookUrl.value) == false) {
        bookUrl.classList.add("is-invalid")
        bookUrl.classList.remove("is-valid")
        btn.disabled = "true"
        erroT.style.display = "block"
    }
    else {

        bookUrl.classList.add("is-valid")
        bookUrl.classList.remove("is-invalid")
        btn.removeAttribute("disabled")
        erroT.style.display = "none"
    }
}