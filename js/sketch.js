
const grid = document.querySelector("#grid .content .sketch");
const displayNumberOfBlocks = document.querySelectorAll("#grid .content .input span");

function changeGridLayout(num) {
    grid.innerHTML="";

    displayNumberOfBlocks[0].innerText = num.toString();
    displayNumberOfBlocks[1].innerText = num.toString();
    for(let i=0;i<num;i++) {
            const row = grid.appendChild(document.createElement("div"));
            for(let i=0;i<num;i++) {
                const block = row.appendChild(document.createElement("div"));
                block.addEventListener("mouseenter", (e) => {
                    if(e.buttons==1)
                        drawBlock(block);
                });
                block.addEventListener("click", () => {drawBlock(block)});
            }
        }
}

const inputColor = document.querySelector("#html5colorpicker");

function drawBlock(block) {
    block.style.backgroundColor = inputColor.value;
}