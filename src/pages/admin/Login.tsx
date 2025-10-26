import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/utils/config";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(3, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${BASE_URL}login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!result.error) {
        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        if (rememberMe) localStorage.setItem("rememberMe", "true");
        toast({ title: "Login berhasil", description: "Selamat datang kembali!" });

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 250);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Login gagal",
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8ECE6] via-[#F9FAF9] to-[#E0E6E1] p-4">
      <Card className="w-full max-w-md shadow-elevated border border-[#90A088]/30">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#90A088]/10 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-[#90A088]" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-[#18221B]">
              PETHOFAR Admin
            </CardTitle>
            <CardDescription className="mt-2 text-[#546054]">
              Masuk ke dashboard admin panel
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#18221B]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@pethofar.com"
                {...register("email")}
                disabled={isSubmitting}
                className="border-[#90A088]/40 focus:ring-[#90A088] focus:border-[#90A088]"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-[#18221B]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isSubmitting}
                className="border-[#90A088]/40 focus:ring-[#90A088] focus:border-[#90A088]"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                disabled={isSubmitting}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-[#18221B]/80"
              >
                Ingat saya
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-[#90A088] text-[#18221B] bg-[#90A088] hover:bg-[#808e79] transition-all duration-300 ease-in-out"
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
