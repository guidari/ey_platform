export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-2 place-items-center">
      <section className="m-20 bg-red-500">
        <img
          className="h-28"
          src="/images/ey-white-logo.png"
          alt="EY Logo branco com traço amarelo em cima"
        />
        <h1 className="text-5xl font-bold mt-5">Make you first step with us</h1>
        <img
          className="mt-20 h-50"
          src="/images/step.svg"
          alt="EY Logo branco com traço amarelo em cima"
          width="400"
        />
      </section>
      <section className="m-20 bg-red-500">forms</section>
    </div>
  )
}
