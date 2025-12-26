import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import './FAQAccordion.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
  tags: string[];
}

interface FAQAccordionProps {
  items: FAQItem[];
  activeIndex: number | null;
  onToggle: (index: number) => void;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, activeIndex, onToggle }) => {
  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        
        return (
          <div 
            key={item.id}
            className={`faq-item ${isActive ? 'active' : ''}`}
            data-category={item.category.toLowerCase()}
          >
            <button
              className="faq-question"
              onClick={() => onToggle(index)}
              aria-expanded={isActive}
              aria-controls={`faq-answer-${item.id}`}
            >
              <div className="question-content">
                <span className="question-icon">{item.icon}</span>
                <span className="question-text">{item.question}</span>
              </div>
              <div className="question-meta">
                <span className="category-tag">{item.category}</span>
                <ChevronDown className={`chevron ${isActive ? 'rotated' : ''}`} size={20} />
              </div>
            </button>
            
            <div 
              className="faq-answer-wrapper"
              style={{
                maxHeight: isActive ? '500px' : '0',
                opacity: isActive ? 1 : 0
              }}
            >
              <div 
                id={`faq-answer-${item.id}`}
                className="faq-answer"
                role="region"
                aria-hidden={!isActive}
              >
                <p>{item.answer}</p>
                
                {item.tags && item.tags.length > 0 && (
                  <div className="answer-footer">
                    <div className="tags">
                      {item.tags.map(tag => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="learn-more">
                      <ExternalLink size={14} />
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="active-indicator"></div>
          </div>
        );
      })}
      
      {items.length === 0 && (
        <div className="empty-state">
          <h3>No questions found for this category</h3>
          <p>Try selecting a different category or check back later!</p>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;