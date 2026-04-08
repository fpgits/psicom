import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="font-serif text-xl font-semibold text-background">Tu Bienestar Mental</span>
          </div>
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Tu Bienestar Mental. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
