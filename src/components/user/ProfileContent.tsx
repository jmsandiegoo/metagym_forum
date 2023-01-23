import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AvatarImg from "../AvatarImg";
import InterestChip from "../InterestChip";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { User } from "../../types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";

interface ProfileContentProps {
  user: User;
}

const ProfileContent = ({ user }: ProfileContentProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  return (
    <Stack direction="row" spacing={10}>
      <Stack spacing={2}>
        <AvatarImg
          fallbackName={`${user.firstName} ${user.lastName}`}
          width="150px"
          height="150px"
        />
        <Typography textAlign="center">
          {user.profile.rep}
          <FitnessCenterIcon
            color="primary"
            fontSize="small"
            sx={{ verticalAlign: "middle" }}
          />
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Typography variant="h1">
            {user.firstName} {user.lastName}
          </Typography>
          {authUser?.userId === user.userId && (
            <Button
              component={Link}
              to={`/user/${user.userId}/edit`}
              variant="contained"
            >
              Edit Profile
            </Button>
          )}
        </Stack>
        <Typography variant="subtitle1" color={"palette.disabled"}>
          {user.username}
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${user.profile.country.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${user.profile.country.toLowerCase()}.png 2x`}
            alt=""
          />
        </Typography>
        <Stack>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <Typography>Age:</Typography>
                <Typography>{user.profile.age}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <Typography>Height:</Typography>
                <Typography>{user.profile.height}</Typography>
              </Stack>
            </Grid>
            <Box width="100%" />
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <Typography>Weight:</Typography>
                <Typography>{user.profile.weight}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <Typography>Experience:</Typography>
                <Typography>{user.profile.experience}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        <Typography>{user.profile.bio}</Typography>
        <Typography>Interests</Typography>
        <Stack direction="row" spacing={1}>
          {user.profile.interests?.map((interest, i) => (
            <InterestChip label={interest.name} key={i} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfileContent;
