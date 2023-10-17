import React, { FC } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as ScrollLink } from 'react-scroll'
import { StyledButton } from '@/components/styled-button'
import { useRouter } from 'next/router' // Import the useRouter hook

interface Exp {
  label: string
  value: string
}
interface ExpItemProps {
  item: Exp
}

const ExpItem: FC<ExpItemProps> = ({ item }) => {
  const { value, label } = item
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 0 } }}>
      <Typography
        sx={{ color: 'secondary.main', mb: { xs: 1, md: 2 }, fontSize: { xs: 34, md: 44 }, fontWeight: 'bold' }}
      >
        {value}
      </Typography>
      <Typography color="text.secondary" variant="h5">
        {label}
      </Typography>
    </Box>
  )
}

const HomeHero: FC = () => {
  const router = useRouter()
  const handleMemberRegisterClick = () => {
    // Use the router to navigate to the "Regsiter" page
    router.push('/register')
  }
  return (
    <Box
      id="hero"
      sx={{
        backgroundImage: `url('/images/nehru3.jpg')`,
        backgroundSize: 'cover', // Cover the entire box
        backgroundAttachment: 'fixed', // Fixed background position
        backgroundColor: '#eeeeee',
        position: 'relative',
        pt: 4,
        pb: { xs: 8, md: 10 },
        minHeight: '100vh',
        // Set minimum height to 100% of viewport height
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,

          // Adjust the opacity as needed
          // Adjust the stacking order as needed
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ flexDirection: { xs: 'column', md: 'unset' } }}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 30, md: 42 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    pt: 10,
                    lineHeight: 1.3,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    component="mark"
                    sx={{
                      position: 'relative',
                      color: 'primary.main',
                      fontSize: 'inherit',
                      pt: 6,
                      fontWeight: 'inherit',
                      backgroundColor: 'unset',
                    }}
                  >
                    ALUMNI{' '}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 24, md: 34 },
                        left: 2,
                        transform: 'rotate(3deg)',
                        // '& img': { width: { xs: 146, md: 210 }, height: 'auto' },
                      }}
                    >
                      {/* eslint-disable-next-line */}
                      {/* <img src="/images/headline-curve.svg" alt="Headline curve" /> */}
                    </Box>
                  </Typography>
                  ASSOCIATION OF NAS COLLEGE KANHANGAD{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      position: 'relative',
                      color: 'primary.main',
                    }}
                  ></Typography>{' '}
                  <br />
                  {/* with Different Way */}
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'black', lineHeight: 1.6 }}>
                  {
                    'The association was established as a non-profit organization to assist the alumni, students and faculty of Nehru Arts and Science College Kanhangad. The association together with the management of the College are dedicated towards strengthening the links between the College and its alumni all across the world.'
                  }
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
                <ScrollLink to="popular-course" spy={true} smooth={true} offset={0} duration={350}>
                  <StyledButton onClick={handleMemberRegisterClick} color="primary" size="large" variant="contained">
                    MEMBER REGISTRATION
                  </StyledButton>
                </ScrollLink>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ position: 'relative' }}></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeHero
