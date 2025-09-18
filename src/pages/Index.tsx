import { Header } from "@/components/Header";
import { BlogList } from "@/components/BlogList";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PulseIndia - Latest Indian News & Updates</title>
        <meta name="description" content="Stay updated with the latest Indian news, breaking stories, and current affairs. PulseIndia brings you automated news updates every 2 minutes." />
        <meta name="keywords" content="India news, breaking news, current affairs, Indian updates, latest news" />
        <meta property="og:title" content="PulseIndia - Latest Indian News & Updates" />
        <meta property="og:description" content="Stay updated with the latest Indian news, breaking stories, and current affairs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Latest India's News</h1>
                <p className="text-base lg:text-lg text-muted-foreground">
                  Stay updated with the latest breaking news and current affairs from India
                </p>
              </div>
              
              <BlogList />
            </div>
            
            <aside className="w-full lg:w-80">
              <Sidebar />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
