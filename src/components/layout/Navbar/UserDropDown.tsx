import { CreditCard, LogOut, Settings, User as UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMutationFactory } from '@/hooks/react-query'
import { logoutUser } from '@/lib/apis/usersApi'
import { clearLocalStorage } from '@/lib/utils/storage'
import { User } from '@/types/userTypes'

type Props = {
  user: User
}

const UserDropDown = ({ user }: Props) => {
  const { mutate } = useMutationFactory({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearLocalStorage()
      window.location.reload()
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" alignOffset={0}>
        <DropdownMenuLabel className="flex items-center gap-2.5 font-normal">
          <UserIcon className="h-8 w-8 flex-shrink-0" />
          <p className="w-4/5 truncate">{user.username}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => mutate()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDown
