/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/outline"
import { Fragment, useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../config/firebase"
import { UserContext } from "../../context/userContext"

export default function Notifications() {
  const userContext = useContext(UserContext)
  const [user, loading, error] = useAuthState(auth)

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
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
              className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {user && (
                <Menu.Item>
                  <div className="block px-4 py-2 text-sm text-gray-700 font-semibold cursor-pointer divide-y divide-gray-700 ">
                    {userContext?.notifications.map((item: any) => {
                      return (
                        <div className="mb-2">
                          <div className="flex justify-between mt-2 place-items-center">
                            <p>🔔 {item.title}</p>
                            <p className="text-xs">{item.date}</p>
                          </div>
                          <p className="mb-2 ">{item.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
