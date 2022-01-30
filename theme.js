function loadScript(url) {
    let script = document.createElement("script");
    script.setAttribute("type", "module");
    script.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(script);
}

function changeFamily() {
    family = document.querySelector("style#editorFontSize");
    start = family.innerHTML.indexOf("font-family");
    length = family.innerHTML.length;
    document.documentElement.style.setProperty(
        "--font-family",
        family.innerHTML.substring(start + 13, length - 13)
    );
    body = document.querySelector("body");
    body.style.fontFamily = family.innerHTML.substring(start + 13, length - 13);

}

(function () {
    // changeFamily()
    setInterval(changeFamily, 1000);
})();
