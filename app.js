//Global var
let height = 0;
let width = 0;
let mat = [];
let points = [[0, 8], [15, 8]];
let currentTool = 0; //0-toggle 1-point
let labSolved = false;
let output = document.getElementById("mat-out");
let premadeState = -1;
let premadeLabyrinthsSize = [[[16], [16]], [[32], [32]]];
let premadeLabyrinths = [[ //0-ground 1-wall 2-point
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
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
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]
],
[
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
]



function readBoardSize() {
    height = document.getElementById("Height").value;
    width = document.getElementById("Width").value;
    resetBoard();
    buildBoard();
    premadeState = -1;
    updateOutput();
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
        if (mat[h][w] == 2) {
            mat[h][w] = 0;
            pixelElement.classList.remove("solved");
            pixelElement.classList.remove("wall");
            pixelElement.classList.remove("point");
        }
        else if (findPoints(mat) < 2) {
            mat[h][w] = 2;
            pixelElement.classList.remove("solved");
            pixelElement.classList.remove("wall");
            pixelElement.classList.add("point");
        }
        else {
            alert("There's already 2 endpoints");
        }
        if (findPoints(mat) == 2) {
            changeTool(0);
        }
    }
    if (labSolved) {
        buildBoard();
        document.getElementById("solveBtn").classList.replace("btn-outline-danger", "btn-danger");
        document.getElementById("solveBtn").innerHTML = "Solve";
        labSolved = false;
    }
    premadeState = -1;
    updateOutput();
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

function setupPremadeLabyrinth(which) {
    mat = premadeLabyrinths[which].map((item) => item.slice());
    height = premadeLabyrinthsSize[which][0];
    width = premadeLabyrinthsSize[which][1];
    document.getElementById("Height").value = height;
    document.getElementById("Width").value = width;
    buildBoard();
    labSolved = false;
    premadeState = which;
    updateOutput();
}

function importMat() {
    let inputElement = document.getElementById("mat-in")
    let input = inputElement.value;
    if (input == "") {
        alert("Input's empty");
    } else if (input.length != (height * width * 2 - 1)) {
        alert("Input needs atleast " + (height * width) + " positions");
    }
    else {
        let arr = input.split(",");
        arr2 = [];
        for (let h = 0; h < height; h++) {
            arr2[h] = [];
            for (let w = 0; w < width; w++) {
                arr2[h][w] = arr[h * height + w];
            }
        }
        if (findPoints(arr2) > 2) {
            alert("Input has too many endpoints");
        }
        else {
            mat = arr2.map((item) => item.slice());
            premadeState = -1;
            updateOutput();
        }
        buildBoard();
    }
    inputElement.value = "";
}

function updateOutput() {
    output.value = mat.map((item) => item.slice());
    if (premadeState == -1) {
        document.getElementById("pre1").classList.replace("btn-dark", "btn-outline-dark");
        document.getElementById("pre2").classList.replace("btn-dark", "btn-outline-dark");
    } else if (premadeState == 0) {
        document.getElementById("pre1").classList.replace("btn-outline-dark", "btn-dark");
        document.getElementById("pre2").classList.replace("btn-dark", "btn-outline-dark");
    } else if (premadeState == 1) {
        document.getElementById("pre1").classList.replace("btn-dark", "btn-outline-dark");
        document.getElementById("pre2").classList.replace("btn-outline-dark", "btn-dark");
    }
};

//SOLVE

function findPoints(arr) {
    let c = 0;
    let twos = 0;
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (arr[h][w] == 2) {
                points[c][0] = h;
                points[c][1] = w;
                c++;
            }
        }
    }
    return c;
}

function solve(coords, distance) {
    mat[coords[0]][coords[1]] = distance;
    if (coords[0] == points[1][0] && coords[1] == points[1][1]) {
        labSolved = true;
    }
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
    let twos = findPoints(mat);
    if (twos == 2 && !labSolved) {
        solve([points[0][0], points[0][1]], 10);
        if (labSolved) {
            trace([points[1][0], points[1][1]]);
            document.getElementById("solveBtn").innerHTML = "Clear";
            document.getElementById("solveBtn").classList.replace("btn-danger", "btn-outline-danger");
        }
        else {
            alert("Impossible labyrinth");
            document.getElementById("solveBtn").classList.replace("btn-outline-danger", "btn-danger");
            document.getElementById("solveBtn").innerHTML = "Solve";
        }
        mat[points[0][0]][points[0][1]] = 2;
        mat[points[1][0]][points[1][1]] = 2;
        buildBoard();
        cleanMat();
    } else if (labSolved && twos == 2) {
        //alert("Labyrinth's already solved");
        buildBoard();
        document.getElementById("solveBtn").classList.replace("btn-outline-danger", "btn-danger");
        document.getElementById("solveBtn").innerHTML = "Solve";
        labSolved = false;
    } else {
        alert("You need 2 points to solve");
    }
}

//main---------------------------------------------------------------------------
setupPremadeLabyrinth(0);










