//Global var
let height = 16;
let width = 16;
let currentTool = 0; //0-toggle 1-start 2-end
let mat = [[1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
[1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
[1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]];

function readBoardSize() {
    height = document.getElementById("Height").value;
    width = document.getElementById("Width").value;
    resetBoard();
    buildBoard();
}

function resetBoard() {
    for (let h = 0; h < height; h++) {
        mat[h] = [];
        for (let w = 0; w < width; w++) {
            mat[h][w] = (h == 0 || w == 0 || h == height - 1 || w == width - 1) ? 1 : 0;
        }
    }
}

function buildBoard() {
    // Build board
    let board = "";
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            board += "<div id=\"" + h + "_" + w + "\" class=\"pixel" + (mat[h][w] == 1 ? " wall" : mat[h][w] == 2 ? " point" : "") + "\" style=\"height: " + (100 / height) + "%;width: " + (100 / width) + "%;\" onclick=\"pixel(" + h + ", " + w + ")\"></div>"; // insert "pixel"
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
        if (counter(2) < 2) {
            mat[h][w] = 2;
            pixelElement.classList.remove("wall");
            pixelElement.classList.remove("end");
            pixelElement.classList.add("start");
        }
        else {
            alert("There's already 2 endpoints");
        }
        currentTool = 0;
    }
}

function counter(value) {
    let c = 0;
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (mat[h][w] == value) {
                c++;
            }
        }
    }
    return c;
}

function changeTool(tool) {
    currentTool = tool;
}

function solve() {
    alert("not implemented yet");
}

//main---------------------------------------------------------------------------
buildBoard();










