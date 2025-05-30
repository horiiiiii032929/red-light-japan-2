'use client'

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { ExternalLink } from "lucide-react"

// Dynamically import Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

// Import Leaflet CSS only on client side
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("leaflet/dist/leaflet.css")
}

// Create a custom icon using the Lucide MapPin
const createCustomIcon = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet")
  const iconUrl = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="color: #e11d48; transform: translate(-50%, -100%);">${iconUrl}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  })
}

interface ShopMapProps {
  location: [number, number] | null | undefined
  name: string
}

const ShopMap = ({ location, name }: ShopMapProps) => {
  const [error, setError] = useState<string | null>(null)
  const loc = location || [35.681236, 139.767125]
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc[0]},${loc[1]}`

  const customIcon = useMemo(() => createCustomIcon(), [])

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full" role="region" aria-label={`Map showing location of ${name}`}>
      <MapContainer
        center={loc}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
        whenReady={() => setError(null)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={loc} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-medium">{name}</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
              >
                Open in Google Maps
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default dynamic(() => Promise.resolve(ShopMap), {
  ssr: false
}) 