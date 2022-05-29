import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "./routes";
import { Breadcrumb } from "./shared";
import store from "./store";

import "./index.scss";
import "./custom.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Breadcrumb />
      <Routes>
        {routes.map(({ path, Element }, id) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  </Provider>
);
