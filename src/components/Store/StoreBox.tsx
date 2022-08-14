import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"

interface IStoreBoxPropx {
  image: string
  price: number
}

export default function StoreBox({ image, price }: IStoreBoxPropx) {
  const userContext = useContext(UserContext)

  function buyItem() {
    console.log("price", price)
    if (userContext!.eycoin < price) {
      alert("You don't have enough coins to buy this")
    }

    const updatedEycoin = userContext!.eycoin - price
    updateDoc(doc(db, `users/${userContext?.id}`), {
      eycoin: updatedEycoin,
    })
    alert("Your item was bought")
  }

  const [user, setUser] = useState<DocumentData>()

  useEffect(() => {
    onSnapshot(doc(db, "users", "BW8uXvorZMOuXf6pfKGHqcqv9O23"), (doc) => {
      setUser(doc.data())
    })
  }, [])

  console.log("user", user)

  return (
    <div className="max-w-md">
      <div className="rounded-md">
        <div className="overflow-hidden">
          <div className="relative rounded-tl-md rounded-tr-md cursor-pointer hover:scale-110 ease-out duration-300 ">
            <img src={image} alt="" />
            <div className="absolute inset-0 z-10 flex place-items-center justify-center opacity-0 hover:opacity-100 ease-out duration-300">
              <button
                onClick={buyItem}
                className="bg-yellow-1 text-gray-3 font-semibold px-4 py-2 rounded-md"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-gray-1 p-3 rounded-bl-md rounded-br-md">
        <p>EY Tech Shirt</p>
        <span className="text-yellow-2">💰 {price}</span>
      </div>
    </div>
  )
}
