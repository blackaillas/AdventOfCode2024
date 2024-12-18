const SEP = ' ';
const MULT = 2024;
const SEGMENT = 10000;

export function solvePart1() {
    let inputSegments = [getInputItems(input)];
    const blink = 25;

    for (let i = 0; i < blink; i++) {
        // const start = performance.now();
        // console.debug('IN segments len: ', inputSegments?.length);

        for (let si = 0; si < inputSegments.length; si++) {
            if (inputSegments[si].length > SEGMENT) {
                const chunks = chunkArray(inputSegments[si], SEGMENT);
                inputSegments.splice(si, 1, ...chunks);
                si = si + chunks.length
            }
        }

        for (let s = 0; s < inputSegments.length; s++) {
            const segment = inputSegments[s];

            for (let index = 0; index < segment.length; index++) {
                const element = +segment[index];

                if (element == 0) {
                    segment[index] = 1;
                }
                else if (element.toString().length % 2 == 0) {
                    const firstPart = parseInt(element.toString().slice(0, element.toString().length / 2));
                    const remainingPart = parseInt(element.toString().slice(element.toString().length / 2));
                    segment[index] = firstPart;
                    segment.splice(index + 1, 0, remainingPart);
                    index++;
                } else {
                    segment[index] = element * MULT;
                }
            }
        }

        // console.debug('OUT len: ', inputSegments[0].join(SEP));

        // const end = performance.now();
        // const duration = end - start;

        // console.log(`Execution time for ${i}th blink: ${duration} milliseconds`);
    }


    return inputSegments.flatMap(x => x).length;
}

export function solvePart2() {
    let inputSegments = getInputItems(testInput).map(x => [x]);
    const blink = 75;


    for (let i = 0; i < blink; i++) {

        for (let si = 0; si < 1; si++) {
            const segment = inputSegments[si];

            for (let index = 0; index < segment.length; index++) {
                const element = +segment[index];

                if (element == 0) {
                    segment[index] = 1;
                }
                else if (element.toString().length % 2 == 0) {
                    const firstPart = parseInt(element.toString().slice(0, element.toString().length / 2));
                    const remainingPart = parseInt(element.toString().slice(element.toString().length / 2));
                    segment[index] = firstPart;
                    segment.splice(index + 1, 0, remainingPart);
                    index++;
                } else {
                    segment[index] = element * MULT;
                }
            }
        }
    }

    // for (let i = 0; i < blink; i++) {
    //     // const start = performance.now();
    //     // console.debug('IN segments len: ', inputSegments?.length);

    //     for (let si = 0; si < inputSegments.length; si++) {
    //         if (inputSegments[si].length > SEGMENT) {
    //             const chunks = chunkArray(inputSegments[si], SEGMENT);
    //             inputSegments.splice(si, 1, ...chunks);
    //             si = si + chunks.length
    //         }
    //     }

    //     for (let s = 0; s < inputSegments.length; s++) {
    //         const segment = inputSegments[s];

    //         for (let index = 0; index < segment.length; index++) {
    //             const element = +segment[index];

    //             if (element == 0) {
    //                 segment[index] = 1;
    //             }
    //             else if (element.toString().length % 2 == 0) {
    //                 const firstPart = parseInt(element.toString().slice(0, element.toString().length / 2));
    //                 const remainingPart = parseInt(element.toString().slice(element.toString().length / 2));
    //                 segment[index] = firstPart;
    //                 segment.splice(index + 1, 0, remainingPart);
    //                 index++;
    //             } else {
    //                 segment[index] = element * MULT;
    //             }
    //         }
    //     }

    // }


    return inputSegments.flatMap(x => x).length;

}

function getInputItems(inp) {
    return inp.split(SEP).map(Number);
}

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

var testInput =
    `0 1 10 99 999`;

var testInput2 =
    `125 17`;

var input = `28591 78 0 3159881 4254 524155 598 1`;