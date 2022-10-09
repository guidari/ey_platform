import DailyCoin from "../dailyCoin"
import Footer from "../Footer/footer"
import Header from "../Header/header"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <DailyCoin />

      <main>{children}</main>
      <Footer />
    </>
  )
}
