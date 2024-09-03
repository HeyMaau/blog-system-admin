export function getCookie(key: string): string | null {
    const cookies: string[] = document.cookie.split("; ");
    let cookie: string | null = null
    cookies.forEach(value => {
        if (value.startsWith(key, 0)) {
            const split: string[] = value.split("=");
            cookie = split[1]
        }
    })
    return cookie
}

export function setCookie(cookieValue: string): void {
    document.cookie += cookieValue
}