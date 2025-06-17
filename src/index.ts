import React from "react";
import { createRoot } from "react-dom/client";

import { Application } from "./application";

const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(Application));