export default function GrayBox({
  children,
  title,
  size,
}: {
  children: any
  title: string
  size: string
}) {
  return (
    <section className={`bg-gray-1 w-${size} maxlg:w-5/6 p-5 rounded-md mt-5`}>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-5">{title}</h1>
      </div>
      {children}
    </section>
  )
}
