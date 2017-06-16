export declare const COLOR_RGB: RegExp;
export declare const COLOR_HSL: RegExp;
export declare class Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class Hsla {
    h: number;
    s: number;
    l: number;
    a: number;
    constructor(h: number, s: number, l: number, a: number);
}
export declare class Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number);
}
export declare class ColorUtil {
    /**
  * hsla to hsva
  * @param hsla
  */
    hsla2hsva(hsla: Hsla): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    /**
    * hsva to hsla
    * @param hsva
    */
    hsva2hsla(hsva: Hsva): Hsla;
    /**
     * rgba to hsva
     * @param rgba
     */
    rgbaToHsva(rgba: Rgba): Hsva;
    /**
     * hsva to rgba
     * @param hsva
     */
    hsvaToRgba(hsva: Hsva): Rgba;
    /**
     * string to hsva
     * @param colorString
     */
    stringToHsva(colorString: string): any;
    /**
     * output formate of color
     * @param hsva
     * @param outputFormat
     */
    outputFormat(hsva: Hsva, outputFormat: string): string;
    hexText(rgba: Rgba): string;
    denormalizeRGBA(rgba: Rgba): Rgba;
}
