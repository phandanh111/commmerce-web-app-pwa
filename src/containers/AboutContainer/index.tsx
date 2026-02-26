import React from 'react';

import styles from './styles.module.scss';

const AboutContainer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Giới thiệu</h2>
        </div>
    );
};

export default React.memo(AboutContainer);
