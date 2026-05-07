import MapAreaView from "@/src/components/MapAreaView";
import { COLORS } from "@/src/utils/colors";
import { exploreOptions, recentPlaces } from "@/src/utils/dummyData";
import { fonts } from "@/src/utils/fonts";
import { navigate } from "@/src/utils/navigationService";
import { SCREENS } from "@/src/utils/routes";
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";

const Home = () => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["50%", "100%"], []);

    const renderOptions = ({ item }) => {
        return (
            <View style={styles.option}>
                <Text style={{ fontSize: scale(30) }}>{item.icon}</Text>
                <Text style={{ fontFamily: fonts.notoMedium, fontSize: scale(12) }}>{item.title}</Text>
            </View>
        )
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapAreaView />
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    backgroundStyle={{ backgroundColor: COLORS.white, borderTopLeftRadius: scale(20) }}
                    handleIndicatorStyle={{ backgroundColor: COLORS.blueTint }}
                >
                    <BottomSheetScrollView>
                        <View style={styles.sheetInnerView}>
                            <View style={styles.innerView1}>

                            </View>
                            <Pressable style={styles.innerView2} onPress={() => navigate(SCREENS.Search)}>
                                <Text style={styles.placeholder}>
                                    Where are you going ?
                                </Text>
                            </Pressable>
                        </View>

                        {/* explore options*/}
                        <View style={styles.exploreOptions}>
                            <View style={styles.exploreHeader}>
                                <Text>Explore</Text>
                                <Text>View All</Text>
                            </View>
                            <BottomSheetFlatList
                                data={exploreOptions}
                                horizontal
                                renderItem={renderOptions}
                                keyExtractor={(item) => item.title}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        {/*recent places */}
                        <View style={styles.recentPlaces}>
                            {recentPlaces.map((place, index) => (
                                <>
                                    <View key={index} style={styles.recentPlace}>
                                        <Text style={styles.placeTitle}>{place.title}</Text>
                                        <Text style={styles.subTitle}>{place.subtitle}</Text>
                                    </View>
                                    <View style={styles.divider} />
                                </>
                            ))}
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    search: {
        borderWidth: 1,
        borderColor: COLORS.green,
        marginHorizontal: scale(10),
        borderRadius: scale(10),
        padding: scale(8)
    },
    sheetInnerView: {

    },
    innerView1: {
        flex: 1
    },
    innerView2: {
        padding: scale(12),
        borderWidth: 2,
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        borderColor: COLORS.lightGreen
    },
    placeholder: {
        fontFamily: fonts.notoMedium,
        fontSize: scale(14),
        color: COLORS.grey
    },
    recentPlaces: {
        marginTop: scale(10),
    },
    recentPlace: {
        marginHorizontal: scale(10),
        padding: scale(8),
        marginTop: scale(5),
    },
    placeTitle: {
        fontFamily: fonts.notoBold,
        fontSize: scale(14)
    },
    subTitle: {
        fontFamily: fonts.notoRegular,
        fontSize: scale(12)
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: COLORS.grey
    },
    exploreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exploreOptions: {
        marginTop: scale(10),
        marginHorizontal: scale(10)
    },
    option: {
        marginHorizontal: scale(10)
    }
})


export default Home;