import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Button, TextField, Typography, Container, Box } from '@mui/material'
import Header from '../components/header/header_register'
import { Footer } from '@/components/footer'
import { Grid } from '@mui/material'
function RegistrationForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', formData)
      router.push('/login')
      console.log('Registration successful!')
    } catch (error) {
      console.log('Registration failed')
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
          fontSize="2.5rem"
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            zIndex: 1, // Display text above the overlay
          }}
        >
          Member Registration
        </Typography>
        <Typography
          color="white"
          variant="body1"
          align="center"
          fontSize="1.5rem"
          sx={{
            zIndex: 1, // Display text above the overlay
          }}
        >
          Please register to get access to member-only areas of the website
        </Typography>
        <Box
          sx={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(13, 11, 20, 0.9)',
            zIndex: -1, // Adjust the alpha (last) value to control the darkness of the overlay
          }}
        ></Box>
      </Box>
      <Container maxWidth="sm">
        <Grid container spacing={50}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#eeeeee',
                color: 'black',
                padding: '16px',
                borderRadius: '8px',
                margin: '16px auto',
                width: '650px',
                marginTop: '4rem',
                marginLeft: '-16rem',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Eligibility for Registration:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '16px' }}>
                Alumni - individuals who completed a course at Nehru Arts and Science College, Kanhangad.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#eeeeee',
                color: 'black',
                padding: '16px',
                borderRadius: '8px',
                margin: '16px auto',
                width: '350px',
                marginTop: '4rem',
                marginBottom: '2rem',
                boxShadow: '0px 18px 26px rgba(0, 0, 0, 0.9)',
              }}
            >
              <Typography variant="h2" style={{ marginBottom: '16px' }} gutterBottom>
                Registration Form:
              </Typography>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  style={{ marginBottom: '16px' }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  )
}

export default RegistrationForm
