import style from '../style.local.css';
import Swal from 'sweetalert2';
import { toast, ToastOptions } from 'react-toastify';

export function omit<T extends object, K extends keyof T>(
  target: T,
  ...omitKeys: K[]
): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any,
  );
}

export const confirmDialog = Swal.mixin({
  confirmButtonClass: `${style.button} ${style.primary}`,
  cancelButtonClass: `${style.button} ${style.primary} ${style.hollow}`,
  buttonsStyling: false,
});

export const showNotification = (
  message: string, options: ToastOptions
) => toast(message, options);

export const showErrorNotification = (
  message: string
) => showNotification(message, { className: style.toaster });

export const showSuccessNotification = (
  message: string
) => showNotification(message, { type: "success" });