/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Broker, Course, Article, ArticleCategory, UserProfile, BrokerAccount, Lead, CashbackTransaction, WithdrawalRequest } from './types';

export const INITIAL_BROKERS: Broker[] = [
  {
    id: 'exness',
    name: 'Exness',
    type: 'Forex',
    logoUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200',
    referralLink: 'https://one.exness-track.com/a/exness-partner-link',
    referralCode: 'exness-partner-link',
    cashbackEnabled: true,
    cashbackDescription: 'Hoàn trả lên đến 40% phí commission hoặc 3-8 USD/lot giao dịch tùy loại tài khoản.',
    cashbackRate: '3.0 - 8.0 USD / Lot',
    rating: 4.9,
    minDeposit: '$10',
    maxLeverage: '1:Vô cực',
    depositWithdrawalSpeed: 'Tức thì (24/7, cả thứ 7 & Chủ Nhật)',
    kycRequired: true,
    suitableFor: 'Scalper, Day Trader, giao dịch Vàng (XAUUSD) miễn phí swap',
    spreadCommission: 'Spread cực thấp từ 0.0 pip, commission chỉ từ $7/lot',
    status: 'active',
    priority: 1,
    description: 'Exness là nhà môi giới Forex lớn nhất và uy tín nhất thế giới hiện nay, nổi bật với cơ chế nạp rút tiền tức thì tự động và điều kiện giao dịch cực kỳ cạnh tranh cho mọi phong cách trading.',
    pros: [
      'Nạp rút tiền tự động siêu tốc 24/7 qua ngân hàng Việt Nam',
      'Miễn phí phí qua đêm (swap) đối với Vàng, Dầu và các cặp tiền chính',
      'Đội ngũ hỗ trợ Tiếng Việt chuyên nghiệp hoạt động liên tục',
      'Nền tảng giao dịch ổn định, ít trượt giá'
    ],
    cons: [
      'Spread có thể giãn nhẹ khi tin tức cực mạnh công bố',
      'Chế độ đòn bẩy vô cực có rủi ro cao nếu không quản lý vốn tốt'
    ],
    faqs: [
      {
        question: 'Làm sao để nhận hoàn tiền (Backcom) tại Exness?',
        answer: 'Bạn chỉ cần nhấp vào nút Đăng Ký trên website này để mở tài khoản Exness mới dưới link IB đối tác, hoặc nếu có tài khoản cũ, bạn thực hiện gửi yêu cầu chuyển đối tác (IB) sang mã giới thiệu của chúng tôi trên ứng dụng Exness. Sau đó, gửi UID của bạn qua trang Nhận Hoàn Phí để được kích hoạt tự động.'
      },
      {
        question: 'Rút tiền hoàn phí Exness bao lâu một lần?',
        answer: 'Tiền backcom được cập nhật theo tuần hoặc theo tháng. Bạn có thể yêu cầu rút tiền về tài khoản ngân hàng hoặc ví USDT từ số dư tích lũy bất cứ lúc nào khi đạt hạn mức tối thiểu $10.'
      },
      {
        question: 'Việc nhận backcom có làm tăng spread của tôi không?',
        answer: 'Hoàn toàn KHÔNG. Điều kiện giao dịch, Spread, Commission và đòn bẩy của bạn giống hệt 100% so với khi mở trực tiếp với sàn. Cashback đơn giản là chúng tôi chia sẻ lại phần hoa hồng làm đại lý đối tác mà Exness trả cho chúng tôi.'
      }
    ]
  },
  {
    id: 'xm',
    name: 'XM Global',
    type: 'Forex',
    logoUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200',
    referralLink: 'https://clicks.pipaffiliates.com/c?c=xm-partner-link',
    referralCode: 'xm-partner-link',
    cashbackEnabled: true,
    cashbackDescription: 'Hoàn trả lên đến $5 - $9 mỗi lot giao dịch tiêu chuẩn, bất kể lệnh thắng hay thua.',
    cashbackRate: '5.0 - 9.0 USD / Lot',
    rating: 4.8,
    minDeposit: '$5',
    maxLeverage: '1:1000',
    depositWithdrawalSpeed: 'Nhanh (5 - 30 phút)',
    kycRequired: true,
    suitableFor: 'Trader thích săn bonus, tài khoản vốn nhỏ cần đòn bẩy cao',
    spreadCommission: 'Tài khoản Ultra Low không commission, spread chỉ từ 0.6 pip',
    status: 'active',
    priority: 2,
    description: 'XM là sàn giao dịch Forex toàn cầu sở hữu lượng người dùng đông đảo nhờ các chương trình khuyến mãi tặng cỏ $30 - $50 trải nghiệm không cần nạp tiền cùng ưu đãi nạp 100% cực kỳ hấp dẫn.',
    pros: [
      'Nhiều chương trình Bonus nạp tiền và Bonus đăng ký dùng thử lớn nhất thị trường',
      'Đòn bẩy cao lên tới 1:1000 và bảo vệ chống âm số dư tài khoản',
      'Tổ chức nhiều buổi webinar đào tạo trực tuyến miễn phí hàng ngày cho trader Việt',
      'Cho phép giao dịch khối lượng siêu nhỏ micro-lot cực kỳ an toàn cho người mới học'
    ],
    cons: [
      'Spread trên tài khoản Standard thường tương đối cao',
      'Không hỗ trợ rút tiền nhanh tự động vào dịp cuối tuần như Exness'
    ],
    faqs: [
      {
        question: 'Tài khoản XM Ultra Low có được nhận Backcom không?',
        answer: 'Có! Cả tài khoản Standard lẫn tài khoản Ultra Low của XM đều nằm trong diện được hỗ trợ hoàn phí. Tuy nhiên, tỷ lệ cashback cụ thể trên mỗi lot của tài khoản Ultra Low sẽ được quy đổi thấp hơn một chút do sàn thu mức commission và spread thực tế rất thấp.'
      }
    ]
  },
  {
    id: 'icmarkets',
    name: 'IC Markets',
    type: 'Forex',
    logoUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200',
    referralLink: 'https://www.icmarkets.com/?camp=ic-partner-link',
    referralCode: 'ic-partner-link',
    cashbackEnabled: true,
    cashbackDescription: 'Hoàn trả $1.5 - $3.0 cho mỗi lot giao dịch trên tài khoản Raw Spread thực tế.',
    cashbackRate: '1.5 - 3.0 USD / Lot',
    rating: 4.7,
    minDeposit: '$200',
    maxLeverage: '1:500',
    depositWithdrawalSpeed: 'Trung bình (1 - 4 giờ làm việc)',
    kycRequired: true,
    suitableFor: 'Thuật toán EA, Swing trader lâu năm, giao dịch khối lượng lớn chuyên nghiệp',
    spreadCommission: 'Spread thực tế Raw chỉ từ 0.0 pip, commission cố định $7/lot vòng tròn',
    status: 'active',
    priority: 3,
    description: 'IC Markets là cái tên huyền thoại đến từ Úc, nổi tiếng có tính thanh khoản sâu nhất thế giới và tốc độ khớp lệnh máy chủ cực nhanh, là lựa chọn số một của các EA (robot tự động) và các trader thích spread hẹp.',
    pros: [
      'Thanh khoản đỉnh cao, trượt giá (slippage) cực kỳ hiếm khi xảy ra',
      'Spread Raw thực sự từ 0.0 pip cho cặp EURUSD, USDJPY, GBPUSD',
      'Được cấp phép bởi các cơ quan giám sát tài chính uy tín hàng đầu như ASIC, CySEC'
    ],
    cons: [
      'Yêu cầu mức nạp tiền ban đầu tối thiểu khá cao ($200)',
      'Hỗ trợ khách hàng Việt Nam đôi lúc tốn nhiều thời gian phản hồi vào ngày nghỉ'
    ],
    faqs: [
      {
        question: 'Làm thế nào để chuyển tài khoản IC Markets có sẵn sang phong cách nhận backcom?',
        answer: 'Bạn gửi email tới bộ phận support của IC Markets yêu cầu liên kết tài khoản của bạn vào nhóm IB đối tác của chúng tôi. Chúng tôi sẽ cung cấp mẫu email và mã IB cụ thể để bạn sao chép gửi.'
      }
    ]
  },
  {
    id: 'binance',
    name: 'Binance',
    type: 'Crypto',
    logoUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200',
    referralLink: 'https://accounts.binance.com/register?ref=binance-partner-link',
    referralCode: 'binance-partner-link',
    cashbackEnabled: true,
    cashbackDescription: 'Hoàn trả trực tiếp 20% phí giao dịch Spot và Futures trọn đời cho tài khoản đăng ký mới.',
    cashbackRate: 'Hoàn 20% Phí Giao Dịch',
    rating: 4.9,
    minDeposit: 'Không giới hạn',
    maxLeverage: '1:125 (Futures)',
    depositWithdrawalSpeed: 'Tức thì qua giao dịch P2P nội địa',
    kycRequired: true,
    suitableFor: 'Mọi đối tượng đầu tư Tiền điện tử từ Spot, Futures đến staking, Web3',
    spreadCommission: 'Phí mặc định siêu rẻ chỉ từ 0.1% Spot, 0.02%/0.04% Maker/Taker Futures',
    status: 'active',
    priority: 4,
    description: 'Binance là sàn giao dịch tiền điện tử lớn nhất hành tinh về cả volume lẫn độ bảo mật, cung cấp hàng ngàn cặp altcoin giao dịch, thanh khoản P2P dồi dào và nhiều cơ hội sinh lời an toàn.',
    pros: [
      'Hệ thống bảo mật quỹ SAFU hàng đầu thế giới, chống hack hoàn hảo',
      'Thanh khoản Spot và Futures vô địch, khớp lệnh triệu đô chỉ trong tích tắc',
      'Thanh toán P2P với hàng ngàn thương nhân Việt Nam, nạp rút không mất phí'
    ],
    cons: [
      'Giao diện rất nhiều sản phẩm phức tạp có thể gây rối cho người mới chuyển tiền sang điện tử'
    ],
    faqs: [
      {
        question: 'Cơ chế hoàn phí 20% của Binance hoạt động như thế nào?',
        answer: 'Khi bạn đăng ký tài khoản qua link giới thiệu đặc biệt của chúng tôi, sàn Binance sẽ tự động chia lại 20% toàn bộ phí giao dịch phát sinh của bạn ngay lập tức vào ví Spot hàng giờ. Bạn hoàn toàn có thể tự kiểm tra trực tiếp trong lịch sử chia hoa hồng giới thiệu của Binance.'
      }
    ]
  },
  {
    id: 'bybit',
    name: 'Bybit',
    type: 'Crypto',
    logoUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=1200',
    referralLink: 'https://partner.bybit.com/b/bybit-partner-link',
    referralCode: 'bybit-partner-link',
    cashbackEnabled: true,
    cashbackDescription: 'Giảm giá coupon 15-20% phí giao dịch phái sinh kèm hoàn trả thêm hoàn cashback trực tiếp.',
    cashbackRate: 'Hoàn 20% Phí Trọn Đời',
    rating: 4.8,
    minDeposit: 'Không giới hạn',
    maxLeverage: '1:100 (Futures)',
    depositWithdrawalSpeed: 'Tức thì qua P2P',
    kycRequired: true,
    suitableFor: 'Trader chuyên đánh Futures Crypto với đòn bẩy ổn định, an toàn',
    spreadCommission: 'Phí giao dịch tối ưu, liên tục có chiến dịch hoàn phí và Launchpad hấp dẫn',
    status: 'active',
    priority: 5,
    description: 'Bybit là sàn giao dịch Crypto cực kỳ được yêu thích từ năm 2018 bởi giao diện thân thiện tối ưu cho trade đòn bẩy Futures, sở hữu công cụ Copy Trading hiệu quả hàng đầu phân khúc.',
    pros: [
      'Giao diện giao dịch app điện thoại mượt mà, trực quan nhất thế giới',
      'Hệ thống khớp lệnh liên tục không bao giờ bị đơ nghẽn mạng lúc thị trường biến động cực đại',
      'Chức năng CopyTrade cho phép nhân bản vị thế của các Master Trader uy tín thế giới'
    ],
    cons: [
      'Thanh khoản các cặp coin rác (low-cap) đôi khi không sâu bằng Binance'
    ],
    faqs: [
      {
        question: 'Tài khoản Bybit sẵn có chuyển IB nhận hoàn phí được không?',
        answer: 'Được! Bybit cho phép người dùng tự động chuyển đổi mã giới thiệu trực tiếp trong menu Hỗ Trợ trên web/app bằng cách điền mã giới thiệu đối tác của đại lý chúng tôi một cách vô cùng đơn giản.'
      }
    ]
  }
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { id: 'forex', name: 'Kiến thức Forex', slug: 'kien-thuc-forex' },
  { id: 'crypto', name: 'Kiến thức Crypto', slug: 'kien-thuc-crypto' },
  { id: 'reviews', name: 'Review sàn giao dịch', slug: 'review-san' },
  { id: 'cashback', name: 'Hoàn phí Backcom', slug: 'hoan-phi-backcom' },
  { id: 'props', name: 'Giao dịch Quỹ (Prop Firm)', slug: 'trade-quy' },
  { id: 'tools', name: 'AI & Công cụ trading', slug: 'ai-cong-cu' }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'backcom-exness-la-gi',
    title: 'Backcom Exness là gì? Hướng dẫn chi tiết cách cài đặt nhận hoàn phí 80% hoa hồng',
    slug: 'backcom-exness-la-gi',
    categoryId: 'cashback',
    categoryName: 'Hoàn phí Backcom',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400',
    seoTitle: 'Backcom Exness Là Gì? Kích Hoạt Nhận Hoàn Phí IB Exness Tối Đa',
    metaDescription: 'Khám phá khái niệm Backcom Exness, cơ chế hoạt động hoàn trả hoa hồng đối tác cực kỳ tiết kiệm cho trader Việt Nam cùng hướng dẫn đăng ký UID.',
    authorName: 'Founder Investment',
    status: 'published',
    createdAt: '2026-05-15T08:00:00Z',
    views: 1250,
    content: `## Backcom Exness Là Gì?

Trong thị trường Forex, **Backcom** (viết tắt của *Back Commission* - Hoàn phí giao dịch) là một thuật ngữ vô cùng phổ biến. Khi bạn đăng ký tài khoản giao dịch Exness thông qua một đối tác liên kết (IB - Introducing Broker), Exness sẽ trích một phần doanh thu (chủ yếu dựa trên spread hoặc commission thực tế của bạn) gửi cho IB dưới dạng hoa hồng giới thiệu.

Thay vì giữ lại toàn bộ hoa hồng đó, chúng tôi (Ecosystem Đầu Tư & Hoàn Phí Trading) quyết định **hoàn lại phần lớn (lên tới 80%) số tiền hoa hồng này** trực tiếp vào ví của bạn. Đây gọi là chương trình **Backcom Exness**.

> **Ví dụ cụ thể:** Nếu bạn giao dịch 10 lót Vàng (XAUUSD) trên tài khoản Standard, Exness trả cho IB khoảng $40 hoa hồng. Chúng tôi sẽ tự động hoàn trả lại cho bạn $32-$35 tùy cấp độ. Giao dịch càng nhiều, bạn càng nhận lại nhiều tiền phí, giúp giảm thiểu đáng kể giá trị hòa vốn (break-even point) của một lệnh trade.

---

## Lợi Ích Khổng Lồ Khi Nhận Backcom Exness

1. **Giảm thiểu chi phí giao dịch trực tiếp:** Giảm spread thực tế xuống chỉ còn 1/2 hoặc thậm chí thấp hơn, tối ưu hóa lợi nhuận.
2. **Hòa vốn cực nhanh:** Các scalper đánh ngắn, ăn vài pip sẽ vô cùng lợi thế khi phí vào lệnh được hoàn lại phân nửa.
3. **Giữ nguyên điều kiện tài khoản:** Bạn KHÔNG bị tăng spread hay bị thu thêm phí ngầm nào cả từ sàn Exness. Quyền lợi được duy trì nguyên vẹn tuyệt đối.
4. **Nhận hỗ trợ 1-1 từ Admin:** Tư vấn miễn phí từ đội ngũ giàu kinh nghiệm, tín hiệu trading chất lượng kết hợp hỗ trợ kỹ thuật sàn.

---

## Hướng Dẫn Kích Hoạt Nhận Backcom Exness Trong 3 Bước

### Bước 1: Đăng ký tài khoản mới hoặc chuyển đối tác
* **Nếu bạn chưa có tài khoản:** Nhấp vào nút **[Đăng Ký Broker Exness]** ngay trên website để chuyển đến trang đăng ký chính thức của Exness có gắn ID đối tác của chúng tôi.
* **Nếu đã có tài khoản cũ:** Bạn có thể gửi yêu cầu đổi đối tác trực tiếp trên app Exness hoặc gửi email đến \`support@exness.com\`. Hãy nhắn cho Admin qua Zalo/Telegram để chúng tôi gửi mã IB đúng nhất.

### Bước 2: Gửi UID tài khoản Exness của bạn
Sau khi mở xong, hãy truy cập vào trang **[Nhận Backcom]** trên website này của chúng tôi. 
Điền:
* Họ & Tên của bạn.
* Số Zalo/Email liên hệ.
* Sàn giao dịch: **Exness**.
* **UID / Số tài khoản MT4 / MT5**.

### Bước 3: Đợi admin kiểm tra và tiến hành giao dịch
Đội ngũ quản trị sẽ đối chiếu số UID trên cổng IB quản trị Exness. Sau khi kiểm tra thành công (thông thường chỉ mất 5-15 phút), trạng thái tài khoản của bạn trên web sẽ chuyển sang **"Đã xác minh"**. Từ thời điểm đó, mọi giao dịch bạn thực hiện bắt đầu được tự động quét khối lượng lót và tính tiền Cashback!

---

## FAQ - Câu Hỏi Thường Gặp Về Backcom

#### Q1: Tôi giao dịch lỗ thì có được hoàn tiền không?
**Có.** Hoa hồng sàn trả cho IB dựa hoàn toàn vào khối lượng giao dịch phát sinh (số lot mở và đóng lệnh) chứ không phụ thuộc vào việc lệnh của bạn thắng hay thua. Chỉ cần phát sinh khối lượng lót thực tế là bạn được nhận hoàn phí.

#### Q2: Spread của tôi có bị đắt đỏ hơn để bù tiền hoàn không?
**Tuyệt đối không.** Exness kiểm soát spread rất nghiêm ngặt và không cho phép bất kỳ IB nào tăng spread tự ý của khách hàng. Phí giao dịch tài khoản của bạn mở qua đối tác luôn luôn bằng với phí mở trực tiếp.

#### Q3: Rút tiền hoàn ra sao?
Bạn tích lũy tối thiểu $10 trên ví hệ thống của chúng tôi, sau đó gửi lệnh rút tiền. Chúng tôi hỗ trợ chuyển khoản ngân hàng Việt Nam 24/7 và chuyển tiền mã hóa USDT (TRC20) bảo mật.`
  },
  {
    id: 'so-sanh-san-forex-uy-tin-viet-nam',
    title: 'So sánh chi tiết các sàn Forex hàng đầu 2026: Exness, XM hay IC Markets?',
    slug: 'so-sanh-san-forex-uy-tin-viet-nam',
    categoryId: 'reviews',
    categoryName: 'Review sàn giao dịch',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
    seoTitle: 'Nên Chọn Sàn Giao Dịch Forex Nào Uy Tín Nhất Việt Nam 2026',
    metaDescription: 'Phân tích đa chiều về spread, commission, nạp rút tiền và đòn bẩy giữa các ông lớn Exness, XM và IC Markets giúp bạn tìm ra chân ái giao dịch.',
    authorName: 'Founder Investment',
    status: 'published',
    createdAt: '2026-05-10T10:30:00Z',
    views: 980,
    content: `## Lựa chọn sàn giao dịch - Bước đầu quan trọng của mọi Trader

Tìm kiếm một sàn môi giới Forex (Broker) uy tín, phí rẻ, nạp rút không bị gián đoạn là điều quan trọng nhất quyết định bạn có thể tồn tại lâu dài trên thị trường hay không. Bài viết này sẽ phân tích thật công tâm 3 sàn tốt nhất đang chiếm lĩnh hơn 90% thị phần Việt Nam: **Exness, XMGlobal, và IC Markets.**

---

## 1. Broker Exness: Vua nạp rút tiền và đòn bẩy cực đại

Exness luôn giữ vững vị trí độc tôn về sự thuận tiện cho người Việt. Nếu bạn đề cao tính năng thanh khoản nhanh thì không sàn nào so sánh nổi.

* **Nạp rút:** Hệ thống AI tự động xử lý. Bạn rút $100 hay $10,000 đều chỉ mất đúng 3 phút, bất kể là đêm muộn hay ngày nghỉ lễ Chủ Nhật.
* **Spread & Comm:** Spread tài khoản Zero và Raw vô cùng ấn tượng (từ 0.0 pip), Swap (phí qua đêm) được miễn phí đối với Vàng giúp bạn giữ lệnh thoải mái.
* **Hạn chế:** Hệ thống đôi khi gặp hiện tượng nghẽn nhẹ máy chủ hiển thị nến vào thời gian công bố tin dữ liệu non-farm siêu mạnh.

---

## 2. Broker IC Markets: Đỉnh cao của EA và trượt giá cực thấp

Được quản lý cực kỳ chặt chẽ bởi ASIC (Úc), IC Markets là biểu tượng cho sự minh bạch, "sạch sẽ" của dữ liệu đồ thị giá.

* **Thanh khoản:** Khớp lệnh siêu mượt nhờ đặt máy chủ tại sàn Equinix NY4 (New York), lý tưởng tuyệt đối cho EA robot và scalper đánh khối lượng lớn.
* **Spread & Comm:** Rất ổn định. Spread tài khoản Raw Spread cố định quanh mức cực mỏng.
* **Hạn chế:** Không hỗ trợ nạp rút siêu tốc đêm muộn hay ngày nghỉ. Thủ tục xác minh danh tính KYC ban đầu khá khắt khe. Nạp tối thiểu cao ($200).

---

## 3. Broker XM: Sân chơi tuyệt vời của người thích săn Bonus và đòn bẩy cao

Nếu bạn là người mới khởi nghiệp với số vốn khiêm tốn hoặc thích tận dụng các nguồn lực tài chính ngoại vi, XM là đích đến lý tưởng.

* **Bonus dồi dào:** Tặng $30-$50 trải nghiệm miễn phí khi đăng ký mới không cần nạp tiền. Thừa hưởng quy chế thưởng nạp 100% lên đến $500 và 20% lên đến $4500.
* **Tài khoản Ultra Low:** Rất phù hợp với trader thích tài khoản miễn phí hoa hồng (No-commission) mà spread vẫn duy trì ở mức tối giản (khoảng 0.6-0.8 pip cho EURUSD).
* **Hạn chế:** Phí rác ẩn nếu tài khoản không hoạt động quá lâu. Cơ chế nạp rút tiền thông qua thẻ tín dụng có thể mất thời gian đối chiếu.

---

## Bảng so sánh tổng quan nhanh

| Sàn giao dịch | Điểm mạnh nhất | Nạp/Rút | Commission | Phù hợp cho |
|---|---|---|---|---|
| **Exness** | Rút tiền 2 giây, swap free | Siêu tốc 24/7 | $7/lot Raw | Mọi đối tượng, trade Vàng chủ động |
| **IC Markets** | EA mượt, không trượt giá | Giờ hành chính | $7/lot Raw | Professional, Thuật toán EA, Trade lót lớn |
| **XM** | Khuyến mại dồi dào, bonus lớn | Nhanh | Miễn phí (Ultra Low) | Người mới, Vốn nhỏ cần đòn bẩy |`
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'trading-co-ban',
    title: 'Khóa Học Giao Dịch Tài Chính Cho Người Mới Bắt Đầu',
    price: 'Hoàn Toàn Miễn Phí (Đăng ký mở tài khoản sàn)',
    priceNum: 0,
    level: 'Beginner',
    duration: '4 Tuần (8 buổi học Zoom trực tiếp)',
    lessonsCount: 8,
    whoShouldTake: [
      'Người mới bắt đầu tìm hiểu về tài chính, ngoại hối, tiền điện tử.',
      'Trader tự học bị thua lỗ liên miên do thiếu cấu trúc kiến thức nền tảng.',
      'Nhà đầu tư muốn hiểu cách vận hành của các định chế tài chính và nhà lập thị trường (market maker).'
    ],
    learnGoals: [
      'Hiểu cấu trúc thị trường tài chính toàn cầu, cách tính Lot, Pip, Leverages.',
      'Sử dụng thành thạo phần mềm giao dịch MT4, MT5, TradingView.',
      'Đọc vị biểu đồ nến, vẽ các vùng Kháng cự / Hỗ trợ vững chắc.',
      'Quản trị rủi ro cơ bản: Không bao giờ cháy tài khoản.'
    ],
    syllabus: [
      { title: 'Buổi 1: Tổng quan thị trường Forex & Crypto', content: 'Cách thức thị trường hoạt động, mối tương quan giữa các phiên Á, Âu, Mỹ.' },
      { title: 'Buổi 2: Các khái niệm cốt lõi trong Trading', content: 'Tìm hiểu sâu về cách mua/bán, spread, swap, commission, cách đặt SL/TP đúng kỹ thuật.' },
      { title: 'Buổi 3: Làm chủ TradingView và Nền tảng giao dịch', content: 'Xây dựng layout cá nhân, các công cụ đo đạc khối lượng tối ưu.' },
      { title: 'Buổi 4: Đọc hiểu biểu đồ hành động giá (Price Action)', content: 'Nghệ thuật thấu hiểu các mô hình nến đảo chiều quan trọng.' }
    ],
    trainerName: 'Zack Nguyen (Founder)',
    trainerBio: 'Gần 8 năm kinh nghiệm giao dịch thực chiến Forex & Crypto nội bộ quỹ đầu tư tư nhân, triết lý nhất quán về kiểm soát rủi ro nghiêm ngặt.',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'mentoring-chuyen-sau',
    title: 'Chương Trình Mentoring 1-1: Quản Trị Vốn & Chiến Thuật SMC Chuyên Sâu',
    price: '9,900,000 VND / Khóa học (Giảm 50% cho thành viên thuộc IB)',
    priceNum: 9900000,
    level: 'Advanced',
    duration: 'Trọn đời (Lý thuyết 6 tuần + Thực chiến đồng hành trọn đời)',
    lessonsCount: 18,
    whoShouldTake: [
      'Trader đã có kinh nghiệm trên 1 năm đang loay hoay tìm kiếm sự nhất quán lợi nhuận.',
      'Người mong muốn vượt qua các kỳ đánh quỹ cấp vốn Prop Firm lớn như MFF, FTMO.',
      'Trader muốn gạt bỏ yếu tố tâm lý cảm xúc thông qua bộ quy tắc quản trị vốn chặt chẽ.'
    ],
    learnGoals: [
      'Hiểu sâu sắc lý thuyết dòng tiền thông minh Smart Money Concept (SMC).',
      'Đọc hiểu cấu trúc thị trường đa khung thời gian để tìm điểm vào lệnh với tỷ lệ R:R cực đại (1:5 - 1:10+).',
      'Xây dựng kế hoạch giao dịch cá nhân hóa hóa giải hoàn toàn bài toán FOMO.',
      'Chiến lược hoàn thành và rút tiền đều đặn từ các tài khoản quỹ Prop Firm.'
    ],
    syllabus: [
      { title: 'Buổi 1: Tư duy dòng tiền thông minh SMC & Order Block', content: 'Tìm các vùng tích lũy, phân phối thực tế của phe tạo lập thị trường.' },
      { title: 'Buổi 2: Cấu trúc thị trường nâng cao (Choch, Bos, Inducement)', content: 'Phân tích bản chất việc săn thanh khoản bẫy trader nhỏ lẻ.' },
      { title: 'Buổi 3: Quy tắc quản trị rủi ro cố định tỷ lệ R:R', content: 'Lập biểu đồ quản lý drawdown bảo vệ tài khoản.' },
      { title: 'Buổi 4: Đồng hành giao dịch thực tế hàng ngày', content: 'Cập nhật phân tích kỹ thuật trực tuyến trước phiên Mỹ.' }
    ],
    trainerName: 'Zack Nguyen (Founder)',
    trainerBio: 'Gần 8 năm kinh nghiệm giao dịch thực chiến Forex & Crypto nội bộ quỹ đầu tư tư nhân, triết lý nhất quán về kiểm soát rủi ro nghiêm ngặt.',
    rating: 5.0,
    reviewsCount: 68
  }
];

