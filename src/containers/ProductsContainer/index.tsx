import React from 'react';

import styles from './styles.module.scss';

const ProductsContainer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Sản phẩm</h2>
        </div>
    );
};

export default React.memo(ProductsContainer);
