import Cookies from "js-cookie";

export const getCookie = async (key: string) => {
  if (typeof window === "undefined") {
    ("use server");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const token = cookieStore.get(key)?.value;

    return token;
  }
  const token = Cookies.get(key);

  return token;
};

export const removeCookie = async (key: string) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    ("use server");

    const cookieStore = await cookies();

    const token = cookieStore.delete(key);

    return token;
  }
  const token = Cookies.remove(key);

  return token;
};

export const setCookie = async (key: string, value: string) => {
  if (typeof window === "undefined") {
    ("use server");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.set(key, value);

    return token;
  }
  const token = Cookies.set(key, value);

  return token;
};
