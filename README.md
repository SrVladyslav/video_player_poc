# Getting Started with the setup 😉

### 1. Clone this repository to your local PC:

```bash
git clone https://github.com/SrVladyslav/video_player_poc.git
```

### 2. Go inside the cloned root level directory:

```bash
cd video_player_poc
```

Install the dependencies. We should use `--force` because we are using the new NextJS-15 verions, which is not stable yet.

```bash
npm install --force
```

### 3. Nice, now create a new `.env.local` file, then paste this content inside:

```bash
PROJECT_ROOT=''
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_DATA_URL=http://localhost
NEXT_PUBLIC_MAX_FILE_SIZE=209715200 # 200 MB
```

or just open the terminal in the root directory and run this script

```bash
npm run create-env
```

### 4. Migrating the DB, we will be using Prisma with SQLite, so let's migrate the schema and populate the DB with two random users, copy this and hit enter:

```bash
npm run setup:db
```

You will be prompted with something like `? Enter a name for the new migration: `, just name it like `dev` and go on. 

HOLD ON, DO NOT CLOSE THE TERMINAL!

Two users `user1` and `user2` are now created and we are one step from testing with them the Likes and Watch counter functionallities.

### 5. Last step 😊!

![Image example](https://github.com/SrVladyslav/video_player_poc/blob/main/public/imagine_this_is_s3/users.png)

Copy the user1 and user2 `id` into the `.env.local` file in their respective variables `NEXT_PUBLIC_USER_ID_1="<user_id_1>"` and `NEXT_PUBLIC_USER_ID_2="<user_id_2>"`.

This will be representing the user tokens, so we can mimic a little bit the user DB connections.

Use the code editor you love the most to edit, or also you can try with nano: 
```bash
nano .env.local
```
And then Ctrl + S and Ctr + X

# Start the DEV Server 🚀

It's the time to run the server on localhost, just run:

```bash
npm run dev
```

😅 In dev mode it loads very slow, so don't panic!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# UPS

This code was only tested on Windows, so I don't know if it will have some troubles in Linux or MacOS. 

# FUNCTIONALITIES

### 1) Video GET Endpoints (using TRPC):

- getVideo(vid: string, userID?:string): returns the wanted video, if the user is presented, returns also if `User Liked`the video or not. Used in `/watch` section to load the video data.
- getVideos(): Returns all the uploaded videos. TODO: implement batching. Used in the main `/` section to load all the video, it's also used in one of the playlist sections from `/watch`.
- getFavoriteVideos(userId:string): returns all the videos that the user with userId liked. Used in the main `/favorites` section to load all the user favorite videos, it's also used in one of the playlist sections from `/watch`.
- getMyVideos(userId:string): Returns all the videos that the current user uploaded to the server. Used in the main `/my_videos` section to load all the videos uploaded by the user, it's also used in one of the playlist sections from `/watch`.

### 2) Video CREATE Endpoints (using TRPC):

- createVideo(...): Given the video data, without File, creates new video object in the DB. Used in `/upload` section to create/publish new Video Item.

### 3) Video UPDATE Endpoints (using TRPC):
    
- incrementWatchCount(videoId:string): Given the video ID, increments its `watchCount` by one. Used in the `/watch` section to increment the video Watch counter
- likeVideo(videoId: string, userId: string): Likes the video, creates a new relation between the video and the user, this relations are used to obtain the `likesCount`. Also uses Server Actions to be started.  Used in the `/watch` section to increment the video Likes counter if user clicks the Like button.

### 4) Video POST API (Without TRPC)

- We also have the `/api/upload` route to handle uploading both the video file and the video thumbnail. For small items, it might be fine to use TRPC; however, TRPC is not designed to handle file data efficiently. The best practice is to upload the data to a dedicated server or a CDN, which is powerful and can process data quickly without bottlenecks. Then the URL/URI for this data will be passed to the TRPC to store it into the actual DB. The File uploading implementation is also done by streming, so one step forward to some prod implementation.

### Extra functionalities

- Responsivness. All the implementation is done thinking on all the devices, so the page is responsive for all of them.
- Personalized video Player done from scratch using ShadCDN components and TailwindCSS. Implemented the Full-Screen, the Picture-In-Picture Mode, the volume and speed selections.
- Dropzone done from scratch, you can upload videos by clicking on it or just simply dragging the elements inside and dropping them there. as it is also implemented as streaming upload, it contains a upload progress bar.
- Video Title, when uploading the new video in `/upload`, you have the option to add a video title, otherwise it will stay like "Video with no title".
- The video cards, to represent the videos, firstly their thumbnails will be loaded, and then if you hover on them, the videos itself will be displayed, like in youtube.

# IMPORTANT

1) This code is not ready yet for production, first of all, all the video and image data is stored in local public folder. THIS IS BAD, but here we are just fo PoC. Before production, please, change all the uploads from `public` folder to some CDN or sprecialized server, consider AWS S3.

2) TODO: Due to lack of time, I had the video player timeline only partially completed.


# Technologies Used
- [NextJS 15 Release Candidate](https://nextjs.org/docs): should work with Nextjs14 also.
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

