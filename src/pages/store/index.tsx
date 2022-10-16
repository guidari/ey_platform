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
          {userContext && (
            <p>Shop or redeem our products for free by using EyCoins.</p>
          )}
          {!userContext && (
            <p>
              <a className="text-yellow-2" href="/login">
                Sign in
              </a>{" "}
              to redeem our products for free using EyCoins.
            </p>
          )}
        </div>

        <div className="flex justify-between place-items-center">
          <h1 className="text-2xl font-semibold my-5">Merchandise</h1>
          <div className="bg-yellow-2 p-2 rounded-md">
            <h1 className="text-black font-semibold">
              Your EY Coin: 💰 <span>{userContext?.eycoin}</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-5 m-auto maxxl:grid-cols-4 maxlg:grid-cols-3 maxmd:grid-cols-2 maxsm:grid-cols-1 gap-5 justify-between">
          <StoreBox image="/images/ey-tshirt.png" price={5} />
          <StoreBox image="/images/hat.jpg" price={15} />
          <StoreBox image="/images/ey-tshirt.png" price={150} />
          <StoreBox image="/images/cup.jpg" price={10} />
          <StoreBox image="/images/ey-tshirt.png" price={5} />
        </div>

        <h1 className="text-2xl font-semibold my-5">Code challenge boost</h1>
        <div className="grid grid-cols-5 m-auto maxxl:grid-cols-4 maxlg:grid-cols-3 maxmd:grid-cols-2 maxsm:grid-cols-1 gap-5 justify-between">
          <StoreBox image="/images/boost.png" price={5} />
          <StoreBox image="/images/boost.png" price={5} />
          <StoreBox image="/images/boost.png" price={5} />
          <StoreBox image="/images/boost.png" price={5} />
          <StoreBox image="/images/boost.png" price={5} />
        </div>
      </div>
    </Layout>
  )
}
