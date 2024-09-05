"use client";

import styles from "./page.module.css";
import { InstagramLogo } from "@/svg/instagramSVG";
import Carousel from "@/_storiesCarousel";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RouterEndpoint } from "@/routers";
import { detectAppMobileUserAgent } from "@/_common/utils";
import { UserStoryContextDispatch } from "@/Contexts/UserStoryContext";
import { ReducerActionType } from "@/Reducers/actions";

export default function Home() {
  const router = useRouter();
  const userStoryDispatch = useContext(UserStoryContextDispatch);

  useEffect(() => {
    const isMobileDevice = detectAppMobileUserAgent()
    if (!isMobileDevice) {
      router.push(`${RouterEndpoint.NON_SUPPORTED_VIEW}`);
    }
    userStoryDispatch({
      type: ReducerActionType.RESET,
      payload: false,
    });
  }, []);
  return (
    <main className={styles.main}>
      <section>
        <Carousel />
      </section>
    </main>
  );
}
