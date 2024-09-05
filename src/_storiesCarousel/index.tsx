"user client";

import Image from "next/image";
import Avatar from "@/_avatar";
import styles from "@/_storiesCarousel/page.module.css";
// import { statusCarousel } from "@/FakeData/data";
import React, { useContext, useEffect } from "react";
import {
  UserStoryContext,
  UserStoryContextDispatch,
} from "@/Contexts/UserStoryContext";
import { useRouter } from "next/navigation";
import { ReducerActionType } from "@/Reducers/actions";
import { RouterEndpoint } from "@/routers";
import { computerAvatarMetaData } from "@/_common/utils";
import { getStories } from "@/api/stories";

const Carousel = () => {
  const router = useRouter();
  const userStoryDispatch = useContext(UserStoryContextDispatch);
  const { currentAvatarMetaData, userStoriesList } =
    useContext(UserStoryContext);

  useEffect(() => {
    async function fetchData() {
      const response = await getStories();
      if (response.status === 200) {
        userStoryDispatch({
          type: ReducerActionType.USER_STORIES_LIST,
          payload: response?.data,
        });
      } else {
        alert("Something went wrong, please try again later");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentAvatarMetaData?.id) {
      handlePageRoute(currentAvatarMetaData.id);
    }
  }, [currentAvatarMetaData]);

  const handleAvatarStoryClick = (item: any) => {
    computerAvatarMetaData({
      userStoryDispatch,
      userStoriesList,
      id: item?.id,
    });
  };

  const handlePageRoute = (id: number) => {
    router.push(`${RouterEndpoint.STORIES}/${id}`);
  };

  return (
    <section className={styles.check}>
      <div className={styles.carouselBody}>
        {(userStoriesList || []).map((item: any, index: number) => {
          return (
            <Avatar
              key={item.id}
              image={item}
              isName={true}
              onClick={() => handleAvatarStoryClick(item)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;
