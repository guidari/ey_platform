interface IUserRank {
  name: string
  solvedChallenges: number
}

export default function UserRank({ name, solvedChallenges }: IUserRank) {
  return (
    <div className="flex gap-3 mb-5">
      <div>
        <img src="/images/ibm.png" alt="User" className="rounded-full w-12" />
      </div>

      <div>
        <h3 className="text-md font-semibold">{name}</h3>
        <p className="text-sm">
          Solved challenges:{" "}
          <span className="text-yellow-1">{solvedChallenges}</span>
        </p>
      </div>
    </div>
  )
}
