import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeStorage } from './theme-storage';
import { THEME_STORAGE, THEME_STORAGE_KEY } from './theme.options';

const mockStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: jest.fn((_key: string) => mockStorage['items'][_key] || null),
  key: jest.fn((_index: number) => null),
  removeItem: jest.fn((_key: string) => delete mockStorage['items'][_key]),
  setItem: jest.fn((_key: string, _value: string) => {
    mockStorage['items'][_key] = _value;
  }),
  items: {},
};

describe('ThemeStorage', () => {
  let service: ThemeStorage;
  let documentMock: Document;
  let storageKey: string;

  beforeEach(() => {
    documentMock = document.implementation.createHTMLDocument('div');
    storageKey = 'test-theme-key';

    TestBed.configureTestingModule({
      providers: [
        ThemeStorage,
        { provide: THEME_STORAGE_KEY, useValue: storageKey },
        { provide: DOCUMENT, useValue: documentMock },
        { provide: THEME_STORAGE, useValue: mockStorage },
      ],
    });
    service = TestBed.inject(ThemeStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get theme from storage or default to system', () => {
    expect(mockStorage.getItem(storageKey)).toBe(null);
    expect(service.storedTheme()).toBe('system');
  });

  it('should save theme to storage', () => {
    const spy = jest.spyOn(mockStorage, 'setItem');
    service.saveTheme('dark');
    expect(spy).toHaveBeenCalledWith(storageKey, 'dark');
    expect(service.storedTheme()).toBe('dark');
  });
});
