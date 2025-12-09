import { PremiumSubscribers } from '@/components/premiumSubscribe'
import { PremiumUsers } from '@/components/PremiumUser'
import { PremiumUsersSearch } from '@/components/search-user'

const ManageUser = () => {
  return (
    <>
    <PremiumUsers/>
    <PremiumUsersSearch/>
    <PremiumSubscribers/>
    </>
  )
}

export default ManageUser