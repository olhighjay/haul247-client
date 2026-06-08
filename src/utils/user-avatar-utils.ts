const avatarColorPalette = [
  "bg-brand-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-indigo-600",
];

export const getInitialsFromName = (name: string): string => {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) {
    return "?";
  }

  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase();
  }

  return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
};

export const getAvatarColorClass = (name: string): string => {
  const characterSum = name
    .trim()
    .toLowerCase()
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return avatarColorPalette[characterSum % avatarColorPalette.length];
};
