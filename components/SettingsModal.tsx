import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { systemInstruction, setSystemInstruction } = useConfigStore();
  const [localInstruction, setLocalInstruction] = useState(systemInstruction);

  // Sync local state when modal opens or global state changes
  useEffect(() => {
    if (isOpen) {
      setLocalInstruction(systemInstruction);
    }
  }, [isOpen, systemInstruction]);

  if (!isOpen) return null;

  const handleSave = () => {
    setSystemInstruction(localInstruction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Chat Settings</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              AI Persona / System Instruction
            </label>
            <p className="text-xs text-slate-500 mb-3">
              Define how the AI should behave (e.g., "Strict grammar teacher", "Casual friend").
            </p>
            <textarea
              value={localInstruction}
              onChange={(e) => setLocalInstruction(e.target.value)}
              className="w-full h-32 px-3 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#07c160] focus:border-transparent outline-none resize-none bg-slate-50"
              placeholder="You are a helpful English tutor..."
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#07c160] text-white rounded-lg hover:bg-[#06ad56] font-medium transition-colors text-sm"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;