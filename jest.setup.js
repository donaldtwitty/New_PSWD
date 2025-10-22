// Jest setup file
global.$ = global.jQuery = jest.fn(() => ({
  length: 1,
  on: jest.fn(),
  ready: jest.fn(fn => fn()),
  width: () => 1200,
  toggleClass: jest.fn(),
  slideToggle: jest.fn(),
  removeClass: jest.fn(),
  slideUp: jest.fn(),
  animate: jest.fn(),
  offset: () => ({ top: 100 }),
  each: jest.fn(),
  hasClass: jest.fn(),
  addClass: jest.fn(),
  attr: jest.fn(() => '#test'),
  position: () => ({ top: 50 }),
  height: () => 200,
  scrollTop: () => 0,
  stop: jest.fn(() => ({ animate: jest.fn() })),
  imgfix: jest.fn(),
  counterUp: jest.fn(),
  parallax: jest.fn(),
  fadeOut: jest.fn(),
  css: jest.fn(),
  data: jest.fn(() => 'test.jpg'),
  reset: jest.fn(),
  find: jest.fn(() => ({ toggleClass: jest.fn() })),
  off: jest.fn(),
  preventDefault: jest.fn()
}));

global.scrollReveal = jest.fn();
global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
global.FormData = jest.fn();
global.location = { pathname: '/', hostname: 'test.com' };
global.alert = jest.fn();