/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lead, BrokerAccount, Article, Broker } from '../types';
import { ShieldCheck, BookOpen, Layers, Users, PlusCircle, Check, Trash2, Edit2, Save, X } from 'lucide-react';

interface AdminDashboardViewProps {
  brokers: Broker[];
  articles: Article[];
  brokerAccounts: BrokerAccount[];
  onAddArticle: (articleData: Omit<Article, 'id' | 'createdAt' | 'views'>) => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateBroker: (broker: Broker) => void;
  onApproveBrokerAccount: (accountId: string, status: 'approved' | 'rejected', note: string) => void;
}

export default function AdminDashboardView({
  brokers,
  articles,
  brokerAccounts,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onUpdateBroker,
  onApproveBrokerAccount
}: AdminDashboardViewProps) {
  // Tabs: 'articles' | 'brokers_banners' | 'uids_leads'
  const [activeTab, setActiveTab] = useState<'articles' | 'brokers_banners' | 'uids_leads'>('articles');

  // Lead verify modal/edit state
  const [editingAccId, setEditingAccId] = useState<string | null>(null);
  const [statusDecision, setStatusDecision] = useState<'approved' | 'rejected'>('approved');
  const [decisionNote, setDecisionNote] = useState<string>('');

  // Article creation/editing states
  const [isAddingArticle, setIsAddingArticle] = useState<boolean>(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Article form inputs
  const [artTitle, setArtTitle] = useState<string>('');
  const [artCategoryId, setArtCategoryId] = useState<string>('cat-1');
  const [artCategoryName, setArtCategoryName] = useState<string>('Kiến Thức Sàn');
  const [artThumbnail, setArtThumbnail] = useState<string>('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60');
  const [artMetaDesc, setArtMetaDesc] = useState<string>('');
  const [artContent, setArtContent] = useState<string>('');
  const [artAuthorName, setArtAuthorName] = useState<string>('Zack Nguyen');

  // Broker selection/editing states
  const [editingBrokerId, setEditingBrokerId] = useState<string | null>(null);
  const [brokerReferralLink, setBrokerReferralLink] = useState<string>('');
  const [brokerReferralCode, setBrokerReferralCode] = useState<string>('');
  const [brokerCashbackRate, setBrokerCashbackRate] = useState<string>('');
  const [brokerDepositWithdrawalSpeed, setBrokerDepositWithdrawalSpeed] = useState<string>('');
  const [brokerMaxLeverage, setBrokerMaxLeverage] = useState<string>('');
  const [brokerMinDeposit, setBrokerMinDeposit] = useState<string>('');
  const [brokerSuitFor, setBrokerSuitFor] = useState<string>('');
  const [brokerDesc, setBrokerDesc] = useState<string>('');

  // Handle Categories mapping
  const categoryMap: Record<string, string> = {
    'cat-1': 'Phân Tích Cơ Bản / Vĩ Mô',
    'cat-2': 'Kiến thức SMC / Wyckoff',
    'cat-3': 'Review Sàn Chi Tiết'
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) {
      alert('Vui lòng nhập tiêu đề và nội dung bài viết!');
      return;
    }
    onAddArticle({
      title: artTitle,
      slug: generateSlug(artTitle),
      categoryId: artCategoryId,
      categoryName: categoryMap[artCategoryId] || 'Kiến Thức Sàn',
      thumbnail: artThumbnail,
      seoTitle: artTitle,
      metaDescription: artMetaDesc,
      content: artContent,
      authorName: artAuthorName,
      status: 'published'
    });
    // Reset states
    setArtTitle('');
    setArtMetaDesc('');
    setArtContent('');
    setIsAddingArticle(false);
  };

  const handleEditArticleClick = (art: Article) => {
    setEditingArticleId(art.id);
    setArtTitle(art.title);
    setArtCategoryId(art.categoryId);
    setArtThumbnail(art.thumbnail);
    setArtMetaDesc(art.metaDescription);
    setArtContent(art.content);
    setArtAuthorName(art.authorName);
  };

  const handleSaveArticleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticleId) {
      onEditArticle({
        id: editingArticleId,
        title: artTitle,
        slug: generateSlug(artTitle),
        categoryId: artCategoryId,
        categoryName: categoryMap[artCategoryId] || 'Kiến Thức Sàn',
        thumbnail: artThumbnail,
        seoTitle: artTitle,
        metaDescription: artMetaDesc,
        content: artContent,
        authorName: artAuthorName,
        status: 'published',
        createdAt: new Date().toISOString(),
        views: 45
      });
      setEditingArticleId(null);
    }
  };

  const handleEditBrokerClick = (broker: Broker) => {
    setEditingBrokerId(broker.id);
    setBrokerReferralLink(broker.referralLink);
    setBrokerReferralCode(broker.referralCode);
    setBrokerCashbackRate(broker.cashbackRate);
    setBrokerDepositWithdrawalSpeed(broker.depositWithdrawalSpeed);
    setBrokerMaxLeverage(broker.maxLeverage);
    setBrokerMinDeposit(broker.minDeposit);
    setBrokerSuitFor(broker.suitableFor);
    setBrokerDesc(broker.description);
  };

  const handleSaveBrokerEdit = (original: Broker) => {
    onUpdateBroker({
      ...original,
      referralLink: brokerReferralLink,
      referralCode: brokerReferralCode,
      cashbackRate: brokerCashbackRate,
      depositWithdrawalSpeed: brokerDepositWithdrawalSpeed,
      maxLeverage: brokerMaxLeverage,
      minDeposit: brokerMinDeposit,
      suitableFor: brokerSuitFor,
      description: brokerDesc
    });
    setEditingBrokerId(null);
  };

  const handleAccVerifySubmit = (accountId: string) => {
    onApproveBrokerAccount(accountId, statusDecision, decisionNote.trim());
    setEditingAccId(null);
    setDecisionNote('');
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      {/* Title block */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-red-500 animate-pulse" /> Trung Tâm Điều Hành Quản Trị Content & Banners
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Hệ thống Quản trị Web: Soạn thảo bài giảng và phân tích, thay đổi hướng liên kết affiliate, tùy biến mã giới thiệu sàn của Zack Nguyen và duyệt UID khách hàng.
        </p>
      </div>

      {/* Admin tabs */}
      <div className="flex border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-5 py-3 font-bold transition flex items-center gap-1.5 cursor-pointer border-b-2 ${
            activeTab === 'articles'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" /> Đăng & Quản Lý Bài Viết ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab('brokers_banners')}
          className={`px-5 py-3 font-bold transition flex items-center gap-1.5 cursor-pointer border-b-2 ${
            activeTab === 'brokers_banners'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" /> Cấu Hình Link Sàn & Banners ({brokers.length})
        </button>
        <button
          onClick={() => setActiveTab('uids_leads')}
          className={`px-5 py-3 font-bold transition flex items-center gap-1.5 cursor-pointer border-b-2 ${
            activeTab === 'uids_leads'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="h-4 w-4" /> Duyệt UID Khách Hàng ({brokerAccounts.length})
        </button>
      </div>

      {/* TAB CONTENT: ARTICLES */}
      {activeTab === 'articles' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center bg-slate-900/40 p-4 border border-slate-800 rounded-xl">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Quản Lý Blog Kiến Thức</h3>
              <p className="text-[11px] text-slate-450 mt-1">Bạn có thể tạo các hướng dẫn, phân tích kỹ thuật hoặc tin vĩ mô giúp cải thiện điểm SEO.</p>
            </div>
            {!isAddingArticle && !editingArticleId && (
              <button
                onClick={() => setIsAddingArticle(true)}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-500 font-bold text-xs text-slate-950 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-98"
              >
                <PlusCircle className="h-4 w-4" /> Đăng Bài Viết Mới
              </button>
            )}
          </div>

          {/* FORM: WRITE / ADD ARTICLE */}
          {isAddingArticle && (
            <form onSubmit={handleCreateArticle} className="bg-slate-900 border border-slate-805 rounded-xl p-5 space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-bold text-sm text-emerald-400">Đăng Bài Phân Tích Mới</h4>
                <button
                  type="button"
                  onClick={() => setIsAddingArticle(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Tiêu đề bài viết:</label>
                  <input
                    type="text"
                    required
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    placeholder="Ví dụ: Bí Quyết Quản Trị Vốn Theo Phương Pháp SMC"
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Chuyên mục:</label>
                  <select
                    value={artCategoryId}
                    onChange={(e) => setArtCategoryId(e.target.value)}
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700"
                  >
                    <option value="cat-1">Phân Tích Cơ Bản / Vĩ Mô</option>
                    <option value="cat-2">Kiến thức SMC / Wyckoff</option>
                    <option value="cat-3">Review Sàn Chi Tiết</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Ảnh Thẻ Thumbnail URL:</label>
                  <input
                    type="text"
                    required
                    value={artThumbnail}
                    onChange={(e) => setArtThumbnail(e.target.value)}
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Họ tên Tác giả:</label>
                  <input
                    type="text"
                    required
                    value={artAuthorName}
                    onChange={(e) => setArtAuthorName(e.target.value)}
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Mô tả tóm tắt (SEO Meta):</label>
                <input
                  type="text"
                  required
                  value={artMetaDesc}
                  onChange={(e) => setArtMetaDesc(e.target.value)}
                  placeholder="Một đoạn mô tả ngắn hiển thị ở danh sách bài viết..."
                  className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Nội dung chi tiết (Dùng phím Enter xuống dòng, tương thích Markdown gọn):</label>
                <textarea
                  rows={8}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  placeholder="## Giới thiệu về SMC&#10;Nội dung đoạn ở đây...&#10;&#10;## Thao tác thiết lập&#10;* Bước 1: mở biểu đồ...&#10;* Bước 2:..."
                  className="w-full bg-slate-955 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsAddingArticle(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-350 hover:bg-slate-750 font-bold rounded-lg transition"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-450 hover:bg-emerald-500 font-bold text-slate-950 rounded-lg transition shadow-md shadow-emerald-505/10"
                >
                  Đăng Tải Ngay
                </button>
              </div>
            </form>
          )}

          {/* FORM: EDIT ARTICLE */}
          {editingArticleId && (
            <form onSubmit={handleSaveArticleEdit} className="bg-slate-900 border border-slate-700 rounded-xl p-5 space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-770 pb-2">
                <h4 className="font-bold text-sm text-amber-400">Hiệu Chỉnh Bài Viết</h4>
                <button
                  type="button"
                  onClick={() => setEditingArticleId(null)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Tiêu đề:</label>
                  <input
                    type="text"
                    required
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Chuyên mục:</label>
                  <select
                    value={artCategoryId}
                    onChange={(e) => setArtCategoryId(e.target.value)}
                    className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300"
                  >
                    <option value="cat-1">Phân Tích Cơ Bản / Vĩ Mô</option>
                    <option value="cat-2">Kiến thức SMC / Wyckoff</option>
                    <option value="cat-3">Review Sàn Chi Tiết</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Mô tả ngắn:</label>
                <input
                  type="text"
                  required
                  value={artMetaDesc}
                  onChange={(e) => setArtMetaDesc(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-lg py-2 px-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-bold uppercase">Nội dung:</label>
                <textarea
                  rows={8}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setEditingArticleId(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-350 rounded-lg"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                >
                  Xác Nhận Lưu Thay Đổi
                </button>
              </div>
            </form>
          )}

          {/* LIST OF ARTICLES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-4 bg-slate-905 border border-slate-850 rounded-xl flex items-start gap-3 justify-between"
              >
                <div className="space-y-1 text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{art.categoryName}</span>
                  <h4 className="font-bold text-slate-200 text-xs md:text-sm line-clamp-1">{art.title}</h4>
                  <p className="text-[11px] text-slate-450 line-clamp-2">{art.metaDescription}</p>
                  <p className="text-[10px] text-slate-500 pt-1 font-mono">Tác giả: {art.authorName}</p>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => handleEditArticleClick(art)}
                    className="p-1.5 hover:bg-slate-800 rounded text-amber-500 transition cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Bạn chắc chắn muốn xoá bài giảng này?')) {
                        onDeleteArticle(art.id);
                      }
                    }}
                    className="p-1.5 hover:bg-slate-800 rounded text-red-400 transition cursor-pointer"
                    title="Xoá bài viết"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB CONTENT: BROKERS & BANNERS */}
      {activeTab === 'brokers_banners' && (
        <section className="space-y-6">
          <div className="bg-slate-900/40 p-4 border border-slate-850 rounded-xl text-left">
            <h3 className="font-bold text-slate-100 text-sm">Quản Lý Liên Kết Affiliate Sàn (Banners)</h3>
            <p className="text-[11px] text-slate-450 mt-1">Thay đổi liên kết đại lý, mã giảm giá, tỷ lệ ưu đãi hoa hồng hoàn phí và mô tả hiển thị trên trang chủ để tối ưu chuyển đổi.</p>
          </div>

          <div className="space-y-4">
            {brokers.map((broker) => {
              const isEditing = editingBrokerId === broker.id;
              return (
                <div key={broker.id} className="p-5 bg-slate-900 border border-slate-805 rounded-xl text-xs space-y-4 text-left">
                  
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={broker.logoUrl} alt="" className="w-8 h-8 rounded object-cover" />
                      <div>
                        <strong className="text-slate-150 block">{broker.name}</strong>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">{broker.type}</span>
                      </div>
                    </div>

                    {!isEditing ? (
                      <button
                        onClick={() => handleEditBrokerClick(broker)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 rounded-md text-[11px] font-bold text-slate-300 transition cursor-pointer"
                      >
                        Thiết lập Links & Mã IB
                      </button>
                    ) : (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSaveBrokerEdit(broker)}
                          className="px-3 py-1 bg-emerald-400 text-slate-950 font-bold rounded flex items-center gap-1 cursor-pointer transition"
                        >
                          <Save className="h-3.5 w-3.5" /> Lưu lại
                        </button>
                        <button
                          onClick={() => setEditingBrokerId(null)}
                          className="px-3 py-1 bg-slate-800 text-slate-400 rounded cursor-pointer"
                        >
                          Huỷ
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DISPLAY/EDITING FIELDS */}
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans max-w-none">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">LINK ĐĂNG KÝ AFFILIATE:</label>
                        <input
                          type="text"
                          value={brokerReferralLink}
                          onChange={(e) => setBrokerReferralLink(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">MÃ GIỚI THIỆU IB CODE:</label>
                        <input
                          type="text"
                          value={brokerReferralCode}
                          onChange={(e) => setBrokerReferralCode(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs font-mono text-emerald-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">HIỂN THỊ CHI TRẢ % (CASHBACK/IB):</label>
                        <input
                          type="text"
                          value={brokerCashbackRate}
                          onChange={(e) => setBrokerCashbackRate(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">TỐC ĐỘ NẠP RÚT:</label>
                        <input
                          type="text"
                          value={brokerDepositWithdrawalSpeed}
                          onChange={(e) => setBrokerDepositWithdrawalSpeed(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">ĐÒN BẨY TỐI ĐA:</label>
                        <input
                          type="text"
                          value={brokerMaxLeverage}
                          onChange={(e) => setBrokerMaxLeverage(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">NẠP TỐI THIỂU:</label>
                        <input
                          type="text"
                          value={brokerMinDeposit}
                          onChange={(e) => setBrokerMinDeposit(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">PHÙ HỢP NHẤT VỚI:</label>
                        <input
                          type="text"
                          value={brokerSuitFor}
                          onChange={(e) => setBrokerSuitFor(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-202"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[10px] text-slate-505 mb-1 font-bold">REVIEW / MÔ TẢ TÓM TẮT:</label>
                        <textarea
                          rows={2}
                          value={brokerDesc}
                          onChange={(e) => setBrokerDesc(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-850 rounded p-2 text-xs text-slate-202 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                      <div>
                        <span className="text-slate-500 block uppercase">Link Register:</span>
                        <a href={broker.referralLink} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline truncate block">
                          {broker.referralLink}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase">Mã IB Code:</span>
                        <strong className="text-emerald-400 font-mono text-xs">{broker.referralCode}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase">Cashback hiển thị:</span>
                        <span className="text-slate-300">{broker.cashbackRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase">Nạp tối thiểu:</span>
                        <span className="text-slate-300">{broker.minDeposit}</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB CONTENT: UID LEADS TO REVIEW */}
      {activeTab === 'uids_leads' && (
        <section className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4 text-left">
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Danh Sách UID Khách Hàng Gửi Xác Minh</h3>
            <p className="text-[11px] text-slate-450 mt-1">
              Khách hàng tự tạo tài khoản bên trang "Sàn Giao Dịch" rồi ký gửi mã số UID tại đây. Admin đối soát trên các Account Portal IB và đổi trạng thái để khách Zalo tương ứng nhận thông báo.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs min-w-[650px] font-sans">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[9px] font-bold">
                <tr>
                  <th className="py-2.5 px-3">Tên Khách Hàng</th>
                  <th className="py-2.5 px-3">Zalo / SĐT</th>
                  <th className="py-2.5 px-3">Sàn / Mã UID</th>
                  <th className="py-2.5 px-3">Trạng Thái Thư mục</th>
                  <th className="py-2.5 px-3 text-right">Duyệt và phản hồi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 bg-slate-900/40 text-xs">
                {brokerAccounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-950/20 transition">
                    <td className="py-3 px-3">
                      <strong className="text-slate-200 block">{acc.userName}</strong>
                      <span className="text-[9px] text-indigo-400 font-medium">{acc.accountType} Account</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {acc.userPhone}
                    </td>
                    <td className="py-3 px-3">
                      <strong className="text-slate-150 block">{acc.brokerName}</strong>
                      <span className="text-indigo-400 font-mono font-bold">{acc.accountUid}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        acc.verificationStatus === 'approved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/25'
                          : acc.verificationStatus === 'rejected'
                          ? 'bg-red-955 text-red-400 border border-red-900/25'
                          : 'bg-amber-955 text-amber-500 border border-amber-900/25'
                      }`}>
                        {acc.verificationStatus === 'approved' ? 'Active ✓' : acc.verificationStatus === 'rejected' ? 'Bị Từ Chối' : 'Chờ Đối Soát'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {editingAccId === acc.id ? (
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-805 text-left space-y-2.5 max-w-sm ml-auto animate-fadeIn">
                          <p className="text-[9px] font-bold text-indigo-400 uppercase">Phê duyệt liên kết</p>
                          
                          <select
                            value={statusDecision}
                            onChange={(e) => setStatusDecision(e.target.value as 'approved' | 'rejected')}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-300"
                          >
                            <option value="approved">Chấp thuật (Đã thuộc mã đối tác)</option>
                            <option value="rejected">Từ chối (Đăng ký sai mã đại lý)</option>
                          </select>

                          <input
                            type="text"
                            value={decisionNote}
                            onChange={(e) => setDecisionNote(e.target.value)}
                            placeholder="Ghi chú (Ví dụ: Đã nhắn tin Zalo kết nạp...)"
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-100"
                          />

                          <div className="flex gap-1.5 pt-1">
                            <button
                              onClick={() => handleAccVerifySubmit(acc.id)}
                              className="px-3 py-1 bg-emerald-400 text-slate-950 font-bold rounded text-[10px]"
                            >
                              Lưu phê duyệt
                            </button>
                            <button
                              onClick={() => setEditingAccId(null)}
                              className="px-2 py-1 bg-slate-800 text-slate-400 font-bold rounded text-[10px]"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-450 italic">{acc.note || 'Không có ghi chú nào'}</p>
                          <button
                            onClick={() => {
                              setEditingAccId(acc.id);
                              setStatusDecision(acc.verificationStatus === 'approved' ? 'approved' : 'rejected');
                              setDecisionNote(acc.note || '');
                            }}
                            className="text-[10px] font-bold text-indigo-450 hover:underline cursor-pointer"
                          >
                            Đánh giá đối chiếu &rarr;
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
}
