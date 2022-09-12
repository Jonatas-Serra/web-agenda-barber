import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div
      className={`flex justify-center items-center w-full min-w-[250px] h-12 p-4 text-white-100 bg-zinc-700 rounded-md shadow-sm focus-within:ring-orange-500 focus-within:border-transparent ${isFocused ? 'ring-2 ring-orange-500' : ''} ${isFilled ? 'ring-2 ring-orange-500' : ''} ${error ? 'ring-2 ring-red-600' : ''}`}
    >
      {Icon && <Icon size={20} color={isFilled ? '#F4972E' : ''} />}
      <input
        className='flex-1 w-full h-full p-2 text-white bg-transparent border-none focus:outline-none'
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <div className='h-[20px] ml-4'>
          <FiAlertCircle color="#c53030" size={20} />
        </div>
      )}
    </div>
  );
};
export default Input;