import { Button, Stack, Typography } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import Img from "../components/Image";
import error_img from "../assets/Error_Image.png";
import { Link } from "react-router-dom";

interface ErrorInfoPage {
  title: string;
  description: string;
  buttonElements?: ReactElement;
}

const ErrorInfoPage = ({
  title,
  description,
  buttonElements,
}: ErrorInfoPage) => {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Img alt={"Girl doing jump rope"} src={error_img} widthProp="400px" />
      <Typography variant="h1">{title}</Typography>
      <Typography>{description}</Typography>
      {buttonElements ?? (
        <Button component={Link} to="/home" variant="contained">
          Back Home
        </Button>
      )}
    </Stack>
  );
};

export default ErrorInfoPage;
