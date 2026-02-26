import React from 'react';

import styles from './styles.module.scss';

const ContactContainer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Liên Hệ</h2>
        </div>
    );
};

export default React.memo(ContactContainer);
