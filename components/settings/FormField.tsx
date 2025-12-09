import React from 'react';

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  hint?: string;
  hintType?: 'default' | 'warning';
  children: React.ReactNode;
}

/**
 * 表单字段组件 - 统一的表单布局
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  hint,
  hintType = 'default',
  children,
}) => {
  const hintClassName = hintType === 'warning'
    ? 'text-xs text-warning mt-1'
    : 'text-xs text-text-tertiary mt-1';

  return (
    <div>
      <label className="text-sm font-medium text-text-secondary mb-1.5 flex items-center gap-1">
        {icon}
        {label}
      </label>
      {children}
      {hint && <p className={hintClassName}>{hint}</p>}
    </div>
  );
};

export default FormField;
