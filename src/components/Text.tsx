import React from 'react'

import { Typography, TypographyProps } from '@mui/material'

import typography from '../theme/typography'

type ResponsiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface TextProps {
  component?: React.ElementType
  size: Partial<Record<ResponsiveSize, TypographyProps['variant']>>
}

const generateStyles = (size: TextProps['size']) => {
  const genStyles = Object.entries(size || {}).reduce(
    (acc, [key, value]) => {
      let copyAcc = acc

      copyAcc = {
        fontSize: {
          ...copyAcc.fontSize,
          // @ts-ignore
          [key]: typography[value ?? 'body1'].fontSize
        },
        lineHeight: {
          ...copyAcc.lineHeight,
          // @ts-ignore
          [key]: typography[value ?? 'body1'].lineHeight
        },
        fontFamily: {
          ...copyAcc.fontFamily,
          // @ts-ignore
          [key]: typography[value ?? 'Mulish'].fontFamily
        }
      }

      return copyAcc
    },
    { fontSize: {}, lineHeight: {}, fontFamily: {} }
  )

  return genStyles
}

const Text: React.FC<TextProps & TypographyProps> = ({
  size,
  children,
  sx,
  ...rest
}) => {
  const styles = generateStyles(size)

  return (
    <Typography sx={{ ...styles, ...sx }} {...rest}>
      {children}
    </Typography>
  )
}

export default Text
