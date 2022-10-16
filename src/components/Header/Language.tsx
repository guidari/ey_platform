/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from "@headlessui/react"
import { Box } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

export default function Language() {
  const router = useRouter()

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                />
              </svg>
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
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {router.locales?.map((locale) => {
                return (
                  <Menu.Item key={locale}>
                    <Box
                      sx={{
                        color: "var(--gray-700)",
                        paddingX: 2,
                        paddingY: 1,
                      }}
                    >
                      <Link
                        href={router.asPath}
                        locale={locale}
                        className={
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        }
                      >
                        {locale === "en-US" ? "English" : "Portuguese"}
                      </Link>
                    </Box>
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
