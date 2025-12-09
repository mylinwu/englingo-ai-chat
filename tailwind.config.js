/**
 * Tailwind CSS v4 配置文件
 * 
 * 注意：Tailwind CSS v4 主要通过 CSS 文件中的 @theme 指令配置主题
 * 此配置文件用于指定内容扫描路径
 * 
 * 主题配置位置：src/styles/index.css
 */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
}
