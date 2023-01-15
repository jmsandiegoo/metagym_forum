import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/reduxHooks";
import { User } from "../types";
import AvatarImg from "./AvatarImg";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

interface UserDetailsProps {
  user: User | null;
  isRepEnabled: boolean;
  date?: Date;
}

const UserDetails = ({ user, isRepEnabled, date }: UserDetailsProps) => {
  return (
    <Stack direction="row" spacing={6} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <AvatarImg
          fallbackName={`${user?.firstName} ${user?.lastName}`}
          width="50px"
          height="50px"
        />
        <Stack>
          <Typography color="primary">{user?.username}</Typography>
          {isRepEnabled && (
            <Typography>
              {user?.profile?.rep}{" "}
              <FitnessCenterIcon
                color="primary"
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
            </Typography>
          )}
        </Stack>
      </Stack>
      {date && (
        <Typography>
          {date.toLocaleString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      )}
    </Stack>
  );
};

export default UserDetails;
