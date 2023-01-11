import { TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { Controller } from "react-hook-form";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step?: number;
  onChangeHandler?: (e: SyntheticEvent) => void;
}

const NumberInput = ({
  name,
  label,
  placeholder,
  min,
  max,
  step = 1,
  onChangeHandler,
}: NumberInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          type="number"
          label={label}
          placeholder={placeholder}
          InputProps={{
            inputProps: {
              max,
              min,
              step,
            },
          }}
          onChange={(e) =>
            onChangeHandler
              ? field.onChange(onChangeHandler)
              : field.onChange(parseFloat(e.target.value))
          }
        />
      )}
    />
  );
};

export default NumberInput;
