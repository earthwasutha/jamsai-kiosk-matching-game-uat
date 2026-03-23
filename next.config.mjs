// /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },
// // };

// // export default nextConfig;

// import withPWA from 'next-pwa';

// const config = withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   // other Next.js configuration options here
// });

// export default config;

/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import { glob } from "glob";

// --- ส่วนที่ 1: Script ค้นหารูปภาพทั้งหมดในโฟลเดอร์ public/images ---
// ❗️ ชี้ path ไปที่โฟลเดอร์ public/images ของคุณ
const imagePath = "./public/images/**/*.{webp,png,jpg,jpeg,gif,svg}";
const imageFiles = glob.sync(imagePath);

const additionalPrecacheEntries = imageFiles.map(file => ({
  // Key Change: เปลี่ยน path ของไฟล์ให้เป็น URL ที่ถูกต้อง
  // โดยการตัด './public' ออกไปจากข้างหน้า
  url: file.replace('./public', ''),
  revision: null
}));
// ----------------------------------------------------

// --- ส่วนที่ 2: ตั้งค่า PWA ---
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  // Pre-cache รูปภาพทั้งหมดที่หาเจอ
  additionalPrecacheEntries,

  // กฎ Caching สำหรับรูปภาพ (ยังคงมีประโยชน์เป็น Safety Net)
  runtimeCaching: [
    {
      urlPattern: /\.(?:webp|png|jpg|jpeg|svg)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 100, // เพิ่มจำนวนเผื่อไว้สำหรับเกม
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 วัน
        },
      },
    },
  ],
});
// ----------------------------------------------------

// --- ส่วนที่ 3: Config หลักของ Next.js ---
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kiosk-image-uat.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // other Next.js configuration options here
};
// ----------------------------------------------------

export default withPWA(nextConfig);