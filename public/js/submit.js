var form = document.getElementById("form");
form.addEventListener("submit", submitForm);
var txtName = document.getElementById("textName");
var frmFile = document.getElementById("formFile");
txtName.addEventListener('change', refreshCanSubmit);
frmFile.addEventListener('change', refreshCanSubmit);
refreshCanSubmit();
function canSubmit() {
    var txtName = document.getElementById("textName");
    var frmFile = document.getElementById("formFile");
    return txtName && txtName.value && frmFile.files.length >= 1;
}
function refreshCanSubmit() {
    var btnSubmit = document.getElementById("btnSubmit");
    if (canSubmit()) {
        btnSubmit.removeAttribute('disabled');
    }
    else {
        btnSubmit.setAttribute('disabled', '');
    }
}
function submitForm(e) {
    e.preventDefault();
    var txtName = document.getElementById("textName");
    var frmFile = document.getElementById("formFile");
    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');
    var formData = new FormData();
    formData.append("name", txtName.value);
    formData.append("file", frmFile.files[0]);
    var req = new XMLHttpRequest();
    req.upload.addEventListener('progress', function (e) {
        var filesize = frmFile.files[0].size;
        console.log("uploading: ", e.loaded, " / ", filesize);
        var btnSubmit = document.getElementById("btnSubmit");
        console.log("got Button");
        var showOnSending = document.getElementById('show-on-sending');
        console.log("got show on sending");
        console.log(showOnSending);
        var hideOnSending = document.getElementById('hide-on-sending');
        console.log("got hide on sending");
        console.log(hideOnSending);
        if (e.loaded < filesize) {
            btnSubmit.setAttribute('disabled', '');
            showOnSending.classList.remove('visually-hidden');
            hideOnSending.classList.add('visually-hidden');
        }
        else {
            btnSubmit.removeAttribute('disabled');
            showOnSending.classList.add('visually-hidden');
            hideOnSending.classList.remove('visually-hidden');
        }
    });
    req.open('POST', '/upload_file');
    req.timeout = 45000;
    req.send(formData);
    /*
    fetch("/upload_file", {
        method: "POST",
        body: formData
    })
    .then((res) => console.log(res))
    .catch((err) => console.log("Error occurred", err));
    */
}
