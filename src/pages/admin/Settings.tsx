import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/utils/auth";

export default function Settings() {
  const navigate = useNavigate();
   const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Konfirmasi Logout",
      description: "Apakah Anda yakin ingin keluar dari akun ini?",
      action: (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              logout();

              toast({
                title: "Logout berhasil",
                description: "Anda telah keluar dari akun.",
              });

              // Redirect ke halaman login setelah delay
              setTimeout(() => {
                navigate("/admin");
              }, 500);
            }}
          >
            Ya, Logout
          </Button>
          <Button
            size="sm"
            variant="outline"
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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Pengaturan sistem dan preferensi
        </p>
      </div>

      {/* App Info */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Informasi Aplikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nama Aplikasi</span>
            <span className="font-medium">PETHOFAR Admin Panel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versi</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Environment</span>
            <span className="font-medium">Development</span>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Logout</p>
              <p className="text-sm text-muted-foreground">Keluar dari sesi admin</p>
            </div>
            <Button variant="destructive" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
