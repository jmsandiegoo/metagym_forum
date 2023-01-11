import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

interface RadioInput {
  name: string;
  label: string;
  // defaultValue: string;
  RadioGroupProps?: {};
  children: ReactNode;
}

const RadioInput = ({ name, label, RadioGroupProps, children }: RadioInput) => (
  <Controller
    name={name}
    render={({ field }) => (
      <FormControl variant="standard">
        <FormLabel
          sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
        >
          {label}
        </FormLabel>
        <RadioGroup
          row
          // defaultValue={defaultValue}
          {...field}
          {...(RadioGroupProps && RadioGroupProps)}
        >
          {children}
        </RadioGroup>
      </FormControl>
    )}
  />
);

export default RadioInput;
