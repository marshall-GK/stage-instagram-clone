'use client';
import { useRouter } from 'next/navigation';
import styles from './non_supported_view.module.css';
import React, { useEffect } from 'react';
import { detectAppMobileUserAgent } from '@/_common/utils';

export default function NonSupportedView() {
  const router = useRouter();
  useEffect(() => {
    const isMobileDevice = detectAppMobileUserAgent();
    if(isMobileDevice) {
      router.push('/')
    }
  }, [])
  return <div className={styles.container}>Please open this app in your smartphone.</div>;
}