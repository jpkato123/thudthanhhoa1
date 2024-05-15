import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMessger() {
  return (
    <FacebookProvider appId="127793563602289" chatSupport>
      <CustomChat pageId="120138041072452" minimized={true} />
    </FacebookProvider>
  );
}
