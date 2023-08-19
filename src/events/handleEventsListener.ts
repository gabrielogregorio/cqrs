import eventEmitter from './eventEmmiter';

function sendUserWelcomeEmail(user: { name: string; email: string }) {
  console.log('send email to', user.email);
}

eventEmitter.on('UserCreated', (user) => {
  console.log(`starting event after create user ${user.email}`);
  sendUserWelcomeEmail(user);
});
