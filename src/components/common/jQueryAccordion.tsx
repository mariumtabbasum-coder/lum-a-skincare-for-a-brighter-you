import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface JQueryAccordionProps {
  items: FAQItem[];
  id?: string;
}

/**
 * FAQ Accordion enhanced selectively via jQuery (slideToggle)
 * Adheres strictly to:
 * 1. Semantic button triggers with aria-expanded and aria-controls
 * 2. Scoped DOM reference via useRef (never touches React-controlled virtual DOM)
 * 3. Complete event listener cleanup in useEffect return
 */
export const JQueryAccordion: React.FC<JQueryAccordionProps> = ({ items, id = 'faq-accordion' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $container = $(containerRef.current!);
    if (!$container.length) return;

    // Attach click handler to header buttons
    const $buttons = $container.find('.faq-trigger');

    function handleClick(this: HTMLElement, e: JQuery.TriggeredEvent) {
      e.preventDefault();
      const $btn = $(this);
      const $content = $btn.next('.faq-content');
      const isExpanded = $btn.attr('aria-expanded') === 'true';

      // Toggle current panel with smooth jQuery slide
      if (isExpanded) {
        $btn.attr('aria-expanded', 'false');
        $btn.find('.faq-icon').css('transform', 'rotate(0deg)');
        $content.slideUp(250);
      } else {
        // Optional accordion behavior: close siblings
        $container.find('.faq-trigger[aria-expanded="true"]').each(function() {
          $(this).attr('aria-expanded', 'false');
          $(this).find('.faq-icon').css('transform', 'rotate(0deg)');
          $(this).next('.faq-content').slideUp(250);
        });

        $btn.attr('aria-expanded', 'true');
        $btn.find('.faq-icon').css('transform', 'rotate(180deg)');
        $content.slideDown(250);
      }
    }

    $buttons.on('click', handleClick);

    // Initial state: hide contents
    $container.find('.faq-content').hide();

    // Cleanup on unmount
    return () => {
      $buttons.off('click', handleClick);
      $container.find('*').off();
    };
  }, [items]);

  return (
    <div ref={containerRef} id={id} className="space-y-3">
      {items.map((item, index) => {
        const panelId = `${id}-panel-${index}`;
        const headerId = `${id}-header-${index}`;

        return (
          <div
            key={index}
            className="group/faq bg-white rounded-[18px] border border-[#F6E0E6] overflow-hidden transition-all duration-300 ease-out hover:bg-[#FFFDFC] hover:border-[#6B4B6B]/40 hover:shadow-md hover:shadow-[#6B4B6B]/5"
          >
            <button
              id={headerId}
              type="button"
              className="faq-trigger w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-inset transition-colors duration-200 cursor-pointer"
              aria-expanded="false"
              aria-controls={panelId}
            >
              <span className="font-heading text-sm text-[#3E2F3F] group-hover/faq:text-[#5D3A58] transition-colors duration-200 font-medium pr-4">
                {item.question}
              </span>
              <span className="faq-icon text-[#6B4B6B] shrink-0 transition-transform duration-300 ease-in-out">
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="faq-content px-6 pb-5 pt-1 text-xs text-[#3E2F3F]/80 leading-relaxed border-t border-[#FFF7F7]"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
