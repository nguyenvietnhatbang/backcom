/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Article, ArticleCategory } from '../types';
import { BookOpen, Search, ArrowLeft, ArrowUpRight, MessageSquare, ChevronRight, User, Eye, Bookmark, Share2 } from 'lucide-react';

interface BlogViewProps {
  categories: ArticleCategory[];
  articles: Article[];
  selectedArticleId: string | null;
  onSelectArticle: (id: string | null) => void;
  onNavigateToTab: (tab: string) => void;
}

export default function BlogView({
  categories,
  articles,
  selectedArticleId,
  onSelectArticle,
  onNavigateToTab
}: BlogViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentArticle = articles.find((a) => a.id === selectedArticleId);

  // Filter logic
  const filteredArticles = articles.filter((a) => {
    const matchesCategory = activeCategory === 'All' ? true : a.categoryId === activeCategory;
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // SUB-VIEW: DETAILED ARTICLE READER VIEW
  if (currentArticle) {
    // Simulated table of contents based on headers
    const tableOfContents = [
      { id: 'sec-1', label: '1. Khái niệm cốt lõi & Cách hiểu đúng' },
      { id: 'sec-2', label: '2. Lợi ích ròng cho tài khoản giao dịch' },
      { id: 'sec-3', label: '3. Hướng dẫn các bước kích hoạt UID' },
      { id: 'sec-4', label: '4. Giải đáp các thắc mắc (FAQs / Ý kiến trái chiều)' }
    ];

    return (
      <div className="space-y-8 text-left animate-fadeIn">
        {/* Back navigation action */}
        <button
          onClick={() => onSelectArticle(null)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-205 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài viết
        </button>

        {/* Hero title container */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded bg-slate-805 text-emerald-400 border border-slate-750 font-medium">
              {currentArticle.categoryName}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-450">Cập nhật: {new Date(currentArticle.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug max-w-4xl">
            {currentArticle.title}
          </h1>

          <div className="flex items-center justify-between py-3 border-y border-slate-850 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-400" />
              <span>Tác giả: <strong>{currentArticle.authorName}</strong></span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {currentArticle.views} views
              </span>
              <button
                onClick={() => alert('Cảm ơn bạn đã lưu trữ bài viết này.')}
                className="hover:text-emerald-400 flex items-center gap-1 transition"
              >
                <Bookmark className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Article Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ARTICLE BODY COLUMN */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 space-y-6">
            
            {/* Embedded image */}
            <img
              src={currentArticle.thumbnail}
              alt=""
              className="w-full h-64 md:h-80 object-cover rounded-xl grayscale opacity-80"
            />

            {/* Custom rendered body styled properly with tailwind semantics */}
            <div className="prose prose-invert prose-emerald max-w-none text-sm text-slate-300 space-y-4 leading-relaxed">
              {/* Parse standard markdown paragraphs/headers manually for safe display */}
              {currentArticle.content.split('\n\n').map((block, idx) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-lg md:text-xl font-bold text-slate-100 pt-4 pb-1 border-b border-slate-800 flex items-center gap-2">
                      <span className="text-emerald-400">#</span> {block.replace('## ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-base font-bold text-slate-150 pt-2">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('* ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-350">
                      {block.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace('* ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="p-3.5 bg-slate-950/65 border-l-4 border-emerald-400 text-slate-350 italic rounded-r-lg">
                      {block.replace('> ', '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* IN-ARTICLE CONVERTING ACTION BANNER */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/15 p-5 rounded-xl space-y-4">
              <div className="text-left">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900/30 text-emerald-400 font-bold text-[9px] uppercase tracking-wider">
                  Trợ Giúp Miễn Phí
                </span>
                <h3 className="font-bold text-slate-150 text-sm mt-1.5">Bạn Đang Giao Dịch Có Bị Thu Spread Quá Đắt?</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Gửi mã UID cho hệ thống chúng tôi kiểm tra liên kết đại lý hoàn trả phí. Việc rà soát sòng phẳng chỉ trong 5 phút giúp bạn nhận tiền hoa hồng lót vào ví trọn đời.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigateToTab('backcom')}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg active:scale-98 transition cursor-pointer"
                >
                  Gửi UID Xác Soát
                </button>
                <button
                  onClick={() => onNavigateToTab('brokers')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Xem Sàn hỗ trợ Cashback
                </button>
              </div>
            </div>

          </div>

          {/* SIDEBAR NAVIGATION COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. TABLE OF CONTENTS */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3.5">
              <h3 className="font-extrabold text-slate-205 text-xs uppercase tracking-wider">Mục lục phân tích bài viết</h3>
              <div className="space-y-2 text-xs">
                {tableOfContents.map((toc) => (
                  <button
                    key={toc.id}
                    onClick={() => alert(`Đang điều hướng đến phần: ${toc.label}`)}
                    className="w-full text-left p-2 rounded hover:bg-slate-850 hover:text-emerald-400 transition text-slate-400 flex items-center justify-between cursor-pointer"
                  >
                    <span>{toc.label}</span>
                    <ChevronRight className="h-3 w-3 shrink-0 text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. RECENT SÀN INTERACTIVE BADGE */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-center space-y-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-150">Đồng Hành Với Broker Vua Exness</h4>
                <p className="text-[10px] text-slate-450 leading-relaxed mx-auto max-w-[200px]">
                  Thoải mái rút tiền siêu tốc, không lo phí trần, hoàn trả rebate tự động.
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('brokers')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold rounded-lg cursor-pointer transition active:scale-98"
              >
                Mở Banner Đăng Ký Link Exness &rarr;
              </button>
            </div>

          </div>

        </div>

        {/* RELATED ARTICLES ROW */}
        <section className="space-y-4 border-t border-slate-850 pt-8 mt-4">
          <h3 className="font-bold text-base text-slate-150 text-left">Các bài phân tích học thuật liên quan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.filter(a => a.id !== currentArticle.id).map(article => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer flex gap-3 transition"
              >
                <img src={article.thumbnail} alt="" className="w-16 h-16 rounded object-cover grayscale shrink-0" />
                <div className="space-y-1 text-left">
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{article.title}</h4>
                  <p className="text-[10px] text-slate-450 line-clamp-2">{article.metaDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // PRIMARY BLOG DIRECTORY LIST VIEW
  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">Cổng Kiến Thức Trading & Review Sàn</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Nơi cập nhật thông tin chứng khoán, Forex, Crypto phái sinh, phương pháp SMC quản trị vốn thực chiến giúp độc giả trade khôn ngoan và an toàn.
        </p>
      </div>

      {/* FILTER SEARCH PANEL */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
        
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => {
            const isSel = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  isSel
                    ? 'bg-emerald-500 border-emerald-505 text-slate-950 font-bold'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Input box */}
        <div className="relative max-w-sm md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo từ khóa bài viết..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 placeholder:text-slate-700"
          />
          <Search className="h-3.5 w-3.5 text-slate-650 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* RENDER LIST OF POSTS GRID */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-70) transition cursor-pointer flex flex-col group hover:border-slate-700"
            >
              {/* Thumbnail with overlay gradient */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-103 duration-300"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/20">
                  {article.categoryName}
                </div>
              </div>

              {/* Text content card */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  <h3 className="font-bold text-slate-150 text-sm md:text-base line-clamp-2 group-hover:text-amber-400 transition duration-150">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.metaDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-850 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Author: {article.authorName}</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> Đọc phân tích &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-4 bg-slate-900 border border-slate-805 rounded-xl">
          <BookOpen className="h-10 w-10 text-slate-650 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">Không tìm thấy bài viết học thuật nào phù hợp với bộ lọc đăng kí.</p>
        </div>
      )}
    </div>
  );
}
