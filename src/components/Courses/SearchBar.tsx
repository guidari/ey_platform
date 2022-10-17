export function SearchBar({ title, eventFunction, ...rest }: any) {
  return (
    <div className="mt-5 flex border-1 rounded-md w-[90%] maxmd:w-[100%] place-items-center h-10 bg-white">
      <input
        type="text"
        className="text-black px-4 w-[90%] maxmd:w-[100%]  bg-white rounded-tr rounded-br focus:outline-none"
        placeholder={title}
        // onKeyPress={(event) => {
        //   if (event.key === "Enter") {
        //     eventFunction()
        //   }
        // }}
        {...rest}
      />

      <span className=" rounded-tl rounded-bl mr-2">
        <svg
          className="w-6 h-6 py-1"
          fill="bg-yellow-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
        </svg>
      </span>
    </div>
  )
}
