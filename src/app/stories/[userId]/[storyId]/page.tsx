"use client";

import ProgressBar from "@/_common/ProgressBar";
import {
  UserStoryContext,
  UserStoryContextDispatch,
} from "@/Contexts/UserStoryContext";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import styles from "./storyId.module.css";
import styled from "styled-components";
import Image from "next/image";
import { ReducerActionType } from "@/Reducers/actions";
import {
  computerAvatarMetaData,
  computeTouchDragDirection,
} from "@/_common/utils";

const StoryWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default function Story() {
  const context = useContext(UserStoryContext);
  const userStoryDispatch = useContext(UserStoryContextDispatch);
  const {
    userStory,
    userStoriesList,
    currentStoryIndex,
    nextAvatarMetaData,
    prevAvatarMetaData,
  } = context;

  const [progress, setProgress] = useState(0);
  const [storyStartTime, setStoryStartTime] = useState(Date.now());
  const [currentStory, setCurrentStory] = useState<any>({});
  const [imageLoaded, setImageLoaded] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setProgress(0);
    if (userStory?.length) {
      const data =
        userStory.filter((story: any) => story?.id === params.storyId)?.[0] ||
        {};
      setCurrentStory(data);
      if (data?.id && imageLoaded) {
        setStoryStartTime(Date.now());
      }
    }
  }, [userStory, imageLoaded]);

  useEffect(() => {
    let interval: any = null;

    interval = setInterval(() => {
      const elapsedTime = Date.now() - storyStartTime;
      const newProgress = (elapsedTime / currentStory?.timer) * 100;

      if (newProgress >= 100) {
        handlePageRoute({ isNext: true });
      } else {
        setProgress(newProgress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [storyStartTime]);

  const handlePageRoute = ({ isNext = false, isPrev = false }) => {
    const _computerI = isNext ? 1 : -1;
    setProgress(0);
    setImageLoaded(false);
    if (
      (isPrev && currentStoryIndex !== 0) ||
      (isNext && currentStoryIndex < userStory?.length - 1)
    ) {
      userStoryDispatch({
        type: ReducerActionType.CURRENT_STORY_INDEX,
        payload: currentStoryIndex + _computerI,
      });
    } else {
      setCurrentStory({});
      if (isNext ? !nextAvatarMetaData?.id : !prevAvatarMetaData?.id) {
        userStoryDispatch({
          type: ReducerActionType.RESET,
          payload: {},
        });
        router.push("/");
        return;
      }
      userStoryDispatch({
        type: ReducerActionType.CURRENT_STORY_INDEX,
        payload: 0,
      });
      computerAvatarMetaData({
        userStoryDispatch,
        userStoriesList,
        id: isPrev ? prevAvatarMetaData?.id : nextAvatarMetaData?.id,
      });
    }
  };

  const handlePrevClick = (e: any) => {
    handlePageRoute({ isPrev: true });
  };

  const handleNextClick = (e: any) => {
    handlePageRoute({ isNext: true });
  };
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      {currentStory?.storyUrl && (
        <>
          <div
            className={styles.progressBarContainer}
            style={{
              gridTemplateColumns: `repeat(${userStory?.length || 1}, 1fr)`,
            }}
          >
            {Array.from({ length: userStory?.length || 0 }).map((_, index) => (
              <ProgressBar
                progress={
                  currentStoryIndex === index
                    ? progress
                    : currentStoryIndex > index
                    ? 100
                    : 0
                }
                key={index}
              />
            ))}
          </div>
          <StoryWrapper>
            <Image
              unoptimized
              src={currentStory?.storyUrl}
              alt="story"
              data-testid={"storyImage"}
              data-teststoryurl={currentStory?.storyUrl}
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                transform: "ease-in",
                objectFit: "contain",
              }}
              fill={true}
              onLoad={handleImageLoaded}
            />
          </StoryWrapper>
        </>
      )}
      {!imageLoaded && <div className={'loader'}></div>}
      <div className={styles.navigationBlockContainer}>
        <div onClick={handlePrevClick}>Prev</div>
        <div onClick={handleNextClick}>Next</div>
      </div>
    </div>
  );
}
