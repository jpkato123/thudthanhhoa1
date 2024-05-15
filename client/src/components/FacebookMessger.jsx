import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMessger() {
  return (
    <FacebookProvider appId="460919496493783" chatSupport>
      <CustomChat pageId="120138041072452" minimized={true} />
    </FacebookProvider>
  );
}
