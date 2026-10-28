import Header from './components/Header'
import Hero from './components/Hero'
import ClassesSection from './components/ClassesSection'
import Gallery from './components/Gallery'
import TrainersSection from './components/TrainersSection'
import Footer from './components/Footer'
import MembershipSection from './components/MembershipSection'
import AuthSection from './components/AuthSection'
export default function App() {
  return (
    <div className="min-h-screen bg-blush text-ink">
      <Header />
      <main>
        <Hero />
         <ClassesSection />
         <Gallery />
         <TrainersSection />
         <MembershipSection />
         <AuthSection />
      </main>
      <Footer />
    </div>
  )
}