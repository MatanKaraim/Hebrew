/**
 * הצגת טקסט, מספרים וסימנים בעברית על מסך הלדים של ה-micro:bit
 */
//% color="#0078D7" weight=100 icon="\uf1ab" block="עברית"
namespace hebrewText {

    function getHebrewBitmap(char: string): string {
        let chars = "אבגדהוזחטיכלמנסעפצקרשתךםןףץ 0123456789-:!?.,+=/%()\"'"
        let bitmaps = [
            "1000101010001000101010001", // א
            "1111000010000100001011111", // ב
            "0111000010001100101010010", // ג
            "1111100010000100001000010", // ד
            "1111100001100011000110001", // ה
            "0011000010000100001000010", // ו
            "0111100010001000010000100", // ז
            "1111110001100011000110001", // ח
            "1011110001100011000111111", // ט
            "0011000010000000000000000", // י
            "0111100001000010000101111", // כ
            "0100001111000010001000100", // ל
            "1011001001100011000110011", // מ
            "0011000010000100001001110", // נ
            "1111110001100011000101110", // ס
            "0100101001001010001111111", // ע
            "0111010001110010000101111", // פ
            "1000101010001000001011110", // צ
            "1111100001100011011110000", // ק
            "1111000010000100001000010", // ר
            "1010110101101011000111111", // ש
            "0111101001010010100111001", // ת
            "0111000010000100001000010", // ך
            "1111110001100011000111111", // ם
            "0011000010000100001000010", // ן
            "0111010001110010000100001", // ף
            "1000101001001100001000010", // ץ
            "0000000000000000000000000", // רווח
            "0111010011101011100101110", // 0
            "0010001100001000010001110", // 1
            "0111010001001100100011111", // 2
            "1111000001001100000111110", // 3
            "0001000110010101111100010", // 4
            "1111110000111100000111110", // 5
            "0111010000111101000101110", // 6
            "1111100001000100010001000", // 7
            "0111010001011101000101110", // 8
            "0111010001011110000101110", // 9
            "0000000000011100000000000", // -
            "0000000100000000010000000", // :
            "0010000100001000000000100", // !
            "0111010001001100000000100", // ?
            "0000000000000000000000100", // .
            "0000000000000000010001000", // ,
            "0000000100011100010000000", // +
            "0000001110000000111000000", // =
            "0000100010001000100010000", // /
            "1100111010001000101110011", // %
            "0001000100001000010000010", // (
            "0100000100001000010001000", // )
            "0101001010000000000000000", // "
            "0010000100000000000000000"  // '
        ]
        let idx = chars.indexOf(char)
        if (idx >= 0) {
            return bitmaps[idx]
        }
        return ""
    }

    /**
     * מריץ טקסט בעברית בגלילה חלקה על המסך
     * @param text הטקסט להצגה, eg: "שלום!"
     * @param speed השהיה בין צעדים במילישניות (נמוך = מהיר), eg: 120
     */
    //% block="הרץ טקסט %text || במהירות %speed"
    //% speed.defl=120
    //% speed.min=30 speed.max=500
    //% expandableArgumentMode="toggle"
    //% weight=100
    export function scrollText(text: string, speed: number = 120): void {
        let paddedText = " " + text + " "
        let totalCols = paddedText.length * 6
        for (let offset = totalCols - 5; offset >= 0; offset--) {
            basic.clearScreen()
            for (let col = 0; col <= 4; col++) {
                let virtualCol = offset + col
                let charIndexFromRight = Math.floor(virtualCol / 6)
                let actualCharIndex = paddedText.length - 1 - charIndexFromRight
                let charCol = virtualCol % 6
                if (charCol < 5 && actualCharIndex >= 0 && actualCharIndex < paddedText.length) {
                    let c = paddedText.charAt(actualCharIndex)
                    let map = getHebrewBitmap(c)
                    if (map != "") {
                        for (let row = 0; row <= 4; row++) {
                            if (map.charAt(row * 5 + charCol) == "1") {
                                led.plot(col, row)
                            }
                        }
                    }
                }
            }
            basic.pause(speed)
        }
        basic.clearScreen()
    }

    /**
     * מציג אות או תו בודד על המסך
     * @param char התו להצגה, eg: "א"
     */
    //% block="הצג אות %char"
    //% weight=90
    export function showChar(char: string): void {
        let map = getHebrewBitmap(char)
        if (map != "") {
            basic.clearScreen()
            for (let row = 0; row <= 4; row++) {
                for (let col = 0; col <= 4; col++) {
                    if (map.charAt(row * 5 + col) == "1") {
                        led.plot(col, row)
                    }
                }
            }
        } else {
            basic.showString(char)
        }
    }

    /**
     * מציג מילה או משפט אות אחרי אות במקום
     * @param text הטקסט להצגה, eg: "שלום"
     * @param delay זמן הצגה לכל אות במילישניות, eg: 500
     */
    //% block="הצג אות-אות %text || בהשהיה %delay"
    //% delay.defl=500
    //% delay.min=100 speed.max=2000
    //% expandableArgumentMode="toggle"
    //% weight=80
    export function flashText(text: string, delay: number = 500): void {
        for (let i = 0; i <= text.length - 1; i++) {
            showChar(text.charAt(i))
            basic.pause(delay)
            basic.clearScreen()
            basic.pause(100)
        }
    }
}