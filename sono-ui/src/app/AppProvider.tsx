import { StrictMode, type FC, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AppProvider: FC<Props> = ({ children }) => {
  return <StrictMode>{children}</StrictMode>
}

export default AppProvider
