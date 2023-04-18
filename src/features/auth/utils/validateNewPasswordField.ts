export const validateNewPasswordField = (
  passwordStrengthPercentage: number
) => {
  if (passwordStrengthPercentage === 0) return 'Required field';
  if (passwordStrengthPercentage < 100) return 'Password is too weak';
  return '';
};
