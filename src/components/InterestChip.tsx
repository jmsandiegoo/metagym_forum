import { Chip } from "@mui/material";

interface InterestChipProps {
  label: string;
  onClickHandler?: () => void;
  [rest: string]: any;
}

const InterestChip = ({ label, onClickHandler, rest }: InterestChipProps) => {
  return (
    <Chip
      variant="outlined"
      label={label}
      color="primary"
      {...(onClickHandler && { onClick: onClickHandler })}
      {...rest}
    />
  );
};

export default InterestChip;
