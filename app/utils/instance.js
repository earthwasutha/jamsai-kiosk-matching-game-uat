import axios from "axios";
const crypto = require("crypto");

const algorithm = process.env.NEXT_PUBLIC_CRYPTO_ALGORITHM;
const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
const iv = process.env.NEXT_PUBLIC_CRYPTO_IV;

const encryptData = (data) => {
  const jsonString = JSON.stringify(data);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  let encrypted = cipher.update(jsonString, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptData = (encrypted) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (config?.data) {
      config.data = { encrypted: encryptData(config.data) };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (config) => {
    if (config.data?.result?.encrypted) {
      config.data.result = decryptData(config.data?.result?.encrypted);
    } else if (config.data?.data?.encrypted) {
      config.data.data = decryptData(config.data?.data?.encrypted);
    }

    return Promise.resolve(config);
  },
  (error) => {
    if (
      !error.config.url.includes("/auth/signin") &&
      (error?.response?.status === 401 || error.message === "Network Error")
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
