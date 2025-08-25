import { SESSION_LOCAL_STORAGE_KEY } from "./constants"

export const getSessionLocal = () => {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem(SESSION_LOCAL_STORAGE_KEY)
    const tokenObj = token ? JSON.parse(token) : null
    return tokenObj
}

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
export const validEmail = (value: string) => {
    if (validRequire(value)) return validRequire(value)
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)) return 'Your email is invalid'
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