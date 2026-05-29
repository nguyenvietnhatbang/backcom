/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Share2, Compass, MessageSquare } from 'lucide-react';

export default function FounderView() {
  const experiences = [
    { year: '2018 - 2019', title: 'Khởi đầu thị trường & Trả giá học phí', desc: 'Tham gia thị trường Crypro và Forex như một con thiêu thân, giao dịch theo chỉ báo lag, FOMO thua lỗ hơn $20,000 vốn tự có. Biên niên sử đau đớn giúp nhận ra cốt lõi của trading.' },
    { year: '2020 - 2021', title: 'Hành trình tầm sư & Price Action', desc: 'Dành 2 năm học tập trực tiếp từ các Pro-trader nước ngoài, nghiên cứu biểu đồ hành vi giá (Price Action) và tìm sự đồng điệu với cấu trúc dòng tiền lớn (SMC).' },
    { year: '2022 - 2023', title: 'Trade Quỹ chuyên nghiệp & Private Fund', desc: 'Vượt qua các kì thi kiểm chứng gắt gao của MFF và FTMO, cầm tài khoản cấp vốn và tham gia tư vấn giao dịch cho một quỹ đầu tư tư nhân trong nước.' },
    { year: '2024 - 2026', title: 'Xây dựng Brand & Đóng góp cộng đồng', desc: 'Thành lập website thương hiệu cá nhân để đào tạo phương pháp SMC sòng phẳng, dẹp nạn lôi kéo bao lời và chia lại toàn bộ hoa hồng hoàn tiền Backcom cho trader.' }
  ];

  return (
    <div className="space-y-12 animate-fadeIn text-left">
      {/* Intro section detail */}
      <section className="grid md:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="md:col-span-4 flex justify-center">
          <div className="relative p-2 bg-slate-800 border border-slate-705 rounded-2.5xl shadow-2xl max-w-[280px]">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350"
              alt="Founder Zack Nguyen"
              className="rounded-2xl w-full h-[320px] object-cover grayscale opacity-95 contrast-110"
            />
            <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-lg">
              Founder Zack Nguyen
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider">
            Câu chuyện thương thiệu cá nhân
          </span>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight leading-none">
            "Trading Không Phải Con Đường Làm Giàu Sau Một Đêm"
          </h1>
          <p className="text-sm text-slate-350 leading-relaxed">
            Tôi là **Zack Nguyen**. Sau gần 8 năm lăn lộn trên thị trường tài chính, chứng kiến hàng trăm người bạn xung quanh bị lừa đảo kêu gọi nạp cam kết bao lời 30%/tháng để rồi vỡ nợ, tôi hiểu rằng trader Việt Nam đang cực kỳ thiếu thốn một nơi chia sẻ tri thức trading **trung thực, có nguyên tắc** và dịch vụ hỗ trợ chi phí chân chính.
          </p>
          <p className="text-sm text-slate-350 leading-relaxed">
            Hệ sinh thái này thành lập không nhằm kêu gọi bạn phải nạp tiền trade gấp gáp. Tôi muốn bạn nghiên cứu hệ thống lót, học thiết kế điểm SL/TP trước mắt, so sánh spread các sàn Exness, XM hay IC Markets một cách sòng phẳng, và khi bạn sẵn sàng trade thật, hãy nhấp link ủng hộ để nhận lại hoàn phí (Backcom) giúp tăng tỉ suất lợi nhuận ròng bền bỉ dài kỳ.
          </p>

          <div className="flex gap-4 pt-1.5">
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-450">8+</p>
              <p className="text-[10px] text-slate-455 uppercase tracking-wide">Năm Trade</p>
            </div>
            <div className="h-8 border-r border-slate-800 align-middle self-center font-sans" />
            <div className="text-center">
              <p className="text-2xl font-black text-indigo-400">1,200+</p>
              <p className="text-[10px] text-slate-455 uppercase tracking-wide">Học viên / Menbers</p>
            </div>
            <div className="h-8 border-r border-slate-800 align-middle self-center font-sans" />
            <div className="text-center">
              <p className="text-2xl font-black text-amber-500">85%</p>
              <p className="text-[10px] text-slate-455 uppercase tracking-wide">Cashback Share</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY / 5 TRANSPARENT COMMITMENTS */}
      <section className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">TÔN CHỈ HOẠT ĐỘNG</div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">Cam kết minh bạch tuyệt đối</h2>
          <p className="text-xs text-slate-450">Để giữ vững uy tín cá nhân, hệ sinh thái tuân thủ nghiêm ngặt chuẩn mực đạo đức kinh doanh:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-850/50 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> Không Cam Kết Lợi Nhuận
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chúng tôi không bao giờ cam kết bao lời bốc phét dưới mọi hình thức. Giao dịch luôn chứa đựng rủi ro và trách nhiệm của bạn là quản lý rủi ro đó.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-850/50 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> Không Nhận Ủy Thác Đầu Tư
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tuyệt đối không cầm hộ tiền, không can thiệp lệnh hộ. Bạn giữ quyền làm chủ tuyệt đối tài khoản giao dịch của bản thân trên sàn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-850/50 space-y-2">
            <div className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> Không Lôi Kéo Nạp Vốn
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống chỉ chia sẻ kiến thức trung thực và cung cấp link đối tác nếu bạn tự nguyện ủng hộ để cùng nhau tối ưu chi phí hoàn phí lót.
            </p>
          </div>
        </div>
      </section>

      {/* COMPATIBILITY CARDS (Tôi phù hợp với ai?) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SUITABLE CARD */}
        <div className="bg-slate-900 border border-emerald-500/10 p-5 md:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-850/60">
            <div className="h-7 w-7 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm md:text-base">Tôi phù hợp với ai?</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex gap-2.5 items-start">
              <ChevronRight className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Trader mong muốn rèn luyện nghiêm túc phương pháp Price Action hoặc SMC đa khung hệ thống.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <ChevronRight className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Những ai trân quý tính kỷ luật, tự chủ trong giao dịch thay vì trông đợi số lẻ từ tín hiệu.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <ChevronRight className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Các nhà đầu tư tìm kiếm giải pháp giảm phí lót tối ưu, nhận hoàn trả sòng phẳng hàng tuần.</span>
            </li>
          </ul>
        </div>

        {/* NOT SUITABLE CARD */}
        <div className="bg-slate-900 border border-red-500/10 p-5 md:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-850/60">
            <div className="h-7 w-7 rounded-lg bg-red-950 flex items-center justify-center text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm md:text-base">Tôi KHÔNG phù hợp với ai?</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex gap-2.5 items-start">
              <span className="text-red-400 shrink-0 font-bold select-none">•</span>
              <span>Người lười biếng muốn giàu sụp qua đêm, mong muốn thắng lớn mà không chịu trau dồi lý thuyết rủi ro.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-red-400 shrink-0 font-bold select-none">•</span>
              <span>Những ai có tâm lý đánh bạc cờ thế đỏ đen, hay vay mượn nóng nợ nần ngoài xã hội để nạp sàn.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-red-400 shrink-0 font-bold select-none">•</span>
              <span>Người đi săn lùng chén thánh bất bại hay các bot tự động cam kết chắc ăn ròng lợi nhuận 100%.</span>
            </li>
          </ul>
        </div>

      </section>

      {/* EXPERIENCES TIMELINE */}
      <section className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-8">
        <div>
          <h3 className="font-extrabold text-slate-150 text-base">Hành trình lịch sử giao dịch cá nhân</h3>
          <p className="text-xs text-slate-450 mt-1">Con đường chuyển biến từ một cậu ấm thua lỗ đến đỉnh cao quản trị quỹ đầu tư.</p>
        </div>

        <div className="relative border-l border-slate-800 pl-4 space-y-6 md:pl-6 ml-2 text-xs">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[25px] md:-left-[33px] top-1 h-3 w-3 md:h-4 md:w-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <div className="text-[10px] font-bold text-indigo-400 font-mono">{exp.year}</div>
              <h4 className="font-bold text-slate-205">{exp.title}</h4>
              <p className="text-slate-450 text-[11px] leading-relaxed max-w-2xl">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
