const form = document.getElementById("form");
form.addEventListener("submit", submitForm);

function canSubmit() : boolean {
    const txtName = document.getElementById("textName");
    const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
    return txtName && frmFile.files.length >= 1;
}

function submitForm(e : Event) {
    e.preventDefault();
    const txtName : HTMLInputElement = document.getElementById("textName") as HTMLInputElement;
    const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
    //const formData = new FormData();
    //formData.append("name", txtName.value);
    //formData.append("file", frmFile.files[0]);

    console.log("submitting name " + txtName.value + " file " + frmFile.files[0].name);
}