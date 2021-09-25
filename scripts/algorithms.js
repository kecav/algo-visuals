// WORKING
// BUBBLE SORT
const bubbleSort = async() => {
    swapCounter = 0;
    // animation to sort
    for (let i = 0; i < this.arr.length; i++) {
        for (let j = 0; j < this.arr.length - i - 1; j++) {
            if (pause) return;
            await highlightNodes(j, j + 1);
            comparisonCounter++;
            if (this.arr[j].height > this.arr[j + 1].height) {
                swapCounter++;
                await swapNodes(j, j + 1);
            }
        }
        // changes color of sorted subarray
        paintSortedSubArray(this.arr.length - i - 1, this.arr.length - 1);
    }
    // displays new sorted array after sorting is finished
    console.log(this.arr);
};

// paints subArray
const paintSortedSubArray = (i, j) => {
    for (let k = i; k <= j; k++) {
        this.arr[k].color = "#0f0";
    };
    renderCanvas();
}


// WORKING
// SELECTION SORT
const selectionSort = async() => {
    swapCounter = 0;
    comparisonCounter = 0;
    for (let i = 0; i < this.arr.length; i++) {

        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < this.arr.length; j++) {
            await highlightNodes(j, min);
            comparisonCounter++;
            if (this.arr[j].height < this.arr[min].height) {
                min = j;
            }
        }

        // swap if not in order
        if (min != i) {
            swapCounter++;
            await swapNodes(i, min);
        }

        // changes color of sorted subarray
        paintSortedSubArray(0, i);
    };

    // displays new sorted array after sorting is finished
    console.log(this.arr);
}

// WORKING
// INSERTION SORT
const insertionSort = async() => {
    swapCounter = 0;
    comparisonCounter = 0;

    // starting i from 0
    for (let i = 0; i < this.arr.length - 1; i++) {

        // select element
        let j = i + 1;
        // this.arr[j].height *= -1;

        // starting j as i+1 and loop until j = 1 or j>0
        for (j = i + 1; j > 0; j--) {

            // highlighting the selected nodes or pillars
            comparisonCounter++;
            await highlightNodes(j - 1, j);

            // pushes selected node below

            // if previous element is smaller then function stops 
            if (this.arr[j].height > this.arr[j - 1].height) {
                break;
            }
            // else keep shifting theor positions until a smaller element is met
            else {
                await swapNodes(j - 1, j);
                swapCounter++;
            }

            // pushes selected node above
            // this.arr[j].height *= -1;
            paintSortedSubArray(0, i + 1);
        }
        // this.arr[j].height *= -1;
    }
    console.log(this.arr);
}

// 
// // merge
// const merge = (leftArr, rightArr, half) => {
//     let arr = [];

//     // break out of loop if any of the subarray is empty
//     while (leftArr.length && rightArr.length) {
//         // pick the smallest element
//         leftArr[0] < rightArr[0] ? arr.push(leftArr.shift()) : arr.push(rightArr.shift());
//     }

//     // concatenates both the sub arrays 
//     return [...arr, ...leftArr, ...rightArr]
// };


// //  
// const mergeSort = (array) => {
//     const half = array.length / 2;

//     // termianting condition
//     if (array.length < 2) { return array };

//     const left = array.splice(0, half);
//     return merge(mergeSort(left), mergeSort(array), half);
// };
// //