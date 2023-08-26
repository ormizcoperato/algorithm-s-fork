/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
    const pairsMap = {};
    let startingKey = pairs[0][0];
    let endingKey = pairs[0][0];

    for (const pair of pairs) {
        // place LOWEST chain leap in its starting position
        const pairLeap = pair[1] - pair[0];
        if (pairsMap[pair[0]] === undefined) pairsMap[pair[0]] = pairLeap;
        else if (pairsMap[pair[0]] > pairLeap) pairsMap[pair[0]] = pairLeap;

        // get minimum key, maximum key
        if (startingKey > pair[0]) startingKey = pair[0];
        else if (endingKey < pair[0]) endingKey = pair[0];
    }

    const checkPairs = (pairKey, longestChain) => {
        if (pairKey > endingKey) return longestChain;

        const pairLeap = pairsMap[pairKey] ?? 0;
        const chainKey = pairKey + pairLeap + 1;
        if (pairsMap[chainKey] !== undefined) {
            // console.log(pairsMap[chainKey]);

            // if new chain exists test this chain, continue testing other chains
            return Math.max(
                checkPairs(chainKey, longestChain + 1),
                checkPairs(pairKey + 1, longestChain),
            );
        }

        // if no new chain exists, continue
        return checkPairs(pairKey + 1, longestChain)
    }

    return checkPairs(startingKey, 1);
};

//TODO WIP

/*----------------------------------------------------------------------------------------------------*/
import { printEnd, printResult } from "../../../answerUtil.js";

const answerCb = findLongestChain;
printResult({ answerCb, expected: 2, input: { pairs: [[1, 2], [2, 3], [3, 4]] } });
printResult({ answerCb, expected: 3, input: { pairs: [[1, 2], [7, 8], [4, 5]] } });
printResult({ answerCb, expected: 4, input: { pairs: [[-10, -8], [8, 9], [-5, 0], [6, 10], [-6, -4], [1, 7], [9, 10], [-4, 7]] } });
printResult({ answerCb, expected: 3, input: { pairs: [[-6, 9], [1, 6], [8, 10], [-1, 4], [-6, -2], [-9, 8], [-5, 3], [0, 3]] } });

printEnd();
