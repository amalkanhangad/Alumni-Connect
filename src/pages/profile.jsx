import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Header from '../components/header/header'
import { Footer } from '@/components/footer'

import {
  Container,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from '@mui/material'
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    blood_group: '',
    contact_email: '',
    mobile: '',
    predegree_course: '',
    predegree_from_year: '',
    predegree_to_year: '',
    ug_course: '',
    ug_from_year: '',
    ug_to_year: '',
    pg_course: '',
    pg_from_year: '',
    pg_to_year: '',
    phd_course: '',
    phd_from_year: '',
    phd_to_year: '',
  })
  const router = useRouter()
  const contactEmail = router.query.contact_email || ''
  // console.log(contactEmail)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get_user_data?contact_email=${contactEmail}`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <Grid>
          <Typography
            variant="h1"
            sx={{ marginLeft: '25px', marginBottom: '10px', marginTop: '4px', marginRight: 'auto', display: 'block' }}
          >
            Profile
          </Typography>
        </Grid>
        <Grid>
          <Avatar
            alt="Profile Photo"
            src={userData.profile_photo}
            sx={{
              width: 100,
              height: 100,
              marginLeft: '16px',
              marginTop: '16px',
              marginRight: 'auto',
              display: 'block',
            }}
          />
          <Typography
            variant="h5"
            sx={{ marginLeft: '25px', marginBottom: '10px', marginTop: '4px', marginRight: 'auto', display: 'block' }}
          >{`${userData.first_name} ${userData.last_name}`}</Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>Basic Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>{userData.first_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>{userData.last_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>{userData.dob}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>{userData.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>{userData.blood_group}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact Email</TableCell>
                    <TableCell>{userData.contact_email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile</TableCell>
                    <TableCell>{userData.mobile}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* Conditional rendering for Pre-Degree table */}
          {userData.predegree_from_year && (
            <Grid item xs={12}>
              <Typography variant="h4" style={{ marginBottom: '16px' }} gutterBottom>
                Educational details
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Pre-Degree</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell>Programme</TableCell> */}
                      <TableCell>From Year</TableCell>
                      <TableCell>To Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {/* <TableCell>{userData.predegree_course}</TableCell> */}
                      <TableCell>{userData.predegree_from_year}</TableCell>
                      <TableCell>{userData.predegree_to_year}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          {/* Conditional rendering for Undergraduate table */}
          {userData.ug_course && (
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Undergraduate</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Programme</TableCell>
                      <TableCell>From Year</TableCell>
                      <TableCell>To Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{userData.ug_course}</TableCell>
                      <TableCell>{userData.ug_from_year}</TableCell>
                      <TableCell>{userData.ug_to_year}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          {/* Conditional rendering for Postgraduate table */}
          {userData.pg_course && (
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Postgraduate</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Programme</TableCell>
                      <TableCell>From Year</TableCell>
                      <TableCell>To Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{userData.pg_course}</TableCell>
                      <TableCell>{userData.pg_from_year}</TableCell>
                      <TableCell>{userData.pg_to_year}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          {/* Conditional rendering for Ph.D. table */}
          {userData.phd_course && (
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Ph.D.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Programme</TableCell>
                      <TableCell>From Year</TableCell>
                      <TableCell>To Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{userData.phd_course}</TableCell>
                      <TableCell>{userData.phd_from_year}</TableCell>
                      <TableCell>{userData.phd_to_year}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          <Grid sx={{ marginTop: '16px', marginBottom: '16px' }}>
            <Link href={`/edit_profile?contact_email=${contactEmail}`}>
              <a>
                <Button variant="contained" color="primary">
                  Edit Details
                </Button>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}

export default Profile
