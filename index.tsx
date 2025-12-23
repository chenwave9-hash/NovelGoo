
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BookOpen, Home, Gift, User, Search, ChevronLeft, Star, Clock, Share2, Wallet,
  Library, Copy, Pencil, X, History, ChevronRight, ShieldCheck, Check, 
  LogOut, Bell, Trophy, Zap, Flame, Compass, Heart,
  PenTool, Eye, Plus, Save, Coins, Users, TrendingUp, CreditCard
} from 'lucide-react';
import { MOCK_NOVELS } from './constants';
import { Novel, UserState, PaymentMethod, Chapter, WithdrawalRequest } from './types';

const ADMIN_EMAIL = 'axielstore@gmail.com';
const ADMIN_PASS = 'Kasepp12';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'home' | 'library' | 'rewards' | 'profile' | 'admin'>('home');
  const [adminSubTab, setAdminSubTab] = useState<'wd' | 'novels' | 'users'>('wd');
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [readingChapter, setReadingChapter] = useState<{ novel: Novel; chapter: Chapter } | null>(null);
  
  const [isWriting, setIsWriting] = useState(false);
  const [viewingPendingNovel, setViewingPendingNovel] = useState<Novel | null>(null);

  const [allUsers, setAllUsers] = useState<UserState[]>(() => {
    const saved = localStorage.getItem('ng_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [allWithdrawals, setAllWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('ng_wd');
    return saved ? JSON.parse(saved) : [];
  });
  const [userSubmittedNovels, setUserSubmittedNovels] = useState<Novel[]>(() => {
    const saved = localStorage.getItem('ng_submitted_novels');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState<UserState | null>(() => {
    const saved = localStorage.getItem('ng_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Auto-sync storage
  useEffect(() => {
    localStorage.setItem('ng_users', JSON.stringify(allUsers));
    localStorage.setItem('ng_wd', JSON.stringify(allWithdrawals));
    localStorage.setItem('ng_session', JSON.stringify(currentUser));
    localStorage.setItem('ng_submitted_novels', JSON.stringify(userSubmittedNovels));
  }, [allUsers, allWithdrawals, currentUser, userSubmittedNovels]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (currentUser) {
        setIsAuthenticated(true);
        if (currentUser.isAdmin) setActiveTab('admin');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // REWARD SYSTEM (Baca 1 menit = 25 Poin, Teman baca 2 menit = 500 Poin)
  useEffect(() => {
    let interval: number;
    if (readingChapter && isAuthenticated && currentUser && !currentUser.isAdmin) {
      interval = window.setInterval(() => {
        setAllUsers(prevUsers => {
          const uIdx = prevUsers.findIndex(u => u.id === currentUser.id);
          if (uIdx === -1) return prevUsers;

          const user = { ...prevUsers[uIdx] };
          const newTime = (user.readingTimeToday || 0) + 1;
          user.readingTimeToday = newTime;

          // Reward Baca: Tiap 60 detik (1 menit)
          if (newTime > 0 && newTime % 60 === 0) {
            user.points = (user.points || 0) + 25;
            user.totalEarnings = (user.totalEarnings || 0) + 25;
            showToast('+25 Poin Masuk!');
          }

          // Reward Referral: Jika teman mencapai 120 detik (2 menit)
          if (newTime === 120 && user.referredBy && !user.referralBonusProcessed) {
            const inviterIdx = prevUsers.findIndex(u => u.referralCode === user.referredBy);
            if (inviterIdx !== -1) {
              const inviter = { ...prevUsers[inviterIdx] };
              inviter.points = (inviter.points || 0) + 500;
              inviter.totalEarnings = (inviter.totalEarnings || 0) + 500;
              inviter.invitedCount = (inviter.invitedCount || 0) + 1;
              
              const nextUsers = [...prevUsers];
              nextUsers[inviterIdx] = inviter;
              user.referralBonusProcessed = true;
              nextUsers[uIdx] = user;
              setCurrentUser(user);
              showToast('Rp 500 cair ke pengundang!');
              return nextUsers;
            }
          }

          setCurrentUser(user);
          const nextUsers = [...prevUsers];
          nextUsers[uIdx] = user;
          return nextUsers;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [readingChapter, isAuthenticated]);

  const handleAuth = (type: 'login' | 'register', data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'login') {
        if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASS) {
          const admin: UserState = {
            id: 'admin_chen', username: 'Boss Chen', email: ADMIN_EMAIL, bio: 'Owner Novel Goo. Anti PHP.',
            points: 0, referralCode: 'BOSS', hasWithdrawn: true, invitedCount: 0, readingTimeToday: 0,
            totalEarnings: 0, library: [], isAdmin: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminChen'
          };
          setCurrentUser(admin);
          setIsAuthenticated(true);
          setActiveTab('admin');
        } else {
          const user = allUsers.find(u => u.email === data.email && u.password === data.password);
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            setActiveTab('home');
          } else showToast('Gagal Login. Cek Email/Password.');
        }
      } else {
        const newUser: UserState = {
          id: Math.random().toString(36).substr(2, 9),
          username: data.username, email: data.email, password: data.password,
          bio: 'Saya pembaca setia Novel Goo. Suka cuan gratis!', points: 0,
          referralCode: 'NG' + Math.random().toString(36).substr(2, 4).toUpperCase(),
          referredBy: data.reffCode || undefined,
          referralBonusProcessed: false,
          hasWithdrawn: false, invitedCount: 0, 
          readingTimeToday: 0, totalEarnings: 0, library: [], 
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`
        };
        setAllUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        if (data.reffCode) showToast('Referral Aktif!');
      }
      setIsLoading(false);
    }, 1500);
  };

  const submitUserNovel = (data: any) => {
    if (!currentUser) return;
    const newNovel: Novel = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      author: currentUser.username,
      cover: 'https://picsum.photos/seed/' + Math.random() + '/400/600',
      summary: data.summary,
      category: data.category || 'Romance',
      rating: 0, views: '0', status: 'Ongoing', isApproved: false, userId: currentUser.id,
      chapters: [{ id: 1, title: 'Bab 1: ' + data.chapterTitle, content: data.content }]
    };
    setUserSubmittedNovels(prev => [...prev, newNovel]);
    setIsWriting(false);
    showToast('Terkirim ke Boss Chen!');
  };

  const adminHandleWD = (id: string, action: 'Approved' | 'Rejected') => {
    setAllWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: action } : w));
    if (action === 'Rejected') {
      const wd = allWithdrawals.find(w => w.id === id);
      if (wd) {
        setAllUsers(prev => prev.map(u => u.id === wd.userId ? { ...u, points: (u.points || 0) + wd.amount } : u));
        if (currentUser?.id === wd.userId) setCurrentUser(prev => prev ? { ...prev, points: (prev.points || 0) + wd.amount } : null);
      }
    }
    showToast(action === 'Approved' ? 'WD Cair!' : 'WD Ditolak');
  };

  const adminHandleNovel = (id: string, action: 'Approved' | 'Rejected') => {
    const novel = userSubmittedNovels.find(n => n.id === id);
    if (!novel) return;

    if (action === 'Approved') {
      setUserSubmittedNovels(prev => prev.map(n => n.id === id ? { ...n, isApproved: true } : n));
      setAllUsers(prev => prev.map(u => u.id === novel.userId ? { ...u, points: (u.points || 0) + 5000, totalEarnings: (u.totalEarnings || 0) + 5000 } : u));
      if (currentUser?.id === novel.userId) setCurrentUser(prev => prev ? { ...prev, points: (prev.points || 0) + 5000, totalEarnings: (prev.totalEarnings || 0) + 5000 } : null);
      showToast('Novel ACC! Bonus 5rb cair.');
    } else {
      setUserSubmittedNovels(prev => prev.filter(n => n.id !== id));
      showToast('Novel Dihapus.');
    }
    setViewingPendingNovel(null);
  };

  // Fix: Added missing adminUpdateUserPoints function
  const adminUpdateUserPoints = (userId: string, points: number) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, points } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, points } : null);
    }
    showToast('Poin diperbarui!');
  };

  const requestWD = (method: PaymentMethod, phone: string) => {
    const currentPoints = currentUser?.points ?? 0;
    if (currentPoints < 500) return;
    
    const req: WithdrawalRequest = {
      id: Math.random().toString(36).substr(2, 9), userId: currentUser!.id, username: currentUser!.username,
      amount: 500, method, phoneNumber: phone, status: 'Pending', date: new Date().toLocaleDateString()
    };
    setAllWithdrawals(prev => [...prev, req]);
    const updated = { ...currentUser!, points: currentPoints - 500 };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    setIsWithdrawing(false);
    showToast('WD Sedang Antre.');
  };

  if (isLoading) return (
    <div className="fixed inset-0 bg-white z-[500] flex flex-col items-center justify-center">
       <div className="w-24 h-24 bg-[#FF5A5F] rounded-[32px] flex items-center justify-center shadow-2xl animate-pulse mb-6">
          <BookOpen className="w-12 h-12 text-white" />
       </div>
       <h1 className="text-3xl font-black text-[#FF5A5F] italic tracking-tighter">Novel Goo</h1>
       <p className="text-gray-300 text-xs font-bold mt-2 uppercase tracking-widest">Loading Cuan...</p>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-white p-10 flex flex-col justify-center max-w-[480px] mx-auto">
       <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-[#FF5A5F] italic tracking-tighter">Novel Goo</h2>
          <p className="text-gray-400 text-sm mt-3 font-bold">Baca Novel. Kumpulkan Poin. Tarik Saldo.</p>
       </div>
       <form onSubmit={(e) => {
         e.preventDefault();
         const fd = new FormData(e.currentTarget);
         handleAuth(authMode, Object.fromEntries(fd));
       }} className="space-y-4">
         {authMode === 'register' && (
           <input name="username" required placeholder="Nama Lengkap" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-bold outline-none focus:border-[#FF5A5F] transition-all" />
         )}
         <input name="email" type="email" required placeholder="Email" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-bold outline-none focus:border-[#FF5A5F] transition-all" />
         <input name="password" type="password" required placeholder="Password" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-bold outline-none focus:border-[#FF5A5F] transition-all" />
         {authMode === 'register' && (
           <input name="reffCode" placeholder="Kode Referral (Optional)" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-bold outline-none focus:border-[#FF5A5F] transition-all" />
         )}
         <button className="w-full bg-[#FF5A5F] text-white py-6 rounded-[24px] font-black shadow-xl shadow-[#FF5A5F]/30 mt-6 active:scale-95 transition-all uppercase tracking-widest">
           {authMode === 'login' ? 'MASUK KE NOVEL GOO' : 'DAFTAR & DAPAT HADIAH'}
         </button>
       </form>
       <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="mt-10 text-gray-400 text-xs text-center font-black uppercase tracking-widest">
         {authMode === 'login' ? 'Belum punya akun? ' : 'Sudah ada akun? '} 
         <span className="text-[#FF5A5F]">Klik Sini</span>
       </button>
    </div>
  );

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white relative shadow-2xl overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-50">
        <h1 className="text-2xl font-black text-[#FF5A5F] italic tracking-tighter">Novel Goo</h1>
        <div className="flex gap-4">
          <Search className="w-6 h-6 text-gray-400" />
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-400" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="pb-24">
           {/* Promo Banner */}
           <div className="px-6 mt-6 mb-8">
              <div className="w-full h-48 bg-gradient-to-br from-[#FF5A5F] to-[#FF8A8E] rounded-[32px] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-[#FF5A5F]/20">
                 <div className="relative z-10">
                    <p className="text-[10px] font-black bg-white/20 w-fit px-3 py-1 rounded-full mb-3 uppercase tracking-widest">Penulis Baru</p>
                    <h2 className="text-2xl font-black leading-tight">Dapatkan Rp 5.000<br/>Setiap Novel ACC!</h2>
                    <button onClick={() => setIsWriting(true)} className="mt-6 bg-white text-[#FF5A5F] px-8 py-3 rounded-2xl text-[10px] font-black shadow-lg uppercase tracking-widest">Mulai Menulis</button>
                 </div>
                 <PenTool className="w-40 h-40 absolute -right-8 -bottom-8 opacity-10 rotate-12" />
              </div>
           </div>

           {/* Content Sections */}
           <div className="px-6 space-y-10">
              <section>
                 <div className="flex justify-between items-center mb-6 px-1">
                    <h3 className="text-lg font-black text-gray-800 flex items-center gap-2"><Flame className="w-6 h-6 text-orange-500" /> Sedang Viral</h3>
                    <span className="text-[10px] font-black text-[#FF5A5F] uppercase tracking-widest">Semua</span>
                 </div>
                 <div className="grid grid-cols-3 gap-5">
                    {[...MOCK_NOVELS, ...userSubmittedNovels.filter(n => n.isApproved)].slice(0, 6).map(n => (
                      <div key={n.id} onClick={() => setSelectedNovel(n)} className="cursor-pointer group">
                        <div className="aspect-[3/4] rounded-[24px] overflow-hidden shadow-sm mb-3 group-active:scale-95 transition-all">
                           <img src={n.cover} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-black text-gray-800 line-clamp-2 leading-tight uppercase tracking-tighter">{n.title}</p>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      )}

      {activeTab === 'library' && (
        <div className="px-6 pt-10 pb-24">
           <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-gray-800 tracking-tighter">Rak Buku</h2>
              <History className="w-6 h-6 text-gray-300" />
           </div>
           <div className="grid grid-cols-3 gap-6">
              {MOCK_NOVELS.slice(0, 5).map(n => (
                <div key={n.id} onClick={() => setSelectedNovel(n)} className="cursor-pointer">
                  <img src={n.cover} className="w-full aspect-[3/4] rounded-[24px] object-cover shadow-lg mb-3" />
                  <p className="text-[10px] font-black line-clamp-1 uppercase tracking-tighter">{n.title}</p>
                </div>
              ))}
              <div onClick={() => setActiveTab('home')} className="aspect-[3/4] rounded-[24px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer text-gray-300 bg-gray-50/50">
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-[8px] font-black uppercase tracking-widest">Tambah</span>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="pb-24">
           <div className="px-6 pt-10">
              <div className="bg-gray-900 rounded-[40px] p-10 text-white shadow-2xl mb-12 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                       <Coins className="w-4 h-4 text-yellow-500" />
                       <p className="text-[10px] font-black opacity-50 uppercase tracking-[3px]">Total Saldo</p>
                    </div>
                    <h3 className="text-5xl font-black tracking-tighter">Rp {currentUser?.points ?? 0}</h3>
                    <div className="flex gap-4 mt-12">
                       <button onClick={() => setIsWithdrawing(true)} disabled={(currentUser?.points ?? 0) < 500} className="flex-[2] bg-[#FF5A5F] text-white py-5 rounded-[20px] font-black text-xs uppercase shadow-xl shadow-[#FF5A5F]/20 disabled:opacity-40 active:scale-95 transition-all">Tarik Sekarang</button>
                       <div className="flex-1 bg-white/10 backdrop-blur-md rounded-[20px] flex items-center justify-center"><CreditCard className="w-6 h-6 text-white/50" /></div>
                    </div>
                 </div>
                 <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#FF5A5F]/10 rounded-full blur-3xl"></div>
              </div>

              <h3 className="font-black text-gray-800 mb-8 px-2 flex items-center gap-3"><Trophy className="w-6 h-6 text-yellow-500" /> Misi Pendapatan</h3>
              <div className="space-y-5">
                 <div className="bg-white p-7 rounded-[32px] flex justify-between items-center border border-gray-100 shadow-sm">
                    <div className="flex gap-6 items-center">
                       <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500"><Clock className="w-7 h-7" strokeWidth={2.5} /></div>
                       <div>
                          <h4 className="text-sm font-black uppercase tracking-tighter">Membaca Novel</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1">+25 Poin per 1 Menit</p>
                       </div>
                    </div>
                    <div className="bg-orange-50 px-5 py-2.5 rounded-2xl text-[10px] font-black text-orange-600 border border-orange-100">{(currentUser?.readingTimeToday ?? 0) % 60}s / 60s</div>
                 </div>

                 <div className="bg-white p-7 rounded-[32px] flex justify-between items-center border border-gray-100 shadow-sm">
                    <div className="flex gap-6 items-center">
                       <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500"><Share2 className="w-7 h-7" strokeWidth={2.5} /></div>
                       <div>
                          <h4 className="text-sm font-black uppercase tracking-tighter">Undang Teman</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1">Rp 500 per Teman Aktif</p>
                       </div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(currentUser?.referralCode || ''); showToast('ID Disalin!'); }} className="bg-blue-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black shadow-lg uppercase tracking-widest">Undang</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="pb-24">
           {/* MEWAH PROFILE SECTION */}
           <div className="px-6 pt-12 pb-10 bg-white border-b border-gray-50 flex flex-col items-center">
              <div className="relative mb-6">
                 <div className="w-32 h-32 rounded-full border-[8px] border-gray-50 p-1 bg-white shadow-xl">
                    <img src={currentUser?.avatar} className="w-full h-full rounded-full object-cover bg-gray-100" />
                 </div>
                 <div className="absolute bottom-2 right-2 bg-[#FF5A5F] p-2.5 rounded-full border-4 border-white shadow-lg"><Zap className="w-4 h-4 text-white fill-white" /></div>
              </div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tighter uppercase">{currentUser?.username ?? 'Goo User'}</h2>
              <p className="text-gray-400 text-xs font-bold mt-2 text-center max-w-[300px] leading-relaxed italic">"{currentUser?.bio}"</p>
              
              <div onClick={() => { navigator.clipboard.writeText(currentUser?.referralCode || ''); showToast('ID Disalin!'); }} className="flex items-center gap-3 mt-6 bg-gray-50 hover:bg-gray-100 transition-all px-6 py-3 rounded-full border border-gray-100 cursor-pointer">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">ID: <span className="text-[#FF5A5F]">{currentUser?.referralCode}</span></p>
                <Copy className="w-4 h-4 text-gray-300" />
              </div>
           </div>

           {/* PREMIUM STATS CARD */}
           <div className="px-6 -mt-8 mb-10">
              <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-gray-50 flex justify-between items-center">
                 <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                    <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Saldo</p>
                    <p className="text-lg font-black text-gray-800">Rp {currentUser?.points ?? 0}</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                    <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Undangan</p>
                    <p className="text-lg font-black text-gray-800">{currentUser?.invitedCount ?? 0}</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center">
                    <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Total</p>
                    <p className="text-lg font-black text-green-500">Rp {currentUser?.totalEarnings ?? 0}</p>
                 </div>
              </div>
           </div>

           <div className="px-6 space-y-4">
              <div onClick={() => setIsWriting(true)} className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 rounded-[32px] text-white flex justify-between items-center cursor-pointer shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/20 rounded-[20px] flex items-center justify-center backdrop-blur-md shadow-inner"><PenTool className="w-7 h-7" /></div>
                    <div>
                       <h4 className="font-black text-base uppercase tracking-tighter">Pusat Penulis</h4>
                       <p className="text-[10px] font-bold opacity-80 mt-0.5">Dapatkan Rp 5.000 Per Karya ACC</p>
                    </div>
                 </div>
                 <ChevronRight className="w-6 h-6 opacity-50" />
              </div>

              <div className="space-y-1 pt-6">
                 <div className="flex justify-between items-center p-6 hover:bg-gray-50 rounded-[24px] transition-all cursor-pointer group">
                    <div className="flex items-center gap-5 text-gray-400 group-hover:text-gray-800 transition-all"><Wallet className="w-6 h-6" /><span className="text-sm font-black uppercase tracking-widest">Riwayat Penarikan</span></div>
                    <ChevronRight className="w-5 h-5 text-gray-200" />
                 </div>
                 <div onClick={() => { setCurrentUser(null); setIsAuthenticated(false); }} className="flex justify-between items-center p-6 hover:bg-red-50 rounded-[24px] transition-all cursor-pointer group">
                    <div className="flex items-center gap-5 text-red-300 group-hover:text-red-500 transition-all"><LogOut className="w-6 h-6" /><span className="text-sm font-black uppercase tracking-widest">Keluar Akun</span></div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'admin' && (
        <div className="pb-24">
           <div className="px-6 pt-12 mb-10 flex justify-between items-center">
              <div>
                 <h2 className="text-3xl font-black text-gray-800 tracking-tighter uppercase">Boss Chen</h2>
                 <p className="text-[10px] font-bold text-[#FF5A5F] uppercase tracking-[4px]">Control Center</p>
              </div>
              <ShieldCheck className="w-10 h-10 text-[#FF5A5F]" />
           </div>
           
           <div className="flex px-6 gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
              {['wd', 'novels', 'users'].map(t => (
                <button key={t} onClick={() => setAdminSubTab(t as any)} className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${adminSubTab === t ? 'bg-[#FF5A5F] text-white shadow-2xl shadow-[#FF5A5F]/30 scale-105' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                   {t === 'wd' ? 'Antrean WD' : t === 'novels' ? 'Review Karya' : 'Update Poin'}
                </button>
              ))}
           </div>

           <div className="px-6 space-y-6">
              {adminSubTab === 'wd' && allWithdrawals.map(wd => (
                <div key={wd.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                   <div className="flex justify-between mb-8">
                      <div>
                        <p className="font-black text-base text-gray-800 uppercase tracking-tighter">{wd.username}</p>
                        <p className="text-[10px] text-[#FF5A5F] font-black mt-1 uppercase tracking-widest">{wd.method} • {wd.phoneNumber}</p>
                      </div>
                      <p className="font-black text-gray-900 text-2xl tracking-tighter">Rp {wd.amount}</p>
                   </div>
                   {wd.status === 'Pending' ? (
                     <div className="flex gap-4">
                        <button onClick={() => adminHandleWD(wd.id, 'Rejected')} className="flex-1 py-4 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Tolak</button>
                        <button onClick={() => adminHandleWD(wd.id, 'Approved')} className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Bayar Sekarang</button>
                     </div>
                   ) : (
                     <div className={`text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-[5px] ${wd.status === 'Approved' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>{wd.status}</div>
                   )}
                </div>
              ))}

              {adminSubTab === 'users' && allUsers.filter(u => !u.isAdmin).map(user => (
                 <div key={user.id} className="bg-white p-6 rounded-[28px] border border-gray-100 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="font-black text-sm text-gray-800 uppercase tracking-tighter">{user.username}</p>
                      <p className="text-[9px] text-gray-400 font-bold tracking-widest">SALDO: Rp {user.points ?? 0}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                       <span className="text-[10px] font-black text-gray-300">Rp</span>
                       <input type="number" defaultValue={user.points} onBlur={(e) => adminUpdateUserPoints(user.id, parseInt(e.target.value) || 0)} className="w-16 bg-transparent outline-none font-black text-xs text-center text-[#FF5A5F]" />
                       <Save className="w-5 h-5 text-gray-300 cursor-pointer hover:text-[#FF5A5F] transition-all" />
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-xl border-t border-gray-50 flex justify-around py-5 z-[100] rounded-t-[32px] shadow-2xl">
        {[
          { id: 'library', icon: Library, label: 'Rak' },
          { id: 'home', icon: Compass, label: 'Home' },
          { id: 'rewards', icon: Gift, label: 'Hadiah' },
          { id: 'profile', icon: User, label: 'Profil' },
          ...(currentUser?.isAdmin ? [{ id: 'admin', icon: ShieldCheck, label: 'Boss' }] : [])
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex flex-col items-center gap-1.5 transition-all relative ${activeTab === item.id ? 'text-[#FF5A5F] scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
            <item.icon className="w-6 h-6" strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
            {activeTab === item.id && <div className="absolute -bottom-2 w-1 h-1 bg-[#FF5A5F] rounded-full"></div>}
          </button>
        ))}
      </div>

      {/* WRITING OVERLAY */}
      {isWriting && (
        <div className="fixed inset-0 bg-white z-[300] flex flex-col animate-slide-up max-w-[480px] mx-auto">
           <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <button onClick={() => setIsWriting(false)} className="p-3 bg-gray-50 rounded-2xl"><X className="w-7 h-7 text-gray-400" /></button>
              <h3 className="font-black text-gray-800 text-xl tracking-tighter uppercase">Publikasikan Karya</h3>
              <div className="w-12"></div>
           </div>
           <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              submitUserNovel(Object.fromEntries(fd));
           }} className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Judul Novel</p>
                 <input name="title" required placeholder="Contoh: Cinta di Antara Bintang" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-black outline-none focus:ring-4 focus:ring-[#FF5A5F]/10 focus:border-[#FF5A5F] transition-all" />
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Bab 1: Judul</p>
                 <input name="chapterTitle" required placeholder="Contoh: Awal yang Baru" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-bold outline-none focus:ring-4 focus:ring-[#FF5A5F]/10 focus:border-[#FF5A5F] transition-all" />
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Sinopsis</p>
                 <textarea name="summary" required rows={4} placeholder="Tarik pembaca dengan ringkasan ceritamu..." className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 outline-none text-sm font-medium focus:ring-4 focus:ring-[#FF5A5F]/10 focus:border-[#FF5A5F] transition-all"></textarea>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Isi Cerita (Bab 1)</p>
                 <textarea name="content" required rows={16} placeholder="Mulailah petualangan ceritamu di sini..." className="w-full bg-gray-50 p-8 rounded-[32px] border border-gray-100 outline-none text-sm font-medium leading-relaxed focus:ring-4 focus:ring-[#FF5A5F]/10 focus:border-[#FF5A5F] transition-all"></textarea>
              </div>
              <button className="w-full bg-gray-900 text-white py-7 rounded-[28px] font-black shadow-2xl uppercase tracking-[4px] active:scale-95 transition-all">Kirim ke Boss Chen</button>
              <div className="h-20"></div>
           </form>
        </div>
      )}

      {/* DETAIL NOVEL & READER */}
      {selectedNovel && (
        <div className="fixed inset-0 bg-white z-[200] overflow-y-auto max-w-[480px] mx-auto animate-slide-up">
           <div className="relative h-[360px]">
              <img src={selectedNovel.cover} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              <button onClick={() => setSelectedNovel(null)} className="absolute top-10 left-6 p-4 bg-white/20 backdrop-blur-2xl rounded-3xl text-white shadow-2xl border border-white/20"><ChevronLeft className="w-7 h-7" /></button>
           </div>
           <div className="px-6 -mt-20 relative z-10 pb-24">
              <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-50">
                 <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-black text-gray-800 flex-1 leading-tight tracking-tighter uppercase">{selectedNovel.title}</h2>
                    <div className="bg-orange-50 px-4 py-2 rounded-2xl flex items-center gap-2 border border-orange-100"><Star className="w-5 h-5 text-orange-500 fill-orange-500" /><span className="text-sm font-black text-orange-600">{selectedNovel.rating}</span></div>
                 </div>
                 <p className="text-[#FF5A5F] font-black text-[10px] uppercase tracking-[5px] mb-10 border-l-4 border-[#FF5A5F] pl-4">{selectedNovel.author}</p>
                 <div className="grid grid-cols-3 gap-4 mb-12">
                    <div className="text-center py-5 bg-gray-50 rounded-3xl border border-gray-100"><p className="text-[8px] font-black text-gray-300 uppercase mb-2 tracking-widest">Status</p><p className="text-[10px] font-black uppercase">{selectedNovel.status}</p></div>
                    <div className="text-center py-5 bg-gray-50 rounded-3xl border border-gray-100"><p className="text-[8px] font-black text-gray-300 uppercase mb-2 tracking-widest">Views</p><p className="text-[10px] font-black uppercase">{selectedNovel.views}</p></div>
                    <div className="text-center py-5 bg-gray-50 rounded-3xl border border-gray-100"><p className="text-[8px] font-black text-gray-300 uppercase mb-2 tracking-widest">Genre</p><p className="text-[10px] font-black uppercase">{selectedNovel.category}</p></div>
                 </div>
                 <p className="text-gray-400 text-sm mb-12 leading-[1.8] font-medium italic">"{selectedNovel.summary}"</p>
                 <button onClick={() => setReadingChapter({ novel: selectedNovel, chapter: selectedNovel.chapters[0] })} className="w-full bg-[#FF5A5F] text-white py-6 rounded-[28px] font-black shadow-2xl shadow-[#FF5A5F]/30 active:scale-95 transition-all uppercase tracking-[4px]">BACA SEKARANG</button>
              </div>
           </div>
        </div>
      )}

      {readingChapter && (
        <div className="fixed inset-0 bg-white z-[210] flex flex-col max-w-[480px] mx-auto animate-slide-up">
           <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <button onClick={() => setReadingChapter(null)} className="p-3 bg-gray-50 rounded-2xl"><ChevronLeft className="w-6 h-6 text-gray-400" /></button>
              <div className="text-center">
                 <p className="text-[8px] font-black text-[#FF5A5F] uppercase tracking-[4px] mb-0.5">{readingChapter.novel.title}</p>
                 <p className="font-black text-xs uppercase tracking-tighter line-clamp-1">{readingChapter.chapter.title}</p>
              </div>
              <div className="flex items-center gap-3 bg-orange-50 px-4 py-2.5 rounded-full border border-orange-100">
                 <Clock className="w-5 h-5 text-orange-500 animate-pulse" />
                 <span className="text-[10px] font-black text-orange-600">{(currentUser?.readingTimeToday ?? 0) % 60}s</span>
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-10 serif-font leading-[2.6] text-xl text-gray-800 no-scrollbar select-none bg-[#FCFAF5]">
              <div className="whitespace-pre-line text-justify">{readingChapter.chapter.content}</div>
              <div className="py-24 flex flex-col items-center">
                <div className="w-20 h-1 bg-gray-200 rounded-full mb-6"></div>
                <p className="text-gray-300 text-[10px] font-black uppercase tracking-[5px]">-- Bab Selesai --</p>
              </div>
           </div>
        </div>
      )}

      {/* WITHDRAWAL OVERLAY */}
      {isWithdrawing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[400] flex items-end">
           <div className="bg-white w-full max-w-[480px] rounded-t-[60px] p-12 mx-auto animate-slide-up shadow-2xl">
              <div className="w-20 h-2 bg-gray-100 rounded-full mx-auto mb-12"></div>
              <h3 className="text-4xl font-black mb-10 text-gray-800 tracking-tighter uppercase text-center">Tarik Saldo</h3>
              <div className="space-y-8">
                 <div className="grid grid-cols-3 gap-4">
                   {['DANA', 'OVO', 'GOPAY'].map(m => (
                     <button key={m} className="py-6 border-2 border-[#FF5A5F] rounded-3xl font-black text-[#FF5A5F] bg-[#FF5A5F]/5 text-[10px] hover:bg-[#FF5A5F] hover:text-white transition-all uppercase tracking-[3px]">{m}</button>
                   ))}
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nomor Telepon</p>
                    <input type="number" placeholder="08XXXXXXXXXX" className="w-full bg-gray-50 p-6 rounded-[24px] border border-gray-100 font-black outline-none focus:ring-4 focus:ring-[#FF5A5F]/10 focus:border-[#FF5A5F] transition-all" />
                 </div>
                 <button onClick={() => requestWD('DANA', '08XX')} className="w-full bg-gray-900 text-white py-7 rounded-[28px] font-black shadow-2xl uppercase tracking-[4px] active:scale-95 transition-all">Klaim Rp 500 Sekarang</button>
                 <button onClick={() => setIsWithdrawing(false)} className="w-full text-gray-300 font-black uppercase text-[10px] pt-6 text-center tracking-[8px]">Tutup</button>
              </div>
           </div>
        </div>
      )}

      {/* NOTIFICATION TOAST */}
      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[4px] z-[600] shadow-2xl flex items-center gap-6 animate-bounce border border-white/10">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><Check className="w-4 h-4 text-white" /></div>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .serif-font { font-family: 'Merriweather', serif; }
      `}</style>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
