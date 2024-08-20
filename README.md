# Getting Started with the setup 😉

### 1. Clone this repository to your local PC:

```bash
git clone https://github.com/SrVladyslav/video_player_poc.git
```

### 2. Go inside the cloned root level directory:

```bash
cd video_player_poc
```

Install the dependencies. We use --force because we are using the new NextJS 15 version, which is not stable yet.

```bash
npm install --force
```

### 3. Nice, now  in the root directory run this script:

```bash
npm run create-env
```

This should automatically initialize the `.env.local` file. Otherwise you can do it manually by simply creating a new `.env.local` file in the project root directory, and then paste this content inside:

```bash
PROJECT_ROOT=''
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_DATA_URL=http://localhost
NEXT_PUBLIC_MAX_FILE_SIZE=209715200 # 200 MB

# =======================================================================
# INSERT HERE THE USER ID's
NEXT_PUBLIC_USER_ID_1="<user_id_1>"
NEXT_PUBLIC_USER_ID_2="<user_id_2>"
# =======================================================================
```

### 4. Migrating the DB, we will be using Prisma with SQLite, so let's migrate the schema and populate the DB with two random users, copy this and hit enter:

```bash
npm run setup:db
```

You will be prompted with something like `? Enter a name for the new migration: `, just name it like `dev` and continue. 

HOLD ON, DO NOT CLOSE THE TERMINAL YET!

Two users `user1` and `user2` are now created and we are one step away from testing the Likes and Watch counter functionalities.

### 5. Last step 😊!

![Image example](https://github.com/SrVladyslav/video_player_poc/blob/main/public/imagine_this_is_s3/users.png)

Copy the user1 and user2 `id` into the `.env.local` file in their respective variables `NEXT_PUBLIC_USER_ID_1="<user_id_1>"` and `NEXT_PUBLIC_USER_ID_2="<user_id_2>"`.

These will represent the user tokens so we can mimic user DB connections.

Use the code editor you love the most to edit, or you can also try with `nano`:

```bash
nano .env.local
```
Then press `Ctrl + S` and `Ctrl + X`.

# Start the DEV Server 🚀

It's time to run the server on localhost, just run:

```bash
npm run dev
```

😅 In dev mode it loads very slow, so don't panic!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# UPS

This code was only tested on Windows, so I don't know if it will have any issues on Linux or macOS.

# FUNCTIONALITIES

### 1) Video GET Endpoints (using TRPC):

- getVideo(vid: string, userID?:string): Returns the requested video. If the user ID is provided, it also indicates whether the user liked the video or not. Used in the `/watch` section to load video data.
- getVideos(): Returns all uploaded videos. TODO: Implement batching. Used in the main `/` section to load all videos and in one of the playlist sections from `/watch`.
- getFavoriteVideos(userId:string): Returns all the videos liked by the user with the given `userId`. Used in the main `/favorites` section to load all the user favorite videos, it's also used in one of the playlist sections from `/watch`.
- getMyVideos(userId:string): Returns all videos uploaded by the current user. Used in the main `/my_videos` section to load all the videos uploaded by the user and in one of the playlist sections from `/watch`.

### 2) Video CREATE Endpoints (using TRPC):

- createVideo(...): Given the video data (excluding the `File`), creates new video object in the DB. Used in `/upload` section to create/publish new video item.

### 3) Video UPDATE Endpoints (using TRPC):
    
- incrementWatchCount(videoId:string): Given the video ID, increments its `watchCount` by one. Used in the `/watch` section to increment the video watch counter
- likeVideo(videoId: string, userId: string): Likes the video, creates a new relation between the video and the user. This relation is used to obtain the `likesCount`. Also uses Server Actions to be triggered. Used in the `/watch` section to increment the video Likes counter if the user clicks the Like button.

### 4) Video POST API (Without TRPC)

- We also have the `/api/upload` route to handle uploading both the video file and the video thumbnail. For small items, it might be fine to use TRPC; however, TRPC is not designed to handle file data efficiently. The best practice is to upload the data to a dedicated server or a CDN, which is powerful and can process data quickly without bottlenecks. Then the URL/URI for this data will be passed to the TRPC to store it into the actual DB. The File uploading implementation is also done via streaming, which is a step forward a production implementation.

### Extra functionalities

- Responsiveness: All implementation is done with responsiveness in mind, so the page works well on all devices.
- Personalized Video Player: Built from scratch using ShadCDN components and TailwindCSS. Includes features like Full-Screen mode, Picture-In-Picture mode, volume and speed selections.
- Dropzone: Built from scratch. You can upload videos by clicking or dragging and dropping elements. Includes a progress bar for uploads.
- Video Title: When uploading a new video in `/upload`, you have the option to add a video title, otherwise, it will remain "Video with no title".
- Video cards: Video cards initially load thumbnail. When you hover over them, the videos themselves are displayed and reproduced, similar to YouTube implementation.

# IMPORTANT

1) This code is not ready yet for production yet. All the video and image data is currently stored in the local public folder. WHICH IS NOT RECOMENDED, THIS IS BAD, but here we are just for a PoC. Before going to production, please, move all uploads from `public` folder to some CDN or sprecialized server, such as AWS S3.

2) TODO: Due to lack of time, the video player timeline only partially completed.

# Technologies Used
- [NextJS 15 Release Candidate](https://nextjs.org/docs): Should work with a Nextjs14 as well.
```bash
npm install next@rc react@rc react-dom@rc
```
- [TailwindCSS](https://tailwindcss.com/): Styles and css animations.
- [Shadcn (a utility-first CSS framework)](https://ui.shadcn.com/): Buttons, Inputs, etc.
- [tRPC (@trpc/server for backend & @trpc/client for frontend)](https://trpc.io/): Used the raw trpc/client and trpc/server, instead of using the default trpc + react query, here we use the SWR Library to handle the data fetching.
- [SWR](https://swr.vercel.app/): Data fetching.
- Typescript
- [Zod](https://zod.dev/): Schema validation
- [browser-thumbnail-generator](https://www.npmjs.com/package/browser-thumbnail-generator): For the video Thumbnails generation.
- [React Icons](https://react-icons.github.io/react-icons/): For all the icons used in the app

# SCREENSHOTS
![Main page with all videos](https://github.com/SrVladyslav/video_player_poc/blob/main/public/imagine_this_is_s3/mainData.png)
![Upload section](https://github.com/SrVladyslav/video_player_poc/blob/main/public/imagine_this_is_s3/upload.png)
![Video Watch section](https://github.com/SrVladyslav/video_player_poc/blob/main/public/imagine_this_is_s3/watch.png)

