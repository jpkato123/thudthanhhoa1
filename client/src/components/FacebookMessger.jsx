import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMessger() {
  return (
    <FacebookProvider appId="460919496493783" chatSupport>
      <CustomChat pageId="120138041072452" minimized={true} />
    </FacebookProvider>
    // <>
    // <!-- Messenger Chat Plugin Code -->
    // <div id="fb-root"></div>
    // <div id="fb-customer-chat" class="fb-customerchat"></div>
    // <script> var chatbox = document.getElementById('fb-customer-chat'); chatbox.setAttribute("120138041072452", "120138041072452"); chatbox.setAttribute("attribution", "biz_inbox"); </script>
    // <script> window.fbAsyncInit = function () { FB.init({ xfbml: true, version: 'API-VERSION' }); }; (function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk')); </script>
    // </>
  );
}
