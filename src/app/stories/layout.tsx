import styles from '@/app/stories/stories.module.css';
import React from 'react';

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.storiesContainer}>{children}</section>
}