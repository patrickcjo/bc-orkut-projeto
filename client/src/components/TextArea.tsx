

 export const Textarea = ({ placeholder, rows, name, className, value, onChange, defaultValue }) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      name={name}
      className={className}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};


