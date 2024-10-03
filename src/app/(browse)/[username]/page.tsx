import Actions from '@/components/pages/user/Actions'
import { getIsUserAlreadyFollowing } from '@/lib/apis/followApis'
import { getUserByUsername } from '@/lib/apis/usersApis'

type UserPageProps = {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const otherUser = (await getUserByUsername(params?.username))?.data || {}

  const { isUserAlreadyFollowing } = (await getIsUserAlreadyFollowing(otherUser?.id))?.data || {}

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {params?.username}</p>
      <p>userId: {otherUser?.id}</p>

      <Actions otherUser={otherUser} isUserAlreadyFollowing={isUserAlreadyFollowing} />
    </div>
  )
}

export default UserPage
