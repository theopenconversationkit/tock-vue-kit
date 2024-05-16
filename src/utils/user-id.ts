export function forgeNewUserId(): string {
  const date = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  return (date + randomNumber).toUpperCase();
}
