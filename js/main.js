
const paragraphMain = document.querySelector("#main .content .textContainer .subtext");
const paragraphMainText = "Hello there!\nI'm José, a passionate full-stack developer and Computer Science undergraduate from Brazil";

speed = 20;
i = 0;

function typeWriterEffect() {
  if(i < paragraphMainText.length) {
      paragraphMain.innerHTML += paragraphMainText.charAt(i);
      i++;
      setTimeout(typeWriterEffect,speed)
    }
  }

typeWriterEffect();