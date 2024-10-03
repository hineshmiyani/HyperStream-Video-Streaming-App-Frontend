import Link from 'next/link'

import HyperStream from '@/components/icons/logos/HyperStream'

const Logo = () => (
  <div className="flex items-center">
    <Link href="/">
      <HyperStream width={150} height={24} />
    </Link>
  </div>
)

export default Logo