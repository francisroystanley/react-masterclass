import { createStore } from "redux";

import productReducer from "./reducers/productReducer";

const configureState = () => createStore(productReducer);

export default configureState;
