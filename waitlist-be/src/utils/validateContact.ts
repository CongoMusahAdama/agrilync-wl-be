export const validateContact = (contact: string): boolean => {
  const emailRegex = /^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
  const phoneRegex = /^\+?\d{10,15}$/;
  return emailRegex.test(contact) || phoneRegex.test(contact);
};
