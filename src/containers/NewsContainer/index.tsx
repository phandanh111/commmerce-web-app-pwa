import React from 'react';

import styles from './styles.module.scss';

const NewsContainer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Tin tức</h2>
        </div>
    );
};

export default React.memo(NewsContainer);
