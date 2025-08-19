import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always show the locale prefix for non-default locales
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(cy|ar|zh|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};