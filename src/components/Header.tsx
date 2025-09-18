import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchNewsMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('fetch-news');
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message || "News fetched successfully!",
      });
      window.location.reload();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch news",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsRefreshing(false);
    }
  });

  const handleFetchNews = () => {
    setIsRefreshing(true);
    fetchNewsMutation.mutate();
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            PulseIndia
          </Link>
          
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
          </nav>

          <Button
            onClick={handleFetchNews}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            size="icon"
            title={isRefreshing ? 'Fetching...' : 'Fetch News'}
            >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </header>
  );
};
