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
    //const formData = new FormData();
    //formData.append("name", txtName.value);
    //formData.append("file", frmFile.files[0]);
    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');
}
