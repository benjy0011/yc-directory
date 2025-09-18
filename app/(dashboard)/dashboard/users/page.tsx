import Link from "next/link";

const array = Array.from({ length: 5 }, (_, index) => index + 1);

export default function Page() {
  return (
    <div>
      <h1>Users</h1>

      <ul>
        {array.map(i => (
          <li key={i}>
            <Link href={`users/${i}`}>User {i}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}