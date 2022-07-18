import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="text-center mt-5">
      <h1>Access Denied</h1>
      <Link href="/login">You must be signed in to view this page</Link>
    </div>
  )
}
