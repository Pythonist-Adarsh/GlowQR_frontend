'use client'

import { API_BASE_URL } from '@/lib/api-config'
import { Sun } from 'lucide-react'

type Props = {
  label?: string
  onClick?: () => void
}

export function GoogleContinueButton({ label = "Continue with GlowQR", onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick ? onClick() : window.location.href = `${API_BASE_URL}/auth/google`}
      className="flex w-full items-center justify-start gap-4 rounded-xl border border-[#111111] bg-white px-4 py-3 transition-colors hover:bg-slate-50 dark:border-white dark:bg-[#111111] dark:hover:bg-[#1a1a1a] group"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-sm">
        <Sun className="w-5 h-5" />
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[15px] font-medium text-[#111111] dark:text-white">{label}</span>
        <span className="text-[11px] font-normal text-[#666666] dark:text-[#999999]">AI-powered review platform</span>
      </div>
    </button>
  )
}
