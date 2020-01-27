
export const configureButton = (id, onClick)  => {
    document.getElementById(id).addEventListener("click", onClick)
}

export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}