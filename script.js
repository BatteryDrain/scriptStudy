script.textContent = SCRIPT;
script.rows = SCRIPT.split("\n");
properSize();


console.log("index");

script.addEventListener('input', () => {
    properSize();
    SCRIPT = script.value;
    // console.log(SCRIPT);
});

function properSize(){
    script.style.height = 'auto';
    script.style.height = script.scrollHeight + 'px';
}


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

submitb.addEventListener('click', () => {
    hideP();
    if(VERSIONS.length == 1){
        list();
    }
});

backb.addEventListener('click', () => {
    hideP();
});


para = document.createElement('textarea');
    para.id = "out";
    para.textContent = SCRIPT;
    para.disabled = true;
    para.rows = LINES.length;
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
                num = randomInt(1, temp.length);
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
    makeV();
    updown.max = VERSIONS.length - 1;
}

up.addEventListener('click', () => {
    if(VERSIONNUM < VERSIONS.length - 1){
        VERSIONNUM++;
    }
    setVersionNumber(VERSIONNUM);
});

down.addEventListener('click', () => {
    if(VERSIONNUM > 0){
        VERSIONNUM--;
    }
    setVersionNumber(VERSIONNUM);
});

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
    updown.value = VERSIONNUM
}

function setOut(){
    para.textContent = VERSIONS[VERSIONNUM][0];
}

function makeV() {
    const baseWords = SCRIPT.split(/(\s+)/); // Keeps spaces & line breaks
    const blankableIndexes = [];

    for (let i = 0; i < baseWords.length; i++) {
        const word = baseWords[i];
        // Only blank actual words, not spaces/newlines
        if (!CWords.includes(word.toLowerCase()) && !word.match(/^\s+$/)) {
            blankableIndexes.push(i);
        }
    }

    shuffleArray(blankableIndexes);

    // Version 0: original
    const version0 = [SCRIPT, ...baseWords];
    VERSIONS = [version0];

    const blankedIndexes = new Set();

    for (let i = 0; i < blankableIndexes.length; i++) {
        const versionWords = [...baseWords];
        blankedIndexes.add(blankableIndexes[i]);

        for (const idx of blankedIndexes) {
            versionWords[idx] = "■".repeat(baseWords[idx].length);
        }

        const versionText = versionWords.join("");
        const version = [versionText, ...versionWords];
        VERSIONS.push(version);
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function hideP(){
    submitb.classList.toggle("hide");
    backb.classList.toggle("hide");
    input.classList.toggle("hide");
    script.classList.toggle("hide");
    ptitle.classList.toggle("hide");
    stitle.classList.toggle("hide");
    dump.classList.toggle("hide");
    count.classList.toggle("hide");
    updown.classList.toggle("hide");
    up.classList.toggle("hide");
    down.classList.toggle("hide");
    ver.classList.toggle("hide");
}