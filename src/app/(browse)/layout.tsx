import Navbar from '@/components/layout/Navbar'

type Props = {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-[60px]">{children}</div>
    </>
  )
}

export default BrowseLayout
