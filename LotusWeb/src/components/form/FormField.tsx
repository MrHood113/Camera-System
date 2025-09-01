import React from 'react';
import {
  Controller,
  type ControllerRenderProps,
  type Control,
  type FieldErrors,
  type Path,
  get
} from 'react-hook-form';

interface FormFieldProps<FFieldValues extends object, FName extends Path<FFieldValues>> {
  name: FName;
  label: string;
  control: Control<FFieldValues>;
  errors: FieldErrors<FFieldValues>;
  inputNode: (props: ControllerRenderProps<FFieldValues, FName>) => React.ReactElement;
}

function FormField<FFieldValues extends object, FName extends Path<FFieldValues>>({
  name,
  label,
  control,
  errors,
  inputNode
}: FormFieldProps<FFieldValues, FName>) {
    const error = get(errors, name);
  return (
    <div>
      <label htmlFor={String(name)} className="text-sm font-medium text-gray-900 block mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => inputNode(field)}
      />
      {error && (
        <p className="text-red-500 text-sm">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}

export default FormField;
