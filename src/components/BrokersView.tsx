/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Broker, BrokerAccount } from '../types';
import { Star, ArrowLeft, Check, Copy, ExternalLink, HelpCircle, ArrowUpRight, TrendingUp, ShieldAlert, Search, Send, CheckCircle } from 'lucide-react';

interface BrokersViewProps {
  brokers: Broker[];
  selectedBrokerId: string | null;
  onSelectBroker: (id: string | null) => void;
  onNavigateToTab: (tab: string) => void;
  onSubmitAccount: (accountData: {
    brokerId: string;
    brokerName: string;
    accountUid: string;
    accountType: string;
    name: string;
    phone: string;
    email: string;
  }) => void;
  userAccounts: BrokerAccount[];
}

export default function BrokersView({
  brokers,
  selectedBrokerId,
  onSelectBroker,
  onNavigateToTab,
  onSubmitAccount,
  userAccounts
}: BrokersViewProps) {
  const [filterType, setFilterType] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // UID Submission Form States
  const [submitBrokerId, setSubmitBrokerId] = useState<string>('');
  const [accountUid, setAccountUid] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('Standard');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // UID Lookup States
  const [lookupUid, setLookupUid] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<BrokerAccount | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState<boolean>(false);

  // Filter brokers
  const filteredBrokers = brokers.filter((b) => {
    if (filterType === 'All') return true;
    return b.type === filterType;
  });

  const activeBroker = brokers.find((b) => b.id === selectedBrokerId);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitBrokerId) {
      alert('Vui lòng chọn sàn giao dịch.');
      return;
    }
    if (!accountUid.trim()) {
      alert('Vui lòng điền mã UID/ID tài khoản vừa đăng ký.');
      return;
    }
    if (!fullName.trim() || !phone.trim()) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ.');
      return;
    }

    const tBroker = brokers.find(b => b.id === submitBrokerId);
    onSubmitAccount({
      brokerId: submitBrokerId,
      brokerName: tBroker ? tBroker.name : submitBrokerId,
      accountUid,
      accountType,
      name: fullName,
      phone,
      email
    });

    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setAccountUid('');
    setFullName('');
    setPhone('');
    setEmail('');
    setIsSubmitted(false);
  };

  const handleUIDLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupAttempted(true);
    const found = userAccounts.find(
      (acc) => acc.accountUid.trim() === lookupUid.trim()
    );
    setLookupResult(found || null);
  };

  // ----------------------------------------------------
  // SUB-VIEW: DETAIL PAGE FOR A SELECTED BROKER
  // ----------------------------------------------------
  if (activeBroker) {
    return (
      <div className="space-y-8 text-left animate-fadeIn">
        {/* Back navigation */}
        <button
          onClick={() => onSelectBroker(null)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition cursor-pointer self-start"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách sàn
        </button>

        {/* Hero Section */}
        <div className="relative rounded-2xl md:rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-40" />
          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <img
                  src={activeBroker.logoUrl}
                  alt={activeBroker.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-750"
                />
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2 leading-none">
                    {activeBroker.name} Review
                  </h1>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-750 uppercase">
                    {activeBroker.type} Broker
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeBroker.description}
              </p>

              {/* Badges details */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750">
                  ⚡ Nạp rút: <strong>{activeBroker.depositWithdrawalSpeed}</strong>
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750">
                  ⚙️ Đòn bẩy tối đa: <strong>{activeBroker.maxLeverage}</strong>
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750">
                  💰 Nạp tối thiểu: <strong>{activeBroker.minDeposit}</strong>
                </span>
              </div>
            </div>

            {/* CTA Box (Direct register or copy referral code) */}
            <div className="md:col-span-4 bg-slate-955 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
              <div className="text-center pb-2 border-b border-slate-850">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ưu đãi liên kết đại lý</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">{activeBroker.cashbackRate}</div>
              </div>

              <div className="space-y-3">
                <a
                  href={activeBroker.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-500 rounded-xl text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 active:scale-98 transition"
                >
                  Bắt Đầu Đăng Ký Link Sàn <ExternalLink className="h-4.5 w-4.5" />
                </a>

                <div className="flex items-center gap-1.5 p-2 bg-slate-900 border border-slate-850 rounded-xl justify-between">
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase leading-none">Mã Giới Thiệu IB</p>
                    <p className="text-xs font-mono font-bold text-slate-250 mt-1">{activeBroker.referralCode}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(activeBroker.referralCode)}
                    className="p-1.5 text-xs font-semibold text-slate-450 hover:text-slate-200 hover:bg-slate-800 transition rounded-lg"
                    title="Sao chép mã giới thiệu"
                  >
                    {copiedCode === activeBroker.referralCode ? (
                      <span className="text-[10px] text-emerald-400 font-bold">Đã chép!</span>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitBrokerId(activeBroker.id);
                  const el = document.getElementById('uid-submission-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-505/20 bg-indigo-950/20 hover:bg-indigo-950/40 rounded-xl cursor-pointer text-center"
              >
                Gửi UID Vừa Tạo Nhận Hỗ Trợ
              </button>
            </div>

          </div>
        </div>

        {/* Alert Warning */}
        <div className="pt-3 pb-3 px-4 bg-red-950/20 border border-red-500/15 rounded-xl flex items-start gap-2 text-xs text-red-400">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
          <span>
            <strong>Cảnh báo giao dịch rủi ro:</strong> Đòn bẩy cao có rủi ro lớn đối với tài sản nợ. Nhà đầu tư nên giao dịch kỷ luật và tự quản trị rủi ro cắt lỗ (SL).
          </span>
        </div>

        {/* Detailed Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-7 space-y-6">
            
            {/* Pros and Cons */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
              <h2 className="font-bold text-base text-slate-100 flex items-center gap-1.5">
                <TrendingUp className="h-5 w-5 text-emerald-400" /> Ưu điểm & Hạn chế của {activeBroker.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ưu điểm nổi bật</h3>
                  <ul className="space-y-1.5 text-xs text-slate-455">
                    {activeBroker.pros.map((p, idx) => (
                      <li key={idx} className="flex gap-2 items-start bg-slate-950/30 p-1.5 rounded border border-slate-850/50">
                        <Check className="h-4.5 w-4.5 shrink-0 text-emerald-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">Hạn chế</h3>
                  <ul className="space-y-1.5 text-xs text-slate-455">
                    {activeBroker.cons.map((c, idx) => (
                      <li key={idx} className="flex gap-2 items-start bg-slate-950/30 p-1.5 rounded border border-slate-850/50">
                        <span className="text-red-400 shrink-0 select-none">✕</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Instruction specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
              <h2 className="font-bold text-base text-slate-100">Các Bước Đăng Ký Link Sàn Nhận Ưu Đãi</h2>
              
              <div className="space-y-4 relative pl-4 border-l border-slate-805">
                <div className="relative">
                  <div className="absolute -left-[25px] top-0.5 bg-slate-950 border-2 border-emerald-400 text-emerald-404 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">1</div>
                  <h3 className="text-xs font-semibold text-slate-205">Bấm vào link đăng ký sàn</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Nhấp vào liên kết <a href={activeBroker.referralLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">Đăng ký đối tác {activeBroker.name}</a> để điều hướng tới cổng chính thức có gắn mã liên kết.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0.5 bg-slate-950 border-2 border-emerald-400 text-emerald-404 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">2</div>
                  <h3 className="text-xs font-semibold text-slate-205">Xác thực tài khoản và KYC</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Điền đầy đủ thông tin, chụp ảnh minh chứng CCCD để sàn phê duyệt tài khoản giao dịch chính thức của bạn.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0.5 bg-slate-955 border-2 border-emerald-400 text-emerald-404 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">3</div>
                  <h3 className="text-xs font-semibold text-slate-205">Gửi mã UID cho Zack Nguyen</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Sao chép mã UID được cấp, điền biểu mẫu "Gửi UID nhận hỗ trợ" phía dưới để nhận chia sẻ tệp tín hiệu, giải đáp thắc mắc và kiểm chứng đối tác.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="md:col-span-5 space-y-6">
            {/* Spec stats sheets */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="font-bold text-sm text-slate-200">Thông Số Kỹ Thuật Sàn</h2>
              
              <div className="divide-y divide-slate-800 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Class sàn:</span>
                  <span className="font-semibold text-slate-200">{activeBroker.type} Broker</span>
                </div>
                <div className="py-2.5 flex justify-between text-left">
                  <span className="text-slate-400 shrink-0 mr-4">Spread / Com:</span>
                  <span className="font-semibold text-slate-200 text-right">{activeBroker.spreadCommission}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Thủ tục KYC:</span>
                  <span className="font-semibold text-slate-200">{activeBroker.kycRequired ? 'Cần thiết' : 'Miễn'}</span>
                </div>
                <div className="py-2.5 flex justify-between text-left">
                  <span className="text-slate-400 shrink-0 mr-4">Phù hợp:</span>
                  <span className="font-semibold text-emerald-400 text-right">{activeBroker.suitableFor}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Ưu đãi đối tác:</span>
                  <span className="font-bold text-emerald-400">{activeBroker.cashbackRate}</span>
                </div>
              </div>
            </div>

            {/* Questions accordion */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="font-bold text-sm text-slate-200">Hỏi đáp hỗ trợ</h2>

              <div className="space-y-2">
                {activeBroker.faqs.map((faq, idx) => {
                  const isOpen = faqOpenIndex === idx;
                  return (
                    <div key={idx} className="border-b border-slate-800 pb-2">
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                        className="w-full text-left font-semibold text-xs text-slate-300 hover:text-white flex items-center justify-between py-1.5 cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <span className="text-indigo-400 text-sm font-black">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <p className="text-xs text-slate-450 py-1.5 leading-relaxed bg-slate-950/30 px-2 rounded mt-1">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PRIMARY DIRECTORY: DIRECTORY GRID & COMPARISON TABLE WITH UID REGISTER/QUERY
  // ----------------------------------------------------
  return (
    <div className="space-y-12 text-left animate-fadeIn">
      
      {/* Intro header specs */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">Cổng Sàn Giao Dịch & Banners Đối Tác</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Nền tảng thương hiệu cá nhân kết hợp hệ sinh thái broker uy tín. Bấm trực tiếp vào các banner sàn để đăng ký tài khoản đại lý dưới link giới thiệu chính thức, nhận tư vấn và giải đáp.
        </p>
      </div>

      {/* FILTER BUTTONS CONTROLLER */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {['All', 'Forex', 'Crypto', 'Prop Firm'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
              filterType === type
                ? 'bg-emerald-500 border-emerald-505 text-slate-950 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-700'
            }`}
          >
            {type === 'All' ? 'Tất cả danh mục' : type === 'Forex' ? 'Sàn Forex' : type === 'Crypto' ? 'Sàn Crypto' : 'Quỹ giao dịch (Prop)'}
          </button>
        ))}
      </div>

      {/* BROKERS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrokers.map((broker) => (
          <div
            key={broker.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={broker.logoUrl}
                    alt={broker.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-755"
                  />
                  <div>
                    <h3 className="font-bold text-slate-150 text-sm leading-none">{broker.name}</h3>
                    <span className="inline-block mt-1 text-[9px] font-bold rounded px-1.5 py-0.5 bg-slate-800 text-slate-400">
                      {broker.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold bg-amber-950/30 p-1 rounded">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{broker.rating}</span>
                </div>
              </div>

              {/* Rate Cashback badge */}
              <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/15 flex items-center justify-between text-xs text-slate-350">
                <span className="text-[10px] text-slate-405 font-semibold">Quyền lợi thành viên IB:</span>
                <span className="font-bold text-emerald-400">{broker.cashbackRate}</span>
              </div>

              {/* Bullet points info */}
              <div className="mt-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-450">Tốc độ nạp rút:</span>
                  <span className="font-medium text-slate-205">{broker.depositWithdrawalSpeed}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-450 font-sans">Leverage tối đa:</span>
                  <span className="font-medium text-slate-205">{broker.maxLeverage}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-left">
                  <span className="text-slate-450 shrink-0 mr-4">Phù hợp cho:</span>
                  <span className="font-medium text-slate-205 text-right line-clamp-1">{broker.suitableFor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => onSelectBroker(broker.id)}
                className="py-2 text-[11px] font-semibold bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-lg text-center cursor-pointer border border-slate-750 transition"
              >
                Đọc Đánh Giá &rarr;
              </button>
              <a
                href={broker.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSubmitBrokerId(broker.id)}
                className="py-2 text-[11px] font-bold bg-emerald-450 hover:bg-emerald-500 text-slate-950 rounded-lg text-center flex items-center justify-center gap-1 cursor-pointer transition shadow-sm shadow-emerald-500/10 animate-pulse"
              >
                Đăng ký Link Sàn <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* MID-BANNER SHOWCASING ACTIVE BROKER CODES */}
      <section className="bg-gradient-to-r from-slate-950 via-[#0a1122] to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="text-left space-y-1 max-w-xl">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-900/25 text-[9px] uppercase tracking-wide">
            Affiliate Codes
          </span>
          <h3 className="font-bold text-slate-100 text-sm md:text-base mt-2">Dùng Mã Giới Thiệu Để Nhận Ưu Đãi</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nếu đã tạo tài khoản cũ, bạn chỉ cần điền mã đối tác của Zack Nguyen và gửi hỗ trợ yêu cầu chuyển đại lý. Click sao chép nhanh mã đối tác bên dưới.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {brokers.slice(0, 3).map(b => (
            <button
              key={b.id}
              onClick={() => handleCopyCode(b.referralCode)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer"
            >
              <span>{b.name}:</span>
              <strong className="text-emerald-400">{b.referralCode}</strong>
              <span className="text-[10px] text-slate-500">{copiedCode === b.referralCode ? 'Copied' : 'Copy'}</span>
            </button>
          ))}
        </div>
      </section>

      {/* REGISTRATION & STATUS TRA CỨU SECTION */}
      <section id="uid-submission-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-900 pt-8">
        
        {/* LEFT COLUMN: SIMPLE UID SUBMISSION FORM */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 text-left space-y-4">
          <div>
            <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900/30 text-indigo-400 font-bold text-[9px] uppercase tracking-wider">
              Tạo Mã & Hỗ Trợ
            </span>
            <h2 className="font-extrabold text-slate-100 text-base md:text-lg mt-1 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" /> Biểu Mẫu Gửi Xác Minh UID Sàn
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Sau khi bạn tạo tài khoản thông qua một trong những banner giới thiệu ở trên, hãy nhập ngay mã UID để Zack Nguyen liên hệ gửi tài liệu, giáo trình Zoom miễn phí.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/25 p-5 rounded-xl text-center space-y-3.5 animate-fadeIn">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-100 text-sm">Gửi Thông Tin Thành Công!</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Hệ thống đã dán mã UID/Tài khoản <strong>"{accountUid}"</strong> vào luồng kiểm tra. Bạn có thể tự dùng bảng tra cứu bên phải để theo dõi trạng thái bất kỳ lúc nào.
              </p>
              <button
                onClick={handleResetForm}
                className="px-4 py-1.5 bg-slate-800 text-[10px] font-bold text-slate-200 border border-slate-700 rounded-lg cursor-pointer transition"
              >
                Gửi thêm mã mới +
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Sàn giao dịch:</label>
                  <select
                    value={submitBrokerId}
                    onChange={(e) => setSubmitBrokerId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-300 focus:outline-none"
                  >
                    <option value="">-- Chọn sàn hỗ trợ --</option>
                    {brokers.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Mã UID tài khoản:</label>
                  <input
                    type="text"
                    value={accountUid}
                    onChange={(e) => setAccountUid(e.target.value)}
                    placeholder="Ví dụ: 8294021"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-100 placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Họ & Tên của bạn:</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Minh Quân"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Số điện thoại / Zalo:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0987654321"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Email liên hệ (Không bắt buộc):</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ví dụ: minhquan@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-500 font-bold text-xs text-slate-950 rounded-xl transition cursor-pointer active:scale-98"
              >
                Gửi mã tài khoản đăng ký nhận hỗ trợ Zalo 🚀
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: SEARCH UID STATUS REGISTERED */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-805 rounded-2xl p-5 text-left space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-205 text-sm flex items-center gap-1.5">
              <Search className="h-4.5 w-4.5 text-indigo-400" /> Tra Cứu Trạng Thái UID Đăng Ký
            </h3>
            <p className="text-slate-450 text-[11px] mt-1 leading-relaxed">
              Bạn có thể dễ dàng kiểm tra xem UID mình gửi đã được Zack Nguyen đối soát đúng cổng liên kết đại lý hay chưa.
            </p>
          </div>

          <form onSubmit={handleUIDLookup} className="flex gap-2">
            <input
              type="text"
              value={lookupUid}
              onChange={(e) => setLookupUid(e.target.value)}
              placeholder="Nhập số UID của bạn..."
              className="flex-1 bg-slate-955 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-xs font-bold text-white rounded-lg transition"
            >
              Tìm Kiếm
            </button>
          </form>

          {lookupAttempted && (
            <div className="p-3.5 rounded-lg border text-xs bg-slate-950/40 border-slate-850 animate-fadeIn">
              {lookupResult ? (
                <div className="space-y-1.5 text-left font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-400">UID:</span>
                    <strong className="text-emerald-400 font-mono">{lookupResult.accountUid}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sàn đối chiếu:</span>
                    <strong className="text-slate-205">{lookupResult.brokerName}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Trạng thái duyệt:</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      lookupResult.verificationStatus === 'approved'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/25'
                        : lookupResult.verificationStatus === 'rejected'
                        ? 'bg-red-950 text-red-400 border border-red-900/25'
                        : 'bg-amber-955 text-amber-500 border border-amber-900/25'
                    }`}>
                      {lookupResult.verificationStatus === 'approved' ? '✓ Đăng Ký OK' : lookupResult.verificationStatus === 'rejected' ? 'Bị Từ Chối (Mã IB Sai)' : 'Đang Đợi Đối Soát...'}
                    </span>
                  </div>
                  {lookupResult.note && (
                    <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-900 mt-1">
                      <strong>Phản hồi từ Admin:</strong> {lookupResult.note}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-red-400 text-[11px] text-center font-medium">
                  ❌ Không tìm thấy mã UID "{lookupUid}" trong cơ sở đối soát. Vui lòng kiểm tra lại dãy số hoặc gửi mã mới bên trái.
                </p>
              )}
            </div>
          )}
        </div>

      </section>

      {/* MATRICES COMPARE TABLE SHEET */}
      <section className="bg-slate-905/40 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-450 uppercase tracking-widest leading-none">BẢNG DANH SÁCH RẢ CHỮA</span>
          <h2 className="text-lg md:text-xl font-bold text-slate-200 tracking-tight mt-1">Bảng So Sánh Banners Sàn Hợp Lệ</h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[9px]">
              <tr>
                <th className="py-3 px-4">Tên Sàn</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Tốc độ nạp rút</th>
                <th className="py-3 px-4">Spread / Com</th>
                <th className="py-3 px-4">Quyền lợi IB</th>
                <th className="py-3 px-4 text-center">Liên kết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 bg-slate-950/20">
              {brokers.map((broker) => (
                <tr key={broker.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-bold text-slate-150 flex items-center gap-2">
                    <img src={broker.logoUrl} alt="" className="w-6 h-6 rounded bg-slate-800 object-cover" />
                    <span>{broker.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-slate-900 border border-slate-800 text-slate-400 uppercase font-black">
                      {broker.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{broker.depositWithdrawalSpeed}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{broker.spreadCommission}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 border border-emerald-900/30 text-emerald-400 font-bold">
                      {broker.cashbackRate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onSelectBroker(broker.id)}
                      className="text-[11px] font-bold text-indigo-400 hover:underline cursor-pointer"
                    >
                      Chi Tiết Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
