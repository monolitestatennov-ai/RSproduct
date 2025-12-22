import { Route, Router } from 'wouter';
import Home from './pages/Home';
import PropertyCard from './pages/PropertyCard';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import MobileNavigation from './components/MobileNavigation';

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/property" component={PropertyCard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/dashboard" component={Dashboard} />
      <MobileNavigation />
    </Router>
  );
}

export default App;

