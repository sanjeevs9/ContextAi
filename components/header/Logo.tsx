import { Brain } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Brain className="w-8 h-8 text-[#00FFC8]" />
      <span className="text-xl font-bold text-white">Context AI</span>
    </div>
  );
}