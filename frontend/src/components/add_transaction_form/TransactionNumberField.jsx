
export default function TransactionNumberField({
  className,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}