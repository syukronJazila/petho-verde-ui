import { useEffect, useState } from "react";
import { Kontak as KontakType } from "@/lib/dummy-data"; // Pastikan tipe KontakType sudah sesuai
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } 
from "@/components/ui/alert-dialog";
import { BASE_URL } from "@/utils/config";


export default function Kontak() {
  const [messages, setMessages] = useState<KontakType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<KontakType | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);


  // 🔹 Fetch data kontak dari backend
  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const res = await fetch(`${BASE_URL}kontakList.php`);
        const data = await res.json();

        if (!data.error) {
          setMessages(
            data.data.sort((a, b) => Number(a.is_read) - Number(b.is_read))
          );
        } else {
          toast.error(data.message || "Gagal mengambil data kontak");
        }
      } catch (err) {
        toast.error("Gagal terhubung ke server");
      }
    };

    fetchKontak();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subjek.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.pesan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // 🔹 Lihat pesan & update is_read
  const handleView = async (message: KontakType) => {
    setSelectedMessage(message);
  
    if (!message.is_read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m))
      );
    
      try {
        const res = await fetch(`${BASE_URL}kontakUpdateRead.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: message.id, is_read: true }),
        });
      
        const result = await res.json();
        if (result.error) {
          toast.error(result.message || "Gagal memperbarui status pesan");
        } else {
          toast.success("Status pesan diperbarui");
        }
      } catch (err) {
        toast.error("Tidak dapat menghubungi server");
        console.error("Error updating read status:", err);
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    
    try {
      const response = await fetch(`${BASE_URL}kontakDelete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
    
      const result = await response.json();
    
      toast[result.error ? "error" : "success"](result.message);
    
      if (!result.error) {
        setMessages((prev) => prev.filter((msg) => msg.id !== deleteId));
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus pesan");
    } finally {
      setDeleteId(null);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kontak & Pesan</h1>
        <p className="text-muted-foreground mt-2">
          Kelola pesan masuk dari pengunjung website
        </p>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pesan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Belum Dibaca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sudah Dibaca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{messages.length - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Daftar Pesan */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`shadow-soft hover:shadow-medium transition-smooth cursor-pointer ${
              !message.is_read ? "border-l-4 border-l-destructive" : ""
            }`}
            onClick={() => handleView(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{message.nama_lengkap}</h3>
                    {!message.is_read && (
                      <Badge variant="destructive" className="text-xs">Baru</Badge>
                    )}
                    {message.consent && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                  <p className="font-medium text-sm mb-2">{message.subjek}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.pesan}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.tanggal).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(message);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(message.id); 
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMessages.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center text-muted-foreground">
              Tidak ada pesan ditemukan
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detail Pesan */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label>Dari</Label>
                <p className="font-medium">{selectedMessage.nama_lengkap}</p>
                <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
              </div>
              <div>
                <Label>Subjek</Label>
                <p className="font-medium">{selectedMessage.subjek}</p>
              </div>
              <div>
                <Label>Pesan</Label>
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.pesan}</p>
              </div>
              <div>
                <Label>Tanggal</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedMessage.tanggal).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 🔸 Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Pesan?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Pesan akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
