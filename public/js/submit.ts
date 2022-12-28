const form = document.getElementById("form");
form.addEventListener("submit", submitForm);
const txtName : HTMLInputElement = document.getElementById("textName") as HTMLInputElement;
const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
txtName.addEventListener('change', refreshCanSubmit);
frmFile.addEventListener('change', refreshCanSubmit);
refreshCanSubmit();

function canSubmit() : boolean {
    const txtName : HTMLInputElement = document.getElementById("textName") as HTMLInputElement;
    const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
    return txtName && txtName.value && frmFile.files.length >= 1;
}

function refreshCanSubmit() {
    const btnSubmit = document.getElementById("btnSubmit");
    if (canSubmit()) {
        btnSubmit.removeAttribute('disabled');
    }
    else {
        btnSubmit.setAttribute('disabled', '');
    }
}

function submitForm(e : Event) {
    e.preventDefault();
    const txtName : HTMLInputElement = document.getElementById("textName") as HTMLInputElement;
    const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
    //const formData = new FormData();
    //formData.append("name", txtName.value);
    //formData.append("file", frmFile.files[0]);

    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');
}