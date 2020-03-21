export const emptyOrNull = (value, msg) => {
  if (!value || null || undefined) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === String && !value.trim()) throw msg;
};

export const isTokenExpired = token => {
  if (!token) return false;
  let dateExp = token.exp;

  if (new Date(dateExp * 1000) > new Date()) {
    return true;
  } else {
    return false;
  }
};
