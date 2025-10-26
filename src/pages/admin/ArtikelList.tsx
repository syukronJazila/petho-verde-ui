import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/utils/config";


type Artikel = {
  id: number;
  judul: string;
  author: string;
  kategori: string;
  tags: string[];
  tanggal: string;
  waktu_baca: string;
  image: string;
};

export default function ArtikelList() {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  // 🔹 Ambil data artikel
  const fetchArtikel = async () => {
    try {
      const res = await fetch(`${BASE_URL}artikelList.php`);
      const result = await res.json();
      if (!result.error) setArtikelList(result);
      else toast({ title: "Error", description: result.message });
      console.log(result);

    } catch {
      toast({ title: "Error", description: "Gagal mengambil data artikel." });
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const filteredList = artikelList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.judul.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.kategori.toLowerCase().includes(query) 
    );
  });

  // 🔹 Hapus artikel
  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      const res = await fetch(`${BASE_URL}artikelDelete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      const result = await res.json();

      toast({
        title: result.error ? "Gagal" : "Berhasil",
        description: result.message,
      });

      if (!result.error) {
        setArtikelList(artikelList.filter((item) => item.id !== deleteId));
      }
    } catch(err) {
      console.log(err)
      toast({ title: "Error", description: "Gagal menghapus artikel." });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Artikel Management</h1>
          <p className="text-muted-foreground mt-1">
            Kelola artikel dan konten edukasi
          </p>
        </div>
        <Link to="/admin/artikel/baru">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Artikel
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari artikel, author, atau kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* List */}
      {filteredList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground">Tidak ada artikel ditemukan.</p>
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
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {item.judul}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{item.kategori}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Author:</strong> {item.author}</p>
                  <p><strong>Tanggal:</strong> {new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
                  <p><strong>Waktu Baca:</strong> {item.waktu_baca}</p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Link to={`/admin/artikel/${item.id}/edit`} className="flex-1">
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
            <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus permanen.
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
