import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLANTS, ARTICLES, CONTACTS } from "@/lib/dummy-data"; // masih bisa untuk recent preview
import { Leaf, FileText, Sprout, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/config";


export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPlants: 0,
    totalArticles: 0,
    totalBudidaya: 0,
    unreadMessages: 0,
  });

  // 🔹 Ambil data statistik dari backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}dashboardStats.php`);
        const data = await res.json();
        if (!data.error) {
          setStats(data.data);
        } else {
          toast.error(data.message || "Gagal mengambil statistik");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        toast.error("Gagal terhubung ke server");
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      title: "Total Tanaman",
      value: stats.totalPlants,
      icon: Leaf,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Artikel",
      value: stats.totalArticles,
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Budidaya",
      value: stats.totalBudidaya,
      icon: Sprout,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Pesan Baru",
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  const recentPlants = PLANTS.slice(0, 3);
  const recentArticles = ARTICLES.slice(0, 3);
  const recentMessages = CONTACTS.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di admin panel PETHOFAR
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link to="/admin/tanaman/baru">
              <Plus className="h-4 w-4" />
              Tambah Tanaman
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/admin/artikel/baru">
              <Plus className="h-4 w-4" />
              Tulis Artikel
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/admin/budidaya/baru">
              <Plus className="h-4 w-4" />
              Tambah Budidaya
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/admin/kontak">
              <MessageSquare className="h-4 w-4" />
              Lihat Pesan
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
