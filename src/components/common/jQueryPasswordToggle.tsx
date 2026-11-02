import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import { Eye, EyeOff } from 'lucide-react';

interface JQueryPasswordToggleProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  ariaDescribedby?: string;
  'aria-describedby'?: string;
}

/**
 * Password input with jQuery-enhanced toggle
 * Purely scoped to this component's DOM container with explicit event cleanup.
 */
export const JQueryPasswordToggle: React.FC<JQueryPasswordToggleProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Enter your password',
  required = false,
  hasError = false,
  ariaDescribedby,
  'aria-describedby': ariaDescribedbyKebab
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $wrapper = $(wrapperRef.current!);
    if (!$wrapper.length) return;

    const $input = $wrapper.find('input');
    const $btn = $wrapper.find('.toggle-pwd-btn');
    const $eyeIcon = $wrapper.find('.icon-eye');
    const $eyeOffIcon = $wrapper.find('.icon-eye-off');

    function toggleVisibility(this: HTMLElement, e: JQuery.TriggeredEvent) {
      e.preventDefault();
      const currentType = $input.attr('type');
      if (currentType === 'password') {
        $input.attr('type', 'text');
        $btn.attr('aria-pressed', 'true');
        $btn.attr('aria-label', 'Hide password');
        $eyeIcon.hide();
        $eyeOffIcon.show();
      } else {
        $input.attr('type', 'password');
        $btn.attr('aria-pressed', 'false');
        $btn.attr('aria-label', 'Show password');
        $eyeIcon.show();
        $eyeOffIcon.hide();
      }
    }

    $btn.on('click', toggleVisibility);

    // Initial state
    $eyeOffIcon.hide();

    return () => {
      $btn.off('click', toggleVisibility);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id={id}
        name={name}
        type="password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedbyKebab || ariaDescribedby}
        className={`w-full pl-4 pr-11 py-2.5 bg-[#FFF7F7] border ${
          hasError
            ? 'border-red-400 ring-1 ring-red-400/30'
            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
        } rounded-[14px] text-xs text-[#3E2F3F] placeholder-[#C39DB8] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
      />

      <button
        type="button"
        aria-label="Show password"
        aria-pressed="false"
        className="toggle-pwd-btn absolute right-3 top-1/2 -translate-y-1/2 text-[#C39DB8] hover:text-[#6B4B6B] p-1.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B]"
      >
        <span className="icon-eye flex items-center justify-center">
          <Eye className="w-4 h-4" />
        </span>
        <span className="icon-eye-off flex items-center justify-center">
          <EyeOff className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
};
