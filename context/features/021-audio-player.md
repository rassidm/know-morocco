# Feature: Audio Player Component - Play/Pause Controls

## Metadata

- **Feature ID:** 021
- **Phase:** 4 - Knowledge Cards System
- **Status:** Not Started
- **Estimated Time:** 45 minutes
- **Dependencies:** 020 (Card Content Display)

---

## Goals

Build an audio player component that can play/pause audio associated with knowledge cards. This provides audio narration support for tourists who prefer listening over reading, with proper loading states and error handling.

### Acceptance Criteria

- [ ] AudioPlayer component with play/pause toggle
- [ ] Shows loading state while audio buffers
- [ ] Handles missing audio_url gracefully (hide component)
- [ ] Error state displays when audio fails to load
- [ ] Progress indicator shows playback position
- [ ] Accessible controls with proper labels
- [ ] Component cleans up audio on unmount

---

## Implementation Steps

### Step 1: Create AudioPlayer Component

**File:** `app/components/audio/AudioPlayer.tsx`

```typescript
import { useState, useEffect, useCallback } from "react"
import { View, ViewStyle, TouchableOpacity, StyleProp } from "react-native"
import { Audio, AVPlaybackStatus } from "expo-av"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"
import { Caption } from "@/components/text/Caption"
import { Icon } from "@/components/icons/Icon"

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
          onPlaybackStatusUpdate
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
          accessibilityLabel={
            playbackState === "playing" ? "Pause audio" : "Play audio"
          }
          accessibilityRole="button"
        >
          {playbackState === "loading" ? (
            <Caption text="Loading..." style={themed($buttonText)} />
          ) : playbackState === "error" ? (
            <Icon name="alert-circle" size={24} color="#F44336" />
          ) : playbackState === "playing" ? (
            <Icon name="pause" size={24} color="white" />
          ) : (
            <Icon name="play" size={24} color="white" />
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
            <Icon name="stop" size={18} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {playbackState === "error" && (
        <Caption
          text="Failed to load audio"
          style={themed($errorText)}
        />
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

const $buttonText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $timeText: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.xs,
})

const $errorText: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.palette.error500,
  marginTop: spacing.xs,
})

const $labelText: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.textSecondary,
  marginTop: spacing.xs,
})
```

---

### Step 2: Create Audio Hook

**File:** `app/hooks/useAudio.ts`

```typescript
import { useState, useCallback } from "react"
import { Audio, AVPlaybackStatus } from "expo-av"

type AudioState = {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  position: number
  duration: number
}

/**
 * Hook for managing audio playback
 */
export function useAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    position: 0,
    duration: 0,
  })

  const play = useCallback(async (audioUrl: string) => {
    setState({ isPlaying: false, isLoading: true, error: null, position: 0, duration: 0 })

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setState((prev) => ({
              ...prev,
              position: status.positionMillis,
              duration: status.durationMillis ?? 0,
            }))
          }
        }
      )
      setSound(newSound)
      setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }))
    } catch {
      setState({ isPlaying: false, isLoading: false, error: "Failed to play audio", position: 0, duration: 0 })
    }
  }, [])

  const pause = useCallback(async () => {
    if (!sound) return
    await sound.pauseAsync()
    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [sound])

  const resume = useCallback(async () => {
    if (!sound) return
    await sound.playAsync()
    setState((prev) => ({ ...prev, isPlaying: true }))
  }, [sound])

  const stop = useCallback(async () => {
    if (!sound) return
    await sound.stopAsync()
    await sound.unloadAsync()
    setSound(null)
    setState({ isPlaying: false, isLoading: false, error: null, position: 0, duration: 0 })
  }, [sound])

  return {
    ...state,
    play,
    pause,
    resume,
    stop,
  }
}
```

---

### Step 3: Integrate AudioPlayer into CardContentDisplay

**File:** `app/components/cards/CardContentDisplay.tsx` (update)

Add audio player below description:

```typescript
// Add import
import { AudioPlayer } from "@/components/audio/AudioPlayer"

// Add to CardContentDisplay component (after description, before location badge)
{card.audio_url && (
  <AudioPlayer audioUrl={card.audio_url} label="Listen to narration" />
)}
```

---

## Mock Data

```typescript
// Mock audio URLs for testing
export const MOCK_AUDIO_URLS = {
  valid: "https://example.com/audio/hassan-mosque.mp3",
  invalid: "https://example.com/audio/nonexistent.mp3",
  null: null,
}

// Mock card with audio
export const MOCK_CARD_WITH_AUDIO = {
  id: "card-audio-001",
  title: "Hassan II Mosque",
  description: "Audio narration available",
  image_url: "https://picsum.photos/seed/mosque/800/600",
  audio_url: MOCK_AUDIO_URLS.valid,
  category_id: "cat-monuments",
  category_name: "Monuments",
  city: "Casablanca",
  latitude: 33.6083,
  longitude: -7.6329,
  distance: "1.2km",
  is_favorite: false,
}
```

---

## Integration Points

### Connects To

- **Feature 020** - Card Content Display (integrated below description)
- **Feature 019** - Knowledge Card Model (audio_url field)

### Used By

- **Feature 024** - Home Screen (audio playback in cards)
- **Feature 039** - Content Localization (audio in multiple languages)

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] AudioPlayer does not render when audio_url is null
- [ ] Play button loads and plays audio
- [ ] Pause button pauses playback
- [ ] Stop button stops and resets playback
- [ ] Progress bar updates during playback
- [ ] Time display formats correctly (mm:ss)
- [ ] Error state shows when audio fails to load
- [ ] Loading state shows while buffering
- [ ] Audio unloads on component unmount (no memory leaks)
- [ ] Accessibility labels are correct

---

## Notes

- Uses `expo-av` for audio playback (already included in Expo SDK)
- Audio is NOT preloaded to save bandwidth - loads on first play
- Component manages its own sound instance lifecycle
- Future enhancement: add playback speed control
- Future enhancement: add seek bar with drag support
- Consider adding download option for offline audio in Feature 047

---

## References

- [expo-av Documentation](https://docs.expo.dev/versions/latest/sdk/av/)
- [React Native Audio](https://docs.expo.dev/versions/latest/sdk/audio/)
- [Feature 020 - Card Content Display](./020-card-content-display.md)
