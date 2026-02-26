import React from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  title: string;
  align?: 'center' | 'left';
};

function SectionTitle({ className, title, align = 'center' }: Props) {
  const alignClass = align === 'left' ? styles.left : '';

  return (
    <div className={`${styles.wrapper} ${alignClass} ${className || ''}`}>
      <h2>{title}</h2>
    </div>
  );
}

export default React.memo(SectionTitle);
