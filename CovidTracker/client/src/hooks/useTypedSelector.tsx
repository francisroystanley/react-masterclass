import { TypedUseSelectorHook, useSelector } from "react-redux";

import { TRootState } from "../types";

const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default useTypedSelector;
