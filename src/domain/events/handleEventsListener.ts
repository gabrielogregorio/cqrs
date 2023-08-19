import { Logger } from '@/shared/logging/Logger';

export function sendUserWelcomeEmail(user: { name: string; email: string }) {
  Logger.info('send email to', user.email);
}
