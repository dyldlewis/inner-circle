import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
      <img className="mx-auto h-48 w-48" src="../logo.png" />
      <h1 className="text-3xl text-lime-600 ">InnerCircle</h1>
      <div className="flex justify-between w-45 mt-6">
        <Link className="mx-4 border 2 py-2 px-4 rounded opacity-90 bg-yellow-950 hover:bg-yellow-900 text-lime-600"href="/login">
          Login
        </Link>
        <Link className="mx-4 border 2 py-2 px-4 rounded opacity-90 bg-yellow-950 hover:bg-yellow-900 text-lime-600"href="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  )
}
