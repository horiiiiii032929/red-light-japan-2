export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      <main className="container py-3 md:py-6">
        {children}
      </main>
    </div>
  )
}
