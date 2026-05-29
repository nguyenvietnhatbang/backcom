/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Broker, Course, Article } from '../types';
import { Award, BookOpen, Users, ShieldAlert, Star, ExternalLink, ArrowRight, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  brokers: Broker[];
  articles: Article[];
  courses: Course[];
  onNavigate: (tab: string, arg?: string) => void;
  onOpenConsultForm: (needTitle: string) => void;
}

export default function HomeView({ brokers, articles, courses, onNavigate, onOpenConsultForm }: HomeViewProps) {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 py-16 px-6 md:px-12 text-center md:text-left">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-indigo-600/10 opacity-50" />
        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded-full text-[11px] font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Nền Tảng Hỗ Trợ Giao Dịch & Hoàn Phí Minh Bạch
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Xây dựng tư duy trading có hệ thống. <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Nhận lại hoàn phí giao dịch (Backcom)
              </span>
            </h1>
            
            <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
              Phụng sự cộng đồng trader bằng tri thức thực chiến, review sàn môi giới trung thực và hỗ trợ giảm thiểu tối đa chi phí giao dịch thông qua cơ chế cashback trực tiếp được chia sẻ từ quan hệ đối tác IB chính thức.
            </p>

            {/* Trụ cột giá trị */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-850/50">
                <div className="text-emerald-400 font-bold text-xl mb-0.5">85% Cashback</div>
                <div className="text-xs text-slate-400">Tỷ lệ hoàn cực lớn từ hoa hồng IB của sàn</div>
              </div>
              <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-850/50">
                <div className="text-amber-400 font-bold text-xl mb-0.5">8+ Năm Kinh Nghiệm</div>
                <div className="text-xs text-slate-400">Kiến thức Price Action chuyên sâu của Founder</div>
              </div>
              <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-850/50">
                <div className="text-sky-400 font-bold text-xl mb-0.5">Tức thì / Tự động</div>
                <div className="text-xs text-slate-400">Rút tiền tích lũy 24/7 về thẻ & USDT</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate('backcom')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-98 transition text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                Kích Hoạt Hoàn Phí UID
              </button>
              <button
                onClick={() => onNavigate('brokers')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-750 active:scale-98 transition text-slate-100 font-semibold border border-slate-700 rounded-xl cursor-pointer"
              >
                Xem Sàn Khuyến Nghị
              </button>
              <button
                onClick={() => onOpenConsultForm('Tư vấn định hướng trade & chọn sàn từ trang chủ')}
                className="px-6 py-3 text-slate-300 hover:text-white font-medium hover:underline text-sm cursor-pointer"
              >
                Nhận tư vấn miễn phí &rarr;
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative p-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-[280px]">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350"
                alt="Founder"
                className="rounded-xl w-full h-[320px] object-cover grayscale opacity-90 contrast-125"
              />
              <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-slate-700 py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 leading-none">Zack Nguyen</p>
                  <p className="text-xs font-bold text-slate-200">Kỷ luật & Trách nhiệm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cảnh báo rủi ro */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-left text-xs text-amber-500/90 leading-relaxed bg-amber-950/20 p-3 rounded-lg border border-amber-500/15">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500" />
          <span>
            <strong>BADGE CẢNH BÁO RỦI RO:</strong> Bài viết và công cụ trên website chỉ nhằm mục đích chia sẻ kiến thức đầu tư, không đảm bảo, không cam kết lợi nhuận dưới bất kỳ hình thức nào. Chúng tôi không nhận ủy thác đầu tư, không kêu gọi góp vốn. Thị trường CFD/Forex và Crypto chịu rủi ro biến động rất lớn, vui lòng quản lý vốn khôn ngoan.
          </span>
        </div>
      </section>

      {/* Section: Founder / Personal Brand Philosophy */}
      <section className="bg-slate-950/40 rounded-2xl border border-slate-850 p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <Award className="h-4 w-4" /> TRUYỀN THÔNG & TRIẾT LÝ TRADE
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Tôi là ai và Triết lý đồng hành trung thực?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Chào cộng đồng, tôi là **Zack Nguyen (Founder)**. Tôi xây dựng nền tảng này với mong muốn đẩy lùi các tệ nạn lừa đảo bao lời, bắn tín hiệu vô trách nhiệm từ các sàn cỏ. Tất cả bài review Broker đều được chấm dựa trên dữ liệu giao dịch thực tế của tôi và cộng sự với số vốn hoạt động tối thiểu $10,000 trên từng sàn.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Chúng tôi cam kết không nhận tiền của sàn rác để viết bài sai sự thật. Tiền hoàn cashback (Backcom) được tính toán tự động dựa trên báo cáo minh bạch từ cổng đối tác, hoàn trả định kỳ để hỗ trợ trader tiết kiệm tối đa một phần chi phí vận hành.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('founder')}
              className="px-5 py-2.5 bg-slate-800 text-sm font-semibold text-slate-100 hover:bg-slate-750 transition border border-slate-700 rounded-lg cursor-pointer"
            >
              Xem Câu Chuyện Cá Nhân &rarr;
            </button>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
              <span>●</span> Khép góc Quản trị rủi ro
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lợi nhuận bền vững chỉ xuất hiện khi rủi ro được cô lập hoàn toàn. Học viên của tôi luôn được dạy cách thiết kế đòn bẩy và khối lượng lót tối thiểu sao cho có thể bình tĩnh trước mọi biến động giá.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
              <span>●</span> Tư duy SMC & Price Action
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Không theo đuổi chỉ báo lag (mũi tên xanh đỏ rác). Chúng tôi tập trung đọc nến, hiểu tâm lý dồn ứ lệnh tại các vùng Order Block, sự săn thanh khoản từ các "tay to" lớn (Market makers) để nỗ lực đi cùng dòng chảy của họ.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
              <span>●</span> Nói Không Với Ủy Thác
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sẵn sàng bài trừ các cơ sở nhận ủy thác, can thiệp tài khoản hộ. Tiền của bạn phải nằm trong sự kiểm soát tuyệt đối của bạn. Kiến thức trong đầu mới là thứ mang lại tự do tài chính vững bền.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
              <span>●</span> Hoàn Phí Sòng Phẳng
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cơ chế tự động hóa minh bạch. Sàn trích lại bao nhiêu, chúng tôi công bố và trích ngược lại phần lớn cho các trader đã đăng ký link ủng hộ, không mập mờ, không khất nợ hay bớt xén phần trăm.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Brokers Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">DANH MỤC TOP BROKERS</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mt-1">
              Sàn Môi Giới Uy Tín Được Khuyến Nghị
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Danh sách các sàn được kiểm chứng chất lượng nạp rút tiền, độ giãn spread tối thiểu và được kết nối trực tiếp hệ thống đối tác tính hoàn phí (Backcom).
            </p>
          </div>
          <button
            onClick={() => onNavigate('brokers')}
            className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group self-start md:self-end shrink-0 cursor-pointer"
          >
            Tất cả sàn & Bảng so sánh <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.slice(0, 3).map((broker) => (
            <div
              key={broker.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4 hover:border-slate-700 hover:bg-slate-850 transition relative flex flex-col justify-between"
            >
              {/* Header card */}
              <div>
                <div className="flex items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={broker.logoUrl}
                      alt={broker.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-750"
                    />
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">{broker.name}</h3>
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-slate-800 text-slate-400 border border-slate-750">
                        {broker.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-950/35 border border-amber-500/15 p-1 rounded-lg">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                    <span>{broker.rating}</span>
                  </div>
                </div>

                <div className="py-2.5 px-3 rounded-lg bg-emerald-950/20 border border-emerald-500/15 text-xs text-slate-300 flex items-center justify-between mb-3">
                  <span className="font-medium text-slate-400">Ưu đãi hoàn phí (Backcom):</span>
                  <span className="font-bold text-emerald-400">{broker.cashbackRate}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {broker.description}
                </p>

                <div className="pt-3 border-t border-slate-800 mt-3 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Nạp tối thiểu:</span>
                    <span className="font-semibold text-slate-200">{broker.minDeposit}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Nạp rút tiền:</span>
                    <span className="font-semibold text-slate-200">{broker.depositWithdrawalSpeed}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Ưu điểm:</span>
                    <span className="font-semibold text-emerald-400 line-clamp-1">{broker.suitableFor}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <button
                  onClick={() => onNavigate('brokers', broker.id)}
                  className="py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 rounded-lg text-center cursor-pointer border border-slate-750"
                >
                  Xem Review Chi Tiết
                </button>
                <a
                  href={broker.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-500 rounded-lg text-center flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-emerald-500/10"
                >
                  Mở Tài Khoản <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide cashback section (3 steps) */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">CƠ CHẾ MINH BẠCH</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Nhận Hoàn Phí Chỉ Với 3 Bước Lập Tức
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chúng tôi tự động nhận báo cáo số lot giao dịch từ cổng đối tác và trích hồi lại phần lớn (lên tới 85%) hoa hồng cho ví của bạn. Không ảnh hưởng đến spread của tài khoản.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="p-5 flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-850 space-y-4">
            <div className="space-y-3">
              <div className="h-10 w-10 text-xs text-slate-950 bg-emerald-400 font-extrabold flex items-center justify-center rounded-full shadow-lg shadow-emerald-500/10">01</div>
              <h3 className="font-bold text-slate-150 text-sm">Đăng ký tài khoản qua link IB</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhấp nút tại website để tạo tài khoản mới. Nếu bạn đã có sẵn tài khoản cũ, chỉ cần chuyển đổi mã IB đối tác trong menu ứng dụng vô cùng đơn giản.
              </p>
            </div>
            <button
              onClick={() => onNavigate('brokers')}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer text-left"
            >
              Chọn sàn đăng ký &rarr;
            </button>
          </div>

          <div className="p-5 flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-850 space-y-4">
            <div className="space-y-3">
              <div className="h-10 w-10 text-xs text-slate-950 bg-indigo-400 font-extrabold flex items-center justify-center rounded-full shadow-lg shadow-indigo-500/10">02</div>
              <h3 className="font-bold text-slate-150 text-sm">Gửi UID / ID tài khoản để kích hoạt</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Truy cập cổng hoàn phí, điền thông tin tài khoản UID, MT4 hoặc MT5. Đội ngũ kỹ thuật sẽ xác nhận trực tiếp với sàn chỉ trong từ 5 - 15 phút.
              </p>
            </div>
            <button
              onClick={() => onNavigate('backcom')}
              className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer text-left"
            >
              Khai báo số tài khoản &rarr;
            </button>
          </div>

          <div className="p-5 flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-850 space-y-4">
            <div className="space-y-3">
              <div className="h-10 w-10 text-xs text-slate-950 bg-amber-400 font-extrabold flex items-center justify-center rounded-full shadow-lg shadow-amber-500/10">03</div>
              <h3 className="font-bold text-slate-150 text-sm">Bắt đầu giao dịch và rút tiền</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thực hiện chiến lược trade như bình thường. Hệ thống tự động ghi nhận số lot, tính hoàn phí USD hoặc quy đổi VND trực tiếp vào tài khoản ví của bạn hàng tuần.
              </p>
            </div>
            <button
              onClick={() => onNavigate('backcom')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer text-left"
            >
              Xem số dư ví tích lũy &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Courses/Mentoring Block */}
      <section className="grid md:grid-cols-12 gap-8 items-center bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8">
        <div className="md:col-span-4 space-y-4">
          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/25 rounded text-[10px] font-bold uppercase text-amber-500">
            Học Viện Đào Tạo Mentoring
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Khóa Học Tư Duy Trading Thực Chiến
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tôi đồng hành hướng dẫn tư duy Price Action logic, lý thuyết SMC tinh giản giúp bạn vững bước vượt qua các kỳ thi quỹ lớn (FTMO, MFF, v.v.), tránh xa cuộc chơi cờ bạc đỏ đen.
          </p>
          <div className="flex gap-2 text-xs text-slate-400">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Đồng hành Zoom 1-1 hàng ngày</span>
          </div>
          <div className="flex gap-2 text-xs text-slate-400">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Ưu đãi hoàn học phí khi trade đạt mốc lot</span>
          </div>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('academy')}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-bold transition rounded-lg text-xs cursor-pointer text-center"
            >
              Tìm Hiểu Lộ Trình Học Zoom &rarr;
            </button>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded bg-indigo-950 border border-indigo-500/20 text-indigo-400">
                  {course.level}
                </span>
                <h3 className="font-bold text-slate-100 text-sm">{course.title}</h3>
                <p className="text-xs text-slate-400">Thời gian: {course.duration} | Giảng viên: {course.trainerName}</p>
              </div>
              <div className="text-right flex flex-col items-start sm:items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-400">{course.price}</span>
                <button
                  onClick={() => onOpenConsultForm(`Đăng ký tư vấn khóa học: ${course.title}`)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-[10px] text-slate-200 font-bold border border-slate-750 rounded-lg cursor-pointer transition active:scale-98"
                >
                  Đăng Ký Tư Vấn
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Post Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400">BLOG KIẾN THỨC SEO</div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">Bài Viết Mới Nhất</h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-teal-400 hover:underline cursor-pointer"
          >
            Đến Toàn Bộ Bài Viết &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate('blog', article.id)}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition cursor-pointer flex flex-col md:flex-row"
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full md:w-44 h-44 object-cover shrink-0 grayscale hover:grayscale-0 transition"
              />
              <div className="p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-750 text-emerald-400 font-medium">
                      {article.categoryName}
                    </span>
                    <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h3 className="font-bold text-slate-200 text-sm line-clamp-2 hover:text-emerald-400 transition">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {article.metaDescription}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Tác giả: {article.authorName}</span>
                  <span>{article.views} lượt xem</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive CTA & Communities Section */}
      <section className="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-6 md:p-10 rounded-3xl border border-indigo-900/30 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center">
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
              Kết Nối Cộng Đồng Giao Dịch
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Gia Nhập Cộng Đồng Học Tập & Nhận Tín Hiệu Sạch
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
            Hàng ngày, chúng tôi chia sẻ phân tích xu hướng thị trường Vàng, chỉ số Nasdaq, BNB, Bitcoin từ lúc 9h sáng hoàn toàn miễn phí. Cập nhật cảnh báo phốt sàn rác và xử lý khiếu nại tài khoản.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="https://t.me/telegram_channel_mock_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#229ED9] hover:bg-[#2090C5] text-white font-bold rounded-xl flex items-center gap-2 transition active:scale-98 shadow-lg shadow-[#229ED9]/15 text-sm cursor-pointer"
          >
            <MessageSquare className="h-4.5 w-4.5" /> Tham Gia Kênh Telegram Tín Hiệu
          </a>
          <a
            href="https://zalo.me/zalo_group_mock_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#0068FF] hover:bg-[#005AD8] text-white font-bold rounded-xl flex items-center gap-2 transition active:scale-98 shadow-lg shadow-[#0068FF]/15 text-sm cursor-pointer"
          >
            <MessageSquare className="h-4.5 w-4.5" /> Vào Nhóm Thảo Luận Zalo Chat
          </a>
        </div>
        <p className="text-[10px] text-indigo-400/80">
          * Đã có hơn 1,200 thành viên tích cực đang chia sẻ kinh nghiệm hàng ngày.
        </p>
      </section>
    </div>
  );
}
