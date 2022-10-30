declare class Utils {
    private constructor();
    static ByteArrayToString(byteArray: number[]): string;
    static StringToByteArray(string: string): number[];
    static Try(callback: () => any): () => any;
}
export default Utils;
