
export const validRequire = (value: string) => {
    if (!value.trim()) return '*Required field'
}
export const validUsername = (value: string) => {
    if (validRequire(value)) return validRequire(value)
    if (!(/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).test(value)) return 'Use only letters and numbers, no spaces or accents'
}
export const validPhone = (value: string) => {
    if (validRequire(value)) return validRequire(value)
    if (!(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/).test(value)) return 'Your number phone is invalid (in Vietnam)'
}
export const validEmail = (value: string, unRequired?: boolean) => {
    if (validRequire(value) && !unRequired) return validRequire(value)
    if (value.trim() && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)) return 'Your email is invalid'
}

export const regexVaid = (name: string) => {
    if (!name) return {}
    switch (name) {
        case 'phoneNumber': return { pattern: "^(0|\\+84)(3|5|7|8|9)[0-9]{8}$" }
        case 'username': return { pattern: "^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" }
        case 'email': return { pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" }


        default: return {}
    }
}

// Utility: format currency (default VND)
export const formatCurrency = (
  value: number,
  locale: string = "vi-VN",
  currency: string = "VND"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(value);

  export const formatDate = (da: number | Date): string => {
    if (!da) return ''
    const date = new Date(da);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const mo = (date.getMonth() + 1).toString().padStart(2, "0"); // tháng tính từ 0
    const y = date.getFullYear();
    return `${h}:${m} ${d}-${mo}-${y}`;
}

export const formatPhone = (phone: string) => {
    if (!phone) return ''
    // Bỏ khoảng trắng, dấu gạch ngang nếu có
    let cleaned = phone?.replace(/\D/g, "");

    // Nếu bắt đầu bằng 84 → thay bằng 0
    if (cleaned?.startsWith("84")) {
        cleaned = "0" + cleaned.slice(2);
    }

    return cleaned;
}
  