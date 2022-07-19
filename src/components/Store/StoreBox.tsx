interface IStoreBoxPropx {
  image: string
}

export default function StoreBox({ image }: IStoreBoxPropx) {
  return (
    <div className="max-w-md">
      <div className="rounded-md">
        <div className="overflow-hidden">
          <div className="relative rounded-tl-md rounded-tr-md cursor-pointer hover:scale-110 ease-out duration-300 ">
            <img src={image} alt="" />
            <div className="absolute inset-0 z-10 flex place-items-center justify-center opacity-0 hover:opacity-100 ease-out duration-300">
              <span className="bg-yellow-1 text-gray-3 font-semibold px-4 py-2 rounded-md">
                Buy
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between bg-gray-1 p-3 rounded-bl-md rounded-br-md">
        <p>EY Tech Shirt</p>
        <span>25💰</span>
      </div>
    </div>
  )
}
