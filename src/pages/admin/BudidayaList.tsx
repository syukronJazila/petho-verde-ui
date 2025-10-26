import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,} 
from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/utils/config";


export default function BudidayaList() {
  const [budidayaList, setBudidayaList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch semua data dari API
  useEffect(() => {
    fetch(`${BASE_URL}budidayaList.php`)
      .then((res) => res.json())
      .then((data) => setBudidayaList(data))
      .catch(() => toast({ title: "Error", description: "Gagal mengambil data budidaya" }));
  }, []);

  const filteredList = budidayaList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.judul.toLowerCase().includes(query) ||
      item.kategori.toLowerCase().includes(query) ||
      item.nama_tanaman.toLowerCase().includes(query)
    );
  });

  // Hapus data budidaya
  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      const res = await fetch(`${BASE_URL}budidayaDelete.php?id=${deleteId}`, {
        method: "POST",
      });
      const result = await res.json();
      if (result.error) {
        toast({ title: "Gagal", description: result.message });
      } else {
        setBudidayaList(budidayaList.filter((item) => item.id !== deleteId));
        toast({ title: "Berhasil", description: "Data budidaya telah dihapus" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Gagal menghapus data budidaya" });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budidaya Management</h1>
          <p className="text-muted-foreground mt-1">
            Kelola panduan budidaya tanaman herbal
          </p>
        </div>
        <Link to="/admin/budidaya/baru">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Budidaya
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari budidaya..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* List */}
      {filteredList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground">Tidak ada data budidaya ditemukan.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.judul}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.judul}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{item.kategori}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.kutipan}</p>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p><strong>Tanaman:</strong> {item.nama_tanaman}</p>
                  <p><strong>Waktu Tanam:</strong> {item.waktu_tanam}</p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Link to={`/admin/budidaya/${item.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDeleteId(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Budidaya?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data budidaya akan dihapus permanen.
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
