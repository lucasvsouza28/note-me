import { ReactNode } from "react";
import { styled } from "../../../stitches.config";

interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const IconButton = ({
  children,
  ...props
}: IconButtonProps) => {
  const Container = styled('button', {
    cursor: 'pointer',

    background: 'transparent',
    border: 'none',
    outline: 'none',

    '&:active': {
      transform: 'scale(.95)'
    },
  });

  return (
    <Container
      {...props}
    >
      {children}
    </Container>
  );
}

export default IconButton;
