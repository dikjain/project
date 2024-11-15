import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant: 'primary' | 'secondary' | 'spicy';
  fullWidth?: boolean;
}

export function ActionButton({ onClick, icon: Icon, label, variant, fullWidth }: ActionButtonProps) {
  const baseClasses = "py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200";
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg hover:scale-105",
    spicy: "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:scale-105"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'flex-1' : ''}`}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
      {label}
    </motion.button>
  );
}