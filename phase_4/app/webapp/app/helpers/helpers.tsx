export function makeid(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function redirectByType(type: string) {
    switch (type) {
        case "ADM":
            return "/admin";
        case "AUTOR":
            return "/autor";
        case "CLIENTE":
            return "/cliente";
    }
    return "/";
}
