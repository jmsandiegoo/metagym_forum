import { Grid, styled } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Img from "../components/Image";

interface AuthLayoutProps {
  isInverted: boolean;
  spacing: number;
  imgAlt: string;
  imgSrc: string;
  minHeight?: string | number;
  children: ReactNode;
}

const SideImageLayout = ({
  isInverted,
  spacing,
  imgAlt,
  imgSrc,
  minHeight = "100vh",
  children,
}: AuthLayoutProps) => {
  return (
    <Grid container spacing={spacing} minHeight={minHeight}>
      <Grid item xs={isInverted ? 7 : 5}>
        {isInverted ? children : <Img alt={imgAlt} src={imgSrc} />}
      </Grid>
      <Grid item xs={isInverted ? 5 : 7} sx={{ "& > *": { height: "100%" } }}>
        {isInverted ? <Img alt={imgAlt} src={imgSrc} /> : children}
      </Grid>
    </Grid>
  );
};

export default SideImageLayout;
