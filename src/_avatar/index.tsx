"use client";

import Image from "next/image";
import styles from "@/_avatar/page.module.css";
import React from 'react';

export default function Avatar({ image, id, onClick, isName = false, width = 46, height = 46 }: any) {
  return (
    <section className={styles.avatarDetail}>
      <div className={styles.avatarBox}>
        <Image
          className={styles["avatar-profile-image"]}
          src={image.img}
          alt="avatar"
          width={width}
          height={height}
          onClick={onClick}
        />
      </div>
      {isName ? <p className={styles.avatarName}>{image.name}</p> : null}
    </section>
  );
}
