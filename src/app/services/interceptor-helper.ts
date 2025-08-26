// utils/interceptor-helpers.ts
import { environment } from '../../environments/environment';
 

export function isExternalUrl(url: string): boolean {
  // absolute URL && مش تابع لـ api بتاعنا
  return /^https?:\/\//i.test(url) && !url.startsWith(environment.apiUrl);
}
