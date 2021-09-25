//get already sorted
const getSortedArray = (min, size) => {
    let randArr = [];
    for (let i = min; i <= min + size; i++) {
        randArr.push(i);
    }
    setArray(randArr);
    return randArr;
}

// gets unsorted array
const getUnsortedArray = (min, size) => {
    let randArr = [];
    for (let i = min + size; i >= min; i--) {
        randArr.push(i);
    }
    setArray(randArr);
    return randArr;
}