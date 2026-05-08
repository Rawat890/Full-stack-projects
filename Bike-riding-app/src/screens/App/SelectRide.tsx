import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';

const GEOAPIFY_API_KEY = '8064243326894715a0b7f666e7989857';

interface LatLng {
    latitude: number;
    longitude: number;
}

interface RouteSegment {
    coordinates: LatLng[];
    color: string;
}

interface Ride {
    id: string;
    name: string;
    capacity: string;
    icon: string;
    basePrice: number;
    pricePerKm: number;
}

interface TrafficSummary {
    normalKm: number;
    slowKm: number;
    jamKm: number;
}

const RIDE_TYPES: Ride[] = [
    { id: '1', name: 'Auto', capacity: '3 seats', icon: '🛺', basePrice: 30, pricePerKm: 12 },
    { id: '2', name: 'Cab Non AC', capacity: '4 seats', icon: '🚕', basePrice: 50, pricePerKm: 18 },
    { id: '3', name: 'Cab AC', capacity: '4 seats', icon: '🚗', basePrice: 70, pricePerKm: 22 },
];

const SelectRide = ({ route }: { route: any }) => {

    const { currentLocation, dropLocation } = route.params;
    const mapRef = useRef<MapView>(null);

    const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);
    const [distanceKm, setDistanceKm] = useState(0);
    const [durationMinute, setDurationMinute] = useState(0);
    const [trafficSummary, setTrafficSummary] = useState<TrafficSummary | null>(null);
    const [selectedRide, setSelectedRide] = useState<string>('1');
    const [loading, setLoading] = useState(true);

    const pickupCoords: LatLng = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
    };

    const dropCoords: LatLng = {
        latitude: dropLocation.latitude,
        longitude: dropLocation.longitude,
    };

    // price for a ride based on distance
    const calculatePrice = (ride: Ride) => {
        return Math.round(ride.basePrice + ride.pricePerKm * distanceKm);
    };

    // Calculate ETA in minutes adding traffic delay
    const calculateETA = (baseMinutes: number) => {
        if (!trafficSummary) return baseMinutes;
        const trafficDelay = trafficSummary.slowKm * 1.5 + trafficSummary.jamKm * 3;
        return Math.round(baseMinutes + trafficDelay);
    };

    // Parse Geoapify route response into colored segments based on traffic
    const parseRouteSegments = (legs: any[]): RouteSegment[] => {
        const segments: RouteSegment[] = [];
        let normalKm = 0, slowKm = 0, jamKm = 0;

        legs.forEach((leg: any) => {
            leg.steps?.forEach((step: any) => {
                const coords = decodeGeoapifyGeometry(step.geometry);
                const congestion = step.congestion || 'free';
                const distKm = (step.distance || 0) / 1000;

                let color = '#4A90D9'; // free — blue
                if (congestion === 'low') {
                    color = '#F5A623'; // slow — orange
                    slowKm += distKm;
                } else if (congestion === 'high' || congestion === 'blocked') {
                    color = '#D0021B'; // jam — red
                    jamKm += distKm;
                } else {
                    normalKm += distKm;
                }

                if (coords.length > 0) {
                    segments.push({ coordinates: coords, color });
                }
            });
        });

        setTrafficSummary({
            normalKm: parseFloat(normalKm.toFixed(2)),
            slowKm: parseFloat(slowKm.toFixed(2)),
            jamKm: parseFloat(jamKm.toFixed(2)),
        });

        return segments;
    };

    // Decode geometry from Geoapify (array of [lon, lat] pairs)
    const decodeGeoapifyGeometry = (geometry: any): LatLng[] => {
        if (!geometry?.coordinates) return [];
        return geometry.coordinates.map(([lon, lat]: [number, number]) => ({
            latitude: lat,
            longitude: lon,
        }));
    };

    const fetchRoute = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.geoapify.com/v1/routing`,
                {
                    params: {
                        waypoints: `${pickupCoords.latitude},${pickupCoords.longitude}|${dropCoords.latitude},${dropCoords.longitude}`,
                        mode: 'drive',
                        details: 'route_details',
                        traffic: 'approximated',
                        apiKey: GEOAPIFY_API_KEY,
                    }
                }
            );

            const feature = response.data.features[0];
            const props = feature.properties;
            const legs = props.legs;

            // Distance and duration
            setDistanceKm(parseFloat((props.distance / 1000).toFixed(2)));
            setDurationMinute(Math.round(props.time / 60));

            // Parse colored segments
            const segments = parseRouteSegments(legs);
            setRouteSegments(segments);

            // Fit map to show full route
            const allCoords = segments.flatMap(s => s.coordinates);
            if (allCoords.length > 0 && mapRef.current) {
                mapRef.current.fitToCoordinates(allCoords, {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true,
                });
            }
        } catch (error) {
            console.error("Route fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, []);

    const renderRide = ({ item }: { item: Ride }) => {
        const isSelected = selectedRide === item.id;
        const eta = calculateETA(durationMinute);
        const price = calculatePrice(item);

        return (
            <Pressable
                style={[styles.rideItem, isSelected && styles.rideItemSelected]}
                onPress={() => setSelectedRide(item.id)}
            >
                <Text style={styles.rideIcon}>{item.icon}</Text>
                <View style={styles.rideInfo}>
                    <Text style={styles.rideName}>{item.name}</Text>
                    <Text style={styles.rideSubtitle}>
                        {item.capacity} • Drop in {eta} min
                    </Text>
                    <Text style={styles.rideSubtitle}>{distanceKm} km</Text>
                </View>
                <Text style={styles.ridePrice}>₹{price}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>

            {/* MAP — top half */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: (pickupCoords.latitude + dropCoords.latitude) / 2,
                        longitude: (pickupCoords.longitude + dropCoords.longitude) / 2,
                        latitudeDelta: Math.abs(pickupCoords.latitude - dropCoords.latitude) * 2.5,
                        longitudeDelta: Math.abs(pickupCoords.longitude - dropCoords.longitude) * 2.5,
                    }}
                >
                    {/* Colored route segments */}
                    {routeSegments.map((segment, index) => (
                        <Polyline
                            key={index}
                            coordinates={segment.coordinates}
                            strokeColor={segment.color}
                            strokeWidth={4}
                        />
                    ))}

                    {/* Pickup marker — red */}
                    <Marker coordinate={pickupCoords} pinColor="red" />

                    {/* Drop marker — green */}
                    <Marker coordinate={dropCoords} pinColor="green" />
                </MapView>

                {loading && (
                    <View style={styles.mapLoader}>
                        <ActivityIndicator size="large" color="#F5A623" />
                    </View>
                )}
            </View>

            {/* BOTTOM SHEET */}
            <View style={styles.bottomSheet}>

                {/* Distance + Traffic summary */}
                <View style={styles.summaryRow}>
                    <View>
                        <Text style={styles.summaryTitle}>
                            {distanceKm} Km • {durationMinute} min
                        </Text>
                        {trafficSummary && (
                            <Text style={styles.trafficText}>
                                Traffic: {trafficSummary.normalKm}km free •{' '}
                                {trafficSummary.slowKm}km slow •{' '}
                                {trafficSummary.jamKm}km jam
                            </Text>
                        )}
                    </View>
                    <Pressable style={styles.sortButton}>
                        <Text style={styles.sortText}>Sort</Text>
                    </Pressable>
                </View>

                <View style={styles.divider} />

                {/* Ride list */}
                <FlatList
                    data={RIDE_TYPES}
                    renderItem={renderRide}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.divider} />}
                />

                {/* Book button */}
                <Pressable style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Ride</Text>
                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Map
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    mapLoader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },

    // Bottom sheet
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        maxHeight: '50%',
    },

    // Summary row
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },
    trafficText: {
        fontSize: 11,
        color: '#888',
        marginTop: 3,
    },
    sortButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    sortText: {
        fontSize: 12,
        color: '#444',
    },

    divider: {
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        marginVertical: 4,
    },

    // Ride item
    rideItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 8,
    },
    rideItemSelected: {
        backgroundColor: '#FFF8E7',
    },
    rideIcon: {
        fontSize: 32,
        marginRight: 14,
    },
    rideInfo: {
        flex: 1,
    },
    rideName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
    rideSubtitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    ridePrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    // Book button
    bookButton: {
        backgroundColor: '#F5C518',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 4,
    },
    bookButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },
});

export default SelectRide;