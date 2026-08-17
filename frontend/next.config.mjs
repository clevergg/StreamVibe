/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Минимальный самодостаточный вывод для Docker-образа
  output: 'standalone',
  // Явный корень проекта: в C:\Users\<user> лежит посторонний package-lock.json,
  // без этой опции Next неверно определяет workspace root
  outputFileTracingRoot: import.meta.dirname,
  eslint: {
    // Линтер не блокирует сборку (конфиг ESLint в проект не добавлен)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
