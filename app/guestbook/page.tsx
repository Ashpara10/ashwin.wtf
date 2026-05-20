import Guestbook from "@/components/guestbook/Guestbook";
import BASE_URL from "@/lib/seo";

export const metadata = {
  title: 'Guestbook 🌱 | Ashwin Parande',
  description: 'Leave a message in the guestbook — I read all messages and appreciate your thoughts.',
  alternates: {
    canonical: `${BASE_URL}/guestbook`,
  },
};
const GuestbookPage = () => {
  return (
    <Guestbook/>
  )
}

export default GuestbookPage
