import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { songsList } from "../../src/SongsLists/SongsHistories";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Event,
} from "react-native-track-player";
import SongPlayer from "../../SongPlayer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { width } from "../../src/constants/dimentions";

const flag333 = require("../../src/images/flag-333.webp");
const flag777 = require("../../src/images/flag-777.webp");

const Histories = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartPlayer, setShouldStartPlayer] = useState(true);

  const handlePlaybackTrackChanged = useCallback(async (data) => {
    if (data.nextTrack === undefined && data.position === data.duration) {
      await TrackPlayer.seekTo(0);
      // await TrackPlayer.play();

      // setCurrentIndex(0);
    } else if (data.nextTrack !== undefined) {
      await TrackPlayer.seekTo(0);

      await TrackPlayer.pause();

      // setCurrentIndex(data.nextTrack);
    }
  }, []);

  useEffect(() => {
    if (playbackState == State.Stopped && currentIndex >= 0) {
      // const handlePlaybackTrackChanged = async (data) => {
      //   if (data.nextTrack === undefined && data.position === data.duration) {
      //     await TrackPlayer.seekTo(0);
      //     // await TrackPlayer.play();

      //     // setCurrentIndex(0);
      //   } else if (data.nextTrack !== undefined) {
      //     await TrackPlayer.seekTo(0);

      //     await TrackPlayer.pause();

      //     // setCurrentIndex(data.nextTrack);
      //   }
      // };

      const setupPlayer = async () => {
        try {
          await TrackPlayer.reset();
          await TrackPlayer.add(songsList[currentIndex]);

          if (shouldStartPlayer) {
            // await TrackPlayer.play();
            setShouldStartPlayer(false); // Reset shouldStartPlayer
          }
        } catch (e) {
          console.log("Error in TrackPlayer configuration:", e);
        }
      };

      setupPlayer();

      const sub = TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        handlePlaybackTrackChanged
      );

      return () => {
        sub.remove();
      };
    }
  }, [playbackState]);

  useEffect(() => {
    if (currentIndex >= 0) {
      // const handlePlaybackTrackChanged = async (data) => {
      //   if (data.nextTrack === undefined && data.position === data.duration) {
      //     await TrackPlayer.seekTo(0);
      //     // await TrackPlayer.play();

      //     // setCurrentIndex(0);
      //   } else if (data.nextTrack !== undefined) {
      //     await TrackPlayer.seekTo(0);

      //     await TrackPlayer.pause();

      //     // setCurrentIndex(data.nextTrack);
      //   }
      // };

      const setupPlayer = async () => {
        try {
          await TrackPlayer.reset();
          await TrackPlayer.add(songsList[currentIndex]);

          if (shouldStartPlayer) {
            // await TrackPlayer.play();
            setShouldStartPlayer(false); // Reset shouldStartPlayer
          }
        } catch (e) {
          console.log("Error in TrackPlayer configuration:", e);
        }
      };

      setupPlayer();

      const sub = TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        handlePlaybackTrackChanged
      );

      return () => {
        sub.remove();
      };
    }
  }, [currentIndex]); // Empty dependency array to ensure this effect runs only once

  return (
    <LinearGradient
      colors={["#fcfe19", "#b47404", "#de5c19"]}
      style={{ flex: 1, paddingBottom: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS === "ios" ? 50 : 50,
          paddingHorizontal: 10,
          borderBottomWidth: 0.2,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../src/images/back-white.webp")}
            style={{ height: 50, width: 50, marginRight: 6 }}
          />
          {/* <Text style={{ fontSize: 19, color: "#ffffff",marginTop:10 }}>Medistoris.cat</Text> */}
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "500",
            marginLeft: "20%",
            marginTop: 10,
          }}
        >
          {/* Cultura Catalana */}
          Medistoris.cat
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text style={{ color: "white", fontSize: 24, marginLeft: 0 }}>
          Històries \ Historias
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginTop: 10,
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      ></View>

      <FlatList
        data={songsList}
        style={{ paddingBottom: 50, flex: 1 }}
        scrollEnabled={true}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={<View style={{ height: 1 }}></View>}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 110,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                paddingBottom: 10,
              }}
              onPress={async () => {
                // await TrackPlayer.pause();
                // await TrackPlayer.skip(index);
                //  await TrackPlayer.play();
                setCurrentIndex(index);
                setIsVisible(true);
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View style={[styles.imageContainer, styles.shadowProp]}>
                  <Image source={item.artwork} style={styles.image} />
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, width: "100%" }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    {/* <MaterialIcons
                      name={"record-voice-over"}
                      size={width(5.5)}
                      color={"#ffffff"}
                    /> */}
                    {item.flag && (
                      <Image
                        source={item.flag === "333" ? flag333 : flag777}
                        style={styles.flag}
                      />
                    )}
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        verticalAlign: "middle",
                        // marginLeft: 5,
                      }}
                    >
                      {item.artist}
                    </Text>
                  </View>
                </View>
                {index == currentIndex && State.Playing == playbackState && (
                  <Image
                    source={require("../../src/images/playing.webp")}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: "white",
                      marginLeft: 20,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {currentIndex != -1 && (
        <SongPlayer
          isVisible={isVisible}
          songsList={songsList}
          currentIndex={currentIndex}
          playbackState={playbackState}
          progress={progress}
          onChange={(x) => {
            setCurrentIndex(x);
          }}
          setCurrentIndex={setCurrentIndex}
          onClose={async () => {
            setIsVisible(false);
            await TrackPlayer.pause();
          }}
        />
      )}
      {/* )} */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    height: 100,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1, // Set aspectRatio to 1 to make height the same as width
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 2,
  },
  flag: {
    width: 20,
    height: 20,
    marginLeft: 5,
    borderRadius: 100,
  },
});

export default Histories;
