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
import { requiredValidate } from "../../utilities/helper";

interface ThreadFormProps {
  thread?: Thread;
}

const ThreadForm = ({ thread }: ThreadFormProps) => {
  const { loading } = useAppSelector((state) => state.thread);

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
    console.log(data);
    let res: ThreadResponse;
    if (!thread) {
      res = await dispatch(createThread(data)).unwrap();
    } else {
      res = await dispatch(updateThread(data)).unwrap();
    }
    navigate(`/thread/${res.thread.threadId}`, { replace: true });
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
            validations={{
              required: requiredValidate("Title is required"),
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
            validations={{
              required: requiredValidate("Body is required"),
            }}
          />
          <InterestInput
            label="Thread Interests"
            validations={{
              required: requiredValidate("At least one interest is required"),
            }}
          />
          <Stack direction="row" spacing={1}>
            <LoadingButton type="submit" variant="contained" loading={loading}>
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
