import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        ink: {
          950: { value: "#161312" },
          900: { value: "#211C1A" },
          700: { value: "#4A403C" },
          500: { value: "#746B66" },
        },
        wine: {
          950: { value: "#251111" },
          900: { value: "#3D181B" },
          800: { value: "#582126" },
          700: { value: "#722D35" },
          600: { value: "#8C3B45" },
        },
        ivory: {
          50: { value: "#FEFCF7" },
          100: { value: "#F7F1E7" },
          200: { value: "#EBE1D2" },
          300: { value: "#DDD0BE" },
        },
        gold: {
          300: { value: "#D9B575" },
          400: { value: "#C79D57" },
        },
      },

      fonts: {
        heading: { value: '"Montserrat", sans-serif' },
        body: { value: '"Montserrat", sans-serif' },
      },

      radii: {
        editorial: { value: "1.5rem" },
      },
    },

    semanticTokens: {
      colors: {
        canvas: {
          value: {
            base: "{colors.ink.950}",
            _dark: "{colors.ink.950}",
          },
        },
        surface: {
          value: {
            base: "{colors.ink.900}",
            _dark: "{colors.ink.900}",
          },
        },
        border: {
          value: {
            base: "{colors.ink.700}",
            _dark: "{colors.ink.700}",
          },
        },
        text: {
          value: {
            base: "{colors.ivory.50}",
            _dark: "{colors.ivory.50}",
          },
        },
      },
    },
  },

  globalCss: {
    "html, body": {
      minHeight: "100%",
      bg: "canvas",
      color: "text",
    },

    body: {
      fontFamily: "body",
    },

    "::selection": {
      bg: "wine.600",
      color: "ivory.50",
    },
  },
});

export const system = createSystem(defaultConfig, config);
