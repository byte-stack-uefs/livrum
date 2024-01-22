"use client";

import useRequest from "../services/requester";

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

export function login(email: string, password: string) {
    const requester = useRequest();

    return requester
        .post("/auth", {
            username: email,
            password: password,
        })
        .then((response) => {

            return new Promise((resolve, reject) => {
                resolve(response);
            });
        })
        .catch((err) => {
            let message = "Algo deu errado, tente novamente mais tarde";

            if (err?.response?.data?.detail) {
                message = err?.response?.data?.detail;
                return new Promise((resolve, reject) => {
                    reject(message);
                });
            }
        });
}
