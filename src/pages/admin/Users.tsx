import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} 
from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/config";

type UserType = {
  id: number;
  nama: string;
  email: string;
  role: "admin" | "editor";
};

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: "editor" as "admin" | "editor"
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 🔹 Ambil data user dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}userList.php`);
        const data = await res.json();
      
        if (!data.error) {
          setUsers(data.data);
        } else {
          toast.error("Gagal mengambil data user");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error( "Tidak dapat terhubung ke server.");
      }
    };
  
    fetchUsers();
  }, []);


  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ nama: "", email: "", password: "", role: "editor" });
    setIsDialogOpen(true);
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setFormData({
      nama: user.nama,
      email: user.email,
      password: "",
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nama || !formData.email) {
      toast.error("Nama dan email wajib diisi");
      return;
    }

    if (!editingUser && !formData.password) {
      toast.error("Password wajib diisi untuk user baru");
      return;
    }

    const payload: any = {
      nama: formData.nama,
      email: formData.email,
      role: formData.role
    };
    if (formData.password) {
      payload.password = formData.password;
    }

    const endpoint = editingUser
      ? `${BASE_URL}userUpdate.php?id=${editingUser.id}`
      : `${BASE_URL}userCreate.php`;

    if(editingUser) console.log(editingUser.id)
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        // update state local tanpa reload penuh
        if (editingUser) {
          const updatedUser = {
            id: editingUser.id,
            nama: formData.nama,
            email: formData.email,
            role: formData.role,
          };
          setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
          setEditingUser(updatedUser); // 🔹 penting: sinkronkan editingUser juga
        } else {
          // tambahkan baru (fetch ulang atau push)
          // best: fetch ulang list
          const newUser: UserType = {
            id: result.inserted_id || Date.now(), // backend bisa return inserted id
            nama: formData.nama,
            email: formData.email,
            role: formData.role
          };
          setUsers((prev) => [...prev, newUser]);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal terhubung ke server");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      const res = await fetch(`${BASE_URL}userDelete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId })
      });
      const result = await res.json();
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus user");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Kelola akun admin dan editor</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah User
        </Button>
      </div>

      {/* Table Users */}
      <Card className="shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nama}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(user.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit User" : "Tambah User Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Nama lengkap"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
             />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password {editingUser && "(kosongi jika tidak ingin ubah)"}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value as "admin" | "editor" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>Simpan</Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi Delete Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus User?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data user akan dihapus permanen.
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