// Helper functions to manage LocalStorage
export const getStoredData = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error('LocalStorage load error', error);
    return initialValue;
  }
};

export const setStoredData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage save error', error);
  }
};

// INITIAL DATASETS for the interactive UI simulation
export const INITIAL_USER: UserProfile = {
  id: 'user_1',
  name: 'Nguyễn Minh Quân',
  email: 'minhquan.trader@gmail.com',
  phone: '0987654321',
  zalo: '0987654321',
  role: 'user',
  createdAt: '2026-01-10T12:00:00Z'
};

export const INITIAL_BROKER_ACCOUNTS: BrokerAccount[] = [
  {
    id: 'acc_1',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    userPhone: '0987654321',
    brokerId: 'exness',
    brokerName: 'Exness',
    accountUid: '8294021',
    accountType: 'Raw Spread',
    verificationStatus: 'approved',
    createdAt: '2026-05-18T04:20:00Z',
    note: 'Xác minh thành công, IP đối tác trùng khớp.',
    totalLotVolume: 42.5,
    accruedCashback: 148.75 // 42.5 lots * ~$3.5/lot
  },
  {
    id: 'acc_2',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    userPhone: '0987654321',
    brokerId: 'binance',
    brokerName: 'Binance',
    accountUid: '94820124',
    accountType: 'Futures Account',
    verificationStatus: 'approved',
    createdAt: '2026-05-20T09:15:00Z',
    note: 'Đăng ký mới qua link code Binance. Rebates 20% kích hoạt hệ thống.',
    totalLotVolume: 0,
    accruedCashback: 64.93 // Commission rebated
  },
  {
    id: 'acc_3',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    userPhone: '0987654321',
    brokerId: 'xm',
    brokerName: 'XM Global',
    accountUid: '5409121',
    accountType: 'Ultra Low Standard',
    verificationStatus: 'pending',
    createdAt: '2026-05-28T02:00:00Z',
    note: 'Đang đợi kiểm tra IB Portal tại XM.',
    totalLotVolume: 0,
    accruedCashback: 0
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead_1',
    name: 'Phạm Đức Thành',
    phone: '0912345678',
    email: 'ducthanh99@gmail.com',
    source: 'consultation',
    need: 'Cần tư vấn chọn tài khoản Exness nạp rút $5000 đánh Scalp XAUUSD',
    status: 'new',
    createdAt: '2026-05-28T09:30:00Z',
    note: 'Sẽ gọi hỗ trợ tư vấn trong phiên chiều.'
  },
  {
    id: 'lead_2',
    name: 'Trần Thu Thủy',
    phone: '0933445566',
    email: 'thuytrantrader@hotmail.com',
    source: 'course',
    need: 'Muốn tìm hiểu đăng ký chương trình Mentoring 1-1 nâng cao SMC',
    status: 'contacted',
    createdAt: '2026-05-27T14:20:00Z',
    note: 'Đã gọi Zalo giới thiệu lộ trình, nhắn tin trao đổi bổ sung, khách đang chuẩn bị tiền.'
  },
  {
    id: 'lead_3',
    name: 'Lê Hoàng Hải',
    phone: '0901234999',
    email: 'haile92@gmail.com',
    source: 'backcom_contact',
    need: 'Hỏi cách chuyển tài khoản Exness cũ sang IB của team để nhận hoàn phí',
    status: 'verified',
    createdAt: '2026-05-26T08:10:00Z',
    note: 'Đã hướng dẫn đổi mã đối tác, UID mới đã add thành công.'
  }
];

