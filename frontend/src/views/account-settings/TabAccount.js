// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/components/icon'

const initialData = {
  state: '',
  number: '',
  email: 'adham.haddad@example.com',
  firstName: 'Adham',
  lastName: 'Ashraf',
  country: 'egypt'
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userInput, setUserInput] = useState('yes')
  const [formData, setFormData] = useState(initialData)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })
  const handleClose = () => setOpen(false)
  const handleSecondDialogClose = () => setSecondDialogOpen(false)
  const onSubmit = () => setOpen(true)

  const handleConfirmation = value => {
    handleClose()
    // ! Enter axios send request here
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Account Details' />
          <form>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography sx={{ mt: 5, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div>
              </Box>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='First Name'
                    placeholder='John'
                    value={formData.firstName}
                    onChange={e => handleFormChange('firstName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={e => handleFormChange('lastName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={formData.email}
                    placeholder='john.doe@example.com'
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Phone Number'
                    value={formData.number}
                    placeholder='202 555 0111'
                    onChange={e => handleFormChange('number', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='State'
                    placeholder='California'
                    value={formData.state}
                    onChange={e => handleFormChange('state', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      label='Country'
                      value={formData.country}
                      onChange={e => handleFormChange('country', e.target.value)}
                    >
                      <MenuItem value='egypt'>Egypt</MenuItem>
                      <MenuItem value='australia'>Australia</MenuItem>
                      <MenuItem value='canada'>Canada</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                      <MenuItem value='united-states'>United States</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 3 }}>
                    Save Changes
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Delete Account' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name='checkbox'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label='I confirm my account deactivation'
                        sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                        control={
                          <Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                      Please confirm you want to delete account
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                Deactivate Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>Are you sure you would like to deactivate your account?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
            </Typography>
            <Typography>
              {userInput === 'yes' ? 'Your account has been deactivated.' : 'Account Deactivation Cancelled!'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default TabAccount
