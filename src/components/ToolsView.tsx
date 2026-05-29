/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Broker } from '../types';
import { Calculator, ShieldAlert, ArrowRightCircle, RefreshCw, BarChart2, CheckSquare } from 'lucide-react';

interface ToolsViewProps {
  brokers: Broker[];
  onNavigateToTab: (tab: string) => void;
}

export default function ToolsView({ brokers, onNavigateToTab }: ToolsViewProps) {
  const [activeCalc, setActiveCalc] = useState<'lot' | 'pip' | 'rr' | 'backcom'>('lot');

  // Lot size states
  const [lotBalance, setLotBalance] = useState<number>(5000);
  const [lotRiskPercent, setLotRiskPercent] = useState<number>(1); // 1% risk
  const [lotStopLoss, setLotStopLoss] = useState<number>(30); // 30 pips
  const [lotPair, setLotPair] = useState<string>('EURUSD'); // standard pair

  // Pip value states
  const [pipPair, setPipPair] = useState<string>('EURUSD');
  const [pipLotSize, setPipLotSize] = useState<number>(1.0);

  // R:R calculator states
  const [rrType, setRrType] = useState<'buy' | 'sell'>('buy');
  const [rrEntry, setRrEntry] = useState<number>(1930.5); // gold entry for example
  const [rrStopLoss, setRrStopLoss] = useState<number>(1920.0);
  const [rrTakeProfit, setRrTakeProfit] = useState<number>(1960.0);

  // Expected Backcom states
  const [backcomBroker, setBackcomBroker] = useState<string>('exness');
  const [backcomLotsPerMonth, setBackcomLotsPerMonth] = useState<number>(50);
  const [backcomShareRate, setBackcomShareRate] = useState<number>(80); // 85% cashback

  // ----------------------------------------------------
  // CALCULATORS MATH LOGIC
  // ----------------------------------------------------

  // 1. LOT SIZE CALCULATION
  const calculateLotSize = () => {
    const riskAmount = lotBalance * (lotRiskPercent / 100);
    let pipValueFactor = 10; // default for pair with USD quote like EURUSD, GBPUSD (1 lot = $10 per pip)
    
    if (lotPair === 'USDJPY') {
      pipValueFactor = 9.1; // approximate depending on USDJPY price
    } else if (lotPair === 'USDCAD') {
      pipValueFactor = 7.3;
    } else if (lotPair === 'XAUUSD') {
      pipValueFactor = 10; // 1 pip of gold (0.10) for 1 lot = $10; or 1.0 delta (100 pips) = $1000
    }

    const positionSize = riskAmount / (lotStopLoss * pipValueFactor);
    return {
      riskAmount,
      lots: Math.max(0.01, parseFloat(positionSize.toFixed(2)))
    };
  };
  const lotResult = calculateLotSize();

  // 2. PIP VALUE CALCULATION
  const calculatePipValue = () => {
    let basePipVal = 10; // For 1 lot of Standard Quote pairs
    if (pipPair === 'USDJPY') basePipVal = 9.1;
    if (pipPair === 'USDCAD') basePipVal = 7.3;
    if (pipPair === 'AUDUSD') basePipVal = 10;
    
    const totalPipVal = basePipVal * pipLotSize;
    return totalPipVal;
  };

  // 3. RISK-REWARD CALCULATION
  const calculateRR = () => {
    const isLong = rrType === 'buy';
    const riskDelta = isLong ? (rrEntry - rrStopLoss) : (rrStopLoss - rrEntry);
    const rewardDelta = isLong ? (rrTakeProfit - rrEntry) : (rrEntry - rrTakeProfit);

    const rrRatio = riskDelta > 0 ? (rewardDelta / riskDelta) : 0;
    const breakevenWinrate = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 0;

    return {
      riskDelta: parseFloat(riskDelta.toFixed(5)),
      rewardDelta: parseFloat(rewardDelta.toFixed(5)),
      ratio: parseFloat(rrRatio.toFixed(2)),
      winrate: parseFloat(breakevenWinrate.toFixed(1))
    };
  };
  const rrResult = calculateRR();

  // 4. EXPECTED REBATE / BACKCOM CALCULATION
  const calculateCashbackEstimate = () => {
    // Find active broker commission rebate config
    const brokerObj = brokers.find((b) => b.id === backcomBroker);
    let ratePerLot = 4.0; // default $4/lot
    if (brokerObj) {
      if (brokerObj.id === 'exness') ratePerLot = 5.5; // average level standard
      if (brokerObj.id === 'xm') ratePerLot = 7.0; // high rate standard
      if (brokerObj.id === 'icmarkets') ratePerLot = 2.25; // raw fixed
      if (brokerObj.id === 'binance') ratePerLot = 3.5; // derived flat index
      if (brokerObj.id === 'bybit') ratePerLot = 3.5;
    }

    const rawIBRebateMonth = backcomLotsPerMonth * ratePerLot;
    const userPayoutMonth = rawIBRebateMonth * (backcomShareRate / 100);
    const userPayoutDay = userPayoutMonth / 22; // trading days

    return {
      payoutMonth: parseFloat(userPayoutMonth.toFixed(2)),
      payoutDay: parseFloat(userPayoutDay.toFixed(2)),
      vndMonth: Math.round(userPayoutMonth * 25000),
      vndDay: Math.round(userPayoutDay * 25000)
    };
  };
  const cashbackEst = calculateCashbackEstimate();

  return (
    <div className="space-y-10 text-left animate-fadeIn">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
          <Calculator className="h-7 w-7 text-emerald-400" /> Hệ Công Cụ Hỗ Trợ Trader Thực Chiến
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Quản trị rủi ro khoa học là nhịp thở của đầu tư thành công. Hãy tận dụng hệ thống máy tính toán để tối ưu hóa khối lượng vào lệnh và kiểm thử khoản phí hoa hồng được hoàn trả.
        </p>
      </div>

      {/* CALCULATOR SELECTOR CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl">
        <button
          onClick={() => setActiveCalc('lot')}
          className={`p-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer ${
            activeCalc === 'lot'
              ? 'bg-emerald-500 text-slate-950 shadow shadow-emerald-500/10'
              : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
          }`}
        >
          <BarChart2 className="h-4.5 w-4.5" />
          <span>Máy tính Lot Size</span>
        </button>

        <button
          onClick={() => setActiveCalc('pip')}
          className={`p-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer ${
            activeCalc === 'pip'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
          }`}
        >
          <Calculator className="h-4.5 w-4.5" />
          <span>Máy tính Pip Value</span>
        </button>

        <button
          onClick={() => setActiveCalc('rr')}
          className={`p-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer ${
            activeCalc === 'rr'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
          }`}
        >
          <RefreshCw className="h-4.5 w-4.5" />
          <span>Tỷ lệ Risk/Reward (R:R)</span>
        </button>

        <button
          onClick={() => setActiveCalc('backcom')}
          className={`p-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer ${
            activeCalc === 'backcom'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
          }`}
        >
          <Calculator className="h-4.5 w-4.5" />
          <span>Tính Backcom Dự Kiến</span>
        </button>
      </div>

      {/* RENDER DYNAMIC ACTIVE CALCULATOR BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT PANEL COLUMN */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 md:p-6 rounded-2xl space-y-4">
          <h2 className="font-extrabold text-slate-100 text-base border-b border-slate-805 pb-2">
            {activeCalc === 'lot' && 'Nhập thông số tính Lot Size'}
            {activeCalc === 'pip' && 'Nhập thông số tính Pip Value'}
            {activeCalc === 'rr' && 'Nhập mốc điểm lệnh giao dịch (R:R)'}
            {activeCalc === 'backcom' && 'Giả lập phân tách hoàn phí Backcom tuần'}
          </h2>

          {/* 1. INPUT FOR LOT CALCULATOR */}
          {activeCalc === 'lot' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-450 mb-1">Số dư hiện tại trên tài khoản sàn ($ USD):</label>
                <input
                  type="number"
                  value={lotBalance}
                  onChange={(e) => setLotBalance(Math.max(10, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 hover:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-450 mb-1">Phần trăm rủi ro trên lệnh (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={lotRiskPercent}
                    onChange={(e) => setLotRiskPercent(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 hover:border-slate-705 focus:outline-none focus:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-450 mb-1">Khoảng cách Dừng Lỗ (Stop Loss - pips):</label>
                  <input
                    type="number"
                    value={lotStopLoss}
                    onChange={(e) => setLotStopLoss(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 hover:border-slate-705 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-450 mb-1">Cặp tiền vệ tinh / Cấu trúc tài sản:</label>
                <select
                  value={lotPair}
                  onChange={(e) => setLotPair(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-300 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="EURUSD">EURUSD (Euro / USD - standard pip quota)</option>
                  <option value="GBPUSD">GBPUSD (Bảng Anh / USD)</option>
                  <option value="XAUUSD">XAUUSD (Vàng giao ngay SPOT Gold)</option>
                  <option value="USDJPY">USDJPY (Đồng Yên Nhật)</option>
                </select>
              </div>
            </div>
          )}

          {/* 2. INPUT FOR PIP CALCULATOR */}
          {activeCalc === 'pip' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-450 mb-1">Chọn cặp tài sản giao dịch:</label>
                <select
                  value={pipPair}
                  onChange={(e) => setPipPair(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-350 focus:outline-none cursor-pointer"
                >
                  <option value="EURUSD">EURUSD (Eur / Usd)</option>
                  <option value="AUDUSD">AUDUSD (Aud / Usd)</option>
                  <option value="USDJPY">USDJPY (Yên Nhật - 2 nốt thập phân)</option>
                  <option value="USDCAD">USDCAD (Đô la Canada)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-450 mb-1">Khối lượng lot giao dịch (lots):</label>
                <input
                  type="number"
                  step="0.01"
                  value={pipLotSize}
                  onChange={(e) => setPipLotSize(Math.max(0.01, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 hover:border-slate-705 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 3. INPUT FOR RISK-REWARD */}
          {activeCalc === 'rr' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-450 mb-1.5">Chiều thế vị thế giao dịch:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRrType('buy')}
                    className={`py-2 rounded font-bold text-center border cursor-pointer select-none transition ${
                      rrType === 'buy'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    Mở lệnh BUY (Long)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRrType('sell')}
                    className={`py-2 rounded font-bold text-center border cursor-pointer select-none transition ${
                      rrType === 'sell'
                        ? 'bg-red-950/40 border-red-500 text-red-400'
                        : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    Mở lệnh SELL (Short)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-450 mb-1">Mức giá Khớp Lệnh (Entry Price):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={rrEntry}
                    onChange={(e) => setRrEntry(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-450 mb-1">Mức giá Chặn Lỗ (Stop Loss - SL):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={rrStopLoss}
                    onChange={(e) => setRrStopLoss(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-450 mb-1">Mức giá Chốt Lời (Take Profit - TP):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={rrTakeProfit}
                    onChange={(e) => setRrTakeProfit(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. INPUT FOR CASHBACK ESTIMATOR */}
          {activeCalc === 'backcom' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-450 mb-1">Lựa chọn sàn bạn giao dịch:</label>
                <select
                  value={backcomBroker}
                  onChange={(e) => setBackcomBroker(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-350 focus:outline-none cursor-pointer"
                >
                  {brokers.map((b) => (
                    <option key={b.id} value={b.id}>{b.name} ({b.type === 'Forex' ? 'Sàn Forex' : 'Crypto Exchange'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex justify-between text-slate-450 mb-1">
                  <span>Khối lượng lót giao dịch hàng tháng:</span>
                  <strong className="text-emerald-400 font-mono text-xs">{backcomLotsPerMonth} lots</strong>
                </label>
                <input
                  type="range"
                  min="2"
                  max="300"
                  value={backcomLotsPerMonth}
                  onChange={(e) => setBackcomLotsPerMonth(parseInt(e.target.value) || 50)}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-slate-950 border border-slate-850"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-450 mb-1">
                  <span>Tỷ lệ trích chia hoa hồng cho bạn:</span>
                  <strong className="text-indigo-400 font-mono text-xs">{backcomShareRate}% hoa hồng IB</strong>
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={backcomShareRate}
                  onChange={(e) => setBackcomShareRate(parseInt(e.target.value) || 80)}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-slate-950 border border-slate-850"
                />
              </div>
            </div>
          )}
        </div>

        {/* OUTPUT DISPLAY PANEL PANEL */}
        <div className="lg:col-span-6 bg-slate-900 border border-indigo-950/40 p-5 md:p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <span className="px-2 py-0.5 bg-slate-850 border border-slate-800 text-[9px] uppercase font-bold text-slate-450 text-left self-start">
              Bảng kết quả tính liên tiếp
            </span>

            {/* LOT SIZE CALCULATOR RESULTS */}
            {activeCalc === 'lot' && (
              <div className="space-y-4 text-left">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <p className="text-[10px] text-slate-455 uppercase leading-none">Khối lượng lót vào lệnh an toàn:</p>
                  <p className="text-3xl font-black text-emerald-400 font-mono mt-2">{lotResult.lots} lot</p>
                  <p className="text-xs text-slate-400 mt-1">Đảm bảo mức rủi ro tối đa khống chế ở ${lotResult.riskAmount.toFixed(1)}</p>
                </div>

                <div className="text-xs text-slate-400 divide-y divide-slate-850 space-y-2.5">
                  <div className="pt-2.5 flex justify-between">
                    <span>Số USD chịu mất tối đa trên một lệnh:</span>
                    <strong className="text-slate-100 font-mono">${lotResult.riskAmount.toFixed(1)}</strong>
                  </div>
                  <div className="pt-2.5 flex justify-between">
                    <span>Tỷ lệ rủi ro tài khoản (%):</span>
                    <strong className="text-slate-100 font-mono">{lotRiskPercent}%</strong>
                  </div>
                  <div className="pt-2.5 flex justify-between">
                    <span>Khoảng cách SL trong pips:</span>
                    <strong className="text-slate-100 font-mono">{lotStopLoss} pips</strong>
                  </div>
                </div>
              </div>
            )}

            {/* PIP VALUE CALCULATOR RESULTS */}
            {activeCalc === 'pip' && (
              <div className="space-y-4 text-left">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-855">
                  <p className="text-[10px] text-slate-450 uppercase leading-none">Giá trị mỗi Pip dịch chuyển:</p>
                  <p className="text-3xl font-black text-emerald-450 font-mono mt-2">${calculatePipValue().toFixed(2)} USD</p>
                  <p className="text-[10px] text-slate-500 mt-1">Quy về tiền VND: ~ {(calculatePipValue() * 25000).toLocaleString('vi-VN')} đ</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/35 p-2.5 border border-slate-850 rounded-lg">
                  💡 <strong>Gợi ý vận dụng:</strong> Nếu lệnh dịch chuyển 35 pips có lợi, tổng ròng lời thu được sẽ là <strong>${(calculatePipValue() * 35).toFixed(1)}</strong> (với khối lượng {pipLotSize} lot tương đương).
                </p>
              </div>
            )}

            {/* RISK-REWARD DISPLAY PANEL */}
            {activeCalc === 'rr' && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-3 pb-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <p className="text-[9px] text-slate-450 uppercase leading-none">Tỷ lệ Risk : Reward</p>
                    <p className="text-xl font-extrabold text-indigo-400 font-mono mt-1">1 : {rrResult.ratio}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <p className="text-[9px] text-slate-450 uppercase leading-none">Winrate hòa vốn gốc</p>
                    <p className="text-xl font-extrabold text-emerald-400 font-mono mt-1">{rrResult.winrate}%</p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 divide-y divide-slate-850 space-y-2.5">
                  <div className="pt-2.5 flex justify-between">
                    <span>Khoảng giá cắt lỗ rủi ro (Risk):</span>
                    <strong className="text-red-400 font-mono">{rrResult.riskDelta}</strong>
                  </div>
                  <div className="pt-2.5 flex justify-between">
                    <span>Khoảng giá chốt lời kỳ vọng (Reward):</span>
                    <strong className="text-emerald-400 font-mono">{rrResult.rewardDelta}</strong>
                  </div>
                </div>

                <p className="text-[11px] text-slate-455 leading-relaxed bg-slate-950/35 p-2 rounded">
                  * Với tỉ lệ này, chỉ cần hệ thống của bạn có winrate trên <strong>{rrResult.winrate}%</strong> là tài khoản của bạn sẽ luôn dương ròng bền bỉ dài kì!
                </p>
              </div>
            )}

            {/* EXPECTED BACKCOM BACKCOM RESULTS */}
            {activeCalc === 'backcom' && (
              <div className="space-y-4 text-left">
                <div className="bg-emerald-950/50 p-4 border border-emerald-500/15 rounded-xl">
                  <p className="text-[10px] text-slate-450 uppercase leading-none">Số tiền Backcom nhận về hàng tháng:</p>
                  <p className="text-3xl font-black text-emerald-400 font-mono mt-1">${cashbackEst.payoutMonth.toLocaleString('en-US')}</p>
                  <p className="text-sm text-slate-350 font-semibold font-sans mt-0.5">~ {cashbackEst.vndMonth.toLocaleString('vi-VN')} VND / tháng</p>
                </div>

                <div className="text-xs text-slate-400 divide-y divide-slate-850 space-y-2">
                  <div className="pt-2 flex justify-between">
                    <span>Ước lượng cashback nhận về / ngày:</span>
                    <span className="font-semibold text-slate-205">${cashbackEst.payoutDay} (~ {cashbackEst.vndDay.toLocaleString('vi-VN')} đ)</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span>Cấu hình sàn áp dụng:</span>
                    <span className="font-semibold text-emerald-400 uppercase">{backcomBroker} Group</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 text-left space-y-3.5">
            {activeCalc === 'backcom' ? (
              <button
                onClick={() => onNavigateToTab('backcom')}
                className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition active:scale-98 shadow shadow-emerald-500/10"
              >
                Gửi Đăng Ký UID Nhận Lót Khớp Lệnh <CheckSquare className="h-4 w-4" />
              </button>
            ) : (
              <div className="pt-1 flex items-start gap-1.5 text-[10px] text-slate-500 bg-amber-950/10 p-2.5 rounded border border-amber-500/10">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Số liệu toán học trên là lý thuyết, giúp trader dự lập cấu trúc SL/TP tối ưu trước khi nhấn nút vào vị thế khớp phiên.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
