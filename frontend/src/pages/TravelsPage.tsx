import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { useState } from 'react';
import { useTravels } from '../hooks/useTravels';
import { useTranslation } from '../i18n/useTranslation';
import type { Place } from '../types/travels';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
type GeographyData = { rsmKey: string } & Record<string, unknown>;

const markerStyle = (type: Place['type']) =>
  type === 'lived'
    ? { fill: '#ef4444', stroke: '#fff', strokeWidth: 1.5 }
    : { fill: '#22c55e', stroke: '#fff', strokeWidth: 1 };

const markerRadius = (type: Place['type']) => (type === 'lived' ? 6 : 4);

export const TravelsPage = () => {
  const { data, loading } = useTravels();
  const { t } = useTranslation();
  const [tooltip, setTooltip] = useState<{ name: string; country: string } | null>(null);

  const places = data?.places ?? [];
  const livedCount = places.filter(p => p.type === 'lived').length;
  const visitedCount = places.filter(p => p.type === 'visited').length;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-baseline gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('travels.title')}
        </h1>
        {!loading && (
          <span className="text-sm text-gray-400">
            {t('travels.total').replace('{n}', String(places.length))}
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-5 mb-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="text-gray-600 dark:text-gray-400">{t('travels.lived')} ({livedCount})</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          <span className="text-gray-600 dark:text-gray-400">{t('travels.visited')} ({visitedCount})</span>
        </span>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden bg-[#1a1a2e] relative" style={{ height: 440 }}>
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            {t('common.loading')}
          </div>
        ) : (
          <>
            {tooltip && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none z-10">
                {tooltip.name}，{tooltip.country}
              </div>
            )}
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 130, center: [20, 20] }}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup>
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: GeographyData[] }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: '#2d2d4e', stroke: '#3d3d6e', strokeWidth: 0.5, outline: 'none' },
                          hover: { fill: '#3d3d6e', outline: 'none' },
                          pressed: { fill: '#3d3d6e', outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {places.map(place => (
                  <Marker
                    key={place.id}
                    coordinates={[place.lng, place.lat]}
                    onMouseEnter={() => setTooltip({ name: place.name, country: place.country })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle
                      r={markerRadius(place.type)}
                      {...markerStyle(place.type)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </>
        )}
      </div>

      {/* Place list */}
      {!loading && places.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            {t('travels.listTitle')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {places.map(place => (
              <div
                key={place.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-sm"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    place.type === 'lived' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
                <span className="text-gray-700 dark:text-gray-300 truncate">{place.name}</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs truncate">{place.country}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};
