// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Fix for jest. check https://github.com/prisma/prisma/issues/8558
// @ts-ignore
global.setImmediate = jest.useRealTimers;
