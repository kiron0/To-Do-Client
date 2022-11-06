module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#9b7be7",
          secondary: "#a855f7",
          accent: "#1FB2A6",
          neutral: "#191D24",
          info: "#3ABFF8",  
          success: "#36D399",    
          warning: "#FBBD23",     
          error: "#F87272",
          "base-100": "#ffffff",
          "base-200": "#FFF0F5",
          "base-300": "#f5f6fa",
        },
      },
      "night",
    ],
  },
  plugins: [require("daisyui")],
};
