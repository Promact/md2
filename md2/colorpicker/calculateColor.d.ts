import { Rgba, Hsla, Hsva } from './colorpicker';
export declare const COLOR_RGB: RegExp;
export declare const COLOR_HSL: RegExp;
export declare class ColorpickerService {
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
