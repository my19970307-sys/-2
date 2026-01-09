
import React, { useState } from 'react';
import { 
  Search, 
  Paperclip, 
  Send,
  MoreVertical,
  Filter,
  X,
  User,
  RefreshCw,
  Maximize2,
  ChevronRight,
  ChevronDown,
  Archive,
  Trash2,
  Flag,
  CheckCircle2,
  AlertCircle,
  Bell,
  Inbox,
  LayoutTemplate,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Package,
  ExternalLink,
  Plus,
  Settings,
  HelpCircle,
  ChevronLeft,
  Briefcase,
  History,
  FileText,
  Star,
  Users,
  Menu,
  Minimize2,
  Download
} from 'lucide-react';
import { MOCK_EMAILS, MOCK_CONVERSATION, MOCK_CUSTOMER, MOCK_TICKET } from './constants';
import { TicketStatus, Email } from './types';

const App: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email>(MOCK_EMAILS[0]);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showLeftFilter, setShowLeftFilter] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeModule, setActiveModule] = useState('售后工作台');
  const [activeTab, setActiveTab] = useState('售后邮箱');

  const navModules = [
    'VOC模块', '绩效模块', '品质模块', '星级监测', '员工跟踪', '供应商管理', 
    'UDI', '年度目标', '复盘空间', '新品监测', '毛利分析', '售后工作台', 
    '退货分析', '备货预测', '年度订单', '物料管理'
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      {/* 1. GLOBAL NAV SIDEBAR - LEFTMOST */}
      <aside className={`panel-transition flex flex-col shrink-0 bg-[#0f172a] border-r border-slate-800 z-50 ${sidebarCollapsed || focusMode ? 'w-0 opacity-0 pointer-events-none' : 'w-56'}`}>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-white/5 overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0 text-xs">COMFY</div>
          <span className="text-white font-bold tracking-tight text-sm truncate uppercase">Comfytemp</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar px-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">主要导航</div>
          {navModules.map(mod => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] transition-all flex items-center gap-4 group relative ${
                activeModule === mod 
                  ? 'bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/20' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              <Briefcase size={16} className={activeModule === mod ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="truncate">{mod}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/5 space-y-1">
           <button 
             onClick={() => setSidebarCollapsed(true)}
             className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white rounded-2xl transition-all"
           >
             <ChevronLeft size={18}/>
             <span className="text-[13px]">收起边栏</span>
           </button>
        </div>
      </aside>

      {/* MINI TRIGGER WHEN COLLAPSED */}
      {sidebarCollapsed && !focusMode && (
        <div className="w-14 bg-[#0f172a] flex flex-col items-center py-4 gap-4 shrink-0 border-r border-slate-800">
           <button onClick={() => setSidebarCollapsed(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-xl">
             <Menu size={20} />
           </button>
           <div className="h-px w-6 bg-white/10" />
           <button className="w-10 h-10 flex items-center justify-center text-indigo-400 bg-indigo-400/10 rounded-xl shadow-lg"><Briefcase size={20}/></button>
        </div>
      )}

      {/* MAIN WORK AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* TOP SYSTEM HEADER */}
        {!focusMode && (
          <header className="h-14 glass-header flex items-center justify-between px-6 shrink-0 z-40">
            <div className="flex items-center gap-8 h-full">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                  <span className="text-xs font-bold text-slate-600">工作台</span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded shadow-sm">售后工作台</span>
               </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-slate-400 pr-6 border-r border-slate-200">
                <HeaderAction icon={<RefreshCw size={16}/>} title="刷新" />
                <HeaderAction icon={<Download size={16}/>} title="导出" />
                <HeaderAction icon={<Search size={16}/>} title="全局搜索" />
              </div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right">
                  <p className="text-[13px] font-bold text-slate-700 group-hover:text-indigo-600">汤梦艳</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter text-emerald-500">在线活跃</p>
                </div>
                <img src="https://picsum.photos/seed/user/32/32" className="w-9 h-9 rounded-xl border border-slate-200 shadow-sm" alt="User" />
              </div>
            </div>
          </header>
        )}

        {/* WORKSPACE CONTENT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* COLUMN 2: FILTERS & NAVIGATION - SECONDARY NAV */}
          <section className={`panel-transition bg-white border-r border-slate-100 flex flex-col shrink-0 ${showLeftFilter && !focusMode ? 'w-56' : 'w-0 opacity-0 overflow-hidden'}`}>
             <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Filter size={14}/> 便捷导航
                </h3>
                <button onClick={() => setShowLeftFilter(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400"><X size={14}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2 mb-3">筛选状态</p>
                  <div className="space-y-1">
                    <FilterItem label="未处理" count={6} color="bg-rose-500" />
                    <FilterItem label="待回复" count={2} color="bg-amber-400" />
                    <FilterItem label="已超时" count={4} color="bg-rose-600" active />
                    <FilterItem label="已完成" count={3} color="bg-emerald-500" />
                  </div>
                </div>

                <div>
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2 mb-3">业务品线</p>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 text-[13px] text-slate-600 font-semibold cursor-pointer hover:bg-slate-50 rounded-lg">
                        <ChevronDown size={14} className="text-slate-400" />
                        <span>K90热疗</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        {['K90居家系列', 'K90R红外系列', 'K92便携系列', 'K90S桑拿系列'].map(item => (
                          <div key={item} className="px-3 py-1.5 text-[12px] text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg cursor-pointer transition-colors">
                            {item}
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* COLUMN 3: EMAIL QUEUE */}
          <section className={`panel-transition bg-white border-r border-slate-200 flex flex-col shrink-0 ${focusMode ? 'w-0 opacity-0 overflow-hidden' : 'w-80'}`}>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-2">
                <Inbox size={16} className="text-indigo-500" />
                <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">收件箱列表</h3>
              </div>
              {!showLeftFilter && <button onClick={() => setShowLeftFilter(true)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Menu size={16}/></button>}
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100 bg-slate-50/30">
              {MOCK_EMAILS.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 cursor-pointer transition-all hover:bg-white relative group ${
                    selectedEmail.id === email.id ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] z-10' : ''
                  }`}
                >
                  {selectedEmail.id === email.id && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-600 rounded-r-full"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <img src={email.avatar} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100" alt={email.sender} />
                      {!email.isRead && <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[13px] truncate leading-none ${!email.isRead ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>
                          {email.sender}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{email.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className={`text-[12px] truncate mb-2 leading-tight ${!email.isRead ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                        {email.subject}
                      </p>
                      {email.status === TicketStatus.OVERDUE && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-bold rounded-md border border-rose-100">
                          <AlertCircle size={10} /> 已超时 {email.overdueTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COLUMN 4: MAIN EMAIL CONTENT - MAXIMIZABLE */}
          <section className="flex-1 flex flex-col bg-[#fdfdfe] overflow-hidden relative shadow-inner">
             
             {/* CONTENT ACTION HEADER */}
             <div className="h-16 px-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ring-4 ring-slate-50">
                    {selectedEmail.sender.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900 truncate tracking-tight mb-0.5">{selectedEmail.subject}</h2>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="text-indigo-600 font-bold flex items-center gap-1"><User size={12}/> {selectedEmail.sender}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>邮件时间: {selectedEmail.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <ActionIconButton icon={<Archive size={16} />} title="归档工单" />
                    <ActionIconButton icon={<Trash2 size={16} />} title="删除会话" />
                    <ActionIconButton icon={<Flag size={16} />} title="标记紧急" />
                  </div>
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>
                  <button 
                    onClick={() => setFocusMode(!focusMode)}
                    className={`p-2.5 rounded-xl transition-all border shadow-sm flex items-center gap-2 group ${focusMode ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-400 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'}`}
                  >
                    {focusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    <span className="text-[11px] font-bold uppercase tracking-widest hidden xl:block">{focusMode ? '退出专注' : '专注模式'}</span>
                  </button>
                  {!focusMode && (
                    <button 
                      onClick={() => setShowRightPanel(!showRightPanel)}
                      className={`p-2.5 rounded-xl transition-all border ${showRightPanel ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                    >
                      <MoreVertical size={18} />
                    </button>
                  )}
                </div>
             </div>

             {/* EMAIL THREAD CANVAS */}
             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-slate-50/40">
                <div className="max-w-4xl mx-auto space-y-12 pb-24">
                   {MOCK_CONVERSATION.map((msg) => (
                     <div key={msg.id} className={`flex gap-6 group ${msg.sender.includes('工作台') ? 'flex-row-reverse' : ''}`}>
                       <div className="shrink-0 pt-1">
                        <img src={`https://picsum.photos/seed/${msg.sender}/56/56`} className="w-12 h-12 rounded-[22px] border-4 border-white shadow-xl ring-1 ring-slate-100 transition-transform group-hover:scale-110" alt="" />
                       </div>
                       
                       <div className={`flex flex-col gap-3 max-w-[85%] ${msg.sender.includes('工作台') ? 'items-end' : ''}`}>
                         <div className={`flex items-center gap-3 mb-1 px-1 ${msg.sender.includes('工作台') ? 'flex-row-reverse text-right' : ''}`}>
                           <span className="text-[14px] font-bold text-slate-900 tracking-tight">{msg.sender}</span>
                           <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{msg.time.split(' ')[1]}</span>
                         </div>
                         
                         <div className={`p-8 rounded-[32px] text-[15px] leading-relaxed shadow-sm border transition-all hover:shadow-lg ${
                           msg.sender.includes('工作台') 
                             ? 'bg-[#1e293b] text-white border-slate-700 rounded-tr-none' 
                             : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                         }`}>
                           {msg.content}
                         </div>
                         
                         {msg.attachments && (
                           <div className={`flex flex-wrap gap-5 mt-4 ${msg.sender.includes('工作台') ? 'justify-end' : ''}`}>
                             {msg.attachments.map((att, i) => (
                               <div key={i} className="group relative bg-white p-3 rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all w-60 overflow-hidden">
                                  <div className="h-40 mb-3 rounded-xl overflow-hidden bg-slate-100 relative">
                                    <img src={att.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={att.name} />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                                       <Maximize2 className="text-white drop-shadow-lg" size={24}/>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between px-1">
                                    <div className="min-w-0 pr-2">
                                      <p className="text-[12px] text-slate-800 font-bold truncate leading-tight">{att.name}</p>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PNG Image</p>
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                      <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"><Download size={14}/></button>
                                    </div>
                                  </div>
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* REPLY AREA - WIDE EDITOR */}
             <div className="px-12 pb-10 bg-transparent shrink-0">
                <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden panel-transition reply-focus">
                   <div className="px-8 py-4 border-b border-slate-50 bg-slate-50/40 flex items-center justify-between">
                     <div className="flex items-center gap-8">
                       <EditorTool icon={<LayoutTemplate size={18} />} label="应用模版" />
                       <EditorTool icon={<Paperclip size={18} />} label="附件" />
                       <div className="h-5 w-px bg-slate-200"></div>
                       <EditorTool icon={<History size={18} />} label="对话历史" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hidden sm:block">Markdown Supported</span>
                   </div>
                   
                   <textarea 
                     placeholder="键入您的回复..."
                     className="w-full h-36 p-8 text-[15px] text-slate-800 border-none focus:ring-0 resize-none leading-relaxed placeholder:text-slate-300"
                   />
                   
                   <div className="px-8 py-5 flex items-center justify-between border-t border-slate-50 bg-white">
                     <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[11px] text-slate-400 font-bold italic tracking-wide">草稿已由云端自动保存于 15:42</span>
                     </div>
                     <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-2xl text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all">保存模板</button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl text-[14px] font-bold flex items-center gap-3 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 transform">
                          <Send size={18} /> 发送回复邮件
                        </button>
                     </div>
                   </div>
                </div>
             </div>
          </section>

          {/* COLUMN 5: CRM & TICKET DETAILS (DRAWER) */}
          <aside className={`panel-transition shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-hidden ${showRightPanel && !focusMode ? 'w-96' : 'w-0'}`}>
             <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between shrink-0">
               <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                 <User size={16} className="text-indigo-500" /> 客户情报中心
               </h3>
               <button onClick={() => setShowRightPanel(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                 <X size={18} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="relative mb-5 group">
                    <div className="w-24 h-24 bg-slate-50 rounded-[36px] flex items-center justify-center border-2 border-slate-100 shadow-xl overflow-hidden ring-4 ring-white transition-transform group-hover:scale-105">
                      <User size={48} className="text-slate-200" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 rounded-2xl text-white shadow-xl border-4 border-white">
                      <ShieldCheck size={18}/>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-2">{MOCK_CUSTOMER.name}</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">VIP Platinum Member</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <CRMInfoBox label="主联络邮箱" value={MOCK_CUSTOMER.email} isLink />
                    <CRMInfoBox label="常驻地区" value={MOCK_CUSTOMER.region} />
                  </div>
                  
                  <div className="space-y-3 px-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">活跃标签</p>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_CUSTOMER.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-[11px] font-bold border border-slate-200/50">{tag}</span>
                      ))}
                      <button className="w-8 h-8 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-300 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">工单流转状态</h3>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg border border-amber-100">待处理</span>
                    </div>
                    
                    <div className="space-y-4 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                      <TicketDetailRow icon={<ShieldCheck size={16}/>} label="责任客服" value={MOCK_TICKET.owner} />
                      <TicketDetailRow icon={<Package size={16}/>} label="产品/品线" value={MOCK_TICKET.productLine} />
                      <TicketDetailRow icon={<CreditCard size={16}/>} label="关联订单" value={MOCK_TICKET.orderId} />
                      
                      <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">备注与备忘</span>
                        <p className="text-[13px] text-slate-600 leading-relaxed italic">
                          "{MOCK_TICKET.memo}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-4 bg-[#0f172a] text-white rounded-[24px] text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> 登记新反馈记录
                  </button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// --- HELPER UI COMPONENTS ---

const FilterItem: React.FC<{ label: string; count: number; color: string; active?: boolean }> = ({ label, count, color, active }) => (
  <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] transition-all cursor-pointer group ${
    active ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-500 hover:bg-slate-50'
  }`}>
    <div className="flex items-center gap-3">
       <div className={`w-1.5 h-1.5 rounded-full ${color}`}></div>
       <span className="font-semibold">{label}</span>
    </div>
    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-lg ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>{count}</span>
  </div>
);

const HeaderAction: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative group" title={title}>
    {icon}
  </button>
);

const ActionIconButton: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all relative group shadow-sm hover:shadow-md border border-transparent hover:border-slate-100" title={title}>
    {icon}
  </button>
);

const EditorTool: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 group transition-all">
    <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">{icon}</span>
    <span className="text-[12px] font-bold uppercase tracking-widest hidden sm:block">{label}</span>
  </button>
);

const CRMInfoBox: React.FC<{ label: string; value: string; isLink?: boolean }> = ({ label, value, isLink }) => (
  <div className="space-y-2 px-1">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
    <div className={`p-4 bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white rounded-2xl transition-all shadow-sm ${isLink ? 'cursor-pointer' : ''}`}>
      <span className={`text-[14px] font-bold truncate block ${isLink ? 'text-indigo-600 hover:underline' : 'text-slate-900'}`}>{value}</span>
    </div>
  </div>
);

const TicketDetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 py-1">
    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-[14px] font-bold text-slate-900 truncate tracking-tight">{value}</p>
    </div>
  </div>
);

export default App;
