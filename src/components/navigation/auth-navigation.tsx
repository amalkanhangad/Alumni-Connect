import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { StyledButton } from '@/components/styled-button'
import { useRouter } from 'next/router' // Import the useRouter hook
const AuthNavigation: FC = () => {
  const router = useRouter()

  const handleMemberLoginClick = () => {
    // Use the router to navigate to the "Login" page
    router.push('/login')
  }
  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <StyledButton onClick={handleMemberLoginClick}>Member login</StyledButton>
    </Box>
  )
}

export default AuthNavigation
