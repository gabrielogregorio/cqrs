import { Logger } from '@/shared/logging/Logger';

export function sendOrderWelcomeEmail(order: { name: string; email: string }) {
  Logger.info('send email to', order.email);
}
