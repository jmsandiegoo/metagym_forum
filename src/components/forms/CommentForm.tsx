import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createThreadComment,
  fetchThreadComments,
  updateThreadComment,
} from "../../store/commentThunks";
import {
  setErrorFeedback,
  setSuccessFeedback,
} from "../../store/feedbackSlice";
import { CommentRequest, CommentResponse } from "../../types";
import { Comment } from "../../types";
import TextInput from "./TextInput";

interface CommentFormProps {
  comment?: Comment;
  threadId?: string;
  otherEditHandler?: () => void;
}

const CommentForm = ({
  comment,
  threadId,
  otherEditHandler,
}: CommentFormProps) => {
  const { loading } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const methods = useForm<CommentRequest>({
    defaultValues: comment
      ? {
          commentId: comment.commentId,
          body: comment.body,
          threadId: comment.threadId,
        }
      : {
          threadId: threadId,
        },
  });

  const commentHandler: SubmitHandler<CommentRequest> = async (
    data: CommentRequest
  ) => {
    if (!comment) {
      await dispatch(createThreadComment(data));
      methods.reset({ body: "", threadId: threadId });
    } else {
      await dispatch(updateThreadComment(data));
      await dispatch(fetchThreadComments(data.threadId));
      otherEditHandler && otherEditHandler();
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(commentHandler)}>
        <Stack spacing={2}>
          <TextInput
            name="body"
            label={`${comment ? "Edit" : ""} Comment`}
            TextFieldProps={{
              multiline: true,
              rows: 4,
              placeholder: "Enter comment here",
            }}
          />
          <Stack alignItems="flex-end">
            <LoadingButton type="submit" variant="contained" loading={loading}>
              {comment ? "Edit" : "Add Comment"}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default CommentForm;
