// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

import io from 'socket.io-client'
/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return '/user-profile/profile'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)
      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
