import { TextField } from "@mui/material";
import { SyntheticEvent } from "react";

interface NumberInputProps {
  label: string;
  placeholder: string;
  min: number;
  max: number;
  onChangeHandler?: (e: SyntheticEvent) => void;
}

const NumberInput = ({
  label,
  placeholder,
  min,
  max,
  onChangeHandler,
}: NumberInputProps) => {
  return (
    <TextField
      fullWidth
      type="number"
      label={label}
      variant="standard"
      size="medium"
      placeholder={placeholder}
      InputProps={{
        inputProps: {
          max,
          min,
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={
        onChangeHandler ||
        ((e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          // set
        })
      }
    />
  );
};

export default NumberInput;
