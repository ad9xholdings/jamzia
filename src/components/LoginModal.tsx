import { useState } from 'react';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ open, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'forgot'>('login');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] rounded-[14px] p-[1px] jamzia-gradient-border">
        <div className="bg-[#0A0F1E] rounded-[14px] p-6 sm:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-[#6B7280]"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-white mb-1">
              {mode === 'login' ? 'Welcome Back' : 'Reset Password'}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {mode === 'login' ? 'Sign in to your JamZia account' : 'Enter your email to reset'}
            </p>
          </div>

          {mode === 'login' ? (
            <>
              {/* Login Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs text-[#A0AEC0] font-semibold uppercase tracking-wider block mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-[#1A1F2E] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#A0AEC0] font-semibold uppercase tracking-wider block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-[#1A1F2E] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-[#1A1F2E]" />
                    <span className="text-xs text-[#6B7280]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#7096D1] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#F7F2EB] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  Sign In <ArrowRight size={14} />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-[#6B7280]">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Social login */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button className="py-2.5 bg-[#1A1F2E] text-white text-xs font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/[0.08]">
                  Google
                </button>
                <button className="py-2.5 bg-[#1A1F2E] text-white text-xs font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/[0.08]">
                  Apple
                </button>
              </div>

              {/* Switch to register */}
              <p className="text-center text-sm text-[#6B7280]">
                New to JamZia?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-[#7096D1] font-semibold hover:underline cursor-pointer"
                >
                  Get Access Now
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Forgot Password Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMode('login');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs text-[#A0AEC0] font-semibold uppercase tracking-wider block mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-[#1A1F2E] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#F7F2EB] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-xs text-[#7096D1] hover:underline cursor-pointer mt-2"
                >
                  ← Back to Sign In
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
