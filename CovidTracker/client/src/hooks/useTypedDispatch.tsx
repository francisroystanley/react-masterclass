import { useDispatch } from "react-redux";

import { TDispatch } from "../types";

const useTypedDispatch = () => useDispatch<TDispatch>();

export default useTypedDispatch;
