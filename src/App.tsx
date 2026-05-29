/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserRole,
  Broker,
  BrokerAccount,
  Lead,
  Article
} from './types';
import {
  INITIAL_BROKERS,
  ARTICLE_CATEGORIES,
  INITIAL_ARTICLES,
  INITIAL_COURSES,
  INITIAL_BROKER_ACCOUNTS,
  INITIAL_LEADS,
  getStoredData,
  setStoredData
} from './data';

import RoleSwitcher from './components/RoleSwitcher';
import HomeView from './components/HomeView';
import BrokersView from './components/BrokersView';
import AcademyView from './components/AcademyView';
import BlogView from './components/BlogView';
import ToolsView from './components/ToolsView';
import FounderView from './components/FounderView';
import AdminDashboardView from './components/AdminDashboardView';

import {
  Menu,
  X,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

export default function App() {
  // Navigation & Role States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [defaultConsultNeed, setDefaultConsultNeed] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Database collections saved in LocalStorage (Stateful & Live)
  const [brokers, setBrokers] = useState<Broker[]>(() => getStoredData('db_brokers', INITIAL_BROKERS));
  const [articles, setArticles] = useState<Article[]>(() => getStoredData('db_articles', INITIAL_ARTICLES));
  const [leads, setLeads] = useState<Lead[]>(() => getStoredData('db_leads', INITIAL_LEADS));
  const [brokerAccounts, setBrokerAccounts] = useState<BrokerAccount[]>(() => getStoredData('db_broker_accounts', INITIAL_BROKER_ACCOUNTS));

  // Synchronize with LocalStorage on state modifications
  useEffect(() => { setStoredData('db_brokers', brokers); }, [brokers]);
  useEffect(() => { setStoredData('db_articles', articles); }, [articles]);
  useEffect(() => { setStoredData('db_leads', leads); }, [leads]);
  useEffect(() => { setStoredData('db_broker_accounts', brokerAccounts); }, [brokerAccounts]);

  // Quick navigation helper
  const handleNavigate = (tab: string, arg?: string) => {
    let targetTab = tab;
    // Map old backcom tab to brokers page with form at bottom
    if (tab === 'backcom') {
      targetTab = 'brokers';
    }
    setActiveTab(targetTab);
    setMobileMenuOpen(false);
    
    // arguments router
    if (targetTab === 'brokers') {
      setSelectedBrokerId(arg || null);
    } else if (targetTab === 'blog') {
      setSelectedArticleId(arg || null);
    }
  };

  // ----------------------------------------------------
  // BUSINESS LOOPS HANDLERS
  // ----------------------------------------------------

  // 1. Guest registers UID Sàn (which makes a BrokerAccount submission)
  const handleSubmitAccount = (accountData: {
    brokerId: string;
    brokerName: string;
    accountUid: string;
    accountType: string;
    name: string;
    phone: string;
    email: string;
  }) => {
    const newAcc: BrokerAccount = {
      id: `acc_${Date.now()}`,
      userId: 'user_1', // default customer representation
      userName: accountData.name,
      userPhone: accountData.phone,
      brokerId: accountData.brokerId,
      brokerName: accountData.brokerName,
      accountUid: accountData.accountUid,
      accountType: accountData.accountType,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      note: 'Hồ sơ đã gửi vào hàng đợi. Zack Nguyen đang so đối đối tác.',
      totalLotVolume: 0,
      accruedCashback: 0
    };

    setBrokerAccounts((prev) => [newAcc, ...prev]);

    // Push also to Leads CRM
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: accountData.name,
      phone: accountData.phone,
      email: accountData.email,
      source: 'backcom_contact',
      need: `Gửi UID Sàn: ${accountData.brokerName}, UID: ${accountData.accountUid}, TK: ${accountData.accountType}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      note: 'Khách gửi UID đối soát.'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // 2. Guest submits Acadamy consultation lead (Zalo support form)
  const handleSubmitConsultLead = (leadData: {
    name: string;
    phone: string;
    email: string;
    need: string;
  }) => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      source: 'consultation',
      need: leadData.need,
      status: 'new',
      createdAt: new Date().toISOString(),
      note: 'Yêu cầu tư vấn trực Zoom từ học viện.'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // 3. Admin updates lead status (Lead CRM Pipeline)
  const handleUpdateLeadStatus = (leadId: string, status: any, note: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, note } : l))
    );
  };

  // 4. Admin Approves/Rejects Broker Account UID
  const handleApproveBrokerAccount = (accountId: string, status: 'approved' | 'rejected', note: string) => {
    setBrokerAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            verificationStatus: status,
            note
          };
        }
        return acc;
      })
    );
  };

  // 5. Admin adds an Article
  const handleAddArticle = (artData: Omit<Article, 'id' | 'createdAt' | 'views'>) => {
    const newArt: Article = {
      ...artData,
      id: `art_${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0
    };
    setArticles((prev) => [newArt, ...prev]);
  };

  // 6. Admin edits an Article
  const handleEditArticle = (updatedArt: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updatedArt.id ? updatedArt : a)));
  };

  // 7. Admin deletes an Article
  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // 8. Admin configures Broker settings (Referrals/Links/Banners)
  const handleUpdateBroker = (updatedBroker: Broker) => {
    setBrokers((prev) => prev.map((b) => (b.id === updatedBroker.id ? updatedBroker : b)));
  };

  const handleOpenConsultForm = (needTitle: string) => {
    setDefaultConsultNeed(needTitle);
    handleNavigate('academy');
  };

  return (
    <div className="min-h-screen bg-[#070B14] font-sans text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 pb-24">
      
      {/* FLUID NAVBAR HEADER */}
      <header className="sticky top-0 z-40 bg-[#070B14]/90 border-b border-slate-900 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center font-sans">
          
          {/* LOGO */}
          <div
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 p-2 flex items-center justify-center font-black text-slate-950 text-sm shadow">
              🚀
            </div>
            <div>
              <p className="font-extrabold text-slate-50 tracking-tight text-sm leading-none flex items-center gap-1">
                ZACK NGUYEN <span className="text-emerald-400">ECOSYSTEM</span>
              </p>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 mt-1 font-semibold leading-none">
                Personal Trading Hub & Banners
              </p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'home' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => handleNavigate('brokers')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'brokers' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Sàn Giao Dịch
            </button>
            <button
              onClick={() => handleNavigate('academy')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'academy' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Học Viện Zoom 1-1
            </button>
            <button
              onClick={() => handleNavigate('blog')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'blog' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Blog Kiến Thức
            </button>
            <button
              onClick={() => handleNavigate('tools')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'tools' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Bộ Công Cụ Trader
            </button>
            <button
              onClick={() => handleNavigate('founder')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'founder' ? 'bg-slate-900 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-205'
              }`}
            >
              Về Founder
            </button>

            {/* Admin view button */}
            {currentRole === 'admin' && (
              <button
                onClick={() => handleNavigate('admin_dashboard')}
                className={`ml-4 px-3.5 py-1.5 rounded-lg text-red-400 border border-red-500/25 bg-red-950/20 hover:bg-red-950/40 transition flex items-center gap-1.5 cursor-pointer font-bold`}
              >
                Admin Backoffice 🛠️
              </button>
            )}
          </nav>

          {/* MOBILE TOGGLES */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {currentRole === 'admin' && (
              <button
                onClick={() => handleNavigate('admin_dashboard')}
                className="p-1.5 text-red-400 text-xs font-bold rounded bg-red-955/20 border border-red-900/20"
              >
                Admin 🛠️
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-200 transition"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE PORTAL */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070B14] border-t border-slate-900 py-3.5 px-4 space-y-2 text-xs font-semibold text-left">
            <button
              onClick={() => handleNavigate('home')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Trang Chủ
            </button>
            <button
              onClick={() => handleNavigate('brokers')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Sàn Giao Dịch
            </button>
            <button
              onClick={() => handleNavigate('academy')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Học Viện Zoom 1-1
            </button>
            <button
              onClick={() => handleNavigate('blog')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Blog Kiến Thức
            </button>
            <button
              onClick={() => handleNavigate('tools')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Công Cụ Trader
            </button>
            <button
              onClick={() => handleNavigate('founder')}
              className="block w-full py-2.5 px-3 bg-slate-900/40 rounded text-slate-300 hover:text-white"
            >
              Về Founder
            </button>
          </div>
        )}
      </header>

      {/* CORE FRAME CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* Render correct views dynamically */}
        {activeTab === 'home' && (
          <HomeView
            brokers={brokers}
            articles={articles}
            courses={INITIAL_COURSES}
            onNavigate={handleNavigate}
            onOpenConsultForm={handleOpenConsultForm}
          />
        )}

        {activeTab === 'brokers' && (
          <BrokersView
            brokers={brokers}
            selectedBrokerId={selectedBrokerId}
            onSelectBroker={setSelectedBrokerId}
            onNavigateToTab={handleNavigate}
            onSubmitAccount={handleSubmitAccount}
            userAccounts={brokerAccounts}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyView
            courses={INITIAL_COURSES}
            onSubmitConsultLead={handleSubmitConsultLead}
            defaultConsultNeed={defaultConsultNeed}
            onClearDefaultNeed={() => setDefaultConsultNeed('')}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            categories={ARTICLE_CATEGORIES}
            articles={articles}
            selectedArticleId={selectedArticleId}
            onSelectArticle={setSelectedArticleId}
            onNavigateToTab={handleNavigate}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsView
            brokers={brokers}
            onNavigateToTab={handleNavigate}
          />
        )}

        {activeTab === 'founder' && (
          <FounderView />
        )}

        {activeTab === 'admin_dashboard' && (
          <AdminDashboardView
            brokers={brokers}
            articles={articles}
            brokerAccounts={brokerAccounts}
            onAddArticle={handleAddArticle}
            onEditArticle={handleEditArticle}
            onDeleteArticle={handleDeleteArticle}
            onUpdateBroker={handleUpdateBroker}
            onApproveBrokerAccount={handleApproveBrokerAccount}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#05080E] border-t border-slate-900 py-10 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="font-bold text-slate-300 font-sans select-none">💡 ZACK NGUYEN ECOSYSTEM</span>
              <p className="text-[11px] text-slate-500">Website giới thiệu sản phẩm thương hiệu cá nhân kết hợp cung cấp các links sàn & mã giới thiệu tối ưu.</p>
            </div>

            <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
              <span className="hover:text-slate-200 hover:underline cursor-pointer" onClick={() => handleNavigate('founder')}>Tôi là ai?</span>
              <span>•</span>
              <span className="hover:text-slate-205 hover:underline cursor-pointer" onClick={() => handleNavigate('brokers')}>Danh Sách Sàn</span>
              <span>•</span>
              <span className="hover:text-slate-205 hover:underline cursor-pointer" onClick={() => handleNavigate('tools')}>Máy Tính Quản Trị Vốn</span>
            </div>
          </div>

          <div className="border-t border-slate-900/60 pt-4 leading-relaxed text-left space-y-2">
            <p className="text-[10px] text-slate-600">
              <strong>Tuyên bố miễn trách rủi ro đầu tư (Disclaimer):</strong> Giao dịch tài chính đòn bẩy Forex, CFD, Vàng luôn mang rủi ro thất thoát vốn thực tế cao. Độc giả nên tự mình kỉ luật và quản trị rủi ro cắt lỗ (SL). Liên kết giới thiệu (Affiliate links) đóng vai trò là một cổng tiếp thị đối tác chính thức cho các broker đã được so sánh đánh giá công tâm.
            </p>
            <p className="text-[10px] text-slate-650 text-right">
              &copy; 2026. Thiết kế và kiểm chứng vận hành bởi Zack Nguyen. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOAT INTERACTIVE DEMO PRESENTATION SYSTEM BOX */}
      <RoleSwitcher
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'admin') {
            handleNavigate('admin_dashboard');
          } else {
            handleNavigate('home');
          }
        }}
      />

    </div>
  );
}
