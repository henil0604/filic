class Utils {

    private constructor() { }

    public static ByteArrayToString(byteArray: number[]): string {
        let string = '';

        for (const code of byteArray) {
            string += String.fromCharCode(code);
        }

        return string
    }

    public static StringToByteArray(string: string): number[] {
        let ByteArray = [];
        for (var i = 0; i < string.length; i++) {
            var code = string.charCodeAt(i);
            ByteArray.push(code);
        }
        return ByteArray;
    }
}

export default Utils;