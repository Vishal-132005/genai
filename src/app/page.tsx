import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks, Puzzle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Personalized Study Plans",
      description: "Let our AI craft a study plan tailored to your goals, time, and resources.",
      icon: <ListChecks className="w-10 h-10 text-primary" />,
      href: "/study-plan",
      cta: "Create Your Plan"
    },
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes on any topic.",
      icon: <Puzzle className="w-10 h-10 text-primary" />,
      href: "/quiz",
      cta: "Take a Quiz"
    },
    {
      title: "Document Summarization",
      description: "Upload your documents and get concise summaries and key insights.",
      icon: <FileText className="w-10 h-10 text-primary" />,
      href: "/summarize",
      cta: "Summarize Now"
    }
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8">
      <section className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
          Welcome to GeminiStudy
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Your intelligent companion for smarter learning. Leverage the power of AI to create personalized study plans, generate interactive quizzes, and summarize documents effortlessly.
        </p>
        <div>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg">
            <Link href="/study-plan">Get Started <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl space-y-8">
        <h2 className="text-3xl font-bold font-headline">Explore Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-left shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="mt-4 text-2xl font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base min-h-[60px]">{feature.description}</CardDescription>
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  <Link href={feature.href}>{feature.cta} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
