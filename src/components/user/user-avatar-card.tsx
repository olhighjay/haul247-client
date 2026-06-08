import { UserAvatar } from "@/components/user/user-avatar";
import type { AuthenticatedUser } from "@/types/auth";

interface UserAvatarCardProps {
  user: AuthenticatedUser;
  compact?: boolean;
}

export const UserAvatarCard = ({
  user,
  compact = false,
}: UserAvatarCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2 shadow-sm">
      <UserAvatar name={user.name} size={compact ? "small" : "medium"} />
      {!compact ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {user.name}
          </p>
          <p className="truncate text-xs capitalize text-slate-500">
            {user.role}
          </p>
        </div>
      ) : null}
    </div>
  );
};
