// Advanced Form Validation with Real-time Feedback
// Provides instant validation, error messages, and success states

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FieldConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  customRules?: ValidationRule[];
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class FormValidator {
  private form: HTMLFormElement;
  private fields: Map<string, FieldConfig>;
  private errors: Map<string, string[]> = new Map();

  constructor(form: HTMLFormElement, fields: Map<string, FieldConfig>) {
    this.form = form;
    this.fields = fields;
    this.init();
  }

  private init() {
    // Add real-time validation on input
    this.fields.forEach((config, fieldName) => {
      const field = this.form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement;
      if (field) {
        field.addEventListener('blur', () => this.validateField(fieldName));
        field.addEventListener('input', () => {
          if (this.errors.has(fieldName)) {
            this.validateField(fieldName);
          }
        });
      }
    });

    // Validate on submit
    this.form.addEventListener('submit', (e) => {
      if (!this.validateAll()) {
        e.preventDefault();
        this.showFirstError();
      }
    });
  }

  private validateField(fieldName: string): boolean {
    const field = this.form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement;
    const config = this.fields.get(fieldName);
    
    if (!field || !config) return true;

    const value = field.value.trim();
    const errors: string[] = [];

    // Required check
    if (config.required && !value) {
      errors.push('This field is required');
    }

    if (value) {
      // Length checks
      if (config.minLength && value.length < config.minLength) {
        errors.push(`Minimum ${config.minLength} characters required`);
      }
      if (config.maxLength && value.length > config.maxLength) {
        errors.push(`Maximum ${config.maxLength} characters allowed`);
      }

      // Email validation
      if (config.email && !emailPattern.test(value)) {
        errors.push('Please enter a valid email address');
      }

      // Pattern validation
      if (config.pattern && !config.pattern.test(value)) {
        errors.push('Invalid format');
      }

      // Custom rules
      if (config.customRules) {
        config.customRules.forEach((rule) => {
          if (!rule.test(value)) {
            errors.push(rule.message);
          }
        });
      }
    }

    // Update errors
    if (errors.length > 0) {
      this.errors.set(fieldName, errors);
      this.showFieldError(fieldName, errors[0]);
    } else {
      this.errors.delete(fieldName);
      this.showFieldSuccess(fieldName);
    }

    return errors.length === 0;
  }

  private validateAll(): boolean {
    let isValid = true;
    this.fields.forEach((_, fieldName) => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    return isValid;
  }

  private showFieldError(fieldName: string, message: string) {
    const field = this.form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement;
    if (!field) return;

    field.classList.add('error');
    field.classList.remove('success');
    field.setAttribute('aria-invalid', 'true');

    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    field.parentElement?.appendChild(errorDiv);
  }

  private showFieldSuccess(fieldName: string) {
    const field = this.form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement;
    if (!field) return;

    field.classList.remove('error');
    field.classList.add('success');
    field.setAttribute('aria-invalid', 'false');

    // Remove error message
    const existingError = field.parentElement?.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }

  private showFirstError() {
    const firstErrorField = this.form.querySelector('.error') as HTMLElement;
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  public reset() {
    this.errors.clear();
    this.form.querySelectorAll('.error, .success').forEach((el) => {
      el.classList.remove('error', 'success');
    });
    this.form.querySelectorAll('.field-error').forEach((el) => el.remove());
    this.form.querySelectorAll('[aria-invalid]').forEach((el) => {
      el.removeAttribute('aria-invalid');
    });
  }
}

// Initialize form validation
export function initFormValidation() {
  if (typeof window === 'undefined') return;

  const contactForm = document.querySelector('#contactForm') as HTMLFormElement;
  if (!contactForm) return;

  const fields = new Map<string, FieldConfig>([
    ['name', { required: true, minLength: 2, maxLength: 100 }],
    ['email', { required: true, email: true, maxLength: 255 }],
    ['subject', { required: true, minLength: 5, maxLength: 200 }],
    ['message', { required: true, minLength: 10, maxLength: 2000 }],
  ]);

  return new FormValidator(contactForm, fields);
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
  } else {
    initFormValidation();
  }
}

