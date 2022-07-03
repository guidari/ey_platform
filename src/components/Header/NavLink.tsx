import Link from "next/link"
import { ElementType } from "react"
import { ActiveLink } from "../ActiveLink"

interface NavLinkProps {
  title: string
  href: string
}

export function NavLink({ title, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <a
        href={href}
        className="text-gray-300 hover:bg-gray-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current={href ? "page" : undefined}
      >
        {title}
      </a>
    </ActiveLink>
  )
}
