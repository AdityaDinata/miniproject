// src/components/common/Input.jsx
import { TextInput } from 'flowbite-react';

const Input = ({ label, id, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700">{label}</label>
      <TextInput id={id} {...props} />
    </div>
  );
};

export default Input;
