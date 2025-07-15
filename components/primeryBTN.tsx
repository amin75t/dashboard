import { Button, ButtonProps } from "antd";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
type PrimaryBtnProps = PropsWithChildren<
  {
    color:
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
      className=" !rounded-xl !font-extrabold !py-5"
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
