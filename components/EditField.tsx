import { useState } from "react";

export function EditField({form_id, label, name, defaultValue, type, onChange, required}: {form_id: string, label: string, name: string, defaultValue: string | number, type: string, onChange:(newVal: string | number)=>void, required?: boolean}) {
  const [value, setValue] = useState<string|number>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = type === 'number' ? Number(e.target.value) : e.target.value;
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        form={form_id}
        required={required}
        onChange={handleChange}
        className="flex-grow px-2 py-1 rounded border border-gray-300 text-sm transition-colors duration-150 bg-white text-black"
      />
    </div>
  );
}