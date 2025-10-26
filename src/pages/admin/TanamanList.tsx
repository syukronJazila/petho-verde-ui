import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Trash2, Edit, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,} 
from "@/components/ui/alert-dialog";
import { BASE_URL } from "@/utils/config";

export default function TanamanList() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Ambil data dari API
  const fetchPlants = async () => {
    try {
      const res = await fetch(`${BASE_URL}tanamanList.php`);
      const data = await res.json();
      if (!data.error) setPlants(data.data);
      else toast({ title: "Error", description: data.message });
    } catch (err) {
      toast({ title: "Gagal", description: "Tidak dapat mengambil data tanaman." });
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 🔹 Hapus tanaman
  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      const res = await fetch(`${BASE_URL}tanamanDelete.php`, {
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
        // Hapus dari state tanpa reload
        setPlants(plants.filter((p) => p.id !== deleteId));
      }
    } catch (err) {
      toast({ title: "Error", description: "Gagal menghapus tanaman." });
    } finally {
      setDeleteId(null); // Tutup dialog
    }
  };


  // 🔹 Filter tanaman
  const filteredPlants = plants.filter(
    (plant) =>
      plant.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plant.kategori ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tanaman</h1>
          <p className="text-muted-foreground mt-1">
            Kelola database tanaman herbal
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/tanaman/baru">
            <Plus className="h-4 w-4" />
            Tambah Tanaman
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, nama latin, atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="shadow-soft hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Gambar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Nama Latin</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>
                  <img
                    src={plant.image}
                    alt={plant.nama}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{plant.nama}</TableCell>
                <TableCell className="italic text-muted-foreground">
                  {plant.nama_latin}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{plant.kategori}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(plant.created_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/tanaman/${plant.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(plant.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredPlants.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Tidak ada tanaman ditemukan
          </div>
        )}
      </Card>

      {/* Mobile Card Grid */}
      <div className="grid gap-4 md:hidden">
        {filteredPlants.map((plant) => (
          <Card key={plant.id} className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={plant.image}
                  alt={plant.nama}
                  className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{plant.nama}</h3>
                  <p className="text-sm text-muted-foreground italic truncate">
                    {plant.nama_latin}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {plant.kategori}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {/* <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/tanaman/${plant.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Lihat
                  </Link>
                </Button> */}
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/admin/tanaman/${plant.id}/edit`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(plant.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPlants.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center text-muted-foreground">
              Tidak ada tanaman ditemukan
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Tanaman?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data tanaman akan dihapus permanen.
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
