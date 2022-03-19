
// Quick Sort

const quickSort = arr => {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

// Merge Sort

function merge(left, right) {
    let sortedArr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    return [...sortedArr, ...left, ...right]
}

const mergeSort = arr => {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

// Heap Sort

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function maxHeap(array, index, length) {
    let left = 2 * index;
    let right = 2 * index + 1;
    let maximum;
    if (right < length) {
        if (array[left] >= array[right]) {
            maximum = left;
        } else {
            maximum = right;
        }
    } else if (left < length) {
        maximum = left;
    } else {
        return;
    }
    if (array[index] < array[maximum]) {
        swap(array, index, maximum);
        maxHeap(array, maximum, length);
    }
}

const heapSort = arr => {
    let length = arr.length;
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        maxHeap(arr, i, length);
    }
    for (let i = length - 1; i >= 0; i--) {
        swap(arr, 0, i);
        maxHeap(arr, 0, i);
    }
    return arr;
}

// Bubble Sort

const bubbleSort = arr => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// Time comparison of the algorithms in written form

const { performance } = require('perf_hooks')
const { plot } = require('nodeplotlib')

const generateArray = (min, max, n) => {
    const arr = []
    while (arr.length < n) {
        const rand = Math.floor(Math.random() * (max - min) + min)
        arr.push(rand)
    }
    return arr
}

const getTime = (arr, cb) => {
    const start = performance.now();
    cb(arr);
    const end = performance.now();
    return end - start;
}

let n = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000,
    50000, 100000, 200000, 300000, 400000, 500000, 600000]
    // 700000, 800000, 900000, 1000000]

function run(nums) {
    var quicksort = []
    var mergesort = []
    var heapsort = []
    var bubblesort = []

    for (let i = 0; i < n.length; i++) {
        const arr = generateArray(1, 100000, n[i])
        console.log(`For n = ${n[i]}`)

        const qSort = getTime(arr, quickSort)
        console.log(`Quick Sort`)
        console.log(`Execution time: ${qSort}`)
        quicksort.push(qSort)

        const mSort = getTime(arr, mergeSort)
        console.log(`Merge Sort`)
        console.log(`Execution time: ${mSort}`)
        mergesort.push(mSort)

        const hSort = getTime(arr, heapSort)
        console.log(`Heap Sort`)
        console.log(`Execution time: ${hSort}`)
        heapsort.push(hSort)

        const bSort = getTime(arr, bubbleSort)
        console.log(`Bubble Sort`)
        console.log(`Execution time: ${bSort}`)
        bubblesort.push(bSort)
    }

    // Time comparison of the algorithms in graphical form

    const qs = {x: n, y: quicksort, type: 'line'}
    const ms = {x: n, y: mergesort, type: 'line'}
    const hs = {x: n, y: heapsort, type: 'line'}
    const bs = {x: n, y: bubblesort, type: 'line'}

    plot([
        qs, ms, hs, bs
    ])
}

run(n)
