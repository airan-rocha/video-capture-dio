// import {useRef, useState} from 'react';
// import { View, Text } from 'react-native';

// import { Video, ResizeMode } from 'expo-av';

// import { styles } from './styles';
// import { videoPlayerProps } from './props';

// export function VideoPlayer({uri}:videoPlayerProps) {
//   const videoRef = useRef(null);
//   const [status, setStatus] = useState({});
  

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         style={styles.video}
//         source={{uri: uri}}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping={true}
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//     </View>
//   );
// }

import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './styles';
import { videoPlayerProps } from './props';

export function VideoPlayer({uri}:videoPlayerProps) {
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  function playVideo(){
    if(isPlaying){
      player.pause();
    }else{
      player.play();
    }
  }

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={playVideo}>
          <MaterialIcons name={isPlaying ? "pause-circle-outline" : "play-circle-outline"} size={50} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}