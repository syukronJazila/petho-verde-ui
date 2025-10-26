import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { useToast } from "@/hooks/use-toast";    
import { BASE_URL } from "@/utils/config";

const budidayaSchema = z.object({
  judul: z.string().min(1, "Judul harus diisi"),
  image: z.string().min(1, "Gambar harus diupload"),
  kategori: z.string().min(1, "Kategori harus diisi"),
  nama_tanaman: z.string().min(1, "Nama tanaman harus diisi"),
  type: z.string().min(1, "Tipe harus diisi"),
  waktu_tanam: z.string().min(1, "Waktu tanam harus diisi"),
  kutipan: z.string().min(1, "Kutipan harus diisi"),
  cara_tanam: z.string().min(1, "Cara tanam harus diisi"),
  perawatan: z.string().min(1, "Perawatan harus diisi"),
  pupuk: z.string().min(1, "Pupuk harus diisi"),
    penyiraman: z.string().min(1, "Penyiraman harus diisi"),
    hama: z.string().min(1, "Hama harus diisi"),
  });

  type BudidayaFormData = z.infer<typeof budidayaSchema>;

export default function BudidayaForm() {
    const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [formData, setFormData] = useState<BudidayaFormData>({
    judul: "",
    image: "",
    kategori: "",
    nama_tanaman: "",
    type: "",
    waktu_tanam: "",
    kutipan: "",
    cara_tanam: "",
    perawatan: "",
    pupuk: "",
    penyiraman: "",
    hama: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Ambil data lama dari backend saat edit
  useEffect(() => {
    if (isEdit && id) {
      fetch(`${BASE_URL}budidayaDetail.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast({ title: "Error", description: data.message });
            return;
          }

          setFormData({
            judul: data.judul || "",
            image: data.image,
            kategori: data.kategori || "",
            nama_tanaman: data.nama_tanaman || "",
            type: data.type || "",
            waktu_tanam: data.waktu_tanam || "",
            kutipan: data.kutipan || "",
            cara_tanam: data.cara_tanam || "",
            perawatan: data.perawatan || "",
            pupuk: data.pupuk || "",
            penyiraman: data.penyiraman || "",
            hama: data.hama || "",
          });
        })
        .catch((err) => {
          toast({ title: "Error", description: "Gagal mengambil data" });
        }
      );
    }
  }, [id, isEdit, toast]);

  const handleImageChange = (file: File | null, preview: string) => {
    setImageFile(file);
    setFormData({ ...formData, image: preview });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // validasi minimal
    if (!formData.judul.trim() || !formData.nama_tanaman.trim()) {
      toast({ title: "Error", description: "Judul dan nama tanaman wajib diisi" });
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, val]) => submitData.append(key, val));

    if (imageFile) submitData.append("image", imageFile);

    const endpoint = isEdit
      ? `${BASE_URL}budidayaUpdate.php?id=${id}`
      : `${BASE_URL}budidayaCreate.php`;

    try {
      const res = await fetch(endpoint, { method: "POST", body: submitData });
      const result = await res.json();

      if (result.error) toast({ title: "Gagal", description: result.message });
      else {
        toast({ title: "Sukses", description: result.message });
        navigate("/admin/budidaya");
      }
    } catch(err) {
      console.log(err)
      toast({ title: "Error", description: "Gagal mengirim data ke server" });
    }
  };


  return (
    <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => navigate("/admin/budidaya")}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold">{isEdit ? "Edit Budidaya" : "Tambah Budidaya"}</h1>
        <p className="text-muted-foreground mt-1">
          {isEdit ? "Update informasi budidaya" : "Buat panduan budidaya baru"}
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informasi Dasar */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Judul *</Label>
            <Input
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              placeholder="Contoh: Menanam Jahe Merah di Pot"
              required
            />
          </div>

          <div>
            <ImageUpload
              label="Gambar Thumbnail *"
              value={formData.image}
              onChange={(file, preview) => handleImageChange(file, preview)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Kategori *</Label>
              <Input
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                placeholder="Contoh: Rimpang"
                required
              />
            </div>
            <div>
              <Label>Nama Tanaman *</Label>
              <Input
                value={formData.nama_tanaman}
                onChange={(e) => setFormData({ ...formData, nama_tanaman: e.target.value })}
                placeholder="Contoh: Jahe Merah"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Tipe Budidaya *</Label>
              <Input
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Contoh: Pot/Kontainer"
                required
              />
            </div>
            <div>
              <Label>Waktu Tanam *</Label>
              <Input
                value={formData.waktu_tanam}
                onChange={(e) => setFormData({ ...formData, waktu_tanam: e.target.value })}
                placeholder="Contoh: Awal Musim Hujan"
                required
              />
            </div>
          </div>

          <div>
            <Label>Kutipan *</Label>
            <Input
              value={formData.kutipan}
              onChange={(e) => setFormData({ ...formData, kutipan: e.target.value })}
              placeholder="Kutipan singkat..."
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Panduan Budidaya */}
      <Card>
        <CardHeader>
          <CardTitle>Panduan Budidaya</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "cara_tanam", label: "Cara Tanam *" },
            { name: "perawatan", label: "Perawatan *" },
            { name: "pupuk", label: "Pupuk *" },
            { name: "penyiraman", label: "Penyiraman *" },
            { name: "hama", label: "Hama & Penyakit *" },
          ].map((field) => (
            <div key={field.name}>
              <Label>{field.label}</Label>
              <Textarea
                rows={field.name === "cara_tanam" ? 8 : 4}
                value={formData[field.name as keyof typeof formData] as string}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                placeholder={`Isi ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit">{isEdit ? "Update Budidaya" : "Simpan Budidaya"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate("/admin/budidaya")}>
          Batal
        </Button>
      </div>
    </form>
  </div>

  );
}
