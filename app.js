//Global var
let height = 16;
let width = 16;
let points = [[0, 8], [15, 8]];
let currentTool = 0; //0-toggle 1-start 2-end
let labSolved = false;
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
    mat = [];
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
            board += "<div id=\"" + h + "_" + w + "\" class=\"pixel" + (mat[h][w] == 1 ? " wall" : mat[h][w] == 2 ? " point" : mat[h][w] == 3 ? " solved" : "") + "\" style=\"height: " + (100 / height) + "%;width: " + (100 / width) + "%;\" onclick=\"pixel(" + h + ", " + w + ")\"></div>"; // insert "pixel"
        }
    }
    // Inject board
    document.getElementById("board").innerHTML = board;
}

function cleanMat() {
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (mat[h][w] != 1 && mat[h][w] != 2) {
                mat[h][w] = 0;
            }
        }
    }
}

function pixel(h, w) {
    let pixelElement = document.getElementById(h + "_" + w);
    if (currentTool == 0) {
        if (mat[h][w] == 0) {
            mat[h][w] = 1;
            pixelElement.classList.remove("solved");
            pixelElement.classList.remove("point");
            pixelElement.classList.add("wall");
        }
        else {
            mat[h][w] = 0;
            pixelElement.classList.remove("solved");
            pixelElement.classList.remove("wall");
            pixelElement.classList.remove("point");
        }
    }
    else if (currentTool == 1) {
        if (findPoints() < 2) {
            mat[h][w] = 2;
            pixelElement.classList.remove("solved");
            pixelElement.classList.remove("wall");
            pixelElement.classList.add("point");
        }
        else {
            alert("There's already 2 endpoints");
        }
        if (findPoints() == 2) {
            changeTool(0);
        }
    }
    labSolved = false;
}

function findPoints(value) {
    let c = 0;
    let twos = 0;
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (mat[h][w] == 2) {
                points[c][0] = h;
                points[c][1] = w;
                c++;
            }
        }
    }
    return c;
}

function changeTool(tool) {
    currentTool = tool;
    let currentButton = document.getElementById("tool" + tool);
    document.getElementById("tool0").classList.replace("btn-dark", "btn-outline-dark");
    document.getElementById("tool1").classList.replace("btn-success", "btn-outline-success");

    switch (tool) {
        case 0:
            currentButton.classList.replace("btn-outline-dark", "btn-dark");
            break;
        case 1:
            currentButton.classList.replace("btn-outline-success", "btn-success");
            break;
        default:
            break;
    }

}

function solve(coords, distance) {
    mat[coords[0]][coords[1]] = distance;
    if ((coords[1] != 0 && coords[1] != width - 1 && coords[0] != 0 && coords[0] != height - 1)) {

        if (mat[coords[0]][coords[1] - 1] == 0 || mat[coords[0]][coords[1] - 1] == 2 || mat[coords[0]][coords[1] - 1] > (mat[coords[0]][coords[1]] + 1)) {
            solve([coords[0], coords[1] - 1], distance + 1);
        }
        if (mat[coords[0]][coords[1] + 1] == 0 || mat[coords[0]][coords[1] + 1] == 2 || mat[coords[0]][coords[1] + 1] > (mat[coords[0]][coords[1]] + 1)) {
            solve([coords[0], coords[1] + 1], distance + 1);
        }
        if (mat[coords[0] - 1][coords[1]] == 0 || mat[coords[0] - 1][coords[1]] == 2 || mat[coords[0] - 1][coords[1]] > (mat[coords[0]][coords[1]] + 1)) {
            solve([coords[0] - 1, coords[1]], distance + 1);
        }
        if (mat[coords[0] + 1][coords[1]] == 0 || mat[coords[0] + 1][coords[1]] == 2 || mat[coords[0] + 1][coords[1]] > (mat[coords[0]][coords[1]] + 1)) {
            solve([coords[0] + 1, coords[1]], distance + 1);
        }
    }
    else if (distance == 10) {
        if (coords[1] != 0) {
            if (mat[coords[0]][coords[1] - 1] == 0 || mat[coords[0]][coords[1] - 1] > (mat[coords[0]][coords[1]] + 1)) {
                solve([coords[0], coords[1] - 1], distance + 1);
            }
        }
        if (coords[1] != width - 1) {
            if (mat[coords[0]][coords[1] + 1] == 0 || mat[coords[0]][coords[1] + 1] > (mat[coords[0]][coords[1]] + 1)) {
                solve([coords[0], coords[1] + 1], distance + 1);
            }
        }
        if (coords[0] != 0) {
            if (mat[coords[0] - 1][coords[1]] == 0 || mat[coords[0] - 1][coords[1]] > (mat[coords[0]][coords[1]] + 1)) {
                solve([coords[0] - 1, coords[1]], distance + 1);
            }
        }
        if (coords[0] != height - 1) {
            if (mat[coords[0] + 1][coords[1]] == 0 || mat[coords[0] + 1][coords[1]] > (mat[coords[0]][coords[1]] + 1)) {
                solve([coords[0] + 1, coords[1]], distance + 1);
            }
        }
    }
}

function trace(coords) {
    let value = mat[coords[0]][coords[1]];
    mat[coords[0]][coords[1]] = 3;
    if (value == 10) {
        return;
    }

    if (coords[1] != 0) {
        if (mat[coords[0]][coords[1] - 1] == value - 1) {
            trace([coords[0], coords[1] - 1]);
            return;
        }
    }
    if (coords[1] != width - 1) {
        if (mat[coords[0]][coords[1] + 1] == value - 1) {
            trace([coords[0], coords[1] + 1]);
            return;
        }
    }
    if (coords[0] != 0) {
        if (mat[coords[0] - 1][coords[1]] == value - 1) {
            trace([coords[0] - 1, coords[1]]);
            return;
        }
    }
    if (coords[0] != height - 1) {
        if (mat[coords[0] + 1][coords[1]] == value - 1) {
            trace([coords[0] + 1, coords[1]]);
            return;
        }
    }
}

function startSolve() {
    let twos = findPoints();
    if (twos == 2 && !labSolved) {
        solve([points[0][0], points[0][1]], 10);
        trace([points[1][0], points[1][1]]);
        mat[points[0][0]][points[0][1]] = 2;
        mat[points[1][0]][points[1][1]] = 2;
        buildBoard();
        cleanMat();
        labSolved = true;
    } else if (labSolved && twos == 2) {
        alert("Labyrinth's already solved");
    } else {
        alert("You need 2 points to solve");
    }
}

//main---------------------------------------------------------------------------
buildBoard();










