"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  UserStoryContext,
  UserStoryContextDispatch,
} from "@/Contexts/UserStoryContext";
import Avatar from "@/_avatar";
import { CrossSVG } from "@/svg/crossSVG";
import styles from "@/app/stories/[userId]/userStory.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReducerActionType } from "@/Reducers/actions";
import { getUserStory } from "@/api/stories";
import { RouterEndpoint } from "@/routers";

export default function UserStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userStoryDispatch = useContext(UserStoryContextDispatch);
  const router = useRouter();
  const params = useParams();
  const {
    currentAvatarMetaData,
    userStory: userStoryCtx,
    currentUserId,
    currentStoryIndex,
  } = useContext(UserStoryContext);
  const userAvatarMetaDataDispatch = useContext(UserStoryContextDispatch);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentAvatarMetaData?.id || params?.userId) {
      userAvatarMetaDataDispatch({
        type: ReducerActionType.CURRENT_USER_ID,
        payload: currentAvatarMetaData?.id || +(params?.userId || 0),
      });
      fetchData(currentAvatarMetaData?.id || +(params?.userId || 0));
    }
  }, [currentAvatarMetaData]);

  useEffect(() => {
    if (
      currentUserId !== undefined &&
      currentStoryIndex !== undefined &&
      userStoryCtx?.length
    ) {
      handlePageRoute(currentUserId, userStoryCtx?.[currentStoryIndex]?.id);
    }
  }, [currentUserId, currentStoryIndex, userStoryCtx]);

  async function fetchData(id: number) {
    try {
      setIsLoading(true);
      const response = await getUserStory(id);
      if (response.status === 200 && response.data?.length) {
        userAvatarMetaDataDispatch({
          type: ReducerActionType.USER_STORY,
          payload: response.data,
        });
  
        userAvatarMetaDataDispatch({
          type: ReducerActionType.CURRENT_STORY_INDEX,
          payload: 0,
        });
      } else {
        handleStoryViewClose();
      }
      setIsLoading(false);
    } catch(e) {
      handleStoryViewClose();
    }
  }

  const handleStoryViewClose = () => {
    userStoryDispatch({
      type: ReducerActionType.RESET,
      payload: false,
    });
    router.push("/");
  };

  const handlePageRoute = (id: number, subId: string) => {
    router.push(`${RouterEndpoint.STORIES}/${id}/${subId}`);
  };

  return (
    <section className={styles.storyContainer}>
      <div className={styles.storyAvatarMeta}>
        <Avatar
          key={currentAvatarMetaData.id}
          image={currentAvatarMetaData}
          isName={false}
          width={35}
          height={35}
        />
        <div className={styles.storyAvatarMetaDetails}>
          <span>{currentAvatarMetaData.name}</span>
          <span onClick={handleStoryViewClose}>
            <CrossSVG width="20px" height="20px" />
          </span>
        </div>
      </div>
      {isLoading ? <div className={'loader'}></div> : children}
    </section>
  );
}
