import Header from "./Header/header"
import Footer from "./Footer/footer"
import { useSession } from "next-auth/react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
