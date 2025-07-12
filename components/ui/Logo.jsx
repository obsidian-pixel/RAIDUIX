import { Zap } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Zap className="w-6 h-6 text-primary" />
      <span className="font-bold text-lg">RAIDUIX</span>
    </div>
  )
}