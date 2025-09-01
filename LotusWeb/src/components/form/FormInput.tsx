// src/components/FormInput.tsx
import { Input, Typography } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
// import type { CreateFormValues } from '../../validation/cameraSchema';

const { Text } = Typography;

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  type?: 'text' | 'password' | 'textarea';
}

const FormInput = <T extends FieldValues>({ label, name, control, error, type = 'text' }: Props<T>) => (
  <div>
    <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const commonProps = {
          ...field,
          id: name,
          placeholder: `Enter ${label.toLowerCase()}`,
          className: "dark:bg-gray-100 dark:text-black",
        };

        switch (type) {
          case "password":
            return <Input.Password {...commonProps} className={`${commonProps.className} h-10`} />;
          case "textarea":
            return <Input.TextArea {...commonProps} rows={3} />;
          default:
            return <Input {...commonProps} className={`${commonProps.className} h-10`} />;
        }
      }}
    />
    {error && <Text type="danger" className="text-xs">{error}</Text>}
  </div>
);

export default FormInput;
