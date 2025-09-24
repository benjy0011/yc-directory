import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user && session?.id
            ? (
              <>
                <Link href="/startup/create">
                  <span className="max-sm:hidden">Create</span>
                  <BadgePlus className="size-6 sm:hidden text-red-500" />
                </Link>

                <form action={async () => {
                  "use server";

                  await signOut( { redirectTo: "/" } );
                }}>
                  <button type="submit">
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="size-6 sm:hidden text-red-500 mt-1" />
                  </button>
                </form>

                <Link href={`/user/${session?.id}`}>
                  {/* <span>{session?.user?.name}</span> */}
                  <Avatar className="size-10">
                    <AvatarImage 
                      src={session?.user?.image ?? ''}
                      alt={session?.user?.name || 'user'}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            )
            : (
              <form action={async () => {
                "use server";
                await signIn("github");
              }}>
                <button type="submit">Sign in with GitHub</button>
              </form>
            )
          }
        </div>
      </nav>
    </div>
  )
}
export default Navbar