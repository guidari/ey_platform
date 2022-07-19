import { useContext } from "react"
import Layout from "../../components/Layout"
import StoreBox from "../../components/Store/StoreBox"
import { UserContext } from "../../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className="w-5/6 max-w-screen-xl m-auto">
        <div className="flex maxlg:flex-col gap-5 my-5 place-items-center">
          <h1 className="text-xl font-semibold">
            Welcome to our store {userContext?.name}!
          </h1>
          <p>Shop or redeem our products for free by using EyCoins.</p>
        </div>

        <h1 className="text-2xl font-semibold my-5">Merchandise</h1>
        <div className="grid grid-cols-5 m-auto maxxl:grid-cols-4 maxlg:grid-cols-3 maxmd:grid-cols-2 maxsm:grid-cols-1 gap-5 justify-between">
          <StoreBox image="/images/ey-tshirt.png" />
          <StoreBox image="/images/ey-tshirt.png" />
          <StoreBox image="/images/ey-tshirt.png" />
          <StoreBox image="/images/ey-tshirt.png" />
          <StoreBox image="/images/ey-tshirt.png" />
        </div>

        <h1 className="text-2xl font-semibold my-5">Code challenge boost</h1>
        <div className="grid grid-cols-5 m-auto maxxl:grid-cols-4 maxlg:grid-cols-3 maxmd:grid-cols-2 maxsm:grid-cols-1 gap-5 justify-between">
          <StoreBox image="/images/boost.png" />
          <StoreBox image="/images/boost.png" />
          <StoreBox image="/images/boost.png" />
          <StoreBox image="/images/boost.png" />
          <StoreBox image="/images/boost.png" />
        </div>
      </div>
    </Layout>
  )
}
