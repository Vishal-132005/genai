import Link from 'next/link';
import NavItem from './NavItem';
import { BookText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline text-primary hover:opacity-80 transition-opacity">
          <BookText className="w-8 h-8" />
          <span>GeminiStudy</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><NavItem href="/">Home</NavItem></li>
            <li><NavItem href="/study-plan">Study Plan</NavItem></li>
            <li><NavItem href="/quiz">Quizzes</NavItem></li>
            <li><NavItem href="/summarize">Summarize</NavItem></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
