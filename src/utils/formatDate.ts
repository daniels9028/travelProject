export const formatDate = (date: string | Date): string => {
  if (!date) return "-";

  const newDate = new Date(date);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(newDate);
};

export const formatRupiah = (nilai: number): string => {
  // if (!nilai) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(nilai);
};
