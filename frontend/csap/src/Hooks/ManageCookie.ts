import cookie from "js-cookie";

const setCookie = (cookieName: string, value: string) => {
  return cookie.set(cookieName, value, {
    sameSite: "Strict",
    secure: true,
    path: "/",
  });
};

const getCookie = (cookieName: string) => {
  return cookie.get(cookieName);
};

export { setCookie, getCookie };
