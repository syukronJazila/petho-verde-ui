import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Leaf,
  Sprout,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

interface AdminSidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Tanaman", href: "/admin/tanaman", icon: Leaf },
  { name: "Budidaya", href: "/admin/budidaya", icon: Sprout },
  { name: "Artikel", href: "/admin/artikel", icon: FileText },
  { name: "Kontak", href: "/admin/kontak", icon: MessageSquare },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserEmail(user.email || "");
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    toast({
      title: "Konfirmasi Logout",
      description: "Apakah Anda yakin ingin keluar dari akun ini?",
      action: (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {
              logout();
              toast({
                title: "Logout berhasil",
                description: "Anda telah keluar dari akun.",
              });
              setTimeout(() => navigate("/admin"), 500);
            }}
          >
            Ya, Logout
          </Button>
          <Button
            size="sm"
            className="border border-[#90A088] text-black bg-transparent hover:bg-[#90A088] hover:text-white transition-colors duration-200"
            onClick={() => {
              toast({
                title: "Dibatalkan",
                description: "Logout dibatalkan.",
              });
            }}
          >
            Batal
          </Button>

        </div>
      ),
    });
  };

  return (
    <>
      {/* Tombol menu mobile */}
      <Button
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-[#90A088] text-white hover:bg-[#7A8D73]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar utama */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 flex flex-col shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
        style={{
          backgroundColor: "#18221B", // Forest Green
          color: "#FFFFFF",
          boxShadow: "0 8px 24px -6px rgba(61, 89, 65, 0.3)",
        }}
      >
        {/* Logo */}
        <div
          className="flex h-16 items-center justify-center border-b px-6"
          style={{ borderColor: "#243226" }}
        >
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-[#90A088]" />
            <span className="text-2xl font-bold tracking-tight">PETHOFAR</span>
          </div>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#90A088] text-[#18221B]"
                    : "text-white/80 hover:bg-[#243226] hover:text-white"
                )
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bagian User */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "#243226", backgroundColor: "#1E2A21" }}
        >
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#90A088] text-[#18221B] font-semibold">
              USR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">User</p>
              <p className="text-xs text-white/60 truncate">
                {userEmail || "Tidak ada user"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#243226]"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
