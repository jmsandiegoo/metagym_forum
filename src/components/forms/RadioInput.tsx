import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ReactNode } from "react";

interface RadioInput {
  label: string;
  children: ReactNode;
}

const RadioInput = ({ label, children }: RadioInput) => (
  <FormControl variant="standard">
    <FormLabel sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}>
      {label}
    </FormLabel>
    <RadioGroup row defaultValue="beginner">
      {children}
    </RadioGroup>
  </FormControl>
);

export default RadioInput;
