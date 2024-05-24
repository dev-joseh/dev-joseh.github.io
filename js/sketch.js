
const grid = document.querySelector("#grid .content .sketch");
const displayNumberOfBlocks = document.querySelectorAll("#grid .content .input span");
const eraserActive = false;

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

function removeGrid() {
    for (const row of grid.children) {
        for (const block of row.children) {
            block.style.borderWidth = "0px";
        }
      }
}

function addGrid() {
    for (const row of grid.children) {
        for (const block of row.children) {
            block.style.borderWidth = "1px";
        }
      }
}

function saveSketch() {
    if(confirm("Would you like to save your sketch?"))
        {
            removeGrid();
            html2canvas(grid).then(canvas => {
                // Convert the canvas to a data URL
                const dataURL = canvas.toDataURL('image/png');
                
                // Create a link element to download the image
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'sketch.png';
                
                // Simulate a click on the link to trigger the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            addGrid();
        }
}

function erase() {
    location.replace(location.href);
  }