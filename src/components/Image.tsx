import styled from "@emotion/styled";

interface ImgProps {
  marginProp?: string | number;
  widthProp?: string | number;
  heightProp?: string | number;
}

const Img = styled("img", {
  shouldForwardProp: (prop) =>
    prop !== "marginProp" && prop !== "widthProp" && prop !== "heightProp",
})<ImgProps>(({ marginProp, widthProp, heightProp }) => ({
  margin: marginProp || marginProp === 0 ? 0 : "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  width: widthProp || "100%",
  height: heightProp || "100%",
}));

export default Img;
