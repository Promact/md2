import { Toast } from './toast';
export declare class Md2ToastComponent {
    toasts: Toast[];
    maxShown: number;
    animate: string;
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    add(toast: Toast): void;
    /**
     * remove toast
     * @param toastId number of toast id
     */
    remove(toastId: number): void;
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    removeAll(toastId: number): void;
    /**
     * check has any toast
     * @return boolean
     */
    hasToast(): boolean;
}
