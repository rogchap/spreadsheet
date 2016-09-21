# Spreadsheet

## Installation

```bash
$ git clone git@github.com:rogchap/spreadsheet.git
$ cd spreadsheet
$ npm i
```

## Run

Either:
```bash
$ npm install -g
$ spreadsheet [INPUT.csv] [OUTPUT.csv]
```

Or:
```bash
$ npm start [INPUT.csv] [OUTPUT.csv]
```

## Run Tests

```bash
$ npm test
```

## Approach

Having never studied `Postfix Notation`, my intial thought as a staring point was to convert `postfix` to `infix`.
`5 2 +` seemed easy, but then `5 2 3 * -` got a bit more complicated.
After reading the Wiki page it made more sence to follow the algorithm without doing any conversion.

I knew that I would need to do some sort of recusive method to process the cell's values; the following is my
quick and dirty test to figure out my approach. Don't judge me on this code! 😊

```javascript
const data = {
    a1: 'b2 b1 +',
    b1: '2 b2 3 * -',
    b2: '5',
    a2: '-'
}

console.time('Recursive')
function compVal(exp) {
    const parts = exp.split(/\s/);
    const stack = [];
    parts.forEach(function(part) {
        // if part is a ref to a cell get the val of that cell
        if(/^[a-z]+\d+$/.test(part)) {
            const cellVal = cache[part] || compVal(data[part])

            if (cellVal === '#ERR') {
                return cellVal;
            }
            cache[part] = cellVal;
            stack.push(cellVal);
        }
        // Is Operator
        else if (part === '+' || part === '-' || part === '*') {

            const op2 = stack.pop();
            const op1 = stack.pop();

            if(!op1 || !op2) {
                return '#ERR';
            }
            if(part === '+') {
                stack.push(op1 + op2);
            } else if (part === '-') {
                stack.push(op1 - op2);
            } else if (part === '*') {
                stack.push(op1 * op2);
            }

        } else if (/^(\d*(\.\d*)?)$/.test(part)) {
            stack.push(parseFloat(part))

        }
    })

    return stack[0]
}

console.log('final', compVal(data['a1']), compVal(data['b1']), compVal(data['a1']));

console.timeEnd('Recursive');
```

You can see my build steps via the `git commit`s of this repo.

I spent the full **4 hours**, putting this together; It's obvious that I ran out of time towards the end as the entry file (`./src/index.js`)
was rushed and build to get quickly get the right `input/output`.

There is not enough tests, and there is actually no test for the main application, however the test that do exist do demonstrate the core consepts.

I would have liked time to generate more/larger test files; the application has not been tested on a large CSV, and I'm sure there
are plenty of optimisations to be made.

There are some great CSV libraries out there to read/write files, but as this is vanilla Node, my reading/writing of the files
is poor. There are a few places 3rd party libraries would have been useful to implement.


