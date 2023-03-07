export function getCookie(key) {
    let cookies = document.cookie.split("; ");
    let cookie = null
    cookies.forEach(value => {
        if (value.startsWith(key, 0)) {
            let split = value.split("=");
            cookie = split[1]
        }
    })
    return cookie
}