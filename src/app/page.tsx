import AllVideos from '@/components/layouts/AllVideos';

export default function Home() {
  return (
      <div className='relative w-full h-full overflow-hidden'>
          <AllVideos isSideList={false}/>
      </div>
  );
}
