export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      {children}
    </div>
  )
}