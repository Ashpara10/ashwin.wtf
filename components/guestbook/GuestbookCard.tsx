import { useAuthUser } from '@/hooks/useAuthUser';
import Link from 'next/link';
import MessagesList from './MessagesList';

const GuestbookCard = () => {
    const { user, authReady, handleSignIn, handleSignOut } = useAuthUser();

    return (
        <div className="border border-border/40  mb-12 rounded-lg w-full min-h-42 relative flex flex-col">

            <MessagesList limit={3} messageItemClassName="" variant='default' />
            <div className="w-full bg-linear-to-t from-background via-background/80  rounded-b-lg to-transparent absolute z-2 inset-x-0 bottom-0 h-full" />
            <Link href="/guestbook" className='absolute mx-auto z-10 px-5 cursor-pointer font-medium gap-1 flex flex-row items-center justify-center text-xs md:text-sm inset-x-0 w-fit py-3 bg-background rounded-full -bottom-5 border border-border/60 transitions-all hover:bg-border/40 backdrop-blur-lg'>
                See More
            </Link>
        </div>

    )
}

export default GuestbookCard
