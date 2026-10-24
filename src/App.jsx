import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-blush text-ink">
      <Header />
      <main>
        <Hero />
        <section id="schedule" className="px-[5%] py-12">
          <h2 className="text-2xl font-bold text-berry">Class schedule</h2>
        </section>
      </main>
      <Footer />
    </div>
  )
}