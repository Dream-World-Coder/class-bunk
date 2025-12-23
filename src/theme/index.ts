export const theme = {
  colors: {
    primary: "bg-[#f5f2f2]", //deep
    secondary: "bg-green-200",
    background: "bg-[#EBE1D1]",
    text: "text-black",
    textMuted: "text-neutral-700",
    border: "border-[#0D4715]",
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
  return `py-3 text-sm border transition ${
    isActive
      ? `${theme.colors.active.bg} ${theme.colors.active.text} ${theme.colors.border}`
      : `${theme.colors.border} hover:${theme.colors.hover.bg} hover:${theme.colors.hover.text}`
  }`;
};

export const getCardClass = () => {
  return `${theme.colors.background} ${theme.spacing.md}`;
};

// bot nav menu
export const getNavItemClass = (isActive = false) => {
  return `flex-1 my-2 mx-1.5 py-2 flex flex-col items-center gap-1 transition rounded-4xl ${
    isActive
      ? `${theme.colors.text} ${theme.colors.primary}`
      : `${theme.colors.textMuted} `
  }`;
};
