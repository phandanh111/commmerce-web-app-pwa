# Project Skills

## Skill: Create New Component

**Description**: Create a new reusable UI component with SCSS Module styling.

**Instructions**:
1.  Create folder: `src/components/[category]/[ComponentName]`.
2.  Create `index.tsx` and `styles.module.scss`.
3.  Implement basic structure:

```tsx
// src/components/[category]/[ComponentName]/index.tsx
import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  // Add props here
};

function ComponentName({ className, ...props }: Props) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {/* Content */}
    </div>
  );
}

export default React.memo(ComponentName);
```

```scss
// src/components/[category]/[ComponentName]/styles.module.scss
.wrapper {
  // Styles
  color: var(--primary-text-color);
}
```

## Skill: Create New Service

**Description**: Add a new API service for a feature.

**Instructions**:
1.  Create file: `src/services/[feature].service.ts`.
2.  Import `AxiosGW`.
3.  Define service functions.

```ts
// src/services/[feature].service.ts
import { AxiosGW } from './axios.service';
import { APIResponse } from '@/types';

export const featureService = {
  getData: (params: any): Promise<APIResponse<any>> => {
    return AxiosGW.get('/api/endpoint', { params });
  },
  
  createData: (data: any): Promise<APIResponse<any>> => {
    return AxiosGW.post('/api/endpoint', data);
  },
  
  // Example with loading disabled
  getDataSilent: (id: string): Promise<APIResponse<any>> => {
    return AxiosGW.get(\`/api/endpoint/\${id}\`, { 
        isDisableLoading: true,
        isDisableToast: true 
    } as any);
  }
};
```

## Skill: Create New Page

**Description**: Create a new route/page.

**Instructions**:
1.  Create container: `src/containers/[Feature]/[PageName]Container/index.tsx` (Logic).
2.  Create page wrapper: `src/pages/[Feature]/[PageName]/index.tsx`.
3.  Register route.

```tsx
// src/pages/[Feature]/[PageName]/index.tsx
import { PageNameContainer } from '@/containers';
import { useSendGA } from '@/hooks';
import { GA_ACTION, GA_CATEGORY, GA_LABEL } from '@/enum/google-analytic.enum';

type Props = {};

export default function PageName({}: Props) {
  useSendGA({
      action: GA_ACTION.ACCESS,
      category: GA_CATEGORY.GENERAL,
      label: 'Page Name',
  });

  return <PageNameContainer />;
}
```
