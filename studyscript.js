SCRIPT = window.localStorage.getItem("script");

// form to handle text-to-speech requests
const form = document.getElementById('tts-form');
const audioPlayer = document.getElementById('audio-player');

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

// Handle form submission
// This will send the text to the server for text-to-speech conversion
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = document.getElementById('dump').textContent.trim();

    const response = await fetch('/listen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
    alert('Error with TTS');
    return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const player = document.getElementById('audio-player');
    player.src = audioUrl;
    player.play();

    

});