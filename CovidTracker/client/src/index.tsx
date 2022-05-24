import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Breadcrumb from "./components/Breadcrumb";
import routes from "./routes";

import "./index.scss";
import "./custom.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Breadcrumb />
    <Routes>
      {routes.map(({ path, Element }, id) => (
        <Route key={id} path={path} element={<Element />} />
      ))}
    </Routes>
  </BrowserRouter>
);
