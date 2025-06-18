// src/services/toastService.js
import { toast } from 'react-hot-toast';

const showToast = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'loading':
      toast.loading(message);
      break;
    case 'info':
    case 'message':
      toast(message); // default toast
      break;
    default:
      toast(message);
      break;
  }
};

export default showToast;
