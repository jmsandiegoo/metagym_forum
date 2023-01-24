import { TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { Controller } from "react-hook-form";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder: string;
  isFloat: boolean;
  min?: number;
  max?: number;
  step?: number;
  validations?: {
    [key: string]: (...args: any[]) => boolean | string;
  };
}

const NumberInput = ({
  name,
  label,
  placeholder,
  isFloat,
  min,
  max,
  step = 1,
  validations,
}: NumberInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type="number"
          {...(validations &&
            validations.hasOwnProperty("required") && {
              InputLabelProps: { required: true },
            })}
          label={label}
          placeholder={placeholder}
          InputProps={{
            inputProps: {
              ...(max && { max: max }),
              ...(min && { step: min }),
              ...(step && { step: step }),
            },
          }}
          error={error ? true : false}
          helperText={error?.message}
          onChange={(e) =>
            isFloat
              ? field.onChange(parseFloat(e.target.value))
              : field.onChange(parseInt(e.target.value))
          }
        />
      )}
      // validation rules
      rules={{
        validate: {
          ...(validations ? validations : {}),
        },
      }}
    />
  );
};

export default NumberInput;
