import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MuiAlert from '@mui/material/Alert'
import Header from '../components/header/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function EditStudentForm() {
  const router = useRouter()
  const contactEmail = router.query.contact_email || ''

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    blood_group: '',
    working_status: 'Student',
    job: '',
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

  const [educationalDetails, setEducationalDetails] = useState({
    predegree: {
      checked: false,
      course: '',
    },
    undergraduate: {
      checked: false,
      course: '',
    },
    postgraduation: {
      checked: false,
      course: '',
    },
    phd: {
      checked: false,
      course: '',
    },
  })
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  useEffect(() => {
    const encodedContactEmail = encodeURIComponent(contactEmail)

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_user_data?contact_email=${contactEmail}`)
        console.log(response)
        const alumniData = response.data // Assuming your API returns alumni data

        // Prepopulate the form fields with the fetched data
        setFormData({
          ...formData,
          first_name: alumniData.first_name,
          last_name: alumniData.last_name,
          dob: alumniData.dob,
          gender: alumniData.gender,
          blood_group: alumniData.blood_group,
          //   working_status: alumniData.working_status,
          //   job: alumniData.job,
          contact_email: alumniData.contact_email,
          mobile: alumniData.mobile,
          predegree_course: alumniData.predegree_course,
          predegree_from_year: alumniData.predegree_from_year,
          predegree_to_year: alumniData.predegree_to_year,
          ug_course: alumniData.ug_course,
          ug_from_year: alumniData.ug_from_year,
          ug_to_year: alumniData.ug_to_year,
          pg_course: alumniData.pg_course,
          pg_from_year: alumniData.pg_from_year,
          pg_to_year: alumniData.pg_to_year,
          phd_course: alumniData.phd_course,
          phd_from_year: alumniData.phd_from_year,
          phd_to_year: alumniData.phd_to_year,
        })

        // Prepopulate the checkboxes
        setEducationalDetails({
          predegree: {
            ...educationalDetails.predegree,
            checked: alumniData.educationalDetails.predegree.checked,
          },
          undergraduate: {
            ...educationalDetails.undergraduate,
            checked: alumniData.educationalDetails.undergraduate.checked,
          },
          postgraduation: {
            ...educationalDetails.postgraduation,
            checked: alumniData.educationalDetails.postgraduation.checked,
          },
          phd: {
            ...educationalDetails.phd,
            checked: alumniData.educationalDetails.phd.checked,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setEducationalDetails({
      ...educationalDetails,
      [name]: { ...educationalDetails[name], checked },
    })
  }

  const handleEducationalDetailChange = (e) => {
    const { name, value } = e.target
    const [level, field] = name.split('_')
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToSend = {
      ...formData,
      educationalDetails,
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/update_alumni/', formData)
      console.log('Data updated successfully')
    } catch (error) {
      console.log('Updation failed')
    }
  }

  return (
    <div>
      <Header />
      <Container
        maxWidth="lg"
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Basic information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DOB"
                type="date"
                name="dob"
                placeholder=""
                value={formData.dob}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Blood group</InputLabel>
                <Select label="Blood group" name="blood_group" value={formData.blood_group} onChange={handleChange}>
                  <MenuItem value="">
                    <em>Select Blood Group</em>
                  </MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Working Status</InputLabel>
                <Select
                  label="Working Status"
                  name="working_status"
                  value={formData.working_status}
                  onChange={handleChange}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Working">Working</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.working_status === 'Working' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Educational details:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={educationalDetails.predegree.checked}
                    onChange={handleCheckboxChange}
                    name="predegree"
                  />
                }
                label="Predegree"
              />
              {educationalDetails.predegree.checked && (
                <div>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>From Year</InputLabel>
                    <Select
                      label="From Year"
                      name="predegree_from_year"
                      value={formData.predegree_from_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {2000 + index}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>To Year</InputLabel>
                    <Select
                      label="To Year"
                      name="predegree_to_year"
                      value={formData.predegree_to_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={educationalDetails.undergraduate.checked}
                    onChange={handleCheckboxChange}
                    name="undergraduate"
                  />
                }
                label="Undergraduate"
              />
              {educationalDetails.undergraduate.checked && (
                <div>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Programme</InputLabel>
                    <Select
                      label="Course"
                      name="ug_course"
                      value={formData.ug_course}
                      onChange={handleEducationalDetailChange}
                    >
                      <MenuItem value="">Select Programme</MenuItem>
                      <MenuItem value="B.A. Economics">B.A. Economics</MenuItem>
                      <MenuItem value="B.A. History">B.A. History</MenuItem>
                      <MenuItem value="B.A. History and Economics(Double Main)">B.A. History and Economics(Double Main)</MenuItem>
                      <MenuItem value="B.A. Malayalam">B.A. Malayalam</MenuItem>
                      <MenuItem value="B.Sc. Mathematics">B.Sc. Mathematics</MenuItem>
                      <MenuItem value="B.Sc. Mathematics & Statistics (Double Main)">B.Sc. Mathematics & Statistics (Double Main)</MenuItem>
                      <MenuItem value="B.Sc. Physics">B.Sc. Physics</MenuItem>
                      <MenuItem value="B.Sc. Plant Science">B.Sc. Plant Science</MenuItem>
                      <MenuItem value="B.Sc. Polymer Chemistry">B.Sc. Polymer Chemistry</MenuItem>
                      <MenuItem value="B.Sc. Statistics">B.Sc. Statistics</MenuItem>
                      <MenuItem value="B.Sc. Zoology">B.Sc. Zoology</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>From Year</InputLabel>
                    <Select
                      label="From Year"
                      name="ug_from_year"
                      value={formData.ug_from_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>To Year</InputLabel>
                    <Select
                      label="To Year"
                      name="ug_to_year"
                      value={formData.ug_to_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={educationalDetails.postgraduation.checked}
                    onChange={handleCheckboxChange}
                    name="postgraduation"
                  />
                }
                label="Postgraduation"
              />
              {educationalDetails.postgraduation.checked && (
                <div>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Programme</InputLabel>
                    <Select
                      label="Course"
                      name="pg_course"
                      value={formData.pg_course}
                      onChange={handleEducationalDetailChange}
                    >
                      <MenuItem value="">Select Programme</MenuItem>
                      <MenuItem value="M.A.English">M.A. English</MenuItem>
                      <MenuItem value="M.Com.">M.Com.</MenuItem>
                      <MenuItem value="M.Sc. Computer Science(Int.)">M.Sc. Computer Science(Int.)</MenuItem>
                      <MenuItem value="M.Sc. Physics">M.Sc. Physics</MenuItem>
                      <MenuItem value="M.Sc. Statistics">M.Sc. Statistics</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>From Year</InputLabel>
                    <Select
                      label="From Year"
                      name="pg_from_year"
                      value={formData.pg_course}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>To Year</InputLabel>
                    <Select
                      label="To Year"
                      name="pg_to_year"
                      value={formData.pg_to_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={educationalDetails.phd.checked} onChange={handleCheckboxChange} name="phd" />
                }
                label="PhD"
              />
              {educationalDetails.phd.checked && (
                <div>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Programme</InputLabel>
                    <Select
                      label="Course"
                      name="phd_course"
                      value={formData.phd_course}
                      onChange={handleEducationalDetailChange}
                    >
                      <MenuItem value="">Select Programme</MenuItem>
                      <MenuItem value="Statistics">Statistics</MenuItem>
                      <MenuItem value="PhD">PhD</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>From Year</InputLabel>
                    <Select
                      label="From Year"
                      name="phd_from_year"
                      value={formData.phd_from_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>To Year</InputLabel>
                    <Select
                      label="To Year"
                      name="phd_to_year"
                      value={formData.phd_to_year}
                      onChange={handleEducationalDetailChange}
                    >
                      {Array.from({ length: 21 }, (_, index) => (
                        <MenuItem key={index} value={(2000 + index).toString()}>
                          {(2000 + index).toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {/* <Button type="submit" variant="outlined" color="primary" size="large">
                Submit
              </Button> */}
              <Stack spacing={2} sx={{ width: '14%' }}>
                <Button type="submit" variant="outlined" color="primary" size="large" onClick={handleClick}>
                  Make changes
                </Button>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Data edited Successfully!
                  </Alert>
                </Snackbar>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
    </div>
  )
}

export default EditStudentForm
