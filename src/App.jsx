import Cursor          from './components/Cursor'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Hero            from './sections/Hero'
import About           from './sections/About'
import Work            from './sections/Work'
import Skills          from './sections/Skills'
import Contact         from './sections/Contact'
import ChatBot         from './components/ChatBot'
import { useScrollReveal }   from './hooks/useScrollReveal'
import { useScrollProgress } from './hooks/useScrollProgress'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { FaAngleUp } from "react-icons/fa";

export default function App() {
  useScrollReveal()
  const progress = useScrollProgress()

  return (
    <div>
      <div className="progress-bar" style={{ width: progress + '%' }} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      

      {progress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-9 h-9 border border-border rounded-full bg-black text-white text-lg flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all duration-200"
          aria-label="Back to top"
        ><FaAngleUp /></button>
      )}
      <ChatBot />
    </div>
  )
}
