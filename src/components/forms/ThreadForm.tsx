import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Stack,
  Typography,
  unstable_useEnhancedEffect,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setErrorFeedback,
  setSuccessFeedback,
} from "../../store/feedbackSlice";
import { createThread, updateThread } from "../../store/threadThunks";
import { Thread, ThreadRequest, ThreadResponse } from "../../types";
import InterestInput from "./InterestInput";
import TextInput from "./TextInput";

interface ThreadFormProps {
  thread?: Thread;
}

const ThreadForm = ({ thread }: ThreadFormProps) => {
  const { loading: authLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<ThreadRequest>({
    defaultValues: thread
      ? {
          threadId: thread.threadId,
          title: thread.title,
          body: thread.body,
          interests: thread.interests.map((interest) => interest.interestId),
        }
      : {
          interests: [],
        },
  });

  const threadHandler: SubmitHandler<ThreadRequest> = async (
    data: ThreadRequest
  ) => {
    try {
      console.log(data);
      let res: ThreadResponse;
      if (!thread) {
        res = await dispatch(createThread(data)).unwrap();
        dispatch(setSuccessFeedback("Thread created successfully"));
      } else {
        res = await dispatch(updateThread(data)).unwrap();
        dispatch(setSuccessFeedback("Thread edited successfully"));
      }
      navigate(`/thread/${res.thread.threadId}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(threadHandler)}>
        <Stack spacing={7} pt={5}>
          <Typography variant="h1">
            {thread ? "Edit" : "Create"} Thread
          </Typography>
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
              {thread ? "Edit" : "Create"}
            </LoadingButton>
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ThreadForm;
