'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { ExternalLink } from "lucide-react"

// Create a custom icon using the Lucide MapPin
const createCustomIcon = () => {
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

export default function ShopMap({ location, name }: ShopMapProps) {

  const loc = location || [35.681236, 139.767125]
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc[0]},${loc[1]}`


  return (
    <div className="h-full w-full">
      <MapContainer
        center={loc}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={loc} icon={createCustomIcon()}>
          <Popup>
            <div className="text-center">
              <h3 className="font-medium">{name}</h3>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
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
