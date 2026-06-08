import {
  getAvatarColorClass,
  getInitialsFromName,
} from "@/utils/user-avatar-utils";

type UserAvatarSize = "small" | "medium" | "large";

interface UserAvatarProps {
  name: string;
  size?: UserAvatarSize;
  className?: string;
}

const sizeStyles: Record<UserAvatarSize, string> = {
  small: "h-8 w-8 text-xs",
  medium: "h-10 w-10 text-sm",
  large: "h-12 w-12 text-base",
};

export const UserAvatar = ({
  name,
  size = "medium",
  className = "",
}: UserAvatarProps) => {
  const initials = getInitialsFromName(name);
  const colorClass = getAvatarColorClass(name);

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${sizeStyles[size]} ${colorClass} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};
