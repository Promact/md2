import { Toast } from './toast';
export declare class Md2ToastComponent {
    toasts: Toast[];
    maxShown: number;
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
    removeAll(): void;
    /**
     * check has any toast
     * @return boolean
     */
    hasToast(): boolean;
}
