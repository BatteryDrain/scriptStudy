SCRIPT = window.localStorage.getItem("script");

script.textContent = SCRIPT;
script.rows = SCRIPT.split("\n");
properSize();


console.log("index");

script.addEventListener('input', () => {
    properSize();
    SCRIPT = script.value;
    // console.log(SCRIPT);
    window.localStorage.setItem("script",SCRIPT);
});

function properSize(){
    script.style.height = 'auto';
    script.style.height = script.scrollHeight + 'px';
}