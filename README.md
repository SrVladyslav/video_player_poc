# Getting Started

1) Clone this repository to your local PC:

```bash
git clone https://github.com/SrVladyslav/video_player_poc.git

cd video_player_poc
```

2) Go inside the cloned root level directory and install the dependencies:

```bash
cd video_player_poc
```

We should use `--force` because we are using the new NextJS-15 verions, which is not stable yet.

```bash
npm install --force
```

  
3) Nice, now create a new `.env.local` file, then paste this content inside:

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

4) Migrating the DB, we will be using Prisma with SQLite, so let's migrate the schema and populate the DB with two random users:

```bash
npm run setup:db
```

# Start the DEV Server 

Now, it's the time to run the server on localhost, just run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# IMPORTANT




You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
