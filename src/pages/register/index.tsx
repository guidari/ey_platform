import { useRouter } from "next/router"
import { auth } from "../../config/firebase"

import { Box } from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { createUser } from "../../services/user.service"

export default function Page() {
  const router = useRouter()

  const registerUser = async (e: any) => {
    e.preventDefault()
    const email = (document.getElementById("email") as HTMLInputElement).value
    const name = (document.getElementById("name") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement)
      .value
    const passwordCheck = (
      document.getElementById("passwordCheck") as HTMLInputElement
    ).value
    if (password !== passwordCheck) {
      alert("Type the same password")
      return false
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred: any) => {
        const userId = cred.user.uid

        return createUser(userId, email, name)
      })
      .then(() => {
        console.log("User created")
        router.push("/")
      })
  }

  return (
    <div className="grid md:grid-cols-2 gap-2 place-items-center bg-gray-3 sm:grid grid-cols-1 max-w-7xl m-auto ">
      <section className="">
        <img
          className="h-24"
          src="/images/ey-white-logo.png"
          alt="EY Logo branco com traço amarelo em cima"
        />
        <h1 className="text-5xl font-bold mt-5">
          Make you first <br></br>step with us!
        </h1>
        <img
          className="mt-10 maxmd:hidden"
          src="/images/step-tree.svg"
          alt="Imagem de um homem subindo uma escada de gráficos"
          width="400"
        />
      </section>
      {/* Login forms */}
      <section className="">
        <div className="flex flex-col justify-center sm:py-12 mt-5">
          <div className="p-5 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="bg-gray-1 shadow w-full rounded-lg px-10 py-5">
              <Box className="py-7" component="form" onSubmit={registerUser}>
                <input
                  placeholder="Full name"
                  id="name"
                  type="text"
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-5 text-sm w-full focus:outline-none"
                  required
                />

                <input
                  placeholder="E-mail"
                  id="email"
                  type="email"
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-5 text-sm w-full focus:outline-none"
                  required
                />
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-5 text-sm w-full focus:outline-none"
                  minLength={6}
                  required
                />
                <input
                  placeholder="Confirm password"
                  id="passwordCheck"
                  type="password"
                  minLength={6}
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-1 text-sm w-full focus:outline-none"
                  required
                />

                <button
                  className="mt-5 transition duration-200 bg-yellow-1 text-black w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block hover:opacity-80"
                  type="submit"
                >
                  <span className="inline-block mr-2">Register</span>
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
                </button>
                <Box
                  sx={{ textAlign: "center", marginTop: 2, marginBottom: -1 }}
                >
                  <Link href="login"> Back to login</Link>
                </Box>
              </Box>
            </div>

            {/* Back to home */}
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-yellow-1 focus:outline-none focus:bg-yellow-1 hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <Link href="/">
                      <a className="inline-block ml-1">Back to home</a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
