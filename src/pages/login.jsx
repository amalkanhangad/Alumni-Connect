import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material'
import { Footer } from '@/components/footer'
import Header from '../components/header/header'
// import AuthNavigation from '../components/navigation/auth-navigation'

function LoginForm() {
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user_login/', loginData)

      if (response.status === 200) {
        router.push('/create_profile')
        console.log('OKAY')
      } else {
        console.log('Server returned an unexpected status code:', response.status)
      }
    } catch (error) {
      console.error('An error occurred while making the request:', error)
    }
  }

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('/images/nehru.jpeg')`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundColor: '#DDE6ED',
          position: 'relative',
          color: 'white',
          pt: 4,
          pb: { xs: 4, md: 6 }, // Adjusted spacing
          minHeight: '35vh',
          zIndex: -1,
          // '&::before': {
          //   content: '""',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   width: '100%',
          //   height: '100%',
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha (last) value to control the darkness of the overlay
          // },
        }}
      >
        <Typography
          color="white"
          fontSize="3.5rem"
          variant="h1"
          align="center"
          sx={{
            zIndex: 1, // Display text above the overlay
          }}
        >
          Member Login
        </Typography>
        <Typography
          color="white"
          variant="body1"
          align="center"
          fontSize="1.2rem"
          sx={{
            zIndex: 1, // Display text above the overlay
          }}
        >
          Please log in to access your account.
        </Typography>
        <Box
          sx={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(13, 11, 20, 0.8)',
            zIndex: -1, // Adjust the alpha (last) value to control the darkness of the overlay
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          backgroundColor: '#eeeeee',
          color: 'black',
          padding: '16px',
          borderRadius: '8px',
          margin: '16px auto',
          width: '350px',
          marginTop: '4rem',
          marginBottom: '4rem',
          boxShadow: '0px 10px 22px rgba(0, 0, 0, 0.9)',
        }}
      >
        <Container component="main" maxWidth="xs">
          <div>
            <Typography variant="h2" align="center" color="black" marginBottom="16px">
              Log in to your account
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  variant="outlined"
                  value={loginData.email}
                  onChange={handleChange}
                  style={{ marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                  value={loginData.password}
                  onChange={handleChange}
                  style={{ marginBottom: '16px' }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Log in
            </Button>
          </form>
        </Container>
      </Box>

      <Footer />
    </div>
  )
}

export default LoginForm
