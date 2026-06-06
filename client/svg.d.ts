declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";
  const Component: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default Component;
}
