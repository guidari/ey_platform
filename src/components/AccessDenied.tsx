export default function AccessDenied() {
  return (
    <div className="flex flex-row justify-center mt-5">
      <h1>Access Denied</h1>
      <p>
        <a href="/login">You must be signed in to view this page</a>
      </p>
    </div>
  )
}
