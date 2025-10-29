import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { ArrayEditor } from "@/components/ArrayEditor";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_URL } from "@/utils/config";

export default function TanamanForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [kategoriList, setKategoriList] = useState<{ id: string; nama: string }[]>([]);
  const [formData, setFormData] = useState({
    nama: "",
    nama_latin: "",
    image: "",
    kategori_id: "",
    fakta_singkat: { air: "", cahaya: "", iklim: "", panen: "" },
    deskripsi: "",
    manfaat: [] as string[],
    referensi: [] as string[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // 1) fetch kategori sekali
  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}kategoriList.php`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.error && Array.isArray(data.kategori)) {
          setKategoriList(data.kategori.map((k: any) => ({ ...k, id: k.id?.toString?.() ?? String(k.id) })));
        } else {
          toast.error("Gagal memuat daftar kategori");
        }
      })
      .catch(() => !cancelled && toast.error("Gagal memuat kategori dari server"));
    
    return () => {
      cancelled = true;
    };
  }, []);
  
  // 2) fetch detail hanya setelah kategoriList tersedia
  useEffect(() => {
    if (!isEdit) return;
    if (kategoriList.length === 0) return; // tunggu daftar kategori
  
    fetch(`${BASE_URL}tanamanDetail.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.message || "Gagal memuat data tanaman");
          return;
        }
      
        const imageUrl = data.image?.startsWith("http") ? data.image : `${BASE_URL}${data.image}`;
        const kategoriIdStr = data.kategori_id ? data.kategori_id.toString() : "";
        const validKategori = kategoriList.some((k) => k.id === kategoriIdStr);
      
        setFormData({
          nama: data.nama || "",
          nama_latin: data.nama_latin || "",
          image: imageUrl || "",
          kategori_id: validKategori ? kategoriIdStr : "",
          fakta_singkat: data.fakta_singkat || { air: "", cahaya: "", iklim: "", panen: "" },
          deskripsi: data.deskripsi || "",
          manfaat: data.manfaat || [],
          referensi: data.referensi || [],
        });
      })
      .catch(() => toast.error("Gagal mengambil data tanaman dari server"));
  }, [isEdit, id, kategoriList]);



  const handleImageChange = (file: File | null, preview: string) => {
    setImageFile(file);
    setFormData((prev) => ({ ...prev, image: preview }));
  };

  // 🔹 Simpan / Update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ✅ Validasi wajib
    if (!formData.nama.trim() || !formData.nama_latin.trim() || !formData.kategori_id) {
      toast.error("Nama, Nama Latin, dan Kategori wajib diisi");
      return;
    }

    const submitData = new FormData();
    submitData.append("nama", formData.nama.trim());
    submitData.append("nama_latin", formData.nama_latin.trim());
    submitData.append("kategori_id", formData.kategori_id);
    submitData.append("_fakta_singkat", JSON.stringify(formData.fakta_singkat));
    submitData.append("deskripsi", formData.deskripsi.trim());
    formData.manfaat.forEach((item) => submitData.append("manfaat[]", item));
    formData.referensi.forEach((item) => submitData.append("referensi[]", item));

    if (imageFile) {
      submitData.append("image", imageFile);
    } else {
      submitData.append("image", formData.image);
    }

    const endpoint = isEdit
      ? `${BASE_URL}tanamanUpdate.php?id=${id}`
      : `${BASE_URL}tanamanCreate.php`;

    try {
      const res = await fetch(endpoint, { method: "POST", body: submitData });
      const result = await res.json();

      if (result.error) toast.error(result.message);
      else {
        toast.success(result.message);
        setTimeout(() => navigate("/admin/tanaman"), 1200);
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim data ke server");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/tanaman")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Tanaman" : "Tambah Tanaman Baru"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit
              ? "Perbarui informasi tanaman herbal"
              : "Tambahkan tanaman herbal ke database"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Informasi Tanaman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nama & Latin */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama Tanaman <span className="text-destructive">*</span></Label>
                <Input
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="contoh: Lidah Buaya"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Nama Latin <span className="text-destructive">*</span></Label>
                <Input
                  value={formData.nama_latin}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_latin: e.target.value })
                  }
                  placeholder="contoh: Aloe vera"
                  required
                />
              </div>
            </div>

            {/* Kategori Dropdown */}
            <div className="space-y-2">
              <Label>
                Kategori <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.kategori_id}
                onValueChange={(val) => setFormData({ ...formData, kategori_id: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriList.length > 0 ? (
                    kategoriList.map((kategori) => (
                      <SelectItem key={kategori.id} value={kategori.id.toString()}>
                        {kategori.nama}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="none">
                      Memuat kategori...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>


            {/* Upload Gambar */}
            <ImageUpload
              label="Gambar Tanaman"
              value={formData.image}
              onChange={handleImageChange}
              required
            />

            {/* Fakta Singkat */}
            <div className="space-y-2">
              <Label>Fakta Singkat</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {(["air", "cahaya", "iklim", "panen"] as const).map((key) => (
                  <div key={key}>
                    <Label className="capitalize">{key}</Label>
                    <Input
                      value={formData.fakta_singkat[key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fakta_singkat: {
                            ...formData.fakta_singkat,
                            [key]: e.target.value,
                          },
                        })
                      }
                      placeholder={`Masukkan ${key}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                placeholder="Deskripsi singkat tentang tanaman..."
                rows={4}
              />
            </div>

            {/* Manfaat */}
            <ArrayEditor
              label="Manfaat"
              value={formData.manfaat}
              onChange={(value) => setFormData({ ...formData, manfaat: value })}
              placeholder="Ketik manfaat dan tekan Enter"
            />

            {/* Referensi */}
            <ArrayEditor
              label="Referensi"
              value={formData.referensi}
              onChange={(value) => setFormData({ ...formData, referensi: value })}
              placeholder="Ketik sumber referensi dan tekan Enter"
            />

            {/* Tombol Aksi */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                {isEdit ? "Update" : "Simpan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/tanaman")}
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
