import { useState, useEffect, useCallback } from "react"
import {
  View,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from "react-native"
import { Audio, AVPlaybackStatus } from "expo-av"

import { IconSet } from "@/components/icons/IconSet"
import { Caption } from "@/components/text/Caption"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface AudioPlayerProps {
  /**
   * Audio file URL
   */
  audioUrl: string | null
  /**
   * Label for accessibility
   */
  label?: string
  /**
   * Custom style override
   */
  style?: StyleProp<ViewStyle>
}

export type { AudioPlayerProps }

type PlaybackState = "idle" | "loading" | "playing" | "paused" | "error"

/**
 * Audio Player Component - Play/pause controls for knowledge card audio
 */
export function AudioPlayer({ audioUrl, label = "Audio narration", style }: AudioPlayerProps) {
  const { themed } = useAppTheme()
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle")
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [sound])

  // Reset when audioUrl changes
  useEffect(() => {
    if (sound) {
      sound.stopAsync()
      sound.unloadAsync()
      setSound(null)
      setPlaybackState("idle")
      setPosition(0)
      setDuration(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl])

  // Update progress during playback
  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return

    setPosition(status.positionMillis)
    setDuration(status.durationMillis ?? 0)
  }, [])

  // Load and play audio
  const handlePlay = useCallback(async () => {
    if (!audioUrl) return

    setPlaybackState("loading")

    try {
      if (sound) {
        // Resume from paused state
        await sound.playAsync()
        setPlaybackState("playing")
      } else {
        // Load and play new audio
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate,
        )
        setSound(newSound)
        setPlaybackState("playing")
      }
    } catch (error) {
      console.error("Audio playback error:", error)
      setPlaybackState("error")
    }
  }, [audioUrl, sound, onPlaybackStatusUpdate])

  // Pause audio
  const handlePause = useCallback(async () => {
    if (!sound) return

    try {
      await sound.pauseAsync()
      setPlaybackState("paused")
    } catch (error) {
      console.error("Audio pause error:", error)
    }
  }, [sound])

  // Toggle play/pause
  const handleToggle = useCallback(() => {
    if (playbackState === "playing") {
      handlePause()
    } else {
      handlePlay()
    }
  }, [playbackState, handlePlay, handlePause])

  // Stop and reset
  const handleStop = useCallback(async () => {
    if (!sound) return

    try {
      await sound.stopAsync()
      await sound.unloadAsync()
      setSound(null)
      setPlaybackState("idle")
      setPosition(0)
      setDuration(0)
    } catch (error) {
      console.error("Audio stop error:", error)
    }
  }, [sound])

  // Format milliseconds to mm:ss
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Don't render if no audio URL
  if (!audioUrl) return null

  // Calculate progress percentage
  const progressPercent = duration > 0 ? (position / duration) * 100 : 0

  return (
    <View style={[themed($container), style]}>
      {/* Progress Bar */}
      <View style={themed($progressBar)}>
        <View style={[themed($progressFill), { width: `${progressPercent}%` }]} />
      </View>

      {/* Controls */}
      <View style={themed($controls)}>
        {/* Play/Pause Button */}
        <TouchableOpacity
          style={themed($playButton)}
          onPress={handleToggle}
          disabled={playbackState === "loading" || playbackState === "error"}
          accessibilityLabel={playbackState === "playing" ? "Pause audio" : "Play audio"}
          accessibilityRole="button"
        >
          {playbackState === "loading" ? (
            <Caption text="Loading..." style={themed($buttonText)} />
          ) : playbackState === "error" ? (
            <IconSet name="close" size="md" color="#F44336" />
          ) : playbackState === "playing" ? (
            <IconSet name="pause" size="md" color="white" />
          ) : (
            <IconSet name="play" size="md" color="white" />
          )}
        </TouchableOpacity>

        {/* Time Display */}
        <Caption
          text={`${formatTime(position)} / ${formatTime(duration)}`}
          style={themed($timeText)}
        />

        {/* Stop Button (visible when playing or paused) */}
        {(playbackState === "playing" || playbackState === "paused") && (
          <TouchableOpacity
            style={themed($stopButton)}
            onPress={handleStop}
            accessibilityLabel="Stop audio"
            accessibilityRole="button"
          >
            <IconSet name="close" size="sm" color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {playbackState === "error" && (
        <Caption text="Failed to load audio" style={themed($errorText)} />
      )}

      {/* Label */}
      <Caption text={label} style={themed($labelText)} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  padding: spacing.sm,
  marginHorizontal: spacing.md,
  marginVertical: spacing.xs,
})

const $progressBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 4,
  backgroundColor: colors.palette.neutral300,
  borderRadius: 2,
  marginBottom: spacing.sm,
  overflow: "hidden",
})

const $progressFill: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  backgroundColor: colors.palette.primary500,
  borderRadius: 2,
})

const $controls: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $playButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: colors.palette.primary500,
  justifyContent: "center",
  alignItems: "center",
})

const $stopButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: colors.palette.neutral600,
  justifyContent: "center",
  alignItems: "center",
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $timeText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.xs,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.error500,
  marginTop: spacing.xs,
})

const $labelText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.xs,
})
