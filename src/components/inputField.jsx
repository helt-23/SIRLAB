import '../assets/styles/input.css';
import { useState } from 'react';

export const InputField = ({
  type = 'text',
  placeholder,
  name,
  icon: Icon,
  error,
  required,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const showError = Boolean(error) && touched;

  return (
    <div className="input-field-container">
      <div className="input-wrapper">
        {Icon && (
          <div className="input-field-icon">
            <Icon />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={`input-field${Icon ? ' has-icon' : ''}${showError ? ' error' : ''}`}
          required={required}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : undefined}
          onBlur={() => setTouched(true)}
          {...props}
        />
      </div>

      {showError && (
        <div id={`${name}-error`} className="error-text">
          {error}
        </div>
      )}
    </div>
  );
};
