import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-start gap-3 border border-[#DCD2C3] bg-[#292D2C] px-4 py-3.5 text-[#FAF8F2] shadow-xl"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6F9290] text-[#FAF8F2]">
              <Check className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold tracking-[0.06em]">{toast.title}</p>
              {toast.subtitle && (
                <p className="mt-0.5 truncate text-[12px] text-[#DCD2C3]/80">{toast.subtitle}</p>
              )}
              {toast.actionLabel && toast.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.();
                    dismissToast(toast.id);
                  }}
                  className="mt-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#6F9290] uppercase underline underline-offset-4 hover:text-[#FAF8F2]"
                >
                  {toast.actionLabel}
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
              className="text-[#DCD2C3]/60 hover:text-[#FAF8F2]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
