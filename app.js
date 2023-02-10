//Global var
let height = 0;
let width = 0;
let mat = [];
let currentTool = 0; //0-toggle 1-start 2-end

function readBoardSize() {
    height = document.getElementById("Height").value;
    width = document.getElementById("Width").value;
    buildBoard();
}

function buildBoard() {
    // Build board
    let board = "";
    for (let h = 0; h < height; h++) {
        mat[h] = [];
        for (let w = 0; w < width; w++) {
            mat[h][w] = (h == 0 || w == 0 || h == height - 1 || w == width - 1) ? 1 : 0;
            board += "<div id=\"" + h + "_" + w + "\" class=\"pixel " + (mat[h][w] == 1 ? "wall" : "") + "\" style=\"height: " + (100 / height) + "%;width: " + (100 / width) + "%;\" onclick=\"pixel(" + h + ", " + w + ")\"></div>"; // insert "pixel"
        }
    }
    // Inject board
    document.getElementById("board").innerHTML = board;
}

function pixel(h, w) {
    let pixelElement = document.getElementById(h + "_" + w);
    if (currentTool == 0) {
        if (mat[h][w] == 0) {
            mat[h][w] = 1;
            pixelElement.classList.remove("end");
            pixelElement.classList.remove("start");
            pixelElement.classList.add("wall");
        }
        else {
            mat[h][w] = 0;
            pixelElement.classList.remove("wall");
            pixelElement.classList.remove("start");
            pixelElement.classList.remove("end");
        }
    }
    else if (currentTool == 1) {
        mat[h][w] = 2;
        pixelElement.classList.remove("wall");
        pixelElement.classList.remove("end");
        pixelElement.classList.add("start");
        currentTool = 0;
    }
    else if (currentTool == 2) {
        mat[h][w] = 3;
        pixelElement.classList.remove("wall");
        pixelElement.classList.remove("start");
        pixelElement.classList.add("end");
        currentTool = 0;
    }
}

function changeTool(tool) {
    currentTool = tool;
}

function solve() {
    alert("not implemented yet");
}

//main---------------------------------------------------------------------------
readBoardSize();










