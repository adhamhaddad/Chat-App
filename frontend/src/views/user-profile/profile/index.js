// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import About from 'src/views/user-profile/profile/About'
import Connections from 'src/views/user-profile/profile/Connections'

const ProfileTab = ({ data }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={4} md={5} xs={12}>
        <About about={data.about} contacts={data.contacts} teams={data.teams} overview={data.overview} />
      </Grid>
      <Grid item xl={5} md={7} xs={12}>
        <Connections connections={data.connections} />
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
