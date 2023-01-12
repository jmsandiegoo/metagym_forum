import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setErrorFeedback,
  setSuccessFeedback,
} from "../../store/feedbackSlice";
import { createThread } from "../../store/threadThunks";
import { ThreadRequest } from "../../types";
import InterestInput from "./InterestInput";
import TextInput from "./TextInput";

interface ThreadFormProps {
  mode: "create" | "edit";
}

const ThreadForm = ({ mode }: ThreadFormProps) => {
  const { loading: authLoading, authUser } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const methods = useForm<ThreadRequest>({
    defaultValues: {
      interests: [],
    },
  });

  const threadHandler: SubmitHandler<ThreadRequest> = async (
    data: ThreadRequest
  ) => {
    try {
      const _ = await dispatch(createThread(data)).unwrap();
      dispatch(setSuccessFeedback("Thread created successfully"));
    } catch (e) {
      console.error(e);
      dispatch(setErrorFeedback("Failed to create thread"));
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(threadHandler)}>
        <Stack spacing={7} pt={5}>
          <Typography variant="h1">Create Thread</Typography>
          <TextInput
            name="title"
            label="Title"
            TextFieldProps={{
              placeholder: "E.g. Any tips for pull ups?",
            }}
          />
          <TextInput
            name="body"
            label="Body"
            TextFieldProps={{
              multiline: true,
              rows: 6,
              placeholder:
                "E.g. I have been learning pull ups for the past few weeks. Was thinking if anyone could provide some tips.",
            }}
          />
          <InterestInput label="Thread Interests" />
          <Stack direction="row" spacing={1}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={authLoading}
            >
              Create
            </LoadingButton>
            <Button variant="text" component={Link} to="/home">
              Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ThreadForm;
