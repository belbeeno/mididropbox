var form = document.getElementById("form");
form.addEventListener("submit", submitForm);
function canSubmit() {
    var txtName = document.getElementById("textName");
    var frmFile = document.getElementById("formFile");
    return txtName && frmFile.files.length >= 1;
}
function submitForm(e) {
    e.preventDefault();
    var txtName = document.getElementById("textName");
    var frmFile = document.getElementById("formFile");
    //const formData = new FormData();
    //formData.append("name", txtName.value);
    //formData.append("file", frmFile.files[0]);
    console.log("submitting name " + txtName.value + " file " + frmFile.files[0].name);
}
