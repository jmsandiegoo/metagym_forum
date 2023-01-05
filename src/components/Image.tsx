import styled from "@emotion/styled";

interface ImgProps {
  widthProp?: string | number;
  heightProp?: string | number;
}

const Img = styled("img", {
  shouldForwardProp: (prop) => prop !== "widthProp" && prop !== "heightProp",
})<ImgProps>(({ widthProp, heightProp }) => ({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  width: widthProp || "100%",
  height: heightProp || "100%",
}));

export default Img;
