"user client";

import Image from "next/image";
import Avatar from "@/_avatar";
import styles from "@/_storiesCarousel/page.module.css";
// import { statusCarousel } from "@/FakeData/data";
import React, { useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getStories();
      if (response.status === 200) {
        userStoryDispatch({
          type: ReducerActionType.USER_STORIES_LIST,
          payload: response?.data,
        });
      } else {
        alert("Something went wrong, please try again later");
      }
      setLoading(false);
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
      {!loading ? (
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
      ) : (
        <div className="loader" style={{ top: "calc(50vh - 60px)" }}></div>
      )}
    </section>
  );
};

export default Carousel;
