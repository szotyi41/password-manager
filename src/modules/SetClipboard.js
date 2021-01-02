export default function setClipboard(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.body.removeChild(input);
}