import '@testing-library/jest-dom/extend-expect';

// Extend the matchers with jest-dom's matchers
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
  }
}
