import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import React from 'react'
import mapstyle from '../utils/mapstyle.json'

interface MapBarberProps {
  information: {
    name: string
    lat: number
    lng: number
  }
}

const MapBarber: React.FC<MapBarberProps> = ({
  information: { name, lat, lng },
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCBxGYRgV85Tq5ckh-I_dnr6MleP3KNIRM',
  })
  return (
    <div className="w-full h-96">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat,
            lng,
          }}
          zoom={16}
          clickableIcons={false}
          options={{
            styles: mapstyle,
            disableDefaultUI: true,
            zoomControl: false,
          }}
        >
          <Marker
            position={{
              lat,
              lng,
            }}
            title={name}
            icon={{
              url: 'https://app-agendabarber2.s3.amazonaws.com/point2.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            label={{
              text: name,
              color: '#F4972E',
              fontSize: '14px',
              fontWeight: 'bold',
              className: 'mt-[-40px]',
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MapBarber
