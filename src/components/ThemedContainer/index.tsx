import { styled } from '@stitches/react'
import React, { ReactNode } from 'react'
import { useTheme } from '../../contexts/theme'

type ThemedContainerProps = {
  children: ReactNode;
}

export default function ThemedContainer({
  children,
}: ThemedContainerProps) {
  const {
    currentTheme,
  } = useTheme()

  return (
    <Container className={currentTheme}>
      {children}
    </Container>
  )
}

const Container = styled('div', {
  color: '$text_primary',
  background: '$bg_color',
})
