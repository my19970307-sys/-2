
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
  Menu
} from 'lucide-react';
import { MOCK_EMAILS, MOCK_CONVERSATION, MOCK_CUSTOMER, MOCK_TICKET } from './constants';
import { TicketStatus, Email } from './types';

const App: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email>(MOCK_EMAILS[0]);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('售后工作台');
  const [activeTab, setActiveTab] = useState('售后邮箱');

  const navModules = [
    'VOC模块', '绩效模块', '品质模块', '星级监测', '员工跟踪', '供应商管理', 
    'UDI', '年度目标', '复盘空间', '新品监测', '毛利分析', '售后工作台', 
    '退货分析', '备货预测', '年度订单', '物料管理'
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      {/* 1. GLOBAL SLIM SIDEBAR */}
      <aside className={`panel-transition flex flex-col shrink-0 nav-gradient border-r border-slate-800 z-50 ${sidebarCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="h-16 flex items-center px-4 gap-3 border-b border-white/5 overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shrink-0">C</div>
          {!sidebarCollapsed && <span className="text-white font-bold tracking-tight text-lg truncate">IntelliServe</span>}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar px-2">
          {navModules.map(mod => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] transition-all flex items-center gap-4 group relative ${
                activeModule === mod 
                  ? 'bg-indigo-600 text-white font-semibold' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              <Briefcase size={18} className={activeModule === mod ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
              {!sidebarCollapsed && <span className="truncate">{mod}</span>}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-xl whitespace-nowrap z-[100]">
                  {mod}
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="p-3 border-t border-white/5 space-y-1">
           <SidebarLink icon={<Settings size={18}/>} label="系统设置" collapsed={sidebarCollapsed} />
           <button 
             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
             className="w-full flex items-center gap-4 px-3 py-2 text-slate-400 hover:text-white rounded-xl transition-all"
           >
             {sidebarCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
             {!sidebarCollapsed && <span className="text-[13px]">收起侧栏</span>}
           </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-16 glass-effect border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-8 h-full">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">{activeModule}</h1>
            
            <nav className="flex items-center h-full space-x-1">
              {['售后邮箱', '客户管理', '模板管理', '绩效报表'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 h-full text-[13px] font-bold transition-all relative flex items-center ${
                    activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-2 right-2 h-1 bg-indigo-600 rounded-t-full"></div>}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400 pr-6 border-r border-slate-200">
              <HeaderAction icon={<RefreshCw size={18}/>} title="同步" />
              <HeaderAction icon={<Search size={18}/>} title="搜索" />
              <div className="relative group cursor-pointer">
                <Bell size={18} className="group-hover:text-indigo-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </div>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 hover:bg-white rounded-xl transition-all">
              <div className="text-right">
                <p className="text-[13px] font-bold text-slate-700">汤梦艳</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">● 在线</p>
              </div>
              <img src="https://picsum.photos/seed/user/32/32" className="w-9 h-9 rounded-xl shadow-sm border border-slate-100" alt="User" />
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* THREE-PANE LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* COLUMN 2: LIST VIEW */}
          <section className="w-80 shrink-0 bg-white border-r border-slate-200 flex flex-col z-10">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-2">
                <Inbox size={16} className="text-indigo-500" />
                <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">收件箱</h3>
              </div>
              <button className="text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-lg">过滤 <ChevronDown size={12} className="inline"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
              {MOCK_EMAILS.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-50 relative group ${
                    selectedEmail.id === email.id ? 'bg-indigo-50/40' : ''
                  }`}
                >
                  {selectedEmail.id === email.id && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-indigo-600 rounded-r-full"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <img src={email.avatar} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100" alt={email.sender} />
                      {!email.isRead && <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className={`text-[13px] truncate leading-none ${!email.isRead ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>
                          {email.sender}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{email.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className={`text-[12px] truncate mb-2 leading-tight ${!email.isRead ? 'text-slate-700 font-semibold' : 'text-slate-400'}`}>
                        {email.subject}
                      </p>
                      {email.status === TicketStatus.OVERDUE && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg border border-rose-100">
                          <AlertCircle size={12} /> 超时 {email.overdueTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COLUMN 3: EMAIL CONTENT (THE FOCUS) */}
          <section className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
             
             {/* CONTENT ACTION HEADER */}
             <div className="h-16 px-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold shadow-lg ring-4 ring-slate-50">
                    {selectedEmail.sender.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900 truncate tracking-tight">{selectedEmail.subject}</h2>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="text-indigo-600 font-bold">{selectedEmail.sender}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>{selectedEmail.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <ActionIconButton icon={<Archive size={18} />} title="归档" />
                    <ActionIconButton icon={<Trash2 size={18} />} title="删除" />
                    <ActionIconButton icon={<Flag size={18} />} title="重要" />
                  </div>
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>
                  <button 
                    onClick={() => setShowRightPanel(!showRightPanel)}
                    className={`p-2.5 rounded-xl transition-all border ${showRightPanel ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>
             </div>

             {/* SCROLLABLE CONVERSATION AREA */}
             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#fafbfd]">
                <div className="max-w-4xl mx-auto space-y-16 pb-24">
                   {MOCK_CONVERSATION.map((msg) => (
                     <div key={msg.id} className={`flex gap-6 group ${msg.sender.includes('工作台') ? 'flex-row-reverse' : ''}`}>
                       <div className="shrink-0 pt-1">
                        <img src={`https://picsum.photos/seed/${msg.sender}/56/56`} className="w-12 h-12 rounded-[22px] border-4 border-white shadow-xl ring-1 ring-slate-100 transition-transform group-hover:scale-105" alt="" />
                       </div>
                       
                       <div className={`flex flex-col gap-3 max-w-[80%] ${msg.sender.includes('工作台') ? 'items-end text-right' : ''}`}>
                         <div className={`flex items-center gap-3 mb-1 px-1 ${msg.sender.includes('工作台') ? 'flex-row-reverse' : ''}`}>
                           <span className="text-[14px] font-bold text-slate-900 tracking-tight">{msg.sender}</span>
                           <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{msg.time.split(' ')[1]}</span>
                         </div>
                         
                         <div className={`p-6 rounded-[28px] text-[15px] leading-relaxed shadow-sm border transition-all ${
                           msg.sender.includes('工作台') 
                             ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none' 
                             : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                         }`}>
                           {msg.content}
                         </div>
                         
                         {msg.attachments && (
                           <div className={`flex flex-wrap gap-4 mt-4 ${msg.sender.includes('工作台') ? 'justify-end' : ''}`}>
                             {msg.attachments.map((att, i) => (
                               <div key={i} className="group relative bg-white p-2 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:border-indigo-200 transition-all w-56 overflow-hidden">
                                  <div className="h-36 mb-2 rounded-xl overflow-hidden bg-slate-50 relative">
                                    <img src={att.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={att.name} />
                                    <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                      <Maximize2 className="text-white drop-shadow-lg" size={24}/>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between px-2 pb-1">
                                    <span className="text-[11px] text-slate-800 font-bold truncate pr-4">{att.name}</span>
                                    <button className="text-indigo-600 text-[11px] font-bold hover:underline">预览</button>
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

             {/* INTERACTIVE REPLY AREA */}
             <div className="px-12 pb-10 bg-transparent shrink-0">
                <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden panel-transition focus-within:ring-4 focus-within:ring-indigo-100/50">
                   <div className="px-8 py-4 border-b border-slate-50 bg-slate-50/40 flex items-center justify-between">
                     <div className="flex items-center gap-8">
                       <EditorToolItem icon={<LayoutTemplate size={18} />} label="模版" />
                       <EditorToolItem icon={<Paperclip size={18} />} label="附件" />
                       <div className="h-5 w-px bg-slate-200"></div>
                       <EditorToolItem icon={<History size={18} />} label="记录" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">支持 Markdown 回复</span>
                   </div>
                   
                   <textarea 
                     placeholder="键入您的回复..."
                     className="w-full h-36 p-8 text-[15px] text-slate-800 border-none focus:ring-0 resize-none leading-relaxed placeholder:text-slate-300"
                   />
                   
                   <div className="px-8 py-5 flex items-center justify-between border-t border-slate-50 bg-white">
                     <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[11px] text-slate-400 font-bold italic tracking-wide">草稿已自动保存</span>
                     </div>
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3.5 rounded-2xl text-[14px] font-bold flex items-center gap-3 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 transform">
                       <Send size={18} /> 发送回复邮件
                     </button>
                   </div>
                </div>
             </div>
          </section>

          {/* COLUMN 4: CUSTOMER CRM (TOGGLEABLE) */}
          <aside className={`panel-transition shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-hidden ${showRightPanel ? 'w-80' : 'w-0'}`}>
             <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between shrink-0">
               <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                 <User size={16} className="text-indigo-500" /> 客户情报
               </h3>
               <button onClick={() => setShowRightPanel(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                 <X size={18} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="relative mb-6 group cursor-pointer">
                    <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center border-2 border-slate-100 shadow-xl overflow-hidden ring-4 ring-white group-hover:scale-105 transition-all">
                      <User size={48} className="text-slate-200" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-2xl text-white shadow-2xl border-4 border-white">
                      <ShieldCheck size={18}/>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-2">{MOCK_CUSTOMER.name}</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">VIP Member • US</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <CRMInfoItem label="邮箱地址" value={MOCK_CUSTOMER.email} isLink />
                  <CRMInfoItem label="核心标签" value={MOCK_CUSTOMER.tags.join(', ')} isTag />
                  
                  <div className="h-px bg-slate-100"></div>

                  <div className="space-y-5">
                    <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest px-1">当前关联工单</h3>
                    <div className="space-y-4 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                      <TicketField icon={<ShieldCheck size={16}/>} label="负责人" value={MOCK_TICKET.owner} />
                      <TicketField icon={<Package size={16}/>} label="产品型号" value={MOCK_TICKET.sku} />
                      <TicketField icon={<CreditCard size={16}/>} label="订单号" value={MOCK_TICKET.orderId} />
                      
                      <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">处理备忘</span>
                        <p className="text-[13px] text-slate-600 leading-relaxed italic">
                          "{MOCK_TICKET.memo}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-4 bg-[#1e293b] text-white rounded-[24px] text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> 更新跟进记录
                  </button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; collapsed?: boolean }> = ({ icon, label, collapsed }) => (
  <button className="w-full flex items-center gap-4 px-3 py-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all group relative">
    {icon}
    {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
    {collapsed && (
      <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-xl whitespace-nowrap z-[100]">
        {label}
      </div>
    )}
  </button>
);

const HeaderAction: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all relative group" title={title}>
    {icon}
  </button>
);

const ActionIconButton: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all relative group" title={title}>
    {icon}
  </button>
);

const EditorToolItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 group transition-all">
    <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">{icon}</span>
    <span className="text-[12px] font-bold uppercase tracking-widest hidden sm:block">{label}</span>
  </button>
);

const CRMInfoItem: React.FC<{ label: string; value: string; isLink?: boolean; isTag?: boolean }> = ({ label, value, isLink, isTag }) => (
  <div className="space-y-2 px-1">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
    {isTag ? (
      <div className="flex flex-wrap gap-2 pt-1">
        {value.split(', ').map(t => (
          <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-[11px] font-bold border border-slate-200 transition-colors hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 cursor-default">{t}</span>
        ))}
        <button className="w-8 h-8 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-300 hover:text-indigo-600 hover:border-indigo-200 transition-all">
          <Plus size={16}/>
        </button>
      </div>
    ) : (
      <div className={`p-3 bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white rounded-2xl transition-all ${isLink ? 'cursor-pointer' : ''}`}>
        <span className={`text-[13px] font-bold truncate block ${isLink ? 'text-indigo-600 hover:underline' : 'text-slate-900'}`}>{value}</span>
      </div>
    )}
  </div>
);

const TicketField: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 py-1 group">
    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm group-hover:text-indigo-600 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-[14px] font-bold text-slate-900 truncate leading-none">{value}</p>
    </div>
  </div>
);

export default App;
