export function AuthDivider({ chipBgClass = 'bg-[#FDF8F1]' }: { chipBgClass?: string }) {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#E8DFD4]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider">
        <span className={`px-3 text-[#8A735F] ${chipBgClass}`}>or</span>
      </div>
    </div>
  )
}
