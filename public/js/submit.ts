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
    const lblStatus = document.getElementById("lblStatus");
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

function submitForm(e : Event) {
    e.preventDefault();
    const txtName : HTMLInputElement = document.getElementById("textName") as HTMLInputElement;
    const frmFile : HTMLInputElement = document.getElementById("formFile") as HTMLInputElement;
    const btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.setAttribute('disabled', '');
    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');

    const formData = new FormData();
    formData.append("name", txtName.value);
    formData.append("file", frmFile.files[0]);

    var req = new XMLHttpRequest();
    req.upload.addEventListener('progress', (e) => {
        const filesize = frmFile.files[0].size;
        console.log("uploading: ", e.loaded, " / ", filesize);

        const lblStatus = document.getElementById("lblStatus");
        console.log("got Button");

        if (e.loaded < filesize) {
            lblStatus.innerText = 'Sending...';
        }
        else {
            lblStatus.innerText = 'File sent!'
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
