import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Decorative logo/mascot use intentional <img>; fonts load via <link>.
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
