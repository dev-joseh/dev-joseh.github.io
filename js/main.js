
const allContent = document.querySelectorAll('content');
const rate = 0.2; // lower = faster fade

allContent.forEach( (content) => {
document.addEventListener('scroll', () => {
    body.style.opacity = 100/window.scrollY*rate;
})
});