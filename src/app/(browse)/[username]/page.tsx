import Actions from '@/components/pages/user/Actions'
import { getIsUserAlreadyFollowing } from '@/lib/apis/followApis'
import { getUserByUsername } from '@/lib/apis/usersApis'

type UserPageProps = {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = (await getUserByUsername(params?.username))?.data || {}

  const { isUserAlreadyFollowing } = (await getIsUserAlreadyFollowing(user?.id))?.data || {}

  return (
    <div>
      <p>UserPage {params?.username}</p>

      <Actions user={user} isUserAlreadyFollowing={isUserAlreadyFollowing} />
    </div>
  )
}

export default UserPage
