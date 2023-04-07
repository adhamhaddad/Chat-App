// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const data = {
  profileHeader: {
    fullName: 'Adham Haddad',
    location: 'Egypt Giza',
    joiningDate: 'April 2023',
    designation: 'Full-Stack Developer',
    profileImg: '/images/avatars/1.png',
    designationIcon: 'mdi:fountain-pen-tip',
    coverImg: '/images/profile-banner.png'
  },
  profile: {
    about: [
      { property: 'Full Name', value: 'Adham Haddad', icon: 'mdi:account-outline' },
      { property: 'Status', value: 'active', icon: 'mdi:check' },
      { property: 'Role', value: 'Developer', icon: 'mdi:star-outline' },
      { property: 'Country', value: 'EG', icon: 'mdi:flag-outline' },
      { property: 'Language', value: 'Arabic', icon: 'mdi:translate' }
    ],
    contacts: [
      { property: 'Contact', value: '(20) 1113833449', icon: 'mdi:phone-outline' },
      { property: 'Skype', value: 'john.doe', icon: 'mdi:message-outline' },
      { property: 'Email', value: 'adhamhaddad.dev@gm.com', icon: 'mdi:email-outline' }
    ],
    connections: [
      {
        isFriend: false,
        connections: '45',
        name: 'Cecilia Payne',
        avatar: '/images/avatars/2.png'
      },
      {
        isFriend: true,
        connections: '1.32k',
        name: 'Curtis Fletcher',
        avatar: '/images/avatars/3.png'
      },
      {
        isFriend: true,
        connections: '125',
        name: 'Alice Stone',
        avatar: '/images/avatars/4.png'
      },
      {
        isFriend: false,
        connections: '456',
        name: 'Darrell Barnes',
        avatar: '/images/avatars/5.png'
      },
      {
        isFriend: false,
        connections: '1.2k',
        name: 'Eugenia Moore',
        avatar: '/images/avatars/8.png'
      }
    ]
  },
  connections: [
    {
      tasks: '834',
      projects: '18',
      isConnected: true,
      connections: '129',
      name: 'Mark Gilbert',
      designation: 'UI Designer',
      avatar: '/images/avatars/1.png',
      chips: [
        {
          title: 'Figma',
          color: 'secondary'
        },
        {
          title: 'Sketch',
          color: 'warning'
        }
      ]
    },
    {
      tasks: '2.31k',
      projects: '112',
      isConnected: false,
      connections: '1.28k',
      name: 'Eugenia Parsons',
      designation: 'Developer',
      avatar: '/images/avatars/2.png',
      chips: [
        {
          color: 'error',
          title: 'Angular'
        },
        {
          color: 'info',
          title: 'React'
        }
      ]
    },
    {
      tasks: '1.25k',
      projects: '32',
      isConnected: false,
      connections: '890',
      name: 'Francis Byrd',
      designation: 'Developer',
      avatar: '/images/avatars/3.png',
      chips: [
        {
          title: 'HTML',
          color: 'primary'
        },
        {
          color: 'info',
          title: 'React'
        }
      ]
    },
    {
      tasks: '12.4k',
      projects: '86',
      isConnected: false,
      connections: '890',
      name: 'Leon Lucas',
      designation: 'UI/UX Designer',
      avatar: '/images/avatars/4.png',
      chips: [
        {
          title: 'Figma',
          color: 'secondary'
        },
        {
          title: 'Sketch',
          color: 'warning'
        },
        {
          color: 'primary',
          title: 'Photoshop'
        }
      ]
    },
    {
      tasks: '23.8k',
      projects: '244',
      isConnected: true,
      connections: '2.14k',
      name: 'Jayden Rogers',
      designation: 'Full Stack Developer',
      avatar: '/images/avatars/5.png',
      chips: [
        {
          color: 'info',
          title: 'React'
        },
        {
          title: 'HTML',
          color: 'warning'
        },
        {
          color: 'success',
          title: 'Node.js'
        }
      ]
    },
    {
      tasks: '1.28k',
      projects: '32',
      isConnected: false,
      designation: 'SEO',
      connections: '1.27k',
      name: 'Jeanette Powell',
      avatar: '/images/avatars/6.png',
      chips: [
        {
          title: 'Analysis',
          color: 'secondary'
        },
        {
          color: 'success',
          title: 'Writing'
        }
      ]
    }
  ]
}

mock.onGet('/profile').reply(config => {
  const { tab = '' } = config.params ?? ''

  // @ts-ignore
  return [200, data[tab]]
})
mock.onGet('/profile-header').reply(() => {
  return [200, data.profileHeader]
})
mock.onGet('/profile-table').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = projectTable.filter(row => {
    return (
      row.name.toLowerCase().includes(queryLowered) ||
      row.date.toLowerCase().includes(queryLowered) ||
      row.leader.toLowerCase().includes(queryLowered)
    )
  })

  return [200, filteredData]
})
