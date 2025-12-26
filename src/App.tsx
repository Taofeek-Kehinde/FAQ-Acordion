import React, { useState } from 'react';
import FAQAccordion from './components/FAQAccordion';
import { 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  Zap,
  Star,
  Users,
  Globe
} from 'lucide-react';
import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqItems = [
    {
      id: 1,
      question: "What is React and why should I use it?",
      answer: "React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM when your data changes. React's component-based architecture makes it easier to build and maintain complex applications.",
      icon: <Zap size={20} />,
      category: "Basics",
      tags: ["React", "Fundamentals"]
    },
    {
      id: 2,
      question: "How do I handle state in React?",
      answer: "React provides several ways to handle state: useState hook for functional components, useReducer for complex state logic, and Context API for global state. For larger applications, you might consider state management libraries like Redux or Zustand. The key is to keep state as close as possible to where it's used.",
      icon: <Star size={20} />,
      category: "State Management",
      tags: ["Hooks", "State", "Redux"]
    },
    {
      id: 3,
      question: "What are React Hooks?",
      answer: "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState (state), useEffect (side effects), useContext (context), useReducer (complex state), and useMemo/useCallback (performance optimization). You can also create custom hooks to reuse stateful logic.",
      icon: <HelpCircle size={20} />,
      category: "Advanced",
      tags: ["Hooks", "Functions"]
    },
    {
      id: 4,
      question: "How does React handle performance optimization?",
      answer: "React uses several techniques: Virtual DOM for efficient updates, React.memo for component memoization, useMemo/useCallback for expensive calculations, code splitting with React.lazy, and Suspense for data fetching. Proper key usage in lists and avoiding unnecessary re-renders are also crucial for performance.",
      icon: <Sparkles size={20} />,
      category: "Performance",
      tags: ["Optimization", "Memoization"]
    },
    {
      id: 5,
      question: "What is the difference between props and state?",
      answer: "Props (properties) are data passed from parent to child components - they are immutable within the child. State is data managed within a component that can change over time, triggering re-renders. Props allow components to be reusable, while state makes components interactive.",
      icon: <MessageSquare size={20} />,
      category: "Basics",
      tags: ["Props", "State", "Fundamentals"]
    },
    {
      id: 6,
      question: "How do I handle forms in React?",
      answer: "React offers two approaches: controlled components (form data handled by React state) and uncontrolled components (form data handled by the DOM). The recommended approach is controlled components using useState hooks. Libraries like React Hook Form or Formik can simplify complex form handling with validation.",
      icon: <BookOpen size={20} />,
      category: "Forms",
      tags: ["Forms", "Validation", "Input"]
    },
    {
      id: 7,
      question: "What is React Router and how do I use it?",
      answer: "React Router is the standard routing library for React. It enables navigation between different components while keeping the UI in sync with the URL. Key components include BrowserRouter, Routes, Route, and Link. Version 6 introduced significant improvements with nested routes and relative links.",
      icon: <Globe size={20} />,
      category: "Routing",
      tags: ["Router", "Navigation", "SPA"]
    },
    {
      id: 8,
      question: "How do I test React applications?",
      answer: "React applications can be tested using Jest (test runner) and React Testing Library (component testing). Key testing strategies include unit tests for individual functions, component tests for UI components, integration tests for component interactions, and end-to-end tests with tools like Cypress or Playwright.",
      icon: <Users size={20} />,
      category: "Testing",
      tags: ["Jest", "Testing", "Quality"]
    }
  ];

  const categories = [...new Set(faqItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const filteredItems = selectedCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const handleAccordionToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCategorySelect = (category: string | 'All') => {
    setSelectedCategory(category);
    setActiveIndex(0); // Reset to first item of new category
  };

  const handleExpandAll = () => {
    setActiveIndex(null); // Will trigger all to close, then open all
    setTimeout(() => {
      const allIndices = filteredItems.map((_, index) => index);
      setActiveIndex(allIndices.length > 0 ? allIndices.length - 1 : null);
    }, 50);
  };

  const handleCollapseAll = () => {
    setActiveIndex(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-icon">
            <HelpCircle size={32} />
          </div>
          <h1>React FAQ Accordion</h1>
          <p className="subtitle">Interactive & Animated Frequently Asked Questions</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <MessageSquare size={24} />
              </div>
              <div className="stat-info">
                <h3>{faqItems.length}</h3>
                <p>Total Questions</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen size={24} />
              </div>
              <div className="stat-info">
                <h3>{categories.length}</h3>
                <p>Categories</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Sparkles size={24} />
              </div>
              <div className="stat-info">
                <h3>{filteredItems.length}</h3>
                <p>Filtered Items</p>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="category-filters">
              <button 
                className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('All')}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="action-buttons">
              <button className="action-btn expand-all" onClick={handleExpandAll}>
                <Zap size={16} />
                Expand All
              </button>
              <button className="action-btn collapse-all" onClick={handleCollapseAll}>
                <Zap size={16} />
                Collapse All
              </button>
            </div>
          </div>

          <div className="faq-container">
            <FAQAccordion 
              items={filteredItems}
              activeIndex={activeIndex}
              onToggle={handleAccordionToggle}
            />
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3><Sparkles size={20} /> Quick Tips</h3>
              <ul>
                <li>Click on any question to expand/collapse</li>
                <li>Use category filters to narrow down questions</li>
                <li>All animations are CSS-powered and smooth</li>
                <li>Fully responsive design for all devices</li>
                <li>Built with TypeScript for type safety</li>
              </ul>
            </div>
            
            <div className="info-card">
              <h3><Users size={20} /> Features</h3>
              <ul>
                <li>✓ Smooth expand/collapse animations</li>
                <li>✓ Category filtering system</li>
                <li>✓ Expand/Collapse All functionality</li>
                <li>✓ Responsive mobile-first design</li>
                <li>✓ Accessible keyboard navigation</li>
                <li>✓ Clean, modern UI with icons</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with Vite + React + TypeScript • Resize to see responsive behavior</p>
        <div className="footer-links">
          <span>Total Questions: {faqItems.length}</span>
          <span>Active Category: {selectedCategory}</span>
          <span>Expanded: {activeIndex !== null ? 'Yes' : 'None'}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;