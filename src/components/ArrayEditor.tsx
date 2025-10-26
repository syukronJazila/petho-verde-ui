import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ArrayEditorProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function ArrayEditor({ label, value, onChange, placeholder }: ArrayEditorProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder || "Ketik dan tekan Enter"}
        />
        <Button type="button" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" /> Tambah
        </Button>
      </div>

      {/* Daftar item */}
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
          >
            {item}
            <button
              type="button"
              className="ml-2 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemove(item)}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
