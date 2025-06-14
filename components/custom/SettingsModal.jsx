'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Palette, Zap, Settings as SettingsIcon } from 'lucide-react';

function SettingsModal({ isOpen, onClose }) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  const themeOptions = [
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Dark theme for better focus',
      gradient: 'from-gray-900 to-black'
    },
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Light theme for daytime use',
      gradient: 'from-white to-gray-100'
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follow system preference',
      gradient: 'from-blue-500 to-purple-600'
    }
  ];

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: SettingsIcon },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden glass-dark border-0">
        <div className="relative">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] p-6">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Settings
                  </DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Customize your Turbowire experience
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 bg-black/20 p-4 border-r border-white/10">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'appearance' && (
                <div className="space-y-6 fade-in-up">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-blue-400" />
                      Theme Selection
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Choose your preferred theme for the best experience
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = theme === option.value;
                      
                      return (
                        <div
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover-lift ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 border-2 border-[#1b76ff] shadow-lg shadow-blue-500/25'
                              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${option.gradient}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-white">{option.label}</h4>
                                {isSelected && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-[#1b76ff] rounded-full">
                                    <Zap className="w-3 h-3 text-white" />
                                    <span className="text-xs text-white font-medium">Active</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">{option.description}</p>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1b76ff]/10 to-[#35c5ff]/10 pointer-events-none" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Auto Theme Switching</h4>
                        <p className="text-sm text-gray-400">Automatically switch based on time</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="auto-theme"
                        />
                        <label
                          htmlFor="auto-theme"
                          className="block w-12 h-6 bg-gray-600 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-500"
                        >
                          <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-0.5 translate-y-0.5"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div className="space-y-6 fade-in-up">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <SettingsIcon className="w-5 h-5 text-blue-400" />
                      General Settings
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Configure general application preferences
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Animations</h4>
                          <p className="text-sm text-gray-400">Enable smooth animations</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="animations"
                            defaultChecked
                          />
                          <label
                            htmlFor="animations"
                            className="block w-12 h-6 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full cursor-pointer"
                          >
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-6 translate-y-0.5"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Sound Effects</h4>
                          <p className="text-sm text-gray-400">Play sound on interactions</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="sounds"
                          />
                          <label
                            htmlFor="sounds"
                            className="block w-12 h-6 bg-gray-600 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-500"
                          >
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-0.5 translate-y-0.5"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Auto-save</h4>
                          <p className="text-sm text-gray-400">Automatically save your work</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="autosave"
                            defaultChecked
                          />
                          <label
                            htmlFor="autosave"
                            className="block w-12 h-6 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full cursor-pointer"
                          >
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-6 translate-y-0.5"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-black/20 border-t border-white/10">
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={onClose}
                className="neon-btn-blue"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;