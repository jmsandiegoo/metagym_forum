import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";
import { Controller } from "react-hook-form";

interface PasswordInputProps {
  name: string;
  label: string;
  validations?: {
    [key: string]: (...args: any[]) => boolean | string;
  };
}

const PasswordInput = ({ name, label, validations }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth variant="standard" error={error ? true : false}>
          <InputLabel
            htmlFor="standard-adornment-password"
            shrink={true}
            {...(validations &&
              validations.hasOwnProperty("required") && { required: true })}
          >
            {label}
          </InputLabel>
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
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

export default PasswordInput;
