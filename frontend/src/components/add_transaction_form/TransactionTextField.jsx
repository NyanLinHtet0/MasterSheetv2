import { forwardRef } from 'react';

const TransactionTextField = forwardRef(function TransactionTextField(
  { className, placeholder, value, onChange, required = false },
  ref
) {
  return (
    <input
      ref={ref}
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
});

export default TransactionTextField;