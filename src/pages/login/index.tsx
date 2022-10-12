import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import router from "next/router"
import { auth } from "../../config/firebase"

export default function Page() {
  const login = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement)
      .value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      console.log("error", error)
      alert("User not found")
    }
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
          Make your first <br></br>step with us!
        </h1>
        <img
          className="mt-10 maxmd:hidden"
          src="/images/step.svg"
          alt="Imagem de um homem subindo uma escada de gráficos"
          width="400"
        />
      </section>
      {/* Login forms */}
      <section className="">
        <div className="flex flex-col justify-center sm:py-12 mt-5">
          <div className="p-5 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="bg-gray-1 shadow w-full rounded-lg px-10 py-5">
              <div className="py-7">
                <input
                  placeholder="E-mail"
                  id="email"
                  type="text"
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-5 text-sm w-full focus:outline-none"
                />

                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="rounded-lg  bg-gray-3 px-4 py-3 mt-1 mb-1 text-sm w-full focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      login()
                    }
                  }}
                />
                <a className="text-sm cursor-pointer hover:opacity-80">
                  I forgot my password
                </a>
                <button
                  type="button"
                  className="mt-5 transition duration-200 bg-yellow-1 text-black w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block hover:opacity-80"
                  onClick={login}
                >
                  <span className="inline-block mr-2">Login</span>
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
              </div>
              {/* Don't have an account? */}
              <p className="text-center mb-5">
                Don't have an account?{" "}
                <Link href="register">
                  <a className="text-yellow-1 cursor-pointer hover:opacity-80">
                    Register
                  </a>
                </Link>
              </p>
              <hr />
              {/* Login with github and LinkedIn */}
              <p className="text-sm text-center my-5 ">Or login with</p>

              <div className="grid grid-cols-2 gap-4 place-items-center">
                <button
                  type="button"
                  className="transition duration-200 bg-gray-3 text-white py-2.5 rounded-lg text-sm font-semibold flex place-items-center gap-4 pl-5 pr-10 hover:opacity-80"
                  disabled
                >
                  <img src="/images/ey-white-logo.png" alt="" className="h-5" />
                  <a
                    className="inline-block mr-2"
                    // onClick={() => signIn("github")}
                  >
                    Account
                  </a>
                </button>
                <button
                  type="button"
                  className="transition duration-200 bg-gray-3 text-white py-2.5 rounded-lg text-sm font-semibold flex place-items-center gap-4 pl-5 pr-10 hover:opacity-80"
                  disabled
                >
                  <img src="/images/linkedin.png" alt="" className="h-5" />
                  <a
                    className="inline-block mr-2"
                    // onClick={() => signIn("linkedin")}
                  >
                    LinkedIn
                  </a>
                </button>
              </div>
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
