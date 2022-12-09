export function recoverPasswordEmailTemplate(pwd: string) {
  return `
     <h1>Hello User!</h1>
     </br>
     <p>Your new password is <strong>${pwd}</strong></p>
     </br>
     <p>Enjoy your day!</p>
     `;
}
