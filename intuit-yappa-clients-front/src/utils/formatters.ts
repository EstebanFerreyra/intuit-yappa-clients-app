export const formatPhone = (value?: string | number) => {
  if (!value) return "";

  const phone = value.toString().replace(/\D/g, "");

  if (phone.length !== 10) return value.toString();

  const area = phone.slice(0, 2);
  const first = phone.slice(2, 6);
  const last = phone.slice(6);

  return `(${area}) ${first}-${last}`;
};

export const formatDate = (value?: string | Date) => {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
