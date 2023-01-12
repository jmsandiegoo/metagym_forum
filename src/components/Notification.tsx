import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import Slide, { SlideProps } from "@mui/material/Slide";

interface SnackbarMessage {
  type: "success" | "error" | "warning";
  message: string;
  key: number;
}

interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

const Notification = () => {
  const { feedbackData } = useAppSelector((state) => state.feedback);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  useEffect(() => {
    if (feedbackData) {
      setMessageInfo(undefined);
      setSnackPack((prev) => [
        ...prev,
        {
          ...feedbackData,
          key: new Date().getTime(),
        },
      ]);
    }
  }, [feedbackData]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      TransitionComponent={TransitionRight}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={feedbackData?.type || "info"}
        variant="filled"
        elevation={6}
        // action={}
      >
        {messageInfo ? feedbackData?.message : undefined}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
