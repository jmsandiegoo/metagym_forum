import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import delete_img from "../../assets/Delete_Image.png";
import Img from "../Image";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

interface DeleteDialogProps {
  open: boolean;
  itemName: string;
  loading: boolean;
  onClickHandler: () => void;
  onCloseHandler: () => void;
}

const DeleteDialog = ({
  open,
  itemName,
  loading,
  onClickHandler,
  onCloseHandler,
}: DeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-delete"
      aria-describedby="alert-dialog-delete-confirmation"
      fullWidth
      maxWidth="md"
    >
      <Stack alignItems="center" px={5} py={8} spacing={2}>
        <IconButton
          aria-label="close"
          onClick={onCloseHandler}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Img alt={"Girl doing jump rope"} src={delete_img} widthProp="200px" />
        <Typography variant="h1">Delete {itemName}?</Typography>
        <Typography>
          Are you sure? Deleting would remove it permanently.
        </Typography>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{ alignSelf: "center", mt: 5, mb: 2 }}
          onClick={onClickHandler}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};

export default DeleteDialog;
