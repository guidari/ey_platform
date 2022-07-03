import { cloneElement, ReactElement } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  // const router = useRouter()
  const { asPath } = useRouter()

  let isActive = false

  if (asPath === rest.href || asPath === rest.as) {
    isActive = true
  }

  // If we need to use router at subpages we are gonna need to implement this one below
  // if (
  //   shouldMatchExactHref &&
  //   (router.asPath === rest.href || router.asPath === rest.as)
  // ) {
  //   isActive = true
  // }

  // if (
  //   !shouldMatchExactHref &&
  //   (router.asPath.startsWith(String(rest.href)) ||
  //     router.asPath.startsWith(String(rest.as)))
  // ) {
  //   isActive = true
  // }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: isActive
          ? "bg-yellow-1 text-black px-3 py-2 rounded-md text-sm font-medium"
          : "text-gray-300 hover:bg-gray-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
      })}
    </Link>
  )
}
