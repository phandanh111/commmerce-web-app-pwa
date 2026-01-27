# Hooks Implementation Guide

This document outlines all custom hooks in `src/hooks` folder with their rules, skills, and usage patterns.

## Overview

| Hook | Purpose | Category |
|------|---------|----------|
| `useDirection` | Navigation wrapper | Navigation |
| `useFormData` | Form state management | Form |
| `useValidation` | Joi-based form validation | Form |
| `useDisclosure` | Modal/popup open/close state | UI State |
| `useCountdownTimer` | Countdown timer with controls | Timer |
| `useNetworkStatus` | Online/offline detection | PWA |
| `usePWATemplateColor` | Dynamic theme-color meta tag | PWA |
| `useSendGA` | Google Analytics events | Analytics |
| `useAudio` | Simple audio playback | Media |
| `useStableAudio` | Stable audio with AudioContext | Media |

---

## 1. useDirection
**Purpose**: Wrapper for `react-router` navigation with utility methods.

**Returns**:
- `goTo(path, config)` - Navigate to path (returns function)
- `goBack()` - Go back in history
- `goToReplace(path)` - Navigate with replace
- `goBackByTime(n)` - Go back n steps
- `goToNewTab(url)` - Open in new tab
- `redirect(url)` - Full page redirect

**Usage**:
```typescript
import { useDirection } from '@/hooks';

const { goTo, goBack } = useDirection();

// Navigate with state
delayNavigate(goTo(ROUTES.HOME, { replace: true, state: { data } }));

// Go back
goBack();
```

---

## 2. useFormData<T>
**Purpose**: Generic form state management with auto-generated uppercase keys.

**Returns**:
- `formData` - Current form state
- `KEY` - Auto-generated uppercase keys object
- `onChangeForm(key)` - Returns handler function
- `onResetForm()` - Reset to initial values

**Usage**:
```typescript
import { useFormData } from '@/hooks';

type FormData = { phoneNumber: string; email: string };
const initForm: FormData = { phoneNumber: '', email: '' };

const { formData, KEY, onChangeForm, onResetForm } = useFormData<FormData>(initForm);

// KEY = { PHONE_NUMBER: 'phoneNumber', EMAIL: 'email' }
<Input onChange={onChangeForm(KEY.PHONE_NUMBER)} value={formData.phoneNumber} />
```

---

## 3. useValidation<T>
**Purpose**: Joi-based form validation with error messages.

**Returns**:
- `isError` - Boolean validation result
- `errorMessage` - Object with field error messages
- `onValidate(data)` - Validate and return isError

**Usage**:
```typescript
import { useValidation } from '@/hooks';
import { JOI } from '@/utils';

const { errorMessage, onValidate } = useValidation<FormData>({
  phoneNumber: JOI.PHONE_REQUIRE,
  email: JOI.EMAIL_REQUIRE,
});

const handleSubmit = () => {
  const isError = onValidate(formData);
  if (!isError) { /* proceed */ }
};

<Input errorMessage={errorMessage.phoneNumber} />
```

---

## 4. useDisclosure
**Purpose**: Toggle state for modals, popups, dropdowns.

**Returns**:
- `isOpen` - Current state
- `onOpen()` - Set true
- `onClose()` - Set false
- `onToggle()` - Toggle state

**Usage**:
```typescript
import { useDisclosure } from '@/hooks';

const { isOpen, onOpen, onClose } = useDisclosure();

<Button onClick={onOpen}>Open Modal</Button>
<Modal visible={isOpen} onClose={onClose} />
```

---

## 5. useCountdownTimer
**Purpose**: Full-featured countdown timer with percent progress.

**Returns**:
- `time` - Formatted string "MM:SS"
- `isRunning` - Is timer running
- `hasStarted` - Has timer been started
- `isDone` - Has timer completed
- `percent` - Progress 0-100
- `start()` - Start from initial
- `play()` - Resume
- `pause()` - Pause
- `reset()` - Reset to initial
- `totalSecondsLeft` - Seconds remaining

**Usage**:
```typescript
import { useCountdownTimer } from '@/hooks';

const { time, percent, start, pause, isDone } = useCountdownTimer(60);

<Button onClick={start}>Start</Button>
<Text>{time}</Text>
<ProgressBar percent={percent} />
```

---

## 6. useNetworkStatus
**Purpose**: Detect online/offline status for PWA.

**Returns**:
- `isOnline` - Boolean network status

**Usage**:
```typescript
import { useNetworkStatus } from '@/hooks';

const { isOnline } = useNetworkStatus();

if (!isOnline) {
  return <OfflineBanner />;
}
```

---

## 7. usePWATemplateColor
**Purpose**: Dynamically change PWA theme-color meta tag.

**Usage**:
```typescript
import { usePWATemplateColor } from '@/hooks';

// Sets theme-color on mount, resets on unmount
usePWATemplateColor('#000000');
```

---

## 8. useSendGA
**Purpose**: Send Google Analytics events on page access or click.

**Returns**:
- `onClickSendEvent()` - Manually send click event

**Usage**:
```typescript
import { useSendGA } from '@/hooks';
import { GA_ACTION, GA_CATEGORY, GA_LABEL } from '@/enum/google-analytic.enum';

// Auto-sends ACCESS event on mount
useSendGA({
  action: GA_ACTION.ACCESS,
  category: GA_CATEGORY.AUTH,
  label: GA_LABEL.LOGIN,
});
```

---

## 9. useAudio
**Purpose**: Simple audio playback (creates new Audio instance each call).

**Returns**:
- `play()` - Play audio

**Usage**:
```typescript
import { useAudio } from '@/hooks';

const { play } = useAudio('/sounds/notification.mp3');
<Button onClick={play}>Play Sound</Button>
```

---

## 10. useStableAudio
**Purpose**: Stable audio using AudioContext (better for repeated plays).

**Returns**:
- `play()` - Play audio
- `ready` - Boolean if audio is loaded

**Usage**:
```typescript
import { useStableAudio } from '@/hooks';

const { play, ready } = useStableAudio('/sounds/timer-end.mp3');

useEffect(() => {
  if (timerDone && ready) play();
}, [timerDone, ready]);
```

---

## Rules for Creating New Hooks

1. **Naming**: Use `use` prefix (e.g., `useMyHook`)
2. **Export**: Export from `index.ts`
3. **Types**: Use generics where applicable (`useFormData<T>`)
4. **Cleanup**: Always cleanup subscriptions in `useEffect` return
5. **Dependencies**: Properly manage `useCallback`/`useMemo` deps
