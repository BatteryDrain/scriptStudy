SCRIPT = null;

console.log("index");

submitB.addEventListener('click', () =>{
    console.log("sibmitted");
    window.location.href = "study.html";
});

script.addEventListener('input', () => {
    script.style.height = 'auto';
    script.style.height = script.scrollHeight + 'px';
    SCRIPT = script.value;
    // console.log(SCRIPT);
    window.localStorage.setItem("script",SCRIPT);
});