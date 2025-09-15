import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, MessageCircle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const openShare = (shareUrl: string, platform: string) => {
    if (platform === 'instagram') {
      toast({
        title: "Instagram sharing",
        description: "Please manually share the link on Instagram.",
      });
      return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Share this article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare(shareLinks.facebook, 'facebook')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare(shareLinks.whatsapp, 'whatsapp')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShare(shareLinks.instagram, 'instagram')}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy URL"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};