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
    console.log('submitting name: \"' + txtName.value + '\" file: [' + frmFile.files[0].name + ']');

    const formData = new FormData();
    formData.append("name", txtName.value);
    formData.append("file", frmFile.files[0]);

    var req = new XMLHttpRequest();
    req.upload.addEventListener('progress', (e) => {
        const filesize = frmFile.files[0].size;
        console.log("uploading: ", e.loaded, " / ", filesize);

        const btnSubmit = document.getElementById("btnSubmit");
        console.log("got Button");
        const showOnSending = document.getElementById('show-on-sending');
        console.log("got show on sending");
        console.log(showOnSending);
        const hideOnSending = document.getElementById('hide-on-sending');
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