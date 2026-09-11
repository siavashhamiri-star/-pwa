import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  ShieldCheck,
  Award,
  Hash,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { speakText, stopSpeaking } from '../../utils/speech';
import { formatPersianRelativeTime, toPersianDigits } from '../../utils/persian';

export const RoomsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { rooms, messages, sendMessageToRoom } = useTavanaCity();
  const { announce } = useAccessibility();

  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || 'room-1');
  const [inputText, setInputText] = useState<string>('');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];
  const roomMessages = messages.filter((m) => m.roomId === activeRoomId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      announce('برای ارسال پیام، ابتدا وارد شوید', true);
      return;
    }
    if (!inputText.trim()) return;

    sendMessageToRoom(activeRoomId, inputText);
    setInputText('');
    announce('پیام شما در اتاق ارسال شد');
  };

  const handleSpeakMessage = (msgId: string, text: string, senderName: string) => {
    if (speakingMsgId === msgId) {
      stopSpeaking();
      setSpeakingMsgId(null);
      announce('پخش پیام متوقف شد');
    } else {
      setSpeakingMsgId(msgId);
      const fullText = `پیام از ${senderName}: ${text}`;
      announce(`قرائت پیام ${senderName}`);
      speakText(fullText, () => {
        setSpeakingMsgId(null);
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black mb-2.5">
            <span className="text-base">🏛️</span>
            <span>اتاق جوامع اصناف</span>
            <span className="text-amber-400">•</span>
            <span className="text-indigo-900">اکوسیستم آفرینا توانا سیتی (TavanaCity)</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              اتاق جوامع اصناف و تالارهای هم‌افزایی توانمندان
            </h1>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full border border-emerald-200">
              زنده و دسترس‌پذیر
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            اشتراک تجربیات شغلی، تعامل مستقیم با تشکل‌های صنفی، پرسش و پاسخ پیرامون دسترس‌پذیری و ارتباط با همتایان در اکوسیستم آفرینا
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-2 rounded-2xl border border-indigo-100">
          <Award className="w-4 h-4" />
          <span>هر پیام = +۵ امتیاز XP</span>
        </div>
      </div>

      {/* Main Two-Column Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Room Selector */}
        <div className="space-y-3">
          <h2 className="font-bold text-xs text-slate-700 px-1">انتخاب تالار گفتگو:</h2>
          <div className="space-y-2">
            {rooms.map((room) => {
              const isActive = room.id === activeRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    announce(`ورود به ${room.title}`);
                  }}
                  className={`w-full p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {room.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold flex items-center gap-1 ${
                        isActive ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      <Users className="w-3 h-3" />
                      {toPersianDigits(room.activeUsersCount)} آنلاین
                    </span>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm mt-2 line-clamp-1">{room.title}</h3>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isActive ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {room.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Stream */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[580px] overflow-hidden">
          {/* Room Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">{activeRoom.title}</h3>
                <p className="text-[11px] text-slate-500">{activeRoom.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{toPersianDigits(roomMessages.length)} پیام</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40">
            {roomMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                هنوز پیامی در این تالار ارسال نشده است. اولین پیام را شما بنویسید!
              </div>
            ) : (
              roomMessages.map((msg) => {
                const isMine = currentUser && msg.senderId === currentUser.id;
                const isSpeaking = speakingMsgId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <img
                      src={msg.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt=""
                      className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1.5 ${
                        isMine
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[10px]">
                        <span className={`font-bold ${isMine ? 'text-indigo-200' : 'text-slate-900'}`}>
                          {msg.senderName}
                        </span>
                        <span className={isMine ? 'text-indigo-200' : 'text-slate-400'}>
                          {formatPersianRelativeTime(msg.createdAt)}
                        </span>
                      </div>

                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Screen Reader Voice Button */}
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleSpeakMessage(msg.id, msg.text, msg.senderName)}
                          className={`p-1 rounded-lg text-[10px] flex items-center gap-1 transition-colors ${
                            isMine
                              ? 'text-indigo-200 hover:text-white bg-indigo-700/60'
                              : 'text-slate-500 hover:text-indigo-600 bg-slate-100'
                          }`}
                          title="روخوانی صوتی پیام برای افراد نابینا"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-amber-300" />
                              <span>توقف</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>شنیدن پیام</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="دیدگاه، پرسش یا پیام خود را بنویسید..."
              className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs cursor-pointer"
              aria-label="ارسال پیام"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
