import React from 'react';

import styles from './styles.module.scss';

const ShowroomContainer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Showroom</h2>
        </div>
    );
};

export default React.memo(ShowroomContainer);
