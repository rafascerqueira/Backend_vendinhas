export default app => {
  const emptyOrNull = (value, msg) => {
    if (!value || null || undefined) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === String && !value.trim()) throw msg;
  };

  return { emptyOrNull };
};
