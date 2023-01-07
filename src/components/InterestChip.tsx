import { Chip } from "@mui/material";

interface InterestChipProps {
  label: string;
  [rest: string]: any;
}

const InterestChip = ({ label, rest }: InterestChipProps) => {
  return <Chip variant="outlined" label={label} color="primary" {...rest} />;
};

export default InterestChip;
