SCRIPT = window.localStorage.getItem("script");
console.log(SCRIPT);
LINES = SCRIPT.split("\n");
VERSION = [];
VERSIONS = [[]];
VERSIONS[0].push(SCRIPT);
VERSIONNUM = 0;
CWords = [
    "and",
    "or",
]
PRIORITIES = [];


list();



para = document.createElement('textarea');
    para.id = "out";
    para.textContent = SCRIPT;
    para.disabled = true;
    para.rows= LINES.length;
dump.appendChild(para);

  
function list(){
    VERSION.push("");
    temp = SCRIPT.split(" ");
    for(i = 0; i < temp.length; i++){
        PRIORITIES.push("");
        VERSION.push(temp[i]);
        if(temp[i] != CWords[0] && temp[i] != CWords[1] && temp[i] != ""){
            num = randomInt(1, temp.length);
            while(PRIORITIES.includes(num)){
                num = randomInt(1, temp.length );
            }
            PRIORITIES[i] = num;
        }
        else{
            PRIORITIES[i] = "";           
        }
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    VERSION[0] = SCRIPT;
    VERSIONS.push(VERSION);
    updown.max = VERSIONS[1].length - 1;
}

// up.addEventListener('click', () => {
//     if(VERSIONNUM < VERSIONS[1].length - 1){
//         VERSIONNUM++;
//     }
//     setVersionNumber(VERSIONNUM);
// });

// down.addEventListener('click', () => {
//     if(VERSIONNUM > 0){
//         VERSIONNUM--;
//     }
//     setVersionNumber(VERSIONNUM);
// });

updown.addEventListener('change', () => {
    VERSIONNUM = updown.value;
    setVersionNumber(VERSIONNUM);
});

function setVersionNumber(number){
    if(number == 0){
        ver.innerHTML = "original";
    }
    else{
        ver.innerHTML = "version " + VERSIONNUM;
    }
    setOut();
}

function setOut(){
    for(i = 0; i < SCRIPT.length; i++){
    
    }
}