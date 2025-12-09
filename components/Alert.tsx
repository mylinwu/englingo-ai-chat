import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  actions?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ 
  type = 'info', 
  title, 
  message, 
  onClose,
  actions 
}) => {
  const configs = {
    success: {
      icon: <CheckCircle size={20} />,
      bg: 'bg-[#07c160]/10',
      border: 'border-[#07c160]/20',
      iconColor: 'text-[#07c160]',
      titleColor: 'text-[#07c160]',
    },
    error: {
      icon: <XCircle size={20} />,
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconColor: 'text-red-500',
      titleColor: 'text-red-700',
    },
    warning: {
      icon: <AlertCircle size={20} />,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-700',
    },
    info: {
      icon: <Info size={20} />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-700',
    },
  };

  const config = configs[type];

  return (
    <div className={`rounded-xl ${config.bg} border ${config.border} p-4`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-medium ${config.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          <p className="text-sm text-slate-600">{message}</p>
          {actions && (
            <div className="mt-3 flex gap-2">
              {actions}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// Alert Dialog (Modal)
interface AlertDialogProps {
  isOpen: boolean;
  type?: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  type = 'info',
  title,
  message,
  confirmText = '确定',
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const configs = {
    success: {
      icon: <CheckCircle size={48} />,
      iconColor: 'text-[#07c160]',
      buttonBg: 'bg-[#07c160] hover:bg-[#06ad56]',
    },
    error: {
      icon: <XCircle size={48} />,
      iconColor: 'text-red-500',
      buttonBg: 'bg-red-500 hover:bg-red-600',
    },
    warning: {
      icon: <AlertCircle size={48} />,
      iconColor: 'text-amber-500',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
    },
    info: {
      icon: <Info size={48} />,
      iconColor: 'text-blue-500',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const config = configs[type];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className={`inline-flex mb-4 ${config.iconColor}`}>
            {config.icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-center">
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${config.buttonBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
