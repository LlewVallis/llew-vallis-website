import { ReactNode } from "react";

import "katex/dist/katex.css";
import "prism-themes/themes/prism-one-light.css";
import "./global.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
