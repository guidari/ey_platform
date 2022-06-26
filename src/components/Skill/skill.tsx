import { XIcon } from "@heroicons/react/outline"

export default function Skill({ skill }: { skill: string }) {
  console.log("skill component", skill)
  return (
    <span
      key={skill}
      className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer"
    >
      <XIcon className="w-4 text-yellow-1" />
      {skill}
    </span>
  )
}
