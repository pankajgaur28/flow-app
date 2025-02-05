export function getRandomString(length = 2) {
    const k = length > 18 ? 18 : length;
    let str = '';
    for (let i=0; i<k; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    }
    return str;
}


