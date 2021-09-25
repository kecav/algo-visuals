//
// SORTING VISUALS
//

const inputForm = document.getElementById("input-form");
const inputArray = document.getElementById("array-input");
const sortBtn = document.getElementById("sort-btn");
const arraySize = document.getElementById("array-size");
const arraySizeValue = document.getElementById("array-size-value");
const arrayInput = document.getElementById("array-input");
const sortSpeed = document.getElementById("sort-speed");
const sortSpeedValue = document.getElementById("sort-speed-value");
const algorithm = document.getElementById("algorithm");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

// 
let arr;
let displayBaseY = canvas.height * 0.85;
let displayBaseX = 10;
let fps = 60;
let speed = 1;
let swapCounter = 0;
let comparisonCounter = 0;
let highlightColor = "#6200ff";
let nodeColor = "#f00";
let isSorting = false;
let canvasBg = "#fff";
let renderText = true;
let animateSwap = true;
let swapSpeed = 1000 / fps;
let animate;
let pause = false;

// array constructor class
class Rect {
    constructor(height, width, poz, color) {
        this.color = color;
        this.height = parseInt(height);
        this.poz = parseFloat(poz);
        this.width = parseInt(width);
    }
}

// render canvas
const renderCanvas = () => {
    // console.log("rendering");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // canvas background
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // prints each height node
    for (let i = 0; i < this.arr.length; i++) {

        // height node
        ctx.fillStyle = this.arr[i].color;
        ctx.fillRect(this.arr[i].poz, displayBaseY - this.arr[i].height, this.arr[i].width, this.arr[i].height);

        // text
        if (renderText) {
            ctx.fillStyle = "#000";
            ctx.font = `${this.arr[i].width*0.5}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = 'top';
            ctx.fillText(this.arr[i].height, this.arr[i].poz + this.arr[i].width / 2, displayBaseY + 30);
        }
    }

    // counter to display swaps
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`SWAPS : ${swapCounter}`, 20, 40);
    ctx.fillText(`COMPARISONS : ${comparisonCounter}`, 20, 60);
};

// sets global array with classes
const setArray = (arr) => {
    // console.log("SET ARRAY");

    // calculates width of each node
    let width = arr.length >= 15 ? (canvas.width * 0.9) / (arr.length * 1.25) : canvas.width / 20;
    renderText = arr.length > 50 ? false : true;

    // shifts displayBaseX to make nodes align in center
    displayBaseX = canvas.width / 2 - arr.length * (width * 1.25) * 0.5;
    let poz = parseFloat(displayBaseX);

    // makes global array an array of objects
    this.arr = arr.map((el) => {

        // creating each objects
        const node = new Rect(el, width, poz, nodeColor);

        // gap = 0.25*width
        poz += parseFloat(width * 1.25);
        return node;
    });

    // console.log(this.arr);
    // renders canvas to display initial array
    renderCanvas();
}

// highlights the selected 2 nodes
const highlightNodes = (i, j) => {
    if (pause) return;

    // stores previous color before highlighting
    const prevColori = this.arr[i].color;
    const prevColorj = this.arr[j].color;

    this.arr[i].color = highlightColor;
    this.arr[j].color = highlightColor;
    renderCanvas();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.arr[i].color = prevColori;
            this.arr[j].color = prevColorj;
            renderCanvas();
            resolve("");
        }, 1000 / speed);
    });
};


// shift places between 2 nodes accepts both their indices where j>i
const swapNodes = (i, j) => {
    // console.log("SHIFTING");
    if (pause) return;

    const leftX = this.arr[i].poz;
    const rightX = this.arr[j].poz;

    return new Promise((resolve, reject) => {
        // interval to sort
        let interval = setInterval(() => {
            // console.log("Inside interval");

            // paints different color for selected nodes
            this.arr[i].color = highlightColor;
            this.arr[j].color = highlightColor;

            // shifts places by a certain amount
            this.arr[i].poz += speed;
            this.arr[j].poz -= speed;
            // this.arr[i].poz += parseFloat(speed);
            // this.arr[j].poz -= parseFloat(speed);


            // renders canvas after changes
            renderCanvas();

            // stops animating if positions are stopped
            if (this.arr[i].poz >= rightX || this.arr[j].poz <= leftX) {
                // console.log('REACHED');

                // maintain their proper position on X axis
                this.arr[i].poz = parseFloat(rightX);
                this.arr[j].poz = parseFloat(leftX);

                // sets elements in correct order
                const tmp = this.arr[i];
                this.arr[i] = this.arr[j];
                this.arr[j] = tmp;

                // changes color back to original 
                this.arr[i].color = nodeColor;
                this.arr[j].color = nodeColor;

                // prints final rendered canvas
                renderCanvas();
                // stops interval
                clearInterval(interval);
                resolve("");
                return;
            }
        }, swapSpeed);
    });
}

// generates random valued array
const generateRandom = (min, max, size) => {
    let randArr = [];
    for (let i = 0; i < size; i++) {
        const el = Math.floor(Math.random() * (max - min + 1) + min);
        randArr.push(el);
    }
    setArray(randArr);
    return randArr;
}


// BEGIN SORT
const beginSort = (sort) => {
    const size = arraySize.value;
    const algo = algorithm.value;


    // returns if sort value not provided
    if (!sort) {

        const arr = generateRandom(1, 400, size);
        speed = parseFloat(sortSpeed.value);

        arraySizeValue.innerText = size;
        inputArray.value = arr.join(",");
        sortSpeedValue.innerText = speed;

        return;
    }
    // console.log(algo);

    // proceeds if sort button pressed
    switch (algo) {
        case "bubble":
            bubbleSort();
            break;
        case "selection":
            selectionSort();
            break;
        case "insertion":
            insertionSort();
            break;
        default:
            break;
    }
}

// custom array submit
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputArray = arrayInput.value.split(",");
    setArray(inputArray);
    // console.log(e.target[0].value);
});

// sort button istener
sortBtn.addEventListener("click", beginSort.bind(this, true));

// array size listener
arraySize.addEventListener("input", (e) => {
    const size = e.target.value;
    const arr = generateRandom(1, 400, size);
    arraySizeValue.innerText = size;
    inputArray.value = arr.join(",");
});

// sort speed listener
sortSpeed.addEventListener("input", (e) => {
    speed = parseFloat(e.target.value);
    sortSpeedValue.innerText = e.target.value;
});


// paints initial array
beginSort(false);