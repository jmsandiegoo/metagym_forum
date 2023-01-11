import { CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text }: LoadingSpinnerProps) => {
  return (
    <Stack alignItems="center" spacing={2}>
      <CircularProgress />
      {text && <Typography>{text}</Typography>}
    </Stack>
  );
};

export default LoadingSpinner;
