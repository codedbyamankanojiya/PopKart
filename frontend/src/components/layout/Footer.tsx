import { Link } from 'react-router-dom';
import { scrollToId } from '../../lib/scroll';
import { 
    Github, 
    Instagram, 
    Linkedin, 
    Twitter, 
    Globe, 
    Sparkles, 
    Code2, 
    Rocket, 
    Smartphone, 
    Brain, 
    Layers, 
    Mail, 
    MapPin, 
    ShieldCheck, 
    Heart 
} from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="relative mt-auto border-t bg-background/60 backdrop-blur-xl">
            {/* Ambient Background Lighting */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
            </div>

            {/* Developer Showcase Section */}
            <div className="pk-container relative pt-8 pb-10 sm:pt-10 sm:pb-12">
                <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-black/40 p-1 shadow-2xl backdrop-blur-3xl transition-all duration-700 hover:bg-black/50 hover:shadow-primary/20 dark:bg-card/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-sky-500/10 opacity-50" />
                    
                    <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] bg-gradient-to-b from-white/5 to-white/0 p-5 sm:p-8 md:p-10">
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
                            {/* Profile Image & Avatar */}
                            <div className="relative flex shrink-0 justify-center">
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-cyan-400 opacity-25 blur-2xl transition duration-700 group-hover:opacity-45" />
                                <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border-2 border-primary/30 bg-muted/80 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                    <img
                                        src="/Aman.png"
                                        alt="Aman Kanojiya - Android Developer & Full Stack Web Developer | AI/ML Specialist"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-center gap-1.5 rounded-full border border-sky-400/30 bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md sm:bottom-3 sm:left-3 sm:right-auto sm:px-3 sm:text-xs">
                                        <Sparkles className="h-2.5 w-2.5 text-sky-400 sm:h-3 sm:w-3" /> Android &bull; Full-Stack &bull; AI/ML
                                    </div>
                                </div>
                            </div>

                            {/* Info & Details */}
                            <div className="relative flex min-w-0 flex-1 flex-col justify-center">
                                <div className="mb-4 sm:mb-5">
                                    <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                                        <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">Hi, I'm </span>
                                        <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">Aman Kanojiya</span>
                                    </h2>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-md">
                                            <Smartphone className="h-3 w-3" /> Android App Developer
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 backdrop-blur-md">
                                            <Code2 className="h-3 w-3" /> Full-Stack Web Developer
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 backdrop-blur-md">
                                            <Brain className="h-3 w-3" /> AI / ML Specialist
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        Passionate Android App Developer and Full-Stack Web Developer specialized in Artificial Intelligence and Machine Learning (AI/ML). 
                                        Crafting <span className="font-semibold text-foreground">high-performance mobile applications</span>, 
                                        <span className="font-semibold text-foreground"> scalable web architectures</span>, and 
                                        <span className="font-semibold text-foreground"> intelligent AI-powered solutions</span> 
                                        that solve real-world problems.
                                    </p>
                                    
                                    <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                                        {/* Tech Stack Card */}
                                        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-white/5 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-2 ring-primary/10">
                                                        <Code2 className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <h4 className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">Tech Stack</h4>
                                                </div>
                                                <div className="space-y-2 text-xs sm:text-sm">
                                                    <div>
                                                        <div className="flex items-center gap-2 font-medium text-foreground">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>Android / Mobile</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground ml-3.5 mt-0.5">Kotlin, Jetpack Compose, Android SDK, Java, XML</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 font-medium text-foreground">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                                            <span>Full-Stack Web</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground ml-3.5 mt-0.5">React, Next.js, TypeScript, Node.js, Express, Tailwind CSS</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 font-medium text-foreground">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                                            <span>AI / ML &amp; Backend</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground ml-3.5 mt-0.5">Python, PyTorch, TensorFlow, Scikit-Learn, MongoDB, PostgreSQL</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Core Expertise Card */}
                                        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-white/5 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 ring-2 ring-sky-500/10">
                                                        <Rocket className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                                                    </div>
                                                    <h4 className="text-sm sm:text-base font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Core Expertise</h4>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <div className="flex items-start gap-2.5">
                                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                                                            <Smartphone className="h-3 w-3 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-foreground text-xs sm:text-sm leading-tight">Android App Development</h5>
                                                            <p className="text-[11px] sm:text-xs text-muted-foreground">Native Android apps with MVVM/MVI &amp; clean code</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2.5">
                                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/10 mt-0.5">
                                                            <Layers className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-foreground text-xs sm:text-sm leading-tight">Full-Stack Web &amp; SaaS</h5>
                                                            <p className="text-[11px] sm:text-xs text-muted-foreground">High-performance e-commerce &amp; cloud dashboards</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2.5">
                                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 mt-0.5">
                                                            <Brain className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-foreground text-xs sm:text-sm leading-tight">AI / ML Integration</h5>
                                                            <p className="text-[11px] sm:text-xs text-muted-foreground">Intelligent model pipelines, LLMs &amp; analytics</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Actions & Social Links */}
                                <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                                    <a
                                        href="https://codedbyamankanojiya.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-sky-500 px-6 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40 active:scale-95 text-sm"
                                    >
                                        <Globe className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
                                        View Portfolio
                                        <Rocket className="ml-0.5 h-3.5 w-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                    
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="https://github.com/codedbyamankanojiya"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub Profile"
                                            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-foreground hover:shadow-md"
                                        >
                                            <Github className="h-4.5 w-4.5" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/aman-kanojiya-7386822b0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn Profile"
                                            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:shadow-md"
                                        >
                                            <Linkedin className="h-4.5 w-4.5" />
                                        </a>
                                        <a
                                            href="https://x.com/AKnj08?t=q_d2a3VqdDRpYaScD9Hclw&s=08"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="X (Twitter) Profile"
                                            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-foreground hover:shadow-md"
                                        >
                                            <Twitter className="h-4.5 w-4.5" />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/alw4ys.ammy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram Profile"
                                            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-fuchsia-500 hover:to-indigo-500 hover:text-white hover:border-transparent hover:shadow-md"
                                        >
                                            <Instagram className="h-4.5 w-4.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Website Navigation & Information Footer */}
            <div className="border-t border-border/40 bg-card/20 backdrop-blur-sm">
                <div className="pk-container py-10 md:py-12">
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                        {/* Brand Column */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <img src="/Logo.png" alt="NexCart Logo" className="h-7 w-auto" />
                                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                                    NexCart
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                Premium next-gen e-commerce platform built for velocity, modern aesthetics, and seamless shopping experiences across web & mobile.
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <span>Verified &amp; Secure Checkout</span>
                            </div>
                        </div>

                        {/* Explore & Shop */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Explore</h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <li>
                                    <button type="button" className="hover:text-primary transition-colors" onClick={() => scrollToId('shop')}>
                                        Featured Shop
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="hover:text-primary transition-colors" onClick={() => scrollToId('categories')}>
                                        Popular Categories
                                    </button>
                                </li>
                                <li>
                                    <Link to="/wishlist" className="hover:text-primary transition-colors">
                                        My Wishlist
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cart" className="hover:text-primary transition-colors">
                                        Shopping Cart
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Account & Portals */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Account &amp; Services</h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <li>
                                    <Link to="/orders" className="hover:text-primary transition-colors">
                                        Track Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="hover:text-primary transition-colors">
                                        User Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className="hover:text-primary transition-colors">
                                        Account Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/seller/dashboard" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                                        <Sparkles className="h-3 w-3 text-primary" /> Seller Portal
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Location */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact &amp; Support</h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                                    <span>Mumbai, Maharashtra, India</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                                    <span>support@nexcart.com</span>
                                </li>
                                <li className="pt-1">
                                    <a
                                        href="https://codedbyamankanojiya.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                                    >
                                        <Globe className="h-3.5 w-3.5" /> Contact Developer
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Copyright Bar */}
                    <div className="mt-10 border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            &copy; {new Date().getFullYear()} NexCart. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1.5">
                            Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" /> by{' '}
                            <span className="font-semibold text-foreground">Aman Kanojiya</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
                            <span>&bull;</span>
                            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
