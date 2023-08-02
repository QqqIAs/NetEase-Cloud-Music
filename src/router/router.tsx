import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";

import Layout from "../Layout/index";
import LatestMusic from "@/pages/discovery/LatestMusic";
import Recommendation from "@/pages/discovery/Recommendation";
import LeaderBoard from "@/pages/discovery/Leaderboard";
import RecommendDaily from "@/pages/discovery/Recommend_daily";
import Singers from "@/pages/discovery/Singers";
import SongList from "@/pages/discovery/Songlist";
import Video from "@/pages/videos/Video";
import Mv from "@/pages/videos/Mv";
import Search from "@/pages/search";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/discovery'></Navigate>
  },
  {
    path: "/discovery",
    element: <Layout></Layout>,
    children: [
      {
        path: '/discovery/latestmusic',
        element: <LatestMusic></LatestMusic>
      },
      {
        path: '/discovery/recommendation',
        element: <Recommendation></Recommendation>
      },
      {
        path: '/discovery/leaderboard' ,
        element: <LeaderBoard></LeaderBoard>
      },
      {
        path: '/discovery/recommend_daily' ,
        element: <RecommendDaily></RecommendDaily>
      },
      {
        path: '/discovery/singers' ,
        element: <Singers></Singers>
      },
      {
        path: '/discovery/songlist' ,
        element: <SongList></SongList>
      }
    ]
  },
  {
    path: '/videos',
    element: <Layout></Layout>,
    children: [
      {
        path: '/videos/video',
        element: <Video></Video>
      },
      {
        path: '/videos/mv',
        element: <Mv></Mv>
      },
    ]
  },
  {
    path: '/search',
    element: <Layout></Layout>,
    children: [
      {
        path: '/search',
        element: <Search></Search>
      }
    ]
  }
]);

export default router

