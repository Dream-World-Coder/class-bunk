export const theme = {
  colors: {
    primary: "bg-rose-300", //#f5f2f2
    secondary: "bg-rose-200",
    background: "bg-[#EBE1D1]",
    text: "text-black",
    textMuted: "text-neutral-700",
    border: "border-[#c5c2c2]",
    hover: {
      bg: "bg-black",
      text: "text-black",
    },
    active: {
      bg: "bg-[#5A7ACD]", // deep green
      text: "text-[#EBE1D1]",
    },
  },
  spacing: {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  },
};

export const getButtonClass = (isActive = false) => {
  return `py-3 text-sm border transition rounded-2xl ${
    isActive
      ? `${theme.colors.active.bg} ${theme.colors.active.text}`
      : `border-[#c5c2c2]`
  }`;
};

export const getCardClass = () => {
  return `${theme.colors.background} ${theme.spacing.md}`;
};

// bot nav menu
export const getNavItemClass = (isActive = false) => {
  return `flex-1 my-2 mx-1.5 py-2 flex flex-col items-center gap-1 transition rounded-4xl ${
    isActive ? `text-rose-950 ${theme.colors.primary}` : `text-rose-500`
  }`;
};
