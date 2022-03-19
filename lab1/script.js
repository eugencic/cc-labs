
// Fibonacci Series using Recursion

function fib1(n) {
    if (n <= 1)
        return n;
    return fib1(n-1) + fib1(n-2);
}

// Fibonacci Series using Dynamic Programming

function fib2(n) {
    // Declare an array to store Fibonacci numbers
    let f = new Array(n+2); // 1 extra to handle case, n = 0
    let i;
    // 0th and 1st number of the series are 0 and 1
    f[0] = 0;
    f[1] = 1;
    for (i = 2; i <= n; i++) {
        // Add the previous 2 numbers in the series and store them
        f[i] = f[i-1] + f[i-2];
    }
    return f[n];
}

// Fibonacci Series using Space Optimized Method

function fib3(n) {
    let a = 0, b = 1, c, i;
    if(n == 0)
        return a;
    for(i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

// Fibonacci Series using power of the matrix {{1, 1}, {1, 0}}

function fib4(n) {
    let F = [ [ 1, 1 ], [ 1, 0 ] ];
    if (n == 0)
        return 0;
    power(F, n - 1);
    return F[0][0];
}

// Helper function that multiplies 2 matrices F and M of size 2*2, and
// puts the multiplication result back to F[][]

function multiply(F, M) {
    x = F[0][0] * M[0][0] +
        F[0][1] * M[1][0];
    y = F[0][0] * M[0][1] +
        F[0][1] * M[1][1];
    z = F[1][0] * M[0][0] +
        F[1][1] * M[1][0];
    w = F[1][0] * M[0][1] +
        F[1][1] * M[1][1];

    F[0][0] = x;
    F[0][1] = y;
    F[1][0] = z;
    F[1][1] = w;
}

// Helper function that calculates F[][] raise to the
// power n and puts the result in F[][]

function power(F, n) {
    var i;
    var M = [[ 1, 1 ], [ 1, 0 ]];

    // n - 1 times multiply the matrix to {{1,0},{0,1}}
    for(i = 2; i <= n; i++)
        multiply(F, M);
}

// Fibonacci Series using Binet's Formula

function fib5(n) {
    let phi = (1 + Math.sqrt(5)) / 2;
    return Math.round(Math.pow(phi, n) / Math.sqrt(5));
}

// Time comparison of the algorithms in written form

const { performance } = require('perf_hooks')
const { plot } = require('nodeplotlib');

let fibNums = [1, 5, 10, 20, 30, 35]

function runFib(nums) {
    var performance1 = []
    var performance2 = []
    var performance3 = []
    var performance4 = []
    var performance5 = []

    for (let i = 0; i < fibNums.length; i++) {
        let time;
        console.log(`${fibNums[i]} nth Fibonacci number`)

        var startTime1 = performance.now()
        fib1(fibNums[i])
        var endTime1 = performance.now()
        time = endTime1 - startTime1
        performance1.push(endTime1 - startTime1)

        var startTime2 = performance.now()
        fib2(fibNums[i])
        var endTime2 = performance.now()
        time = endTime2 - startTime2
        performance2.push(endTime2 - startTime2)

        var startTime3 = performance.now()
        fib3(fibNums[i])
        var endTime3 = performance.now()
        time = endTime3 - startTime3
        performance3.push(endTime3 - startTime3)

        var startTime4 = performance.now()
        fib4(fibNums[i])
        var endTime4 = performance.now()
        time = endTime4 - startTime4
        performance4.push(endTime4 - startTime4)

        var startTime5 = performance.now()
        fib5(fibNums[i])
        var endTime5 = performance.now()
        time = endTime5 - startTime5
        performance5.push(endTime5 - startTime5)

        console.log(`Method 1`);
        console.log(`Execution time: ${performance1[i]}`);
        console.log(`Method 2`);
        console.log(`Execution time: ${performance2[i]}`);
        console.log(`Method 3`);
        console.log(`Execution time: ${performance3[i]}`);
        console.log(`Method 4`);
        console.log(`Execution time: ${performance4[i]}`);
        console.log(`Method 5`);
        console.log(`Execution time: ${performance5[i]}\n`);
    }

    // Time comparison of the algorithms in graphical form

    const method1 = {x: fibNums, y: performance1, type: 'line'}
    const method2 = {x: fibNums, y: performance2, type: 'line'}
    const method3 = {x: fibNums, y: performance3, type: 'line'}
    const method4 = {x: fibNums, y: performance4, type: 'line'}
    const method5 = {x: fibNums, y: performance5, type: 'line'}

    plot([
        method1,
        method2,
        method3,
        method4,
        method5
    ])
}

runFib(fibNums)
