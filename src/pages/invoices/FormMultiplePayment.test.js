import { generateLines } from "./FormMultiplePayment";

describe('Generate lines:', () => {
    it('generate multiple lines from month/year config', () => {
        expect(generateLines(1, 2023, 14)).toEqual([
            `Payment for January 2023`,
            `Payment for February 2023`,
            `Payment for March 2023`,
            `Payment for April 2023`,
            `Payment for May 2023`,
            `Payment for June 2023`,
            `Payment for July 2023`,
            `Payment for August 2023`,
            `Payment for September 2023`,
            `Payment for October 2023`,
            `Payment for November 2023`,
            `Payment for December 2023`,
            `Payment for January 2024`,
            `Payment for February 2024`,
        ])

        expect(generateLines(12, 2023, 3)).toEqual([
            `Payment for December 2023`,
            `Payment for January 2024`,
            `Payment for February 2024`,
        ])
    })
})