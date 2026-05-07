import { COLORS } from '@/src/utils/colors';
import { fonts } from '@/src/utils/fonts';
import { navigate } from '@/src/utils/navigationService';
import { SCREENS } from '@/src/utils/routes';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { scale } from 'react-native-size-matters';

const GEOAPIFY_API_KEY = ''

const Search = () => {

    const [dropLocationText, setDropLocationText] = useState<string>("");
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [pickupLocation, setPickupLocation] = useState<Location.LocationObject | null>(null);
    const [pickupAddress, setPickupAddress] = useState<string>("Fetching location...");
    const [dropCoordinates, setDropCoordinates] = useState<{ latitude: number, longitude: number } | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPickupLocation(location);

            try {
                const response = await axios.get(
                    `https://api.geoapify.com/v1/geocode/reverse`,
                    {
                        params: {
                            lat: location.coords.latitude,
                            lon: location.coords.longitude,
                            apiKey: GEOAPIFY_API_KEY,
                        }
                    }
                );
                const feature = response.data.features[0];
                if (feature) {
                    setPickupAddress(feature.properties.formatted);
                }
            } catch (error) {
                console.error("Reverse geocode error:", error);
            }
        }

        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (pickupLocation && dropCoordinates) {
            navigate(SCREENS.SelectRide, {
                currentLocation: pickupLocation,
                dropLocation: dropCoordinates
            })
        }
    }, [pickupLocation, dropCoordinates, navigate])

    //Debounced fetch — only fires 600ms after user stops typing
    const fetchPlaces = (text: string) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (!text || text.length < 2) {
            setSuggestions([]);
            return;
        }

        debounceTimer.current = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://api.geoapify.com/v1/geocode/autocomplete`,
                    {
                        params: {
                            text: text,
                            apiKey: GEOAPIFY_API_KEY,
                            limit: 5,
                            ...(pickupLocation && {
                                bias: `proximity:${pickupLocation.coords.longitude},${pickupLocation.coords.latitude}`,
                            }),
                        }
                    }
                );
                setSuggestions(response.data.features);
            } catch (error) {
                console.error("Autocomplete error:", error);
            }
        }, 300);
    };

    // On select — save to recentSearches, clear suggestions
    const handleSelectSuggestion = (item: any) => {
        const name = item.properties.formatted;
        const lat = item.geometry.coordinates[1];
        const lon = item.geometry.coordinates[0];

        setDropLocationText(name);
        setDropCoordinates({ latitude: lat, longitude: lon });
        setSuggestions([]);

        // Add to recent searches
        setRecentSearches((prev) => {
            const alreadyExists = prev.find(
                (p) => p.properties.place_id === item.properties.place_id
            );
            if (alreadyExists) return prev;
            return [item, ...prev].slice(0, 10);
        });
    };

    // On input change — update text, trigger debounced fetch, clear if empty
    const handleTextChange = (text: string) => {
        setDropLocationText(text);

        if (!text) {
            setSuggestions([]);
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            return;
        }

        fetchPlaces(text);
    };

    const renderPlace = ({ item }: { item: any }) => {
        const isApiSuggestion = !!item.properties;
        return (
            <>
                <Pressable
                    style={styles.recentPlace}
                    onPress={() => {
                        if (isApiSuggestion) {
                            handleSelectSuggestion(item);
                        }
                    }}
                >
                    <View style={{ flexDirection: 'row', gap: scale(10), alignItems: 'center' }}>
                        <EvilIcons name="clock" size={28} color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.placeTitle} numberOfLines={1}>
                                {isApiSuggestion
                                    ? item.properties.name || item.properties.formatted
                                    : item.title}
                            </Text>
                            <Text style={styles.subTitle} numberOfLines={1}>
                                {isApiSuggestion
                                    ? item.properties.formatted
                                    : item.subtitle}
                            </Text>
                        </View>
                    </View>
                    <EvilIcons name="heart" size={28} color="black" />
                </Pressable>
                <View style={styles.divider} />
            </>
        );
    };

    // Decide what to show in the list
    const listData = suggestions.length > 0
        ? suggestions
        : recentSearches;

    const listLabel = suggestions.length > 0
        ? 'Suggestions'
        : recentSearches.length > 0
            ? 'Recent Searches'
            : 'No recent searches';

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: COLORS.lightGrey, marginBottom: scale(10) }}>
                <View style={styles.currentLocationView}>
                    <Text>🟠</Text>
                    <Text style={styles.locationText} numberOfLines={1}>
                        {errorMsg ? errorMsg : pickupAddress}
                    </Text>
                </View>
                <View style={styles.dropLocationView}>
                    <Text>🟢</Text>
                    <TextInput
                        placeholder='Drop location'
                        value={dropLocationText}
                        onChangeText={handleTextChange}
                        style={styles.locationText}
                    />
                </View>
            </View>

            <View style={styles.selectionView}>
                <Pressable style={styles.dropSelectionView}>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text style={styles.selectText}>Select from map</Text>
                </Pressable>

                <Pressable style={styles.dropSelectionView}>
                    <AntDesign name="plus" size={24} color="black" />
                    <Text style={styles.selectText}>Add steps</Text>
                </Pressable>
            </View>

            <View style={styles.suggestionsView}>
                <Text style={{ marginHorizontal: scale(10), marginTop: scale(15), fontSize: scale(14), fontFamily: fonts.notoMedium }}>
                    {listLabel}
                </Text>
                <FlatList
                    data={listData}
                    renderItem={renderPlace}
                    keyExtractor={(item, index) =>
                        item.properties?.place_id || index.toString()
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    currentLocationView: {
        padding: scale(5),
        borderRadius: scale(10),
        flexDirection: 'row',
        gap: scale(10),
        alignItems: 'center',
        marginTop: scale(5),
        marginLeft: scale(5)
    },
    dropLocationView: {
        padding: scale(5),
        borderRadius: scale(10),
        flexDirection: 'row',
        gap: scale(10),
        alignItems: 'center',
        marginTop: scale(5),
        marginLeft: scale(5),
        marginBottom: scale(5)
    },
    selectionView: {
        flexDirection: 'row',
        marginHorizontal: scale(4),
        justifyContent: 'space-between'
    },
    dropSelectionView: {
        padding: scale(5),
        borderRadius: scale(50),
        marginVertical: scale(5),
        flexDirection: 'row',
        gap: scale(4),
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: COLORS.white,
        elevation: 2,
        marginHorizontal: scale(10)
    },
    selectText: {
        fontSize: scale(10),
        fontFamily: fonts.notoMedium,
        marginRight: scale(5)
    },
    recentPlace: {
        marginRight: scale(25),
        padding: scale(8),
        marginTop: scale(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeTitle: {
        fontFamily: fonts.notoBold,
        fontSize: scale(14)
    },
    locationText: {
        fontFamily: fonts.notoMedium,
        fontSize: scale(12),
        flex: 1
    },
    subTitle: {
        fontFamily: fonts.notoRegular,
        fontSize: scale(12)
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: COLORS.grey
    },
    suggestionsView: {
        marginHorizontal: scale(5)
    }
});

export default Search;