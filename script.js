const textarea = document.getElementById('script');
const dump = document.getElementById('dump');

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    console.log("got it!");
})

function dump(){
    
}