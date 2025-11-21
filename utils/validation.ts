export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (!validatePassword(password)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  return errors;
};

export const validateSignupForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!validateName(name)) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (!validatePassword(password)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (!confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
  } else if (!validatePasswordMatch(password, confirmPassword)) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }

  return errors;
};
