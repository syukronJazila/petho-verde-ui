import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import { BASE_URL } from "@/utils/config";


export default function ArtikelForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    judul: "",
    author: "",
    tanggal: "",
    waktu_baca: "",
    kategori: "",
    image: "",
    konten: "",
    tags: [] as string[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // === Ambil data kalau edit ===
  useEffect(() => {
    if (isEdit) {
      fetch(`${BASE_URL}artikelDetail.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast({ title: "Error", description: data.message });
            return;
          }

          const imageUrl = data.image?.startsWith("http")
            ? data.image
            : `${BASE_URL}uploads/${data.image}`;

          setFormData({
            judul: data.judul || "",
            author: data.author || "",
            tanggal: data.tanggal || "",
            waktu_baca: data.waktu_baca || "",
            kategori: data.kategori || "",
            image: imageUrl || "",
            konten: data.konten || "",
            tags: data.tags
          });
        })
        .catch((err) => {
          toast({ title: "Error", description: "Gagal memuat artikel" })
          console.log(err)
        }
      );
    }
  }, [id, isEdit, toast]);

  // === Image ===
  const handleImageChange = (file: File | null, preview: string) => {
    setImageFile(file);
    setFormData({ ...formData, image: preview });
  };

  // === Tag ===
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // === Submit ===
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.judul || !formData.author || !formData.tanggal || !formData.kategori || !formData.konten) {
      toast({ title: "Gagal", description: "Semua field wajib diisi" });
      return;
    }

    const submitData = new FormData();
    submitData.append("judul", formData.judul);
    submitData.append("author", formData.author);
    submitData.append("tanggal", formData.tanggal);
    submitData.append("waktu_baca", formData.waktu_baca);
    submitData.append("kategori", formData.kategori);
    submitData.append("konten", formData.konten);
    submitData.append("tags", JSON.stringify(formData.tags));
    if (imageFile) submitData.append("image", imageFile);

    const endpoint = isEdit
      ? `${BASE_URL}artikelUpdate.php?id=${id}`
      : `${BASE_URL}artikelCreate.php`;

    try {
      const res = await fetch(endpoint, { method: "POST", body: submitData });
      console.log(res)
      const result = await res.json();

      toast({
        title: result.error ? "Gagal" : "Berhasil",
        description: result.message,
      });

      if (!result.error) setTimeout(() => navigate("/admin/artikel"), 1200);
    } catch(err) {
      console.log(err)
      toast({ title: "Error", description: "Gagal mengirim data ke server" });
    }
  };

  const sanitizedContent = DOMPurify.sanitize(formData.konten);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/artikel")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEdit ? "Edit Artikel" : "Tambah Artikel"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? "Ubah artikel yang sudah ada" : "Buat artikel baru"}
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2">
          <Eye className="h-4 w-4" /> Preview
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Judul Artikel *</Label>
              <Input
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Masukkan judul artikel"
                required
              />
            </div>

            <div>
              <ImageUpload
                label="Gambar Artikel *"
                value={formData.image}
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Author *</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Nama penulis"
                  required
                />
              </div>
              <div>
                <Label>Tanggal *</Label>
                <Input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Kategori *</Label>
                <Input
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  placeholder="Misalnya: Tips, Panduan"
                  required
                />
              </div>
              <div>
                <Label>Waktu Baca *</Label>
                <Input
                  value={formData.waktu_baca}
                  onChange={(e) => setFormData({ ...formData, waktu_baca: e.target.value })}
                  placeholder="Misalnya: 5 menit"
                  required
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Ketik tag lalu Enter"
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Tambah
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Konten */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Artikel *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <JoditEditor
                value={formData.konten}
                tabIndex={1}
                config={{
                  readonly: false,
                  minHeight: 400,
                  uploader: { insertImageAsBase64URI: true },
                  toolbarAdaptive: false,
                  placeholder: "Tulis isi artikel di sini...",
                  // Setting paste biar bisa copy-paste dengan aman
                  askBeforePasteHTML: false,
                  askBeforePasteFromWord: false,
                  defaultActionOnPaste: "insert_clear_html",
                  pasteHTMLActionList: [
                    { value: "insert_as_text", text: "Tempel sebagai teks biasa" },
                    { value: "insert_as_html", text: "Tempel sebagai HTML" },
                    { value: "insert_clear_html", text: "Tempel & bersihkan format" },
                  ],
                  enableDragAndDropFileToEditor: true
                }}
                onBlur={(newContent) => setFormData({ ...formData, konten: newContent })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit">{isEdit ? "Update Artikel" : "Publikasikan"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/artikel")}>
            Batal
          </Button>
        </div>
      </form>

      {/* Preview */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Artikel</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
