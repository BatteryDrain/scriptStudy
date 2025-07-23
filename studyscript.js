SCRIPT = window.localStorage.getItem("script");
console.log(SCRIPT);
LINES = SCRIPT.split("\n");
VERSIONS = [[]];
VERSIONS.push(SCRIPT);
list();


para = document.createElement('textarea');
para.id = "out";
    para.textContent = SCRIPT;
    para.disabled = true;
    para.rows= LINES.length;
dump.appendChild(para);


function list(){
    for(i = 0; i < SCRIPT.length; i++){
        
    }
}