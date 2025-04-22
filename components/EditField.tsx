import { useEffect, useState } from "react";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { useRef } from "react";

export function EditField({form_id, label, name, defaultValue, type, onChange}: {form_id: string, label: string, name: string, defaultValue: string | number, type: string, onChange:(newVal: any)=>void}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string|number>(defaultValue);
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = type === 'number' ? Number(e.target.value) : e.target.value;
    setValue(newVal);
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handlePencilClick = () => {
    setIsEditing(true);
    // Focus the input when editing starts
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="flex items-center gap-2 mb-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        form={form_id}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        readOnly={!isEditing}
        className={`flex-grow px-2 py-1 rounded border text-sm transition-colors duration-150 ${
          isEditing
            ? 'bg-white border-gray-300 text-black cursor-text'
            : 'bg-gray-100 border-transparent text-gray-500 cursor-default'
        }`}
      />
      {isEditing ? (
        <FaCheck
          onClick={handleSave}
          className="cursor-pointer shrink-0 text-green-600"
          title="Save"
        />
      ) : (
        <FaPencil
          onClick={handlePencilClick}
          className="cursor-pointer shrink-0 text-gray-500"
          title="Edit"
        />
      )}
    </div>
  );
}