export const INITIAL_CASHBACK_TRANSACTIONS: CashbackTransaction[] = [
  {
    id: 'tx_1',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    brokerId: 'exness',
    brokerName: 'Exness',
    accountUid: '8294021',
    volumeLot: 18.5,
    grossCommission: 129.5, // Exness paid $7/lot to partner group
    cashbackRatePercent: 80, // 80% cashback
    cashbackAmount: 103.6,
    status: 'paid',
    period: 'Từ 10/05 đến 17/05/2026',
    paidAt: '2026-05-18T10:00:00Z',
    note: 'Đã chuyển thành công về tài khoản Vietcombank.'
  },
  {
    id: 'tx_2',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    brokerId: 'binance',
    brokerName: 'Binance',
    accountUid: '94820124',
    volumeLot: 0,
    grossCommission: 81.16,
    cashbackRatePercent: 80,
    cashbackAmount: 64.93,
    status: 'paid',
    period: 'Ủy thác hoàn phí sàn Binance Tháng 4/2026',
    paidAt: '2026-05-02T11:30:00Z',
    note: 'Đã chi trả tự động vào ví tích luỹ.'
  },
  {
    id: 'tx_3',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    brokerId: 'exness',
    brokerName: 'Exness',
    accountUid: '8294021',
    volumeLot: 24.0,
    grossCommission: 168.0,
    cashbackRatePercent: 85, // ưu đãi tăng rate
    cashbackAmount: 142.8,
    status: 'calculated',
    period: 'Từ 18/05 đến 24/05/2026',
    note: 'Admin đã duyệt, chờ lệnh rút từ User'
  }
];

export const INITIAL_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: 'wd_1',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    userEmail: 'minhquan.trader@gmail.com',
    amount: 100,
    currency: 'USDT',
    method: 'USDT (TRC20)',
    bankInfo: 'TY9rXWsh3pPqUu1tZJStXbQ6XwzV9NfNfZ',
    status: 'paid',
    adminNote: 'Đã bắn ví Binance Pay. TxID: 92839129038',
    createdAt: '2026-05-19T08:00:00Z',
    paidAt: '2026-05-19T09:30:00Z'
  },
  {
    id: 'wd_2',
    userId: 'user_1',
    userName: 'Nguyễn Minh Quân',
    userEmail: 'minhquan.trader@gmail.com',
    amount: 1500000,
    currency: 'VND',
    method: 'Bank Transfer',
    bankInfo: 'Ngan hang Techcombank - STK: 190349129482 - Nguyen Minh Quan',
    status: 'pending',
    createdAt: '2026-05-28T05:00:00Z'
  }
];
