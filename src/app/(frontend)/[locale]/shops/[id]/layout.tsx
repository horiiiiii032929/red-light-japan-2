export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start">
        {children}
      </div>
    </div>
  )
}