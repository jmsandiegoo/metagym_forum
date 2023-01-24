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
  validations?: {
    [key: string]: (...args: any[]) => boolean | string;
  };
  RadioGroupProps?: {};
  children: ReactNode;
}

const RadioInput = ({
  name,
  label,
  validations,
  RadioGroupProps,
  children,
}: RadioInput) => (
  <Controller
    name={name}
    render={({ field }) => (
      <FormControl variant="standard">
        <FormLabel
          sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
          {...(validations &&
            validations.hasOwnProperty("required") && { required: true })}
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
    rules={{
      validate: {
        ...(validations ? validations : {}),
      },
    }}
  />
);

export default RadioInput;
