export default {
    content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          delion: {
            red:   "#DE1207", // Primario
            mag:   "#C70037", // Acento
            blue:  "#0C3C6F", // Secundario
            // derivadas útiles para hover/focus (ligeramente más oscuras)
            redDark:  "#B50F06",
            magDark:  "#A1002F",
            blueDark: "#0A3059",
          }
        },
        backgroundImage: {
          "delion-gradient": "linear-gradient(90deg, #DE1207 0%, #C70037 50%, #0C3C6F 100%)",
        },
        ringColor: {
          delion: "#DE1207",
        }
      },
    },
    plugins: [],
  };
  