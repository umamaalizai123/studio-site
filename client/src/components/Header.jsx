import { authClient } from '../auth-client'

export default function Header() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <header className="flex flex-col items-center gap-2 bg-berry px-[5%] py-4 sm:flex-row sm:justify-between">
      <a href="#top" className="text-xl font-extrabold text-white">
        Aafiyat Pilates
      </a>
      <nav aria-label="Main">
        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <li><a href="#schedule" className="text-white hover:underline">Schedule</a></li>
          <li><a href="#trainers" className="text-white hover:underline">Trainers</a></li>
          <li><a href="#membership" className="text-white hover:underline">Membership</a></li>
          <li>
            {isPending ? null : session ? (
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="rounded-full border border-white px-4 py-1 text-sm font-semibold text-white hover:bg-white/10"
              >
                Sign out
              </button>
            ) : (
              <a
                href="#account"
                className="rounded-full border border-white px-4 py-1 text-sm font-semibold text-white hover:bg-white/10"
              >
                Sign in
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}