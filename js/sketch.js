
const grid = document.querySelector("#grid .content .sketch");

function changeGridLayout(num) {
    for(let i=0;i<num;i++) {
            const child = grid.appendChild(document.createElement("div"));
            for(let i=0;i<num;i++) {
                child.appendChild(document.createElement("div"));
            }
        }
}

let numberOfBlocks = 6;

changeGridLayout(numberOfBlocks);