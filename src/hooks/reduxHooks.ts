import { useDispatch, useSelector } from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";
import { AppDispatch, RootState } from "../store";

// defined in external file for DRY & prevent circular dependency
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

