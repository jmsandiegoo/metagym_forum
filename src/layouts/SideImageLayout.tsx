import { Grid, styled } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Img from "../components/Image";

interface AuthLayoutProps {
  isInverted: boolean;
  spacing: number;
  imgAlt: string;
  imgSrc: string;
  children: ReactNode;
}

const SideImageLayout = ({
  isInverted,
  spacing,
  imgAlt,
  imgSrc,
  children,
}: AuthLayoutProps) => {
  return (
    <Grid container spacing={spacing} minHeight="100vh">
      <Grid item xs={5}>
        {isInverted ? children : <Img alt={imgAlt} src={imgSrc} />}
      </Grid>
      <Grid item xs={7} sx={{ "& > *": { height: "100%" } }}>
        {isInverted ? <Img alt={imgAlt} src={imgSrc} /> : children}
      </Grid>
    </Grid>
  );
};

export default SideImageLayout;
