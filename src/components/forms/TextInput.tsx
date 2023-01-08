import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextInputComponent {
  name: string;
  label: string;
}

const TextInput = ({ name, label }: TextInputComponent) => {
  const methods = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field }) => <TextField label={label} {...field} />}
    />
  );
};

export default TextInput;
