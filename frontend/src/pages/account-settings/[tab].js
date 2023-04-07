// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import AccountSettings from 'src/views/account-settings/AccountSettings'

const AccountSettingsTab = ({ tab, apiPricingPlanData }) => {
  return <AccountSettings tab={tab} apiPricingPlanData={apiPricingPlanData} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'notifications' } },
      { params: { tab: 'connections' } }
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default AccountSettingsTab
