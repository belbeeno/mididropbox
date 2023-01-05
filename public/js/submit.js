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
    var lblStatus = document.getElementById("lblStatus");
    if (canSubmit()) {
        btnSubmit.removeAttribute('disabled');
        lblStatus.innerText = "Ready";
    }
    else {
        btnSubmit.setAttribute('disabled', '');
        lblStatus.innerText = "Pending files...";
    }
}
function displayHelp() {
    alert("Made by belbeeno!  2023\n");
}
function submitForm(e) {
    e.preventDefault();
    var txtName = document.getElementById("textName");
    var frmFile = document.getElementById("formFile");
    var btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.setAttribute('disabled', '');
    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');
    var formData = new FormData();
    formData.append("name", txtName.value);
    formData.append("file", frmFile.files[0]);
    var req = new XMLHttpRequest();
    req.upload.addEventListener('progress', function (e) {
        var filesize = frmFile.files[0].size;
        console.log("uploading: ", e.loaded, " / ", filesize);
        var lblStatus = document.getElementById("lblStatus");
        console.log("got Button");
        if (e.loaded < filesize) {
            lblStatus.innerText = 'Sending...';
        }
        else {
            lblStatus.innerText = 'File sent!';
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
