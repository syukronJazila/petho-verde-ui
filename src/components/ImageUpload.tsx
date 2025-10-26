import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (file: File | null, preview: string) => void;
  required?: boolean;
}

export function ImageUpload({ label, value, onChange, required = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔧 Update preview kalau value berubah dari luar (misalnya URL dari database)
  useEffect(() => {
    if (value) {
      if (value.startsWith("http") || value.startsWith("data:image")) {
        setPreview(value);
      }
    } else {
      setPreview("");
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar");
        return;
      }

      // Validasi ukuran
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange(null, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Card>
        <CardContent className="pt-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-auto max-w-full h-auto object-contain mx-auto rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Klik untuk upload gambar atau drag & drop
              </p>
              <Button type="button" variant="secondary">
                Pilih Gambar
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required={required && !preview}
          />
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Ukuran maksimal: 5MB. Format: JPG, PNG, WEBP.
      </p>
    </div>
  );
}
