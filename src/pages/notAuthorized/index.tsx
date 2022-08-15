import Image from "next/image"

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-5 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-yellow-2 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-yellow-1">Oops!</span>
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-xl">
              You are not logged in
              <br />
              to ssee this page
            </p>
            <a
              href="/login"
              className="mt-5 transition duration-200 bg-yellow-1 text-black w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block hover:opacity-80"
            >
              <span className="inline-block mr-2">Go to Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <div className="mt-4 ml-5">
            <Image src="/images/notAuthorized.svg" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  )
}
