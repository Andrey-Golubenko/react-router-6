import { Link, useMatch } from 'react-router-dom'

interface CustomNavLinkProps {
  to: string
  children: any
  end?: string
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
  ...rest
}) => {
  const match = useMatch({ path: to, end: to.length === 1 })
  // console.log('match :>> ', match)

  return (
    <Link
      to={to}
      style={{ color: match ? 'var(--color-active)' : 'white' }}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default CustomNavLink
