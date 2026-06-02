import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { ThemeFacadeService } from './theme-facade.service';
import { ThemeStorage } from './theme-storage';
import { BaseThemeType, SYSTEM_THEME, THEME_COLORS } from './theme.options';

describe('ThemeFacadeService', () => {
  let service: ThemeFacadeService;
  let documentMock: Document;
  let meta: Meta;
  let themeStorage: ThemeStorage;
  let systemThemeMock = jest.fn(() => 'dark');
  let themeColors: Record<BaseThemeType, string>;

  beforeEach(() => {
    documentMock = document.implementation.createHTMLDocument('test');
    themeColors = { dark: '#000', light: '#fff' };

    TestBed.configureTestingModule({
      providers: [
        ThemeFacadeService,
        { provide: DOCUMENT, useValue: documentMock },
        { provide: THEME_COLORS, useValue: themeColors },
        { provide: SYSTEM_THEME, useValue: systemThemeMock },
      ],
    });
    service = TestBed.inject(ThemeFacadeService);
    themeStorage = TestBed.inject(ThemeStorage);
    meta = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set theme and save to storage', () => {
    const spy = jest.spyOn(themeStorage, 'saveTheme');
    service.setTheme('dark');
    expect(spy).toHaveBeenCalledWith('dark');
  });

  it('should update document data and meta tag for dark theme', () => {
    const spy = jest.spyOn(meta, 'updateTag');
    service.setTheme('dark');

    TestBed.flushEffects();

    expect(documentMock.body.getAttribute('app-theme')).toBe('dark');
    expect(service.currentTheme()).toBe('dark');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should update document data and meta tag for light theme', () => {
    const spy = jest.spyOn(meta, 'updateTag');
    service.setTheme('light');

    TestBed.flushEffects();

    expect(documentMock.body.getAttribute('app-theme')).toBe('light');
    expect(service.currentTheme()).toBe('light');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should update document data and meta tag for system theme', () => {
    const spy = jest.spyOn(meta, 'updateTag');
    service.setTheme('system');

    TestBed.flushEffects();

    expect(documentMock.body.getAttribute('app-theme')).toBe(systemThemeMock());
    expect(service.systemTheme()).toBe(systemThemeMock());
    expect(service.currentTheme()).toBe('system');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
