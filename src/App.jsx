import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Certificates from './components/Certificates';
import Management from './components/Management';
import OrgChart from './components/OrgChart';
import History from './components/History';
import Gallery from './components/Gallery';
import Scope from './components/Scope';
import Clients from './components/Clients';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <WhyUs />
        <Certificates />
        <Management />
        <OrgChart />
        <History />
        <Gallery />
        <Scope />
        <Clients />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
