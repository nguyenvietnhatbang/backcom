/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, Star, HelpCircle, CheckCircle, ArrowRight, Video, Target, Sparkles, MessageSquare } from 'lucide-react';

interface AcademyViewProps {
  courses: Course[];
  onSubmitConsultLead: (leadData: {
    name: string;
    phone: string;
    email: string;
    need: string;
  }) => void;
  defaultConsultNeed?: string;
  onClearDefaultNeed?: () => void;
}

export default function AcademyView({
  courses,
  onSubmitConsultLead,
  defaultConsultNeed,
  onClearDefaultNeed
}: AcademyViewProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedCourseOption, setSelectedCourseOption] = useState<string>(
    defaultConsultNeed || 'Tư vấn khóa học trading cơ bản'
  );
  const [noteMsg, setNoteMsg] = useState<string>('');
  const [successLeadMsg, setSuccessLeadMsg] = useState<boolean>(false);

  // Synchronise if user clicked deep CTA from home or elsewhere
  React.useEffect(() => {
    if (defaultConsultNeed) {
      setSelectedCourseOption(defaultConsultNeed);
      // scroll to form if needed
      const formEl = document.getElementById('consult-form-block');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [defaultConsultNeed]);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert('Vui lòng điền đầy đủ các thông tin liên hệ mục đỏ.');
      return;
    }

    const compiledNeed = `Học viên đăng ký: [${selectedCourseOption}]. Tin nhắn: ${noteMsg || 'Không có ghi chú thêm.'}`;

    onSubmitConsultLead({
      name: fullName,
      phone,
      email,
      need: compiledNeed
    });

    setSuccessLeadMsg(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setNoteMsg('');

    if (onClearDefaultNeed) {
      onClearDefaultNeed();
    }

    setTimeout(() => {
      setSuccessLeadMsg(false);
    }, 5000);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Academy Title and subtitle */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 bg-amber-950/70 border border-amber-500/20 rounded-full text-[11px] font-semibold text-amber-500 uppercase tracking-widest">
          Khóa Học zoom & Mentoring 1-1
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-none">
          Học Viện Giao Dịch Chứng Khoán, FX & Crypto
        </h1>
        <p className="text-sm text-slate-450 leading-relaxed max-w-xl mx-auto">
          Truyền đạt phương pháp Price Action thuần túy dựa trên hành vi dòng tiền của cá mập tài chính. Giúp bạn rèn luyện sự nhất quán, kỷ luật thép và xây dựng vị thế trader bền vững.
        </p>
      </section>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {courses.map((course) => {
          const isSelectedDetail = selectedCourseId === course.id;
          return (
            <div
              key={course.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 md:p-6 space-y-6 hover:border-slate-700 transition"
            >
              {/* Card Title Box */}
              <div className="space-y-2 text-left">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-900/30 uppercase">
                  Level: {course.level}
                </span>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-100 tracking-tight leading-tight pt-1">
                  {course.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4 text-slate-500" /> {course.duration}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-slate-500" /> {course.lessonsCount} bài giảng
                  </span>
                </div>
              </div>

              {/* Price visual block */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/15 text-xs text-slate-200 flex justify-between items-center">
                <span className="text-slate-400 select-none">Học phí chương trình:</span>
                <strong className="text-emerald-400 font-bold">{course.price}</strong>
              </div>

              {/* Target items */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-indigo-400" /> Đối tượng phù hợp của khóa học:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {course.whoShouldTake.map((w, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-indigo-400 font-black select-none">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning goals */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Bạn sẽ nhận được gì từ khóa học?
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 grid sm:grid-cols-2 gap-2">
                  {course.learnGoals.map((l, idx) => (
                    <li key={idx} className="flex gap-1.5 items-start bg-slate-950/30 p-2 rounded border border-slate-850/50">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Syllabus Button switcher */}
              <div className="border-t border-slate-800 pt-4 text-left">
                <button
                  onClick={() => setSelectedCourseId(isSelectedDetail ? null : course.id)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-755 text-xs text-slate-305 font-bold rounded-lg border border-slate-750 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isSelectedDetail ? 'Thu nhỏ giáo án chi tiết' : 'Xem giáo án & lộ trình học zoom'} <ArrowRight className="h-3 w-3" />
                </button>

                {/* Show syllabus detail */}
                {isSelectedDetail && (
                  <div className="mt-4 space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-85 shadow-inner animate-fadeIn">
                    <p className="text-[10px] font-bold text-slate-450 uppercase mb-2">Giáo trình huấn luyện nâng cao:</p>
                    <div className="space-y-3">
                      {course.syllabus.map((s, idx) => (
                        <div key={idx} className="space-y-1">
                          <h5 className="font-bold text-xs text-indigo-400">{s.title}</h5>
                          <p className="text-xs text-slate-450 leading-relaxed">{s.content}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-900 flex items-center gap-3">
                      <div className="text-xs">
                        <span className="text-slate-450">Mentor: </span>
                        <strong className="text-slate-200">{course.trainerName}</strong>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">{course.trainerBio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* REGISTER INJECT ACTION */}
              <div className="pt-2 text-left">
                <button
                  onClick={() => {
                    setSelectedCourseOption(`Học viên đăng ký: ${course.title} (${course.level})`);
                    const formEl = document.getElementById('consult-form-block');
                    if (formEl) {
                      formEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 text-xs rounded-xl shadow transition text-center cursor-pointer active:scale-98"
                >
                  Đặt vé đặt chỗ & Đăng ký tư vấn ngay
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ADVISORY ENROLLMENT FORM PIPELINE */}
      <section id="consult-form-block" className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center space-y-1">
          <h3 className="font-extrabold text-slate-100 text-lg md:text-xl flex items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5 text-amber-500 animate-pulse" /> Đăng Ký Tư Vấn & Đặt Lịch Gọi Miễn Phí
          </h3>
          <p className="text-xs text-slate-450">Admin sẽ gọi Zalo trao đổi học liệu, hỗ trợ cài tài khoản lót hoàn phí trọn đời.</p>
        </div>

        <form onSubmit={handleConsultSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Mục đích bạn cần tư vấn:</label>
            <select
              value={selectedCourseOption}
              onChange={(e) => setSelectedCourseOption(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-205 focus:outline-none focus:border-slate-700 cursor-pointer"
            >
              <option value="Học viên đăng ký học Zoom Trading Cơ Bản">Học Zoom Trading Cơ Bản (Miễn phí qua IB)</option>
              <option value="Học viên đăng ký Mentoring 1-1 SMC Chuyên Sâu">Đồng hành Mentoring 1-1 SMC Chuyên Sâu</option>
              <option value="Cần tư vấn mở tài khoản Exness / XM nhận cashback">Tư vấn mở tài khoản Exness / XM nhận cashback</option>
              <option value="Khiếu nại / Gặp lỗi nạp rút cần Admin hỗ trợ">Khiếu nại hoặc lỗi nạp rút cần Admin hỗ trợ 1-1</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Họ Tên Đầu Đủ của Bạn <span className="text-red-500">*</span>:
              </label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Số Điện Thoại / Zalo Nhận Liên Hệ <span className="text-red-500">*</span>:
              </label>
              <input
                required
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0912345678..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Hộp Thư Email nhận bài giảng <span className="text-red-500">*</span>:
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ví dụ: helpcenter@gmail.com..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Mô tả tình trạng giao dịch hiện tại của bạn (nếu có):</label>
            <textarea
              rows={3}
              value={noteMsg}
              onChange={(e) => setNoteMsg(e.target.value)}
              placeholder="Ví dụ: Đã có kinh nghiệm 1 năm nhưng hay cháy tài khoản, muốn tìm hiểu về cách tính Lot và quản lý Drawdowns..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 px-3 text-xs text-slate-150 focus:outline-none focus:border-slate-700 placeholder:text-slate-700"
            />
          </div>

          {successLeadMsg ? (
            <div className="py-2.5 px-3.5 bg-emerald-900/35 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold text-center">
              ✓ Đã gửi yêu cầu đăng ký tư vấn thành công! Zack Nguyen sẽ trực tiếp inbox Zalo hỗ trợ bạn muộn nhất trong vòng 1-2 tiếng nữa!
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-650 active:scale-98 text-slate-950 font-bold rounded-xl transition text-xs cursor-pointer shadow shadow-amber-500/10 text-center"
            >
              Gửi Thông Tin & Đăng Ký Cuộc Gọi Hẹn Giờ
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
