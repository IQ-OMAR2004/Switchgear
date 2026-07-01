import next from "eslint-config-next";

/** Next.js 16 ships a native flat config (core-web-vitals + typescript). */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
