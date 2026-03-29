import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, PenLine, Users, Sparkles, ArrowRight, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cube_mono.png-OQOWawIHllHmQHd69YU27ZKI10wYIl.jpeg"
        alt="Abstract diagonal light beams background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8">
          <Sparkles className="size-4 text-white" />
          <span className="text-sm font-medium text-white">Start your creative journey today</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance mb-4 sm:mb-6">
          Amplify your voice with striking blog posts.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-pretty leading-relaxed mb-8 sm:mb-10">
          Transform your ideas into captivating stories. Connect with readers worldwide and build
          your audience through powerful, beautifully crafted content.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-full"
          >
            More Details
            <ArrowRight className="size-5 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white px-8 py-6 text-base font-semibold rounded-full"
          >
            <FileText className="size-5 mr-1" />
            Read Me
          </Button>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-white/10">
              <PenLine className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">Write Freely</h3>
            <p className="text-sm text-gray-400">Express your thoughts with our intuitive editor</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-white/10">
              <Users className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">Grow Audience</h3>
            <p className="text-sm text-gray-400">Reach readers across the globe effortlessly</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-white/10">
              <BookOpen className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">Get Inspired</h3>
            <p className="text-sm text-gray-400">Discover trending stories and fresh ideas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
