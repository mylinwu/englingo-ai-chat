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
      bg: 'bg-success-light',
      border: 'border-success/20',
      iconColor: 'text-success',
      titleColor: 'text-success',
    },
    error: {
      icon: <XCircle size={20} />,
      bg: 'bg-error-light',
      border: 'border-error/20',
      iconColor: 'text-error',
      titleColor: 'text-error',
    },
    warning: {
      icon: <AlertCircle size={20} />,
      bg: 'bg-warning-light',
      border: 'border-warning/20',
      iconColor: 'text-warning',
      titleColor: 'text-warning',
    },
    info: {
      icon: <Info size={20} />,
      bg: 'bg-info-light',
      border: 'border-info/20',
      iconColor: 'text-info',
      titleColor: 'text-info',
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
          <p className="text-sm text-text-secondary">{message}</p>
          {actions && (
            <div className="mt-3 flex gap-2">
              {actions}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-text-tertiary hover:text-text-secondary transition-colors"
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
      iconColor: 'text-success',
      buttonBg: 'bg-success hover:bg-success/90',
    },
    error: {
      icon: <XCircle size={48} />,
      iconColor: 'text-error',
      buttonBg: 'bg-error hover:bg-error/90',
    },
    warning: {
      icon: <AlertCircle size={48} />,
      iconColor: 'text-warning',
      buttonBg: 'bg-warning hover:bg-warning/90',
    },
    info: {
      icon: <Info size={48} />,
      iconColor: 'text-info',
      buttonBg: 'bg-info hover:bg-info/90',
    },
  };

  const config = configs[type];

  return (
    <div className="modal-overlay z-[60]">
      <div className="modal-content max-w-sm">
        <div className="p-6 text-center">
          <div className={`inline-flex mb-4 ${config.iconColor}`}>
            {config.icon}
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
          <p className="text-sm text-text-secondary">{message}</p>
        </div>
        <div className="p-4 bg-background-secondary border-t border-border flex gap-3 justify-center">
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="btn-secondary"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-text-inverse rounded-lg transition-colors ${config.buttonBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
