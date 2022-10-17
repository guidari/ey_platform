import { XIcon } from "@heroicons/react/outline"

export default function Skill({ skill, onClick }) {
  return (
    <button
      key={skill}
      className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <XIcon className="w-4 text-yellow-1 mt-1" />
      {skill}
    </button>
  )
}
