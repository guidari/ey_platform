/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { getAuth, signOut } from "firebase/auth"
import Link from "next/link"
import router from "next/router"
import { Fragment, useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { UserContext } from "../../context/userContext"
import Spinner from "../Spinner"
import Language from "./Language"
import { NavLink } from "./NavLink"
import Notifications from "./Notifications"

import useTranslation from "next-translate/useTranslation"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Header() {
  const { t } = useTranslation()
  const userContext = useContext(UserContext)

  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  // const [userData, setUserData] = useState<any>([])

  // const fetchUserName = async () => {
  //   // if (typeof window !== "undefined" && loading) return null

  //   try {
  //     const q = query(collection(db, "users"), where("id", "==", user?.uid))
  //     const doc = await getDocs(q)
  //     const data = doc.docs[0].data()

  //     setUserData(data)
  //   } catch (err) {}
  // }

  // useEffect((): any => {
  //   if (loading) return
  //   if (!user) return router.push("/login")
  //   fetchUserName()
  // }, [user, loading])

  const logout = () => {
    signOut(auth)
    router.push("/")
  }

  return (
    <Disclosure as="nav" className="bg-gray-3">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/images/ey-white-logo.png"
                      alt="Workflow"
                    />
                  </a>
                  <div className="cursor-pointer">
                    <Link href="/">
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="/images/ey-white-logo.png"
                        alt="Workflow"
                      />
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink title={t("common:home")} href="/" />
                    <NavLink title={t("common:jobs")} href="/jobs" />
                    <NavLink title={t("common:courses")} href="/courses" />
                    <NavLink
                      title={t("common:challenges")}
                      href="/challenges"
                    />
                    <NavLink title={t("common:store")} href="/store" />
                    <NavLink title={t("common:news")} href="/news" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {loading ? (
                  <Spinner />
                ) : !user ? (
                  <Link href="/login">
                    <a className="px-4 py-2 text-sm text-gray-300 flex gap-2 items-center">
                      Sign in
                    </a>
                  </Link>
                ) : (
                  <>
                    <Language />
                    <Notifications />

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  userContext?.image == ""
                                    ? `/images/userGeneric.png`
                                    : `${
                                        userContext?.image
                                      }?noCache=${Math.random()}`
                                }
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/profile">
                                    <a
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Your Profile
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                    onClick={logout}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                <a className="block px-4 py-2 text-sm bg-gray-300 text-gray-700 cursor-pointer">
                                  <strong>
                                    Level {userContext?.userLevel}
                                  </strong>
                                </a>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 grid grid-cols-1">
              <NavLink title={t("common:home")} href="/" />
              <NavLink title={t("common:jobs")} href="/jobs" />
              <NavLink title={t("common:courses")} href="/courses" />
              <NavLink title={t("common:challenges")} href="/challenges" />
              <NavLink title={t("common:store")} href="/store" />
              <NavLink title={t("common:news")} href="/news" />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
