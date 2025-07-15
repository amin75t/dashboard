import { Button, ButtonProps } from "antd";
import { PropsWithChildren } from "react";
type PrimaryBtnProps = PropsWithChildren<
  {
    color?:
      | "cyan"
      | "default"
      | "primary"
      | "danger"
      | "blue"
      | "purple"
      | "green"
      | "magenta"
      | "pink"
      | "red"
      | "orange"
      | "yellow"
      | "volcano"
      | "geekblue"
      | "lime"
      | "gold"
      | string
      | undefined;
  } & ButtonProps
>;
const PrimaryBtn = ({
  children,
  color = "cyan",
  ...props
}: PrimaryBtnProps) => {
  return (
    <Button
      {...props}
      color={color}
      variant="solid"
      className="BYekan !rounded-xl !font-extrabold !py-5 !px-5"
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
