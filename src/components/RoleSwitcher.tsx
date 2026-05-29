/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserRole } from '../types';
import { Shield, User, Users, Info } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-slate-700 bg-slate-900/95 p-4 text-slate-200 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
        <Users className="h-5 w-5 text-amber-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Chương Trình Trình Diễn (Demo Live Loop)
        </span>
      </div>
      
      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
        Nhấp đổi vai trò bên dưới để trải nghiệm: Xem giao diện với tư cách Khách (nhấn banner, đăng ký) &rarr; Chuyển sang Admin để đăng bài viết hoặc quản lý banner, link giới thiệu sàn.
      </p>

      <div className="grid grid-cols-2 gap-1 mb-2">
        <button
          onClick={() => onRoleChange('guest')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
            currentRole === 'guest'
              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
              : 'border-slate-800 bg-slate-950/40 hover:bg-slate-850 hover:text-slate-150'
          }`}
        >
          <User className="h-4 w-4 mb-1" />
          <span className="text-[10px] font-semibold">Khách</span>
        </button>

        <button
          onClick={() => onRoleChange('admin')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
            currentRole === 'admin'
              ? 'border-red-500 bg-red-950/40 text-red-300 shadow-sm'
              : 'border-slate-800 bg-slate-950/40 hover:bg-slate-850 hover:text-slate-150'
          }`}
        >
          <Shield className="h-4 w-4 mb-1" />
          <span className="text-[10px] font-semibold">Admin Portal</span>
        </button>
      </div>

      <div className="flex gap-1 items-start text-[10px] text-slate-400">
        <Info className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
        <span>
          {currentRole === 'guest' ? "Đang xem giao diện khách. Bạn có thể tra cứu sàn, click banner nạp và gửi UID tài khoản vừa tạo." : "Quyền Admin: được viết bài mới, chỉnh sửa banner/mã giới thiệu/links sàn và duyệt khách hàng."}
        </span>
      </div>
    </div>
  );
}
