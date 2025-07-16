SCRIPT = window.localStorage.getItem("script");
console.log(SCRIPT);
LINES = SCRIPT.split("\n");
VERSIONS = [];
VERSIONS.push(SCRIPT);

para = document.createElement('textarea');
para.id = "out";
    para.textContent = SCRIPT;
    console.log(SCRIPT);
    para.disabled = true;
    para.rows= LINES.length;
dump.appendChild(para);