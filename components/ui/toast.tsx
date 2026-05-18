'use client'

import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg ${
          type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            : 'bg-red-50 text-red-900 border border-red-200'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-zinc-400 hover:text-zinc-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function FormSubmitButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button {...props} disabled={pending || props.disabled}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
          处理中...
        </>
      ) : (
        children
      )}
    </button>
  );
}
