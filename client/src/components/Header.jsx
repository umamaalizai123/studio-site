export default function Header() {
  return (
    <header className="flex flex-col items-center gap-2 bg-berry px-[5%] py-4 sm:flex-row sm:justify-between">
      <a href="#top" className="text-xl font-extrabold text-white">
        Aafiyat Pilates
      </a>
      <nav aria-label="Main">
        <ul className="flex gap-5">
          <li><a href="#schedule" className="text-white hover:underline">Schedule</a></li>
          <li><a href="#trainers" className="text-white hover:underline">Trainers</a></li>
          <li><a href="#membership" className="text-white hover:underline">Membership</a></li>
        </ul>
      </nav>
    </header>
  )
}