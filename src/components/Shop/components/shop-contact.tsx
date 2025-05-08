interface ShopContactProps {
  platform: string
  qrCode?: (string | null) | { url: string }
}

export default function ShopContact({ platform, qrCode }: ShopContactProps) {
  // Helper function to get image URL
  const getImageUrl = (image: (string | null) | { url: string } | undefined) => {
    if (!image) return null
    return typeof image === "string" ? image : image.url
  }

  return (
    <div className="flex flex-col items-center">
      {getImageUrl(qrCode) ? (
        <div className="h-32 w-32 overflow-hidden rounded-md border p-2">
          <img
            src={getImageUrl(qrCode)! || "/placeholder.svg"}
            alt={`${platform} QR Code`}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center rounded-md border p-2">
          <p className="text-center">QR Code not available</p>
        </div>
      )}
      <p className="mt-2 text-sm font-medium leading-none">{platform}</p>
    </div>
  )
}